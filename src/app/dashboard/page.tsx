"use client";

import React, { useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ClockIcon, UserIcon, Trash2Icon, PlusIcon } from "lucide-react";
import Link from 'next/link';
import { toast } from 'sonner';

export default function DashboardAppointments() {
  const { user } = useUser();
  const [activeAppointment, setActiveAppointment] = useState<any>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    if (user?.id) {
      const saved = localStorage.getItem(`dentwise_appointment_${user.id}`);
      if (saved) {
        setActiveAppointment(JSON.parse(saved));
      }
    }
  }, [user?.id]);

  const handleCancel = () => {
    if (user?.id) {
      localStorage.removeItem(`dentwise_appointment_${user.id}`);
      setActiveAppointment(null);
      toast.success("Appointment cancelled successfully.");
    }
  };

  if (!isClient) return null;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Appointments</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2">Manage your upcoming dental visits and history.</p>
      </div>

      {activeAppointment ? (
        <div className="grid gap-6 md:grid-cols-2">
          <Card className="border-primary/20 shadow-md">
            <CardHeader className="bg-primary/5 rounded-t-xl border-b border-border/50 pb-6">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg md:text-xl flex items-center gap-2">
                  <CalendarIcon className="w-5 h-5 text-primary" />
                  Upcoming Visit
                </CardTitle>
                <span className="bg-primary/20 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                  Confirmed
                </span>
              </div>
              <CardDescription className="pt-2">Your next scheduled appointment with CareTooth.</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-4">
              <div className="flex flex-col gap-1 border-b border-border/50 pb-4">
                <span className="text-xs md:text-sm text-muted-foreground">Service</span>
                <span className="font-semibold text-base md:text-lg">{activeAppointment.service}</span>
              </div>
              
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-sm text-muted-foreground flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> Date</span>
                  <span className="font-medium">{new Date(activeAppointment.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex flex-col gap-1 text-right">
                  <span className="text-sm text-muted-foreground flex items-center gap-2 justify-end"><ClockIcon className="w-4 h-4"/> Time</span>
                  <span className="font-medium">{activeAppointment.time}</span>
                </div>
              </div>

              <div className="flex flex-col gap-1 pt-2">
                <span className="text-sm text-muted-foreground flex items-center gap-2"><UserIcon className="w-4 h-4"/> Patient Name</span>
                <span className="font-medium">{activeAppointment.patient.name}</span>
              </div>
            </CardContent>
            <CardFooter className="bg-muted/30 border-t border-border/50 rounded-b-xl flex gap-3 pt-6">
              <Button variant="outline" className="flex-1" onClick={() => toast.info("Rescheduling is coming soon!")}>
                Reschedule
              </Button>
              <Button variant="destructive" className="flex-1" onClick={handleCancel}>
                <Trash2Icon className="w-4 h-4 mr-2" />
                Cancel
              </Button>
            </CardFooter>
          </Card>

          {/* Placeholders for future features */}
          <Card className="border-border/50 bg-muted/10 opacity-70">
            <CardHeader>
              <CardTitle className="text-lg">Past Appointments</CardTitle>
              <CardDescription>History of your visits</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-4">
                <CalendarIcon className="w-6 h-6 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">No past appointments found.</p>
            </CardContent>
          </Card>
        </div>
      ) : (
        <Card className="border-border/50 text-center py-16 px-4 bg-muted/10">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CalendarIcon className="w-10 h-10 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3">No Upcoming Appointments</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            You don't have any appointments scheduled. Book a visit to get started with your dental care journey.
          </p>
          <Link href="/book">
            <Button size="lg" className="rounded-full px-8">
              <PlusIcon className="w-5 h-5 mr-2" />
              Book New Appointment
            </Button>
          </Link>
        </Card>
      )}
    </div>
  );
}
