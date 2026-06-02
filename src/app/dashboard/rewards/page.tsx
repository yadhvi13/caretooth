"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  TrophyIcon, 
  GiftIcon, 
  StarIcon, 
  ShieldCheckIcon,
  FlameIcon,
  MedalIcon,
  AwardIcon,
  CoinsIcon,
  LockIcon,
  UnlockIcon
} from "lucide-react";

export default function RewardsDashboard() {
  const [hasClaimedDaily, setHasClaimedDaily] = useState(false);
  const [points, setPoints] = useState(450);

  const claimMysteryBox = () => {
    setHasClaimedDaily(true);
    setPoints(prev => prev + 50); // Surprise 50 points!
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      
      {/* Header section with Smile Score */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 border-b border-border/50 pb-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Rewards & Achievements</h1>
          <p className="text-muted-foreground mt-2">Earn CarePoints, unlock badges, and grow your Smile Score.</p>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Your Balance</span>
            <div className="flex items-center gap-2 text-2xl font-bold text-amber-500">
              <CoinsIcon className="w-6 h-6 fill-current" />
              {points} <span className="text-sm font-normal text-muted-foreground">pts</span>
            </div>
          </div>
          <div className="h-12 w-px bg-border hidden sm:block"></div>
          <div className="flex items-center gap-4">
            <div className="relative w-16 h-16 flex items-center justify-center rounded-full bg-primary/10 border-4 border-primary">
              <span className="text-xl font-bold text-primary">85</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold">Smile Score</span>
              <span className="text-xs text-primary font-medium">Top 15% of users!</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Daily Mystery Box */}
        <Card className={`border-border/50 shadow-md transition-all duration-500 ${hasClaimedDaily ? 'bg-muted/10' : 'bg-gradient-to-br from-primary/10 via-background to-amber-500/10 border-primary/30 ring-1 ring-primary/20'}`}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GiftIcon className="w-5 h-5 text-primary" />
              Daily Mystery Box
            </CardTitle>
            <CardDescription>Log in daily to claim surprise CarePoints!</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center py-6">
            <div className="relative mb-6">
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-500 ${hasClaimedDaily ? 'bg-muted' : 'bg-primary/20 animate-pulse'}`}>
                <GiftIcon className={`w-12 h-12 ${hasClaimedDaily ? 'text-muted-foreground' : 'text-primary'}`} />
              </div>
              {!hasClaimedDaily && (
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-amber-500 rounded-full border-2 border-background animate-bounce" />
              )}
            </div>
            {hasClaimedDaily ? (
              <div className="text-center animate-in zoom-in duration-300">
                <span className="font-bold text-xl text-amber-500 block">+50 Points!</span>
                <span className="text-sm text-muted-foreground">Come back tomorrow for more.</span>
              </div>
            ) : (
              <Button onClick={claimMysteryBox} className="w-full bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                Tap to Open
              </Button>
            )}
          </CardContent>
        </Card>

        {/* Learn & Earn Banner */}
        <Card className="lg:col-span-2 border-border/50 shadow-md bg-slate-900 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl -mr-20 -mt-20"></div>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-white">
              <StarIcon className="w-5 h-5 text-amber-400 fill-current" />
              Learn & Earn
            </CardTitle>
            <CardDescription className="text-slate-400">Complete mini-lessons about dental health to earn huge XP.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 relative z-10">
            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                  <ShieldCheckIcon className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">The Truth About Cavities</h3>
                  <p className="text-sm text-slate-400">2 min read • Science of tooth decay</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-sm font-bold">
                +100 pts
              </div>
            </div>

            <div className="bg-slate-800/50 border border-slate-700 p-4 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors cursor-pointer group">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-900 rounded-lg group-hover:scale-110 transition-transform">
                  <FlameIcon className="w-6 h-6 text-amber-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">Flossing Like a Pro</h3>
                  <p className="text-sm text-slate-400">Video tutorial • Prevent gum disease</p>
                </div>
              </div>
              <div className="flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-sm font-bold">
                +150 pts
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Badges Gallery */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <MedalIcon className="w-6 h-6 text-primary" />
            Your Badges Gallery
          </h2>
          <span className="text-sm font-medium text-muted-foreground">3 of 12 Unlocked</span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          
          {/* Unlocked Badges */}
          <div className="flex flex-col items-center p-4 bg-card border border-primary/30 rounded-2xl shadow-sm hover:shadow-primary/10 transition-shadow">
            <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 ring-4 ring-blue-500/20">
              <AwardIcon className="w-8 h-8 text-blue-600" />
            </div>
            <span className="font-bold text-center text-sm">First Visit</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Unlocked</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-card border border-primary/30 rounded-2xl shadow-sm hover:shadow-primary/10 transition-shadow">
            <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center mb-3 ring-4 ring-amber-500/20">
              <FlameIcon className="w-8 h-8 text-amber-600" />
            </div>
            <span className="font-bold text-center text-sm">7-Day Streak</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Unlocked</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-card border border-primary/30 rounded-2xl shadow-sm hover:shadow-primary/10 transition-shadow">
            <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-3 ring-4 ring-emerald-500/20">
              <ShieldCheckIcon className="w-8 h-8 text-emerald-600" />
            </div>
            <span className="font-bold text-center text-sm">Health Hero</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Unlocked</span>
          </div>

          {/* Locked Badges */}
          <div className="flex flex-col items-center p-4 bg-muted/30 border border-border/50 rounded-2xl grayscale opacity-60">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3 relative">
              <TrophyIcon className="w-8 h-8 text-muted-foreground" />
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                <LockIcon className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
            <span className="font-bold text-center text-sm text-muted-foreground">30-Day Streak</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Locked</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-muted/30 border border-border/50 rounded-2xl grayscale opacity-60">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3 relative">
              <StarIcon className="w-8 h-8 text-muted-foreground" />
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                <LockIcon className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
            <span className="font-bold text-center text-sm text-muted-foreground">Floss Master</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Locked</span>
          </div>

          <div className="flex flex-col items-center p-4 bg-muted/30 border border-border/50 rounded-2xl grayscale opacity-60">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-3 relative">
              <GiftIcon className="w-8 h-8 text-muted-foreground" />
              <div className="absolute -bottom-1 -right-1 bg-background rounded-full p-0.5">
                <LockIcon className="w-3 h-3 text-muted-foreground" />
              </div>
            </div>
            <span className="font-bold text-center text-sm text-muted-foreground">Top 1% Scorer</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide mt-1">Locked</span>
          </div>

        </div>
      </div>

    </div>
  );
}
