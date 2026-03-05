import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

import { siteConfig } from "@/lib/site";

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  locale?: "it" | "en";
};

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const locale = body.locale === "en" ? "en" : "it";

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "Invalid email" }, { status: 400 });
    }

    const host = process.env.SMTP_HOST?.trim();
    const port = Number(process.env.SMTP_PORT ?? 587);
    const user = process.env.SMTP_USER?.trim();
    const pass = process.env.SMTP_PASS?.replace(/\s+/g, "");

    if (!host || !user || !pass) {
      return NextResponse.json({ error: "SMTP is not configured" }, { status: 500 });
    }

    const to = process.env.CONTACT_TO_EMAIL ?? siteConfig.email;
    const fromRequested = process.env.CONTACT_FROM_EMAIL ?? siteConfig.mailFrom;
    const isGmailSmtp = host.includes("gmail.com");
    // Gmail SMTP usually rejects unverified aliases. Fallback keeps delivery reliable.
    const from = isGmailSmtp ? user : fromRequested;

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const adminSubject = `Nuovo contatto portfolio - ${name}`;
    const adminText = [
      `Nome: ${name}`,
      `Email: ${email}`,
      "",
      "Messaggio:",
      message,
    ].join("\n");

    const userSubject =
      locale === "it"
        ? "Mail inviata con successo"
        : "Message sent successfully";

    const userText =
      locale === "it"
        ? [
            `Ciao ${name},`,
            "",
            "la tua mail è stata inviata con successo.",
            "Ti risponderò il prima possibile.",
            "",
            "Grazie,",
            "Simone De Leonardis",
          ].join("\n")
        : [
            `Hi ${name},`,
            "",
            "your message was sent successfully.",
            "I'll get back to you as soon as possible.",
            "",
            "Thanks,",
            "Simone De Leonardis",
          ].join("\n");

    await Promise.all([
      transporter.sendMail({
        from,
        sender: user,
        to,
        headers: from !== fromRequested ? { "X-Requested-From": fromRequested } : undefined,
        replyTo: email,
        subject: adminSubject,
        text: adminText,
      }),
      transporter.sendMail({
        from,
        sender: user,
        to: email,
        replyTo: to,
        headers: from !== fromRequested ? { "X-Requested-From": fromRequested } : undefined,
        subject: userSubject,
        text: userText,
      }),
    ]);

    return NextResponse.json({ ok: true });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/contact] sendMail failed:", message);
    return NextResponse.json({ error: "Unable to send email" }, { status: 500 });
  }
}
