import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { resend } from '@/lib/email';
import WelcomeCard from '@/emails/welcome-card';

export const runtime = 'nodejs';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { name, email, book } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const existing = await prisma.invitationRequest.findUnique({
      where: { email },
    });

    if (existing) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    const invite = await prisma.invitationRequest.create({
      data: {
        name,
        email,
        book,
      },
    });

    await resend.emails.send({
      from: 'Asterix Editions <onboarding@resend.dev>',
      to: email,
      subject: 'Your card is reserved — Asterix Editions',
      html: WelcomeCard({ name, book }),
    });

    return NextResponse.json({
      success: true,
      invite,
    });
  } catch (error) {
    console.error('Failed to create invitation request', error);

    return NextResponse.json(
      { error: 'Something went wrong' },
      { status: 500 }
    );
  }
}
