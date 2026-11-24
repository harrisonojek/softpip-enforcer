import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json().catch(() => ({}));
    const { email, whatsapp, telegram } = body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const hasValidEmail = typeof email === "string" && emailRegex.test(email.trim());
    const hasContact = hasValidEmail || (typeof whatsapp === "string" && whatsapp.trim().length >= 7) || (typeof telegram === "string" && telegram.trim().length >= 3);

    if (!hasContact) {
      return NextResponse.json(
        { success: false, message: "Please provide a valid email or contact handle." },
        { status: 400 }
      );
    }

    // Set unlocking cookie
    const response = NextResponse.json({
      success: true,
      message: "Access granted to complete autopsy.",
    });

    response.cookies.set({
      name: "softpip_unlocked",
      value: "1",
      path: "/",
      maxAge: 60 * 60 * 24 * 365, // 1 year
      sameSite: "lax",
      httpOnly: false, // Accessible to client router refresh
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, message: "Internal server error." },
      { status: 500 }
    );
  }
}
