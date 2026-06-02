import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const { userId } = await auth();
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    const body = await req.json();
    const { role } = body;
    
    if (role !== 'patient' && role !== 'dentist') {
      return NextResponse.json({ error: 'Invalid role' }, { status: 400 });
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: {
        role: role
      }
    });

    return NextResponse.json({ success: true, role });
  } catch (error) {
    console.error('Error setting role:', error);
    return NextResponse.json({ error: 'Error setting role' }, { status: 500 });
  }
}
