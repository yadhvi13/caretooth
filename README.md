# 🦷 CareTooth

CareTooth is a next-generation, AI-powered dental health platform designed to gamify oral care and seamlessly connect patients with modern dental services. 

Built with a focus on stunning UI/UX, CareTooth operates as a **"Duolingo for Dental Health,"** rewarding users for maintaining healthy habits while providing cutting-edge features like AI symptom checking and tele-dentistry.

---

## ✨ Key Features

### 🎮 Gamification & Rewards Engine
- **Smile Score:** A dynamic score from 0-100 calculating oral health based on daily check-ins and habits.
- **Daily Mystery Box:** Interactive, animated daily login rewards to boost user retention.
- **Badges Gallery:** Users unlock stunning themed badges (e.g., *7-Day Streak*, *Health Hero*) for completing goals.
- **Learn & Earn:** Educational mini-lessons (articles & videos) that reward users with XP and points.
- **CarePoints Economy:** Earn points and redeem them for future dental discounts and prizes.

### 🏥 Modern Patient Dashboard
- **Dental Health Tracker:** Log daily brushing, flossing, and mouthwash routines with an intuitive swipeable timeline.
- **Treatment Cost Estimator:** Interactive sliders providing localized (INR ₹) estimates for procedures like root canals, braces, and implants.
- **Smart Appointments:** Easy-to-use booking system for physical clinics and tele-dentistry.
- **Digital Records Vault:** Securely access prescriptions, X-rays, and appointment history.

### 🤖 AI-Powered Dental Support
- **AI Symptom Checker:** Upload photos of teeth/gums for preliminary AI insights and urgency classification.
- **AI Voice Consultations:** Integration with VAPI for real-time AI voice agents to guide users through dental concerns.

---

## 🛠️ Technology Stack

This project is built using a modern, scalable web stack:

- **Framework:** [Next.js 16 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/) + `framer-motion` for fluid micro-animations
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (customized via TweakCN using hex codes)
- **Authentication:** [Clerk](https://clerk.com/) (Secure session management & metadata routing via `middleware.ts`)
- **Database (Planned):** Neon (AWS) PostgreSQL managed via [Prisma ORM](https://www.prisma.io/)
- **AI Voice Agent:** [VAPI](https://vapi.ai/)
- **Email Service:** Resend

---

## 🚀 Getting Started

### Prerequisites
Make sure you have Node.js installed.

### 1. Clone & Install
```bash
git clone https://github.com/YOUR_USERNAME/caretooth-app.git
cd caretooth
npm install
```

### 2. Environment Variables
Create a `.env.local` file in the root directory and add your secret keys:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
RESEND_API_KEY=re_...
```
*(Note: Ensure your Clerk keys are copied as text from the dashboard, do not copy the hidden bullet points!)*

### 3. Run the Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 🌐 Deployment
The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new).
Simply import your GitHub repository, add your Environment Variables, and click Deploy.
