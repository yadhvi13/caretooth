import React from 'react';
import { Card } from "@/components/ui/card";
import { VideoIcon } from "lucide-react";

export default function TelehealthPlaceholder() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Tele-Dentistry</h1>
        <p className="text-muted-foreground mt-2">Video consultations for basic dental concerns.</p>
      </div>

      <Card className="border-border/50 text-center py-20 px-4 bg-muted/10">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <VideoIcon className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Our encrypted video conferencing platform is currently under development. Soon you'll be able to consult with our dentists from the comfort of your home!
        </p>
      </Card>
    </div>
  );
}
