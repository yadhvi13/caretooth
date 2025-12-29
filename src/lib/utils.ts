import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// from SHADCN components
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
