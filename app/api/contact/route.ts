import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const attempts = new Map<string, { count: number; resetAt: number }>();

function clean(value: unknown, max: number) {
  return typeof value === "string"
    ? value.replace(/\0/g, "").trim().slice(0, max)
    : "";
}

function escapeHtml(value: string) {
  return value.replace(
    /[&<>'"]/g,
    (character) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[
        character
      ] ?? character,
  );
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const current = attempts.get(ip);
  if (!current || current.resetAt < now) {
    attempts.set(ip, { count: 1, resetAt: now + 60 * 60 * 1000 });
    return false;
  }
  current.count += 1;
  attempts.set(ip, current);
  return current.count > 5;
}

export async function POST(request: NextRequest) {
  try {
    const declaredLength = Number(request.headers.get("content-length") || 0);
    if (declaredLength > 12_000)
      return NextResponse.json(
        { error: "The message is too large." },
        { status: 413 },
      );

    const origin = request.headers.get("origin");
    const expectedOrigin = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
    const requestOrigin = `${request.nextUrl.protocol}//${request.nextUrl.host}`;
    if (
      origin &&
      origin !== requestOrigin &&
      (!expectedOrigin || origin !== expectedOrigin)
    ) {
      return NextResponse.json(
        { error: "This request origin is not allowed." },
        { status: 403 },
      );
    }

    const ip =
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (isRateLimited(ip))
      return NextResponse.json(
        { error: "Too many messages. Please try again later." },
        { status: 429 },
      );

    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return NextResponse.json({ error: "Unsupported request format." }, { status: 415 });
    }

    const body = await request.json();
    if (clean(body.website, 100)) return NextResponse.json({ ok: true });

    const name = clean(body.name, 100);
    const email = clean(body.email, 160).toLowerCase();
    const subject = clean(body.subject, 180).replace(/[\r\n]+/g, " ");
    const message = clean(body.message, 5000);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !emailPattern.test(email) || !subject || message.length < 10) {
      return NextResponse.json(
        {
          error:
            "Please complete every field with a valid email and a message of at least 10 characters.",
        },
        { status: 400 },
      );
    }

    const host = process.env.SMTP_HOST;
    const user = process.env.SMTP_USER;
    const password = process.env.SMTP_PASSWORD;
    const to = process.env.CONTACT_TO_EMAIL || "sawa.seido08@gmail.com";
    if (!host || !user || !password) {
      return NextResponse.json(
        {
          error:
            "Email delivery is not configured yet. Please use the direct email link.",
        },
        { status: 503 },
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port: Number(process.env.SMTP_PORT || 465),
      secure: process.env.SMTP_SECURE !== "false",
      auth: { user, pass: password },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 20_000,
    });

    await transporter.sendMail({
      from: `Tahseen Portfolio <${process.env.CONTACT_FROM_EMAIL || user}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New portfolio enquiry\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
      html: `<div style="font-family:Arial,sans-serif;line-height:1.65;color:#172238"><h2>New portfolio enquiry</h2><p><strong>Name:</strong> ${escapeHtml(name)}</p><p><strong>Email:</strong> ${escapeHtml(email)}</p><p><strong>Subject:</strong> ${escapeHtml(subject)}</p><hr><p>${escapeHtml(message).replace(/\n/g, "<br>")}</p></div>`,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Portfolio contact error", error);
    return NextResponse.json(
      {
        error:
          "The message could not be delivered. Please try again or email me directly.",
      },
      { status: 500 },
    );
  }
}
