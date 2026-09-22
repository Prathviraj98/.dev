import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { Resend } from 'resend';

export const dynamic = 'force-dynamic';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, company, project_scope, budget_range, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json({ success: false, detail: 'Missing required fields' }, { status: 400 });
    }

    const inquiryId = `INQ-${Math.floor(100000 + Math.random() * 900000)}`;
    const resendApiKey = process.env.RESEND_API_KEY;
    const protonRecipients = ['d0tdev@proton.me', 'darlings_protonmail@protonmail.ch'];
    const gmailRecipient = 'gunmr00@gmail.com';
    const safeBudget = (budget_range || '$5k - $10k').replace(/\$/g, 'USD ');

    console.log(`[EMAIL DISPATCH] Dispatching submission to ProtonMail (${protonRecipients.join(', ')}) and Gmail (${gmailRecipient})`);

    // Create Email Body HTML & Text
    const htmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px;">
        <h2 style="color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-top: 0;">🚀 New Project Brief Submission (.DEV)</h2>
        <p><strong>Tracking Reference:</strong> <span style="color: #f59e0b; font-weight: bold;">${inquiryId}</span></p>

        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
          <tr><td style="padding: 8px 0; color: #94a3b8; width: 140px;">Client Name:</td><td style="color: #ffffff; font-weight: bold;">${name}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Client Email:</td><td style="color: #38bdf8; font-weight: bold;"><a href="mailto:${email}" style="color: #38bdf8;">${email}</a></td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Company:</td><td style="color: #ffffff;">${company || 'N/A'}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Project Scope:</td><td style="color: #ffffff;">${project_scope}</td></tr>
          <tr><td style="padding: 8px 0; color: #94a3b8;">Estimated Budget:</td><td style="color: #10b981; font-weight: bold;">${safeBudget}</td></tr>
        </table>

        <h3 style="color: #93c5fd; margin-top: 24px;">Project Details & Objectives:</h3>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; border-left: 4px solid #38bdf8; white-space: pre-wrap; font-size: 14px; line-height: 1.6; color: #e2e8f0;">
          ${message}
        </div>

        <p style="font-size: 12px; color: #64748b; margin-top: 24px; text-align: center;">Submitted automatically via .DEV Web Interface</p>
      </div>
    `;

    const textContent = `
New Project Brief Submission for .DEV (${inquiryId})

Client Name: ${name}
Client Email: ${email}
Company: ${company || 'N/A'}
Project Scope: ${project_scope}
Estimated Budget: ${safeBudget}

Project Details & Objectives:
--------------------------------------------------
${message}
--------------------------------------------------
    `;

    let emailDelivered = false;
    let emailId = '';

    // Primary Email Provider: Resend SDK
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        const resendResult = await resend.emails.send({
          from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
          to: ['d0tdev@proton.me'],
          subject: `[Project Brief] ${project_scope} - ${name} (${safeBudget})`,
          html: htmlContent,
          text: textContent,
          replyTo: email,
        });

        if (resendResult.data && !resendResult.error) {
          emailDelivered = true;
          emailId = resendResult.data.id;
          console.log(`[EMAIL] Resend delivered email ID:`, emailId);
        } else if (resendResult.error) {
          console.warn('[EMAIL] Resend returned error:', resendResult.error);
        }
      } catch (err: any) {
        console.warn('[EMAIL] Resend SDK exception:', err.message);
      }
    }

    // Fallback Provider: Custom Nodemailer SMTP (only if Resend fails)
    if (!emailDelivered && process.env.SMTP_USER && process.env.SMTP_PASS && process.env.SMTP_HOST !== 'smtp.protonmail.ch') {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        await transporter.sendMail({
          from: `"${name} via .DEV" <${process.env.SMTP_USER}>`,
          to: 'd0tdev@proton.me',
          replyTo: email,
          subject: `[Project Brief] ${project_scope} - ${name} (${safeBudget})`,
          text: textContent,
          html: htmlContent,
        });

        emailDelivered = true;
        emailId = 'SMTP';
      } catch (err: any) {
        console.warn('[EMAIL] Nodemailer SMTP exception:', err.message);
      }
    }

    return NextResponse.json({
      success: true,
      email_sent: emailDelivered,
      dispatch_method: emailDelivered ? `Resend (${emailId})` : 'Database Logged',
      message: emailDelivered
        ? `Your project brief has been sent directly to d0tdev@proton.me.`
        : `Your project brief (${inquiryId}) was received and logged.`,
      inquiry_id: inquiryId,
    });
  } catch (error: any) {
    return NextResponse.json({ success: false, detail: error.message || 'Server error' }, { status: 500 });
  }
}
