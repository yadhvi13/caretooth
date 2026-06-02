"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@clerk/nextjs';
import { Card } from "@/components/ui/card";
import { UserIcon, StethoscopeIcon, Loader2Icon } from "lucide-react";
import Image from 'next/image';
import { setRole } from '@/app/actions';

export default function Onboarding() {
  const { user, isLoaded } = useUser();
  const router = useRouter();
  const [loadingRole, setLoadingRole] = useState<string | null>(null);

  // If already onboarded, maybe redirect? For now, just let them re-select if they happen to visit.

  const selectRole = async (role: 'patient' | 'dentist') => {
    setLoadingRole(role);
    try {
      const res = await setRole(role);

      if (res.success) {
        // Force Clerk session token reload to get new metadata in session claims
        await user?.reload();
        
        if (role === 'dentist') {
          router.push('/dentist');
        } else {
          router.push('/dashboard');
        }
      }
    } catch (err) {
      console.error('Failed to set role', err);
      setLoadingRole(null);
    }
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-muted/20">
        <Loader2Icon className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-muted/10 to-primary/5 p-6">
      
      <div className="mb-12 flex flex-col items-center">
        <Image src="/logo.png" alt="Logo" width={48} height={48} className="mb-4" />
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-center">Welcome to CareTooth</h1>
        <p className="text-muted-foreground mt-2 text-center max-w-md">
          To get started, please tell us how you plan to use our platform.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6 max-w-4xl w-full">
        
        {/* Patient Selection */}
        <Card 
          onClick={() => !loadingRole && selectRole('patient')}
          className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-2 hover:border-primary group ${loadingRole === 'patient' ? 'border-primary ring-4 ring-primary/20 scale-[1.02]' : 'border-border/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2'}`}
        >
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${loadingRole === 'patient' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
              {loadingRole === 'patient' ? (
                <Loader2Icon className="w-10 h-10 animate-spin" />
              ) : (
                <UserIcon className="w-10 h-10" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">I am a Patient</h2>
              <p className="text-muted-foreground">
                Book appointments, track your dental health, check treatment costs, and consult AI.
              </p>
            </div>
          </div>
        </Card>

        {/* Dentist Selection */}
        <Card 
          onClick={() => !loadingRole && selectRole('dentist')}
          className={`relative overflow-hidden cursor-pointer transition-all duration-300 border-2 hover:border-primary group ${loadingRole === 'dentist' ? 'border-primary ring-4 ring-primary/20 scale-[1.02]' : 'border-border/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2'}`}
        >
          <div className="p-8 md:p-12 text-center space-y-6">
            <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center transition-colors ${loadingRole === 'dentist' ? 'bg-primary text-primary-foreground' : 'bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground'}`}>
              {loadingRole === 'dentist' ? (
                <Loader2Icon className="w-10 h-10 animate-spin" />
              ) : (
                <StethoscopeIcon className="w-10 h-10" />
              )}
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">I am a Dentist</h2>
              <p className="text-muted-foreground">
                Manage your patient queue, write e-prescriptions, and view clinic analytics.
              </p>
            </div>
          </div>
        </Card>

      </div>
    </div>
  );
}
