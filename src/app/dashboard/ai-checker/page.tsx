import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { StethoscopeIcon } from "lucide-react";

export default function AICheckerPlaceholder() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">AI Symptom Checker</h1>
        <p className="text-muted-foreground mt-2">Upload a photo of your teeth/gums to get preliminary AI insights.</p>
      </div>

      <Card className="border-border/50 text-center py-20 px-4 bg-muted/10">
        <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <StethoscopeIcon className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8 text-lg">
          We are currently integrating state-of-the-art Vision AI models to securely analyze dental images. This feature will be available in the next major update!
        </p>
      </Card>
    </div>
  );
}
