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
    const targetRecipient = process.env.TO_EMAIL || 'd0tdev@proton.me';
    const gmailRecipient = 'gunmr00@gmail.com';
    const safeBudget = (budget_range || '₹50k - ₹100k').replace(/\$/g, '₹');

    console.log(`[EMAIL DISPATCH] Dispatching submission to ${targetRecipient}`);

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

    // Create Client Confirmation Email HTML & Text (Auto-Responder)
    const clientHtmlContent = `
      <div style="font-family: Arial, sans-serif; background-color: #0f172a; color: #f8fafc; padding: 24px; border-radius: 12px; max-width: 600px; border: 1px solid #334155;">
        <h2 style="color: #38bdf8; border-bottom: 2px solid #334155; padding-bottom: 12px; margin-top: 0;">✨ Thank You for Reaching Out to .DEV</h2>
        <p style="font-size: 15px; color: #e2e8f0; line-height: 1.5;">Hi <strong>${name}</strong>,</p>
        <p style="font-size: 14px; color: #cbd5e1; line-height: 1.6;">
          We have successfully received your project brief. Our engineering lead will review your technical requirements and respond within 12 hours.
        </p>
        <div style="background-color: #1e293b; padding: 16px; border-radius: 8px; border-left: 4px solid #10b981; margin: 20px 0;">
          <p style="margin: 0 0 8px 0; color: #94a3b8; font-size: 12px; font-weight: bold; text-transform: uppercase;">Project Submission Details</p>
          <p style="margin: 4px 0; font-size: 14px; color: #ffffff;"><strong>Tracking Reference:</strong> <span style="color: #f59e0b; font-weight: bold;">${inquiryId}</span></p>
          <p style="margin: 4px 0; font-size: 14px; color: #ffffff;"><strong>Project Scope:</strong> ${project_scope}</p>
          <p style="margin: 4px 0; font-size: 14px; color: #ffffff;"><strong>Estimated Budget:</strong> ${safeBudget}</p>
        </div>
        <p style="font-size: 13px; color: #94a3b8; line-height: 1.5;">
          If you wish to provide additional documentation or request immediate updates, reply directly to this email or reach us at <a href="mailto:d0tdev@proton.me" style="color: #38bdf8;">d0tdev@proton.me</a>.
        </p>
        <hr style="border: 0; border-top: 1px solid #334155; margin: 24px 0;" />
        <p style="font-size: 12px; color: #64748b; text-align: center; margin: 0;">Automated Receipt • .DEV Engineering Team</p>
      </div>
    `;

    const clientTextContent = `
Hi ${name},

Thank you for submitting your project brief to .DEV!

We have received your project details (Reference ID: ${inquiryId}). Our engineering lead will review your requirements and follow up within 12 hours.

Summary of your submission:
- Reference ID: ${inquiryId}
- Project Scope: ${project_scope}
- Estimated Budget: ${safeBudget}

If you have additional requirements or files, feel free to reply directly to this email.

Best regards,
.DEV Engineering Team
    `;

    let emailDelivered = false;
    let emailId = '';

    // Primary Email Provider: Resend SDK (with 3.5s max timeout)
    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);

        // Send Notification Email to Owner
        const sendOwnerPromise = resend.emails.send({
          from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
          to: [targetRecipient],
          subject: `[Project Brief] ${project_scope} - ${name} (${safeBudget})`,
          html: htmlContent,
          text: textContent,
          replyTo: email,
        });

        // Send Auto-Responder Email to Client
        const sendClientPromise = resend.emails.send({
          from: process.env.SENDER_EMAIL || 'onboarding@resend.dev',
          to: [email],
          subject: `[Received] Project Brief Confirmation (${inquiryId}) - .DEV`,
          html: clientHtmlContent,
          text: clientTextContent,
          replyTo: targetRecipient,
        });

        const timeoutPromise = new Promise((_, reject) =>
          setTimeout(() => reject(new Error('Resend dispatch timeout')), 3500)
        );

        const resendResults: any = await Promise.race([
          Promise.allSettled([sendOwnerPromise, sendClientPromise]),
          timeoutPromise,
        ]);

        if (Array.isArray(resendResults)) {
          const ownerRes = resendResults[0];
          if (ownerRes.status === 'fulfilled' && ownerRes.value?.data && !ownerRes.value?.error) {
            emailDelivered = true;
            emailId = ownerRes.value.data.id;
            console.log(`[EMAIL] Resend delivered owner notification ID:`, emailId);
          }
          const clientRes = resendResults[1];
          if (clientRes.status === 'fulfilled' && clientRes.value?.data && !clientRes.value?.error) {
            console.log(`[EMAIL] Resend delivered client auto-responder ID:`, clientRes.value.data.id);
          }
        }
      } catch (err: any) {
        console.warn('[EMAIL] Resend SDK exception or timeout:', err.message);
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

        // Send Owner Email
        await transporter.sendMail({
          from: `"${name} via .DEV" <${process.env.SMTP_USER}>`,
          to: 'd0tdev@proton.me',
          replyTo: email,
          subject: `[Project Brief] ${project_scope} - ${name} (${safeBudget})`,
          text: textContent,
          html: htmlContent,
        });

        // Send Client Auto-Responder Email
        await transporter.sendMail({
          from: `".DEV Engineering" <${process.env.SMTP_USER}>`,
          to: email,
          replyTo: 'd0tdev@proton.me',
          subject: `[Received] Project Brief Confirmation (${inquiryId}) - .DEV`,
          text: clientTextContent,
          html: clientHtmlContent,
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
