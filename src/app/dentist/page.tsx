"use client"
import React from 'react';
import { Card } from "@/components/ui/card";
import { UserButton } from '@clerk/nextjs';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon } from 'lucide-react';

export default function DentistComingSoon() {
  return (
    <div className="min-h-screen bg-slate-900 text-white flex flex-col items-center justify-center p-6">
      <div className="absolute top-6 right-6">
        <UserButton />
      </div>
      <Card className="max-w-md w-full bg-slate-800 border-slate-700 p-8 text-center shadow-2xl">
        <h1 className="text-3xl font-bold mb-4 text-white">Dentist Portal</h1>
        <p className="text-slate-400 mb-8">
          The professional clinician dashboard has been disabled during this preview phase while we upgrade our infrastructure.
        </p>
        <Link href="/">
          <Button variant="outline" className="text-slate-900 border-slate-700 bg-slate-100 hover:bg-white w-full">
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Return to Home
          </Button>
        </Link>
      </Card>
    </div>
  );
}
