"use client";

import React, { useState, useEffect, ReactNode } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { SignedIn, SignedOut, RedirectToSignIn, UserButton, useUser } from '@clerk/nextjs';
import { 
  CalendarIcon, 
  ActivityIcon, 
  StethoscopeIcon, 
  VideoIcon, 
  CalculatorIcon, 
  ShieldCheckIcon,
  PhoneCallIcon,
  SettingsIcon,
  MenuIcon,
  XIcon,
  TrophyIcon
} from 'lucide-react';
import Image from 'next/image';

const navItems = [
  { name: 'Appointments', href: '/dashboard', icon: CalendarIcon },
  { name: 'Health Tracker', href: '/dashboard/health', icon: ActivityIcon },
  { name: 'Cost Estimator', href: '/dashboard/costs', icon: CalculatorIcon },
  { name: 'Rewards & Badges', href: '/dashboard/rewards', icon: TrophyIcon },
  { name: 'AI Symptom Checker', href: '/dashboard/ai-checker', icon: StethoscopeIcon },
  { name: 'Tele-Dentistry', href: '/dashboard/telehealth', icon: VideoIcon },
  { name: 'Records', href: '/dashboard/records', icon: ShieldCheckIcon },
  { name: 'Emergency', href: '/dashboard/emergency', icon: PhoneCallIcon },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();
  const { isLoaded } = useUser();

  if (!isLoaded) return null;

  return (
    <>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
      
      <SignedIn>
        <div className="min-h-screen bg-muted/20 flex flex-col md:flex-row">
          
          {/* Mobile Header */}
          <div className="md:hidden flex items-center justify-between p-4 bg-background border-b border-border/50 sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/logo.png" alt="Logo" width={28} height={28} />
              <span className="font-semibold text-lg">CareTooth</span>
            </Link>
            <div className="flex items-center gap-4">
              <UserButton />
              <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 bg-muted rounded-md">
                {isSidebarOpen ? <XIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <aside className={`
            fixed md:sticky top-0 left-0 z-40 h-screen w-64 bg-background border-r border-border/50 flex flex-col
            transition-transform duration-300 ease-in-out md:translate-x-0
            ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          `}>
            <div className="p-6 hidden md:flex items-center justify-between">
              <Link href="/" className="flex items-center gap-2">
                <Image src="/logo.png" alt="Logo" width={32} height={32} />
                <span className="font-semibold text-xl">CareTooth</span>
              </Link>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto mt-16 md:mt-0">
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 px-2">
                Patient Menu
              </div>
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setIsSidebarOpen(false)}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl transition-all ${
                      isActive 
                        ? 'bg-primary/10 text-primary font-medium shadow-sm' 
                        : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? 'text-primary' : ''}`} />
                    {item.name}
                  </Link>
                )
              })}
            </nav>

            <div className="p-6 border-t border-border/50 hidden md:flex items-center gap-3">
              <UserButton />
              <span className="text-sm font-medium text-muted-foreground">My Account</span>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="flex-1 p-4 md:p-10 lg:p-12 max-w-7xl mx-auto w-full">
            {children}
          </main>
          
        </div>
      </SignedIn>
    </>
  );
}
