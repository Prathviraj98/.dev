import uuid
import os
import json
import urllib.request
from typing import Optional
from fastapi import APIRouter, Depends, HTTPException, Request, status
from sqlalchemy.ext.asyncio import AsyncSession
import redis.asyncio as aioredis

from database import get_db, get_redis
from models import ContactInquiryModel
from schemas import ContactCreate, ContactResponse

router = APIRouter(prefix="/contact", tags=["contact"])

RATE_LIMIT_MAX = 5
RATE_LIMIT_WINDOW = 3600  # 1 hour

@router.post("", response_model=ContactResponse, status_code=status.HTTP_201_CREATED)
async def submit_contact_inquiry(
    payload: ContactCreate,
    request: Request,
    db: AsyncSession = Depends(get_db),
    redis_client: Optional[aioredis.Redis] = Depends(get_redis),
):
    # Rate Limiting Check via Redis
    client_ip = request.client.host if request.client else "unknown"
    rate_key = f"nexus:ratelimit:contact:{client_ip}"

    if redis_client:
        try:
            current_requests = await redis_client.get(rate_key)
            if current_requests and int(current_requests) >= RATE_LIMIT_MAX:
                raise HTTPException(
                    status_code=status.HTTP_429_TOO_MANY_REQUESTS,
                    detail="Rate limit exceeded. Please wait an hour before submitting another project brief."
                )
        except HTTPException:
            raise
        except Exception:
            pass

    # Save Inquiry to Database (gracefully fallback if DB unavailable)
    inquiry_id = f"INQ-{str(uuid.uuid4())[:8].upper()}"
    try:
        if db:
            new_inquiry = ContactInquiryModel(
                id=inquiry_id,
                name=payload.name,
                email=payload.email,
                company=payload.company,
                project_scope=payload.project_scope,
                budget_range=payload.budget_range,
                message=payload.message,
            )
            db.add(new_inquiry)
            await db.commit()
            await db.refresh(new_inquiry)
    except Exception as db_err:
        print(f"[DB WARNING] Database save skipped: {db_err}")

    # Increment Rate Limit Counter in Redis
    if redis_client:
        try:
            pipe = redis_client.pipeline()
            pipe.incr(rate_key)
            pipe.expire(rate_key, RATE_LIMIT_WINDOW)
            await pipe.execute()
        except Exception:
            pass

    # Dispatch Email via Resend API
    resend_api_key = os.getenv("RESEND_API_KEY")
    if resend_api_key:
        try:
            url = "https://api.resend.com/emails"
            headers = {
                "Authorization": f"Bearer {resend_api_key}",
                "Content-Type": "application/json",
                "User-Agent": "Resend-Python/2.0",
            }
            email_payload = json.dumps({
                "from": os.getenv("SENDER_EMAIL", "onboarding@resend.dev"),
                "to": ["d0tdev@proton.me"],
                "subject": f"[Project Brief] {payload.project_scope} - {payload.name}",
                "html": f"""
                <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px;">
                  <h2 style="color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-top: 0;">🚀 New Project Brief Submission (.DEV)</h2>
                  <p><strong>Tracking Reference:</strong> <span style="color: #f59e0b; font-weight: bold;">{inquiry_id}</span></p>
                  <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                    <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;">Client Name:</td><td style="color: #ffffff; font-weight: bold;">{payload.name}</td></tr>
                    <tr><td style="padding: 8px 0; color: #94a3b8;">Client Email:</td><td style="color: #38bdf8; font-weight: bold;"><a href="mailto:{payload.email}" style="color: #38bdf8;">{payload.email}</a></td></tr>
                    <tr><td style="padding: 8px 0; color: #94a3b8;">Company:</td><td style="color: #ffffff;">{payload.company or 'N/A'}</td></tr>
                    <tr><td style="padding: 8px 0; color: #94a3b8;">Project Scope:</td><td style="color: #ffffff;">{payload.project_scope}</td></tr>
                    <tr><td style="padding: 8px 0; color: #94a3b8;">Estimated Budget:</td><td style="color: #10b981; font-weight: bold;">{payload.budget_range}</td></tr>
                  </table>
                  <h3 style="color: #93c5fd; margin-top: 24px;">Project Details & Objectives:</h3>
                  <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; border-left: 4px solid #38bdf8; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
                    {payload.message}
                  </div>
                </div>
                """,
                "reply_to": payload.email,
            }).encode("utf-8")
            req = urllib.request.Request(url, data=email_payload, headers=headers, method="POST")
            with urllib.request.urlopen(req) as resp:
                print(f"[RESEND API SUCCESS] Email dispatched via backend for {inquiry_id}")
        except Exception as e:
            print(f"[RESEND API ERROR] Backend email dispatch exception: {e}")

    return ContactResponse(
        success=True,
        message="Your project brief has been received. Our engineering lead will reach out within 12 hours.",
        inquiry_id=inquiry_id,
    )
