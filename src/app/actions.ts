"use server"

import { auth, clerkClient } from '@clerk/nextjs/server';

export async function setRole(role: string) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      throw new Error('Unauthorized');
    }
    
    if (role !== 'patient' && role !== 'dentist') {
      throw new Error('Invalid role');
    }

    const client = await clerkClient();
    await client.users.updateUserMetadata(userId, {
      publicMetadata: { role }
    });

    return { success: true, role };
  } catch (error) {
    console.error("Error in setRole action:", error);
    throw error;
  }
}
