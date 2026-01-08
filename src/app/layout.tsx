// import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
// import "./globals.css";
// import {
//   ClerkProvider,
// } from '@clerk/nextjs'

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "CareTooth - AI Powered Dental Assistant",
//   description: "Get instant dental advice through voice calls with our AI assistant. Available 24/7.",
// };

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     // the apperance for the user login Account
//     <ClerkProvider appearance={{
//       variables:{
//         colorPrimary:"#e78a53",
//         colorBackground:"#f3f4f6",
//         colorText:"#111827",
//         colorTextSecondary:"#6b7280",
//         colorInputBackground:"#f3f4f6",
//       }
//     }}>
//       <html lang="en">
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
//       >
//         {/* to make the website whole dark(black) we have antialiased dark in the body */}
//         {children}
//       </body>
//     </html>
//     </ClerkProvider>
//   );
// }


import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { ClerkProvider } from "@clerk/nextjs"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "CareTooth - AI Powered Dental Assistant",
  description:
    "Get instant dental advice through voice calls with our AI assistant. Available 24/7.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
      >
        <ClerkProvider
          appearance={{
            variables: {
              colorPrimary: "#e78a53",
              colorBackground: "#f3f4f6",
              colorText: "#111827",
              colorTextSecondary: "#6b7280",
              colorInputBackground: "#f3f4f6",
            },
          }}
        >
          {children}
        </ClerkProvider>
      </body>
    </html>
  )
}
