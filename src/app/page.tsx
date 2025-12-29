import Image from "next/image";
import {Button} from "@/components/ui/button";
import { SignUpButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div>
      <h1>Home Page</h1>
      <SignUpButton>
         Sign Up
      </SignUpButton>
    </div>
  );
}
