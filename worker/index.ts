import { WorkerMailer } from "worker-mailer";

import { siteConfig } from "@/lib/site";

interface Env {
  ASSETS: Fetcher;
  SMTP_HOST?: string;
  SMTP_PORT?: string;
  SMTP_USER?: string;
  SMTP_PASS?: string;
  CONTACT_FROM_EMAIL?: string;
  CONTACT_TO_EMAIL?: string;
}

type ContactBody = {
  name?: string;
  email?: string;
  message?: string;
  locale?: "it" | "en";
};

const APEX_HOST = new URL(siteConfig.url).hostname;

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "cache-control": "no-store" } });
}

async function handleContact(request: Request, env: Env) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    const body = (await request.json()) as ContactBody;
    const name = body.name?.trim() ?? "";
    const email = body.email?.trim() ?? "";
    const message = body.message?.trim() ?? "";
    const locale = body.locale === "en" ? "en" : "it";

    if (!name || !email || !message) {
      return json({ error: "Missing required fields" }, 400);
    }

    if (!isValidEmail(email) || name.length > 200 || message.length > 5000) {
      return json({ error: "Invalid input" }, 400);
    }

    const host = env.SMTP_HOST?.trim();
    const port = Number(env.SMTP_PORT ?? 587);
    const user = env.SMTP_USER?.trim();
    const pass = env.SMTP_PASS?.replace(/\s+/g, "");

    if (!host || !user || !pass) {
      return json({ error: "SMTP is not configured" }, 500);
    }

    const to = env.CONTACT_TO_EMAIL ?? siteConfig.email;
    const fromRequested = env.CONTACT_FROM_EMAIL ?? siteConfig.mailFrom;
    // Gmail SMTP usually rejects unverified aliases. Fallback keeps delivery reliable.
    const from = host.includes("gmail.com") ? user : fromRequested;
    const headers = from !== fromRequested ? { "X-Requested-From": fromRequested } : undefined;

    const adminText = [`Nome: ${name}`, `Email: ${email}`, "", "Messaggio:", message].join("\n");

    const userSubject = locale === "it" ? "Mail inviata con successo" : "Message sent successfully";
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

    const mailer = await WorkerMailer.connect({
      host,
      port,
      secure: port === 465,
      startTls: port !== 465,
      credentials: { username: user, password: pass },
      authType: ["plain", "login"],
    });

    try {
      await mailer.send({
        from: { name: siteConfig.name, email: from },
        to,
        reply: email,
        subject: `Nuovo contatto portfolio - ${name}`,
        text: adminText,
        headers,
      });
      await mailer.send({
        from: { name: siteConfig.fullName, email: from },
        to: email,
        reply: to,
        subject: userSubject,
        text: userText,
        headers,
      });
    } finally {
      await mailer.close();
    }

    return json({ ok: true });
  } catch (error) {
    const reason = error instanceof Error ? error.message : "Unknown error";
    console.error("[/api/contact] send failed:", reason);
    return json({ error: "Unable to send email" }, 500);
  }
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.hostname === `www.${APEX_HOST}`) {
      url.hostname = APEX_HOST;
      return Response.redirect(url.toString(), 308);
    }

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
