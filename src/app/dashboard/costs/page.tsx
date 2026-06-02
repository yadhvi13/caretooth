"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalculatorIcon, InfoIcon, WalletIcon } from "lucide-react";

// Mock data for procedures
const procedures = [
  { id: 'exam', name: 'General Exam & Cleaning', min: 500, max: 1500, category: 'Preventative' },
  { id: 'filling', name: 'Tooth Filling (Composite)', min: 800, max: 2000, category: 'Restorative' },
  { id: 'root_canal', name: 'Root Canal Therapy', min: 3000, max: 8000, category: 'Endodontics' },
  { id: 'crown', name: 'Porcelain Crown', min: 2000, max: 6000, category: 'Restorative' },
  { id: 'whitening', name: 'Professional Whitening', min: 3000, max: 10000, category: 'Cosmetic' },
  { id: 'extraction', name: 'Tooth Extraction', min: 500, max: 1500, category: 'Oral Surgery' },
  { id: 'implants', name: 'Dental Implants (per tooth)', min: 25000, max: 45000, category: 'Oral Surgery' },
  { id: 'braces', name: 'Traditional Braces', min: 25000, max: 50000, category: 'Orthodontics' },
  { id: 'invisalign', name: 'Clear Aligners (Invisalign)', min: 80000, max: 150000, category: 'Orthodontics' },
];

export default function CostEstimator() {
  const [selectedProcedures, setSelectedProcedures] = useState<string[]>([]);
  const [hasInsurance, setHasInsurance] = useState(false);

  const toggleProcedure = (id: string) => {
    setSelectedProcedures(prev => 
      prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
    );
  };

  const calculateTotal = () => {
    let minTotal = 0;
    let maxTotal = 0;
    
    selectedProcedures.forEach(id => {
      const proc = procedures.find(p => p.id === id);
      if (proc) {
        minTotal += proc.min;
        maxTotal += proc.max;
      }
    });

    // Simple mock insurance calculation (assume 50% coverage on average)
    if (hasInsurance) {
      minTotal = Math.round(minTotal * 0.5);
      maxTotal = Math.round(maxTotal * 0.5);
    }

    return { minTotal, maxTotal };
  };

  const totals = calculateTotal();

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Treatment Cost Estimator</h1>
        <p className="text-sm md:text-base text-muted-foreground mt-2">Get an instant estimate for your dental procedures before your visit.</p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Procedures Selection List */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-border/50 bg-background/50">
            <CardHeader>
              <CardTitle>Select Procedures</CardTitle>
              <CardDescription>Choose the treatments you are interested in.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid sm:grid-cols-2 gap-4">
                {procedures.map((proc) => {
                  const isSelected = selectedProcedures.includes(proc.id);
                  return (
                    <div 
                      key={proc.id}
                      onClick={() => toggleProcedure(proc.id)}
                      className={`
                        p-4 rounded-xl border-2 cursor-pointer transition-all duration-200
                        ${isSelected 
                          ? 'border-primary bg-primary/10 shadow-sm scale-[1.02]' 
                          : 'border-border/50 hover:border-primary/40 hover:bg-muted'
                        }
                      `}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <span className={`font-semibold ${isSelected ? 'text-primary' : 'text-foreground'}`}>
                          {proc.name}
                        </span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center
                          ${isSelected ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}
                        `}>
                          {isSelected && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                        </div>
                      </div>
                      <div className="text-xs md:text-sm text-muted-foreground flex justify-between">
                        <span>{proc.category}</span>
                        <span className="font-medium text-foreground">₹{proc.min.toLocaleString()} - ₹{proc.max.toLocaleString()}</span>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Cost Summary Sticky Sidebar */}
        <div className="space-y-6">
          <Card className="border-primary/20 shadow-xl bg-card sticky top-24">
            <CardHeader className="bg-primary/5 border-b border-border/50">
              <CardTitle className="flex items-center gap-2">
                <CalculatorIcon className="w-5 h-5 text-primary" />
                Estimate Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground font-medium">Procedures Selected:</span>
                  <span className="font-bold text-xl">{selectedProcedures.length}</span>
                </div>
                
                {selectedProcedures.length > 0 && (
                  <div className="bg-muted/50 rounded-lg p-3 space-y-2 text-sm border border-border/50 max-h-[200px] overflow-y-auto">
                    {selectedProcedures.map(id => {
                      const p = procedures.find(x => x.id === id);
                      return p ? (
                        <div key={id} className="flex justify-between text-muted-foreground">
                          <span className="truncate pr-2">{p.name}</span>
                          <span>₹{p.min.toLocaleString()}+</span>
                        </div>
                      ) : null;
                    })}
                  </div>
                )}
              </div>

              <div className="border-t border-border/50 pt-4 space-y-4">
                <div 
                  className={`p-4 rounded-xl border-2 cursor-pointer flex items-center justify-between transition-colors ${hasInsurance ? 'border-primary bg-primary/5' : 'border-border/50 hover:border-primary/30'}`}
                  onClick={() => setHasInsurance(!hasInsurance)}
                >
                  <div className="flex items-center gap-3">
                    <WalletIcon className={`w-5 h-5 ${hasInsurance ? 'text-primary' : 'text-muted-foreground'}`} />
                    <span className="font-medium">Apply Dental Insurance</span>
                  </div>
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${hasInsurance ? 'border-primary bg-primary text-primary-foreground' : 'border-muted-foreground'}`}>
                    {hasInsurance && <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                  </div>
                </div>
                {hasInsurance && (
                  <p className="text-xs text-muted-foreground flex items-start gap-1">
                    <InfoIcon className="w-4 h-4 shrink-0" />
                    Assuming average 50% coverage. Actual coverage depends on your specific plan.
                  </p>
                )}
              </div>

              <div className="bg-primary text-primary-foreground rounded-xl p-4 md:p-6 text-center shadow-lg relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
                <p className="text-xs md:text-sm text-primary-foreground/80 font-medium mb-1 relative z-10">Estimated Total Range</p>
                <h3 className="text-2xl md:text-4xl font-bold tracking-tight relative z-10">
                  ₹{totals.minTotal.toLocaleString()} <span className="text-xl md:text-2xl text-primary-foreground/70 font-normal">-</span> ₹{totals.maxTotal.toLocaleString()}
                </h3>
              </div>

            </CardContent>
            <CardFooter className="pt-0">
              <p className="text-xs text-muted-foreground text-center w-full">
                * This is an estimate only. Actual costs may vary based on clinical diagnosis and final treatment plan.
              </p>
            </CardFooter>
          </Card>
        </div>

      </div>
    </div>
  );
}
