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
  honeypot?: string;
};

const APEX_HOST = new URL(siteConfig.url).hostname;

// Rate limiting in-memory (per edge worker isolate)
const rateLimitMap = new Map<string, { count: number; resetAt: number }>();

function isRateLimited(ip: string, maxRequests = 5, windowMs = 5 * 60 * 1000): boolean {
  const now = Date.now();

  // Periodically purge expired entries if map grows
  if (rateLimitMap.size > 2000) {
    for (const [key, val] of rateLimitMap.entries()) {
      if (val.resetAt < now) {
        rateLimitMap.delete(key);
      }
    }
  }

  const entry = rateLimitMap.get(ip);
  if (!entry || entry.resetAt < now) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + windowMs });
    return false;
  }

  if (entry.count >= maxRequests) {
    return true;
  }

  entry.count += 1;
  return false;
}

function cleanHeader(value: string): string {
  // Strip carriage returns, newlines, and non-printable control characters
  return value.replace(/[\r\n\x00-\x1F\x7F]/g, " ").trim();
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function json(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "cache-control": "no-store",
      "content-type": "application/json; charset=utf-8",
    },
  });
}

function addSecurityHeaders(response: Response): Response {
  const headers = new Headers(response.headers);

  // Prevent clickjacking
  headers.set("X-Frame-Options", "DENY");
  // Prevent MIME-sniffing
  headers.set("X-Content-Type-Options", "nosniff");
  // Referrer Policy
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  // Permissions Policy
  headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), browsing-topics=()");
  // HSTS (HTTP Strict Transport Security)
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  // Cross-Origin Resource Policy
  headers.set("Cross-Origin-Resource-Policy", "same-origin");

  // Content-Security-Policy
  // 'unsafe-inline' and 'unsafe-eval' for Next.js hydration and Three.js canvas/shaders
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: https: blob:",
    "connect-src 'self' https://wa.me",
    "frame-ancestors 'none'",
    "base-uri 'self'",
    "form-action 'self' https://wa.me",
  ].join("; ");

  headers.set("Content-Security-Policy", csp);

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

async function handleContact(request: Request, env: Env) {
  if (request.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  // Origin check (CSRF / cross-site protection)
  const origin = request.headers.get("origin");
  if (origin) {
    try {
      const originHost = new URL(origin).hostname;
      const isAllowed =
        originHost === APEX_HOST ||
        originHost === `www.${APEX_HOST}` ||
        originHost === "localhost" ||
        originHost === "127.0.0.1";

      if (!isAllowed) {
        return json({ error: "Forbidden origin" }, 403);
      }
    } catch {
      return json({ error: "Invalid origin" }, 400);
    }
  }

  // Client IP rate limiting (max 5 requests per 5 minutes per IP)
  const clientIp = request.headers.get("cf-connecting-ip") || "unknown";
  if (isRateLimited(clientIp, 5, 5 * 60 * 1000)) {
    return json({ error: "Too many requests. Please try again later." }, 429);
  }

  try {
    const body = (await request.json()) as ContactBody;

    // Honeypot check: silently succeed if bot filled the hidden trap field
    if (body.honeypot && body.honeypot.trim() !== "") {
      return json({ ok: true });
    }

    const name = cleanHeader(body.name ?? "");
    const email = cleanHeader(body.email ?? "");
    const message = body.message?.trim() ?? "";

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
    const from = env.CONTACT_FROM_EMAIL ?? siteConfig.mailFrom;

    const adminText = [
      `Nuovo messaggio dal portfolio DevLeonardis:`,
      `-----------------------------------------`,
      `Nome: ${name}`,
      `Email: ${email}`,
      `Data: ${new Date().toISOString()}`,
      `IP: ${clientIp}`,
      ``,
      `Messaggio:`,
      message,
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
      // Send ONLY to the site owner.
      // Do not send automated unauthenticated confirmation emails to user-supplied
      // addresses to prevent open-relay / confirmation bombing / spam abuse.
      await mailer.send({
        from: { name: siteConfig.name, email: from },
        to,
        reply: email,
        subject: `Nuovo contatto portfolio - ${name.slice(0, 80)}`,
        text: adminText,
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
      const response = await handleContact(request, env);
      return addSecurityHeaders(response);
    }

    const assetResponse = await env.ASSETS.fetch(request);
    return addSecurityHeaders(assetResponse);
  },
} satisfies ExportedHandler<Env>;
