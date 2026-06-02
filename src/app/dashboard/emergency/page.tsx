import React from 'react';
import { Card } from "@/components/ui/card";
import { PhoneCallIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EmergencyPlaceholder() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Emergency Support</h1>
        <p className="text-muted-foreground mt-2">Get immediate help for dental emergencies.</p>
      </div>

      <Card className="border-border/50 text-center py-20 px-4 bg-muted/10">
        <div className="w-24 h-24 bg-destructive/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <PhoneCallIcon className="w-12 h-12 text-destructive" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Emergency Dispatch Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          Our automated clinic locator and emergency dispatch system is currently being built. 
        </p>
        <div className="bg-destructive/10 p-6 rounded-xl max-w-md mx-auto border border-destructive/20">
          <h3 className="font-semibold text-destructive mb-2">If you have a real emergency right now:</h3>
          <p className="text-sm mb-4 text-foreground/80">Please call our 24/7 hotline directly or visit your nearest emergency room.</p>
          <Button variant="destructive" className="w-full font-bold">
            <PhoneCallIcon className="w-4 h-4 mr-2"/>
            Call 1-800-CARETOOTH
          </Button>
        </div>
      </Card>
    </div>
  );
}
