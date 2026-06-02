"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ActivityIcon, TrophyIcon, StarIcon, CheckCircle2Icon, FlameIcon, BellRingIcon, SmartphoneIcon } from "lucide-react";
import { toast } from "sonner";

// Generate last 7 days
const today = new Date();
const last7Days = Array.from({ length: 7 }).map((_, i) => {
  const d = new Date(today);
  d.setDate(d.getDate() - (6 - i));
  return {
    date: d,
    dayName: d.toLocaleDateString(undefined, { weekday: 'short' }),
    dayNum: d.getDate(),
    isToday: i === 6,
    brushed: i < 6 ? Math.random() > 0.2 : false, // mock past data
    flossed: i < 6 ? Math.random() > 0.5 : false, // mock past data
  };
});

export default function HealthTracker() {
  const [days, setDays] = useState(last7Days);

  const [streak, setStreak] = useState(12);
  const [healthScore, setHealthScore] = useState(85);

  const toggleHabit = (index: number, habit: 'brushed' | 'flossed') => {
    const newDays = [...days];
    const isNowCompleted = !newDays[index][habit];
    newDays[index] = {
      ...newDays[index],
      [habit]: isNowCompleted
    };
    setDays(newDays);
    
    if (newDays[index].isToday) {
      if (isNowCompleted) {
        setStreak(prev => prev + 1);
        setHealthScore(prev => Math.min(100, prev + 2));
      } else {
        setStreak(prev => Math.max(0, prev - 1));
        setHealthScore(prev => Math.max(0, prev - 2));
      }
    }

    if (isNowCompleted) {
      toast.success(`Great job! You logged your ${habit === 'brushed' ? 'brushing' : 'flossing'} for today.`, {
        icon: '🦷'
      });
    }
  };

  const [reminders, setReminders] = useState({
    morning: true,
    night: true,
    floss: false
  });

  const triggerTestNotification = () => {
    toast("Time to Brush! 🦷", {
      description: "Don't break your 12-day streak. Grab your toothbrush!",
      icon: <BellRingIcon className="w-5 h-5 text-primary" />,
      action: {
        label: "Log It",
        onClick: () => console.log("Logged from toast")
      },
    });
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dental Health Tracker</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2">Log your daily habits and earn streaks to maintain a healthy smile.</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        
        {/* Stats Cards */}
        <Card className="border-border/50 bg-gradient-to-br from-orange-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <FlameIcon className="w-4 h-4 text-orange-500" /> Current Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-foreground">{streak} <span className="text-xl md:text-2xl text-muted-foreground font-normal">days</span></div>
            <p className="text-xs text-muted-foreground mt-1">Keep it up! You're doing great.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-green-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <ActivityIcon className="w-4 h-4 text-green-500" /> Oral Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl md:text-4xl font-bold text-foreground">{healthScore}<span className="text-xl md:text-2xl text-muted-foreground font-normal">/100</span></div>
            <p className="text-xs text-muted-foreground mt-1">Based on your recent logging consistency.</p>
          </CardContent>
        </Card>

        <Card className="border-border/50 bg-gradient-to-br from-yellow-500/10 to-transparent">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
              <TrophyIcon className="w-4 h-4 text-yellow-500" /> Next Milestone
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg md:text-xl font-bold text-foreground flex items-center gap-2">
              14 Day Streak
            </div>
            <div className="w-full bg-muted rounded-full h-2.5 mt-3">
              <div className="bg-yellow-500 h-2.5 rounded-full transition-all duration-1000 ease-out" style={{ width: `${Math.min(100, (streak/14)*100)}%` }}></div>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Just {Math.max(0, 14 - streak)} more days to unlock the Star Brusher badge!</p>
          </CardContent>
        </Card>
      </div>

      {/* Weekly Logger */}
      <Card className="border-border/50 shadow-md">
        <CardHeader className="border-b border-border/50 bg-muted/20">
          <CardTitle>This Week's Log</CardTitle>
          <CardDescription>Click on today's circles to log your habits.</CardDescription>
        </CardHeader>
        <CardContent className="pt-6 px-2 sm:px-6">
          <div className="flex overflow-x-auto pb-4 snap-x snap-mandatory hide-scrollbar gap-3 px-2 sm:px-0 sm:justify-between">
            {days.map((day, idx) => (
              <div 
                key={idx} 
                className={`flex-shrink-0 w-[85px] sm:w-auto snap-center flex flex-col items-center p-3 rounded-2xl border transition-all ${
                  day.isToday ? 'border-primary bg-primary/5 shadow-sm scale-105' : 'border-transparent bg-card shadow-sm sm:shadow-none hover:bg-muted/50'
                }`}
              >
                <span className={`text-sm md:text-base font-medium ${day.isToday ? 'text-primary' : 'text-muted-foreground'}`}>
                  {day.dayName}
                </span>
                <span className={`text-lg md:text-xl font-bold mb-4 ${day.isToday ? 'text-foreground' : 'text-foreground/70'}`}>
                  {day.dayNum}
                </span>

                <div className="space-y-3">
                  {/* Brush Toggle */}
                  <div className="flex flex-col items-center group cursor-pointer" onClick={() => (day.isToday || true) && toggleHabit(idx, 'brushed')}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      day.brushed ? 'bg-amber-400 text-white shadow-md shadow-amber-400/30' : 'bg-muted border-2 border-muted-foreground/30 text-transparent'
                    }`}>
                      <StarIcon className={`w-5 h-5 ${day.brushed ? 'fill-current' : ''}`} />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold mt-1.5 text-muted-foreground group-hover:text-foreground">Brush</span>
                  </div>

                  {/* Floss Toggle */}
                  <div className="flex flex-col items-center group cursor-pointer" onClick={() => (day.isToday || true) && toggleHabit(idx, 'flossed')}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                      day.flossed ? 'bg-primary text-primary-foreground shadow-md shadow-primary/30' : 'bg-muted border-2 border-muted-foreground/30 text-transparent'
                    }`}>
                      <CheckCircle2Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[10px] uppercase tracking-wider font-semibold mt-1.5 text-muted-foreground group-hover:text-foreground">Floss</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Smart Reminders Settings */}
      <Card className="border-border/50 shadow-md">
        <CardHeader className="border-b border-border/50 bg-muted/10">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BellRingIcon className="w-5 h-5 text-primary" />
                Smart Reminders
              </CardTitle>
              <CardDescription>Get push notifications so you never break your streak.</CardDescription>
            </div>
            <Button variant="outline" size="sm" onClick={triggerTestNotification} className="hidden sm:flex border-primary/20 hover:bg-primary/5 text-primary">
              <SmartphoneIcon className="w-4 h-4 mr-2" />
              Test Notification
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <div className="space-y-6 max-w-2xl">
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-semibold text-base">Morning Brushing</h4>
                <p className="text-sm text-muted-foreground">Receive a reminder at 8:00 AM</p>
              </div>
              <Switch 
                checked={reminders.morning}
                onCheckedChange={(c) => setReminders(p => ({...p, morning: c}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-semibold text-base">Night Brushing</h4>
                <p className="text-sm text-muted-foreground">Receive a reminder at 9:30 PM</p>
              </div>
              <Switch 
                checked={reminders.night}
                onCheckedChange={(c) => setReminders(p => ({...p, night: c}))}
              />
            </div>

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <h4 className="font-semibold text-base">Daily Floss</h4>
                <p className="text-sm text-muted-foreground">Receive a gentle reminder to floss after dinner</p>
              </div>
              <Switch 
                checked={reminders.floss}
                onCheckedChange={(c) => setReminders(p => ({...p, floss: c}))}
              />
            </div>

            <Button variant="outline" size="sm" onClick={triggerTestNotification} className="w-full sm:hidden border-primary/20 text-primary mt-4">
              <SmartphoneIcon className="w-4 h-4 mr-2" />
              Test Push Notification
            </Button>

          </div>
        </CardContent>
      </Card>

    </div>
  );
}
