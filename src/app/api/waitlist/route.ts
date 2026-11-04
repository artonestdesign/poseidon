import { NextResponse } from "next/server";

type WaitlistBody = {
  email?: string;
  source?: string;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as WaitlistBody;
    const email = String(body.email || "")
      .trim()
      .toLowerCase();
    const source = String(body.source || "website").trim() || "website";

    if (!EMAIL_RE.test(email)) {
      return NextResponse.json(
        { ok: false, error: "Please enter a valid work email." },
        { status: 400 },
      );
    }

    const endpoint = process.env.GOOGLE_SHEETS_WEBAPP_URL;

    if (!endpoint) {
      console.error("Missing GOOGLE_SHEETS_WEBAPP_URL");
      return NextResponse.json(
        {
          ok: false,
          error:
            "Waitlist storage is not configured yet. Add GOOGLE_SHEETS_WEBAPP_URL.",
        },
        { status: 503 },
      );
    }

    const upstream = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, source }),
      redirect: "follow",
      cache: "no-store",
    });

    const text = await upstream.text();
    let payload: { ok?: boolean; duplicate?: boolean; error?: string } = {};

    try {
      payload = JSON.parse(text) as typeof payload;
    } catch {
      // Apps Script sometimes returns HTML on misconfigured deploy
      console.error("Google Sheets response was not JSON:", text.slice(0, 200));
      return NextResponse.json(
        { ok: false, error: "Could not save to Google Sheet. Check the web app deploy." },
        { status: 502 },
      );
    }

    if (!upstream.ok || payload.ok === false) {
      return NextResponse.json(
        {
          ok: false,
          error: payload.error || "Could not join the waitlist. Try again.",
        },
        { status: 502 },
      );
    }

    return NextResponse.json({
      ok: true,
      duplicate: Boolean(payload.duplicate),
    });
  } catch (error) {
    console.error("Waitlist API error:", error);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
