"use client";

import React, { useState, useEffect } from 'react';
import Header from "@/components/landing/Header";
import Footer from "@/components/landing/Footer";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Toaster } from "@/components/ui/sonner";
import { CheckCircleIcon, CalendarIcon, ClockIcon, ArrowRightIcon, Trash2Icon, UserIcon, LockIcon } from "lucide-react";
import Link from "next/link";
import { useUser, SignInButton } from "@clerk/nextjs";

const timeSlots = [
  "09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", 
  "11:00 AM", "11:30 AM", "01:00 PM", "01:30 PM", 
  "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM"
];

const services = [
  "General Consultation",
  "Teeth Cleaning",
  "Whitening",
  "Emergency Pain",
  "Follow-up"
];

export default function BookAppointment() {
  const { isLoaded, isSignedIn, user } = useUser();
  const [isClient, setIsClient] = useState(false);
  const [activeAppointment, setActiveAppointment] = useState<any>(null);
  
  const [step, setStep] = useState(1);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("");
  const [service, setService] = useState<string>("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    notes: ""
  });

  // Hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load appointment specific to the logged-in user
  useEffect(() => {
    if (isLoaded && isSignedIn && user?.id) {
      const saved = localStorage.getItem(`dentwise_appointment_${user.id}`);
      if (saved) {
        setActiveAppointment(JSON.parse(saved));
      } else {
        setActiveAppointment(null);
      }
    }
  }, [isLoaded, isSignedIn, user?.id]);

  // Pre-fill user data when signed in
  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData(prev => ({
        ...prev,
        name: prev.name || user.fullName || "",
        email: user.primaryEmailAddress?.emailAddress || ""
      }));
    }
  }, [isLoaded, isSignedIn, user]);

  const handleNext = () => {
    if (step === 1 && !service) {
      toast.error("Please select a service first.");
      return;
    }
    if (step === 2 && (!date || !time)) {
      toast.error("Please select both a date and a time.");
      return;
    }
    setStep(step + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      toast.error("Please fill in your name and email.");
      return;
    }
    
    const appointmentData = {
      service,
      date: date?.toISOString(),
      time,
      patient: formData,
      userId: user?.id
    };
    
    const promise = fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        service,
        date: date?.toISOString(),
        time
      })
    }).then(async (res) => {
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to send email');
      return data;
    });

    toast.promise(promise, {
      loading: 'Booking appointment and sending confirmation email...',
      success: () => {
        localStorage.setItem(`dentwise_appointment_${user?.id}`, JSON.stringify(appointmentData));
        setActiveAppointment(appointmentData);
        return 'Appointment booked successfully!';
      },
      error: (err) => {
        // Fallback: save booking locally even if email fails (e.g., missing API key)
        localStorage.setItem(`dentwise_appointment_${user?.id}`, JSON.stringify(appointmentData));
        setActiveAppointment(appointmentData);
        return `Booked locally, but email failed: ${err.message}`;
      }
    });
  };

  const handleCancel = () => {
    localStorage.removeItem(`dentwise_appointment_${user?.id}`);
    setActiveAppointment(null);
    setStep(1);
    setDate(undefined);
    setTime("");
    setService("");
    toast.success("Appointment cancelled successfully.");
  };

  if (!isClient || !isLoaded) return null; // Avoid hydration mismatch and wait for Clerk to load

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 py-20 px-4 md:px-6 relative flex items-center justify-center min-h-[80vh]">
        {/* Background Gradients */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5 -z-10" />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl -z-10" />

        <div className="w-full max-w-4xl mx-auto mt-8">
          
          {!isSignedIn ? (
            // AUTHENTICATION REQUIRED STATE
            <Card className="max-w-md mx-auto border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl p-6 text-center animate-in fade-in zoom-in duration-500">
              <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <LockIcon className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-3xl font-bold mb-3">Sign In Required</h2>
              <p className="text-muted-foreground mb-8">
                You must be logged in with your email to book or manage an appointment with CareTooth.
              </p>
              <SignInButton mode="modal">
                <Button className="w-full" size="lg">
                  Log In to Continue
                </Button>
              </SignInButton>
            </Card>
          ) : activeAppointment ? (
            // EXISTING APPOINTMENT DASHBOARD
            <div className="max-w-xl mx-auto animate-in fade-in zoom-in duration-500">
              <Card className="border-primary/20 bg-card/80 backdrop-blur-xl shadow-2xl">
                <CardHeader className="text-center pb-6">
                  <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CalendarIcon className="w-10 h-10 text-primary" />
                  </div>
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                    Your Upcoming Appointment
                  </CardTitle>
                  <CardDescription className="text-base mt-2">
                    You have a confirmed booking with CareTooth.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="bg-muted/30 border border-border/50 rounded-2xl p-6 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-border/50 pb-4">
                      <span className="text-muted-foreground flex items-center gap-2"><UserIcon className="w-4 h-4"/> Patient</span>
                      <span className="font-semibold">{activeAppointment.patient.name}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-border/50 pb-4">
                      <span className="text-muted-foreground flex items-center gap-2"><CheckCircleIcon className="w-4 h-4"/> Service</span>
                      <span className="font-semibold text-primary">{activeAppointment.service}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 border-b border-border/50 pb-4">
                      <span className="text-muted-foreground flex items-center gap-2"><CalendarIcon className="w-4 h-4"/> Date</span>
                      <span className="font-semibold sm:text-right">{new Date(activeAppointment.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1 pb-2">
                      <span className="text-muted-foreground flex items-center gap-2"><ClockIcon className="w-4 h-4"/> Time</span>
                      <span className="font-semibold">{activeAppointment.time}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border/50 w-full">
                  <Link href="/" className="w-full sm:flex-1 block">
                    <Button variant="outline" className="w-full">
                      Back to Home
                    </Button>
                  </Link>
                  <Button variant="destructive" className="w-full sm:flex-1" onClick={handleCancel}>
                    <Trash2Icon className="w-4 h-4 mr-2" />
                    Cancel Appointment
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ) : (
            <Card className="border-border/50 bg-card/80 backdrop-blur-xl shadow-2xl animate-in fade-in duration-300">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                  Book Your Appointment
                </CardTitle>
                <CardDescription className="text-lg mt-2">
                  Step {step} of 3: {
                    step === 1 ? "Select Service" : 
                    step === 2 ? "Choose Date & Time" : 
                    "Your Details"
                  }
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* STEP 1: SERVICE */}
                {step === 1 && (
                  <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {services.map((s) => (
                      <div 
                        key={s}
                        onClick={() => setService(s)}
                        className={`p-6 rounded-2xl border-2 cursor-pointer transition-all duration-300 flex items-center justify-center text-center font-medium ${
                          service === s 
                            ? "border-primary bg-primary/10 text-primary shadow-lg scale-[1.02]" 
                            : "border-border/50 hover:border-primary/50 hover:bg-muted/50"
                        }`}
                      >
                        {s}
                      </div>
                    ))}
                  </div>
                )}

                {/* STEP 2: DATE & TIME */}
                {step === 2 && (
                  <div className="grid md:grid-cols-2 gap-12">
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <CalendarIcon className="w-5 h-5 text-primary" />
                        Select Date
                      </h3>
                      <div className="border border-border/50 rounded-2xl p-4 bg-background/50 inline-block">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          className="rounded-md"
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0)) || date.getDay() === 0 || date.getDay() === 6}
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h3 className="font-semibold text-lg flex items-center gap-2">
                        <ClockIcon className="w-5 h-5 text-primary" />
                        Select Time
                      </h3>
                      {date ? (
                        <div className="grid grid-cols-3 gap-3">
                          {timeSlots.map((t) => (
                            <div
                              key={t}
                              onClick={() => setTime(t)}
                              className={`p-3 rounded-xl border text-center text-sm cursor-pointer transition-all ${
                                time === t 
                                  ? "border-primary bg-primary/10 text-primary font-bold shadow-md"
                                  : "border-border/50 hover:border-primary/50"
                              }`}
                            >
                              {t}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground bg-muted/20 border border-dashed border-border/50 rounded-2xl p-8 text-center">
                          Please select a date first to see available time slots.
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: DETAILS */}
                {step === 3 && (
                  <form id="booking-form" onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
                    <div className="bg-primary/5 border border-primary/20 rounded-2xl p-6 mb-8 flex flex-wrap gap-6 justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Service</p>
                        <p className="font-semibold">{service}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">Date & Time</p>
                        <p className="font-semibold">
                          {date?.toLocaleDateString()} at {time}
                        </p>
                      </div>
                      <Button type="button" variant="outline" size="sm" onClick={() => setStep(1)}>Edit</Button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="name">Full Name *</Label>
                        <Input 
                          id="name" 
                          required 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe"
                          className="bg-background"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input 
                          id="email" 
                          type="email" 
                          required 
                          disabled
                          value={formData.email}
                          title="Your email is tied to your account"
                          className="bg-muted/50 text-muted-foreground cursor-not-allowed"
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                          You must use your authenticated email to book.
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="(555) 123-4567"
                        className="bg-background"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="notes">Additional Notes / Symptoms</Label>
                      <Textarea 
                        id="notes" 
                        rows={4}
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="Tell us what you need help with..."
                        className="bg-background resize-none"
                      />
                    </div>
                  </form>
                )}
              </CardContent>
              <CardFooter className="flex justify-between border-t border-border/50 pt-6">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={() => setStep(step - 1)}>
                    Back
                  </Button>
                ) : (
                  <div></div>
                )}
                
                {step < 3 ? (
                  <Button type="button" onClick={handleNext} className="px-8">
                    Next Step
                    <ArrowRightIcon className="ml-2 w-4 h-4" />
                  </Button>
                ) : (
                  <Button type="submit" form="booking-form" className="px-8 bg-primary hover:bg-primary/90 text-primary-foreground">
                    Confirm Booking
                  </Button>
                )}
              </CardFooter>
            </Card>
          )}
        </div>
      </main>
      
      <Footer />
      <Toaster />
    </div>
  );
}
