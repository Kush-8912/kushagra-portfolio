import { NextRequest, NextResponse } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase";
import { sendNotificationEmail, sendThankYouEmail } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_NAME = 100;
const MAX_MESSAGE = 2000;

export async function POST(req: NextRequest) {
  let body: { name?: unknown; email?: unknown; message?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "Name, email, and message are required" }, { status: 400 });
  }
  if (name.length > MAX_NAME || message.length > MAX_MESSAGE) {
    return NextResponse.json({ error: "Name or message is too long" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseServerClient();
    const { error } = await supabase.from("contact_messages").insert({ name, email, message });
    if (error) throw error;
  } catch (err) {
    console.error("Failed to store contact message:", err);
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  try {
    await Promise.all([
      sendThankYouEmail(name, email),
      sendNotificationEmail(name, email, message),
    ]);
  } catch (err) {
    console.error("Message was saved but email sending failed:", err);
  }

  return NextResponse.json({ ok: true });
}
