import nodemailer from "nodemailer";

const GMAIL_USER = process.env.GMAIL_USER;
const GMAIL_APP_PASSWORD = process.env.GMAIL_APP_PASSWORD;

function getTransporter() {
  if (!GMAIL_USER || !GMAIL_APP_PASSWORD) {
    throw new Error("Missing GMAIL_USER or GMAIL_APP_PASSWORD env vars");
  }
  return nodemailer.createTransport({
    service: "gmail",
    auth: { user: GMAIL_USER, pass: GMAIL_APP_PASSWORD },
  });
}

export async function sendThankYouEmail(name: string, toEmail: string) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Kushagra Aggarwal" <${GMAIL_USER}>`,
    to: toEmail,
    subject: "Thanks for reaching out!",
    text: `Hi ${name},\n\nThanks for getting in touch — I've received your message and will get back to you soon.\n\nTalk soon,\nKushagra`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif; max-width: 480px; color: #1a1a1a;">
        <p>Hi ${escapeHtml(name)},</p>
        <p>Thanks for getting in touch — I've received your message and will get back to you soon.</p>
        <p>Talk soon,<br/>Kushagra</p>
      </div>
    `,
  });
}

export async function sendNotificationEmail(name: string, fromEmail: string, message: string) {
  const transporter = getTransporter();
  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${GMAIL_USER}>`,
    to: GMAIL_USER,
    replyTo: fromEmail,
    subject: `New contact form message from ${name}`,
    text: `Name: ${name}\nEmail: ${fromEmail}\n\nMessage:\n${message}`,
    html: `
      <div style="font-family: -apple-system, Segoe UI, Roboto, sans-serif;">
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(fromEmail)}</p>
        <p><strong>Message:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br/>")}</p>
      </div>
    `,
  });
}

function escapeHtml(str: string) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
