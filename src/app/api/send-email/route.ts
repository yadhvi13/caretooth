import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export async function POST(req: Request) {
  try {
    // Initialize Resend inside the handler
    const resend = new Resend(process.env.RESEND_API_KEY);
    if (!process.env.RESEND_API_KEY) {
      return NextResponse.json(
        { error: 'RESEND_API_KEY is not set in environment variables.' },
        { status: 500 }
      );
    }

    const body = await req.json();
    const { name, email, service, date, time } = body;

    if (!name || !email || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const formattedDate = new Date(date).toLocaleDateString(undefined, { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });

    const data = await resend.emails.send({
      // The 'from' email must be verified in your Resend account, 
      // or you can use the default testing domain provided by Resend (e.g. Acme <onboarding@resend.dev>)
      from: 'CareTooth <onboarding@resend.dev>',
      to: email, // Resend free tier only allows sending to the email registered with your Resend account!
      subject: 'Your CareTooth Appointment Confirmation',
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #eee; border-radius: 8px; overflow: hidden;">
          <div style="background-color: #e78a53; padding: 20px; text-align: center; color: white;">
            <h1 style="margin: 0; font-size: 24px;">CareTooth</h1>
            <p style="margin: 5px 0 0; opacity: 0.9;">Appointment Confirmed</p>
          </div>
          <div style="padding: 30px;">
            <p style="font-size: 16px;">Hi <strong>${name}</strong>,</p>
            <p style="font-size: 16px;">Your appointment has been successfully booked. Here are your details:</p>
            
            <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Service</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right; color: #e78a53;">${service}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; color: #666;">Date</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; font-weight: bold; text-align: right;">${formattedDate}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #666;">Time</td>
                <td style="padding: 10px 0; font-weight: bold; text-align: right;">${time}</td>
              </tr>
            </table>

            <p style="margin-top: 30px; font-size: 14px; color: #888;">
              If you need to reschedule or cancel, please log in to your account and manage your appointments from the dashboard.
            </p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
