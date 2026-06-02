"use client"

import React from 'react'
import { SignUpButton } from '@clerk/nextjs'
import { Button } from '../ui/button'
import { MicIcon,CalendarHeartIcon, StarIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

const Hero = () => {
  return (
    <section className="relative min-h-[100dvh] lg:h-screen flex items-center overflow-hidden pt-20">
    {/* GRID BG  */}
    <div className="absolute inset-0 bg-gradient-to-br from-background via-muted/5 to-primary/5">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#f1f5f9_1px,transparent_1px),linear-gradient(to_bottom,#f1f5f9_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-20"></div>
    </div>

    {/* GRADIENT ORBS */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl" 
    />
    <motion.div 
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2.5, repeat: Infinity, repeatType: 'reverse', delay: 0.5 }}
      className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-primary/15 to-primary/5 rounded-full blur-3xl" 
    />

    <div className="relative z-10 w-full px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT CONTENT */}
          <motion.div 
            className="space-y-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <div className="space-y-6">
              {/* BADGE */}
              <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-primary/10 to-primary/5 rounded-full border border-primary/20 backdrop-blur-sm shadow-lg shadow-primary/5">
                <div className="w-2 h-2 bg-primary rounded-full animate-pulse"></div>
                <span className="text-sm font-medium text-primary">
                  AI-Powered Dental Assistant
                </span>
              </motion.div>

              {/* MAIN HEADING */}
              <motion.h1 variants={itemVariants} className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight">
                <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  Your dental
                </span>
                <br />
                <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent inline-block hover:scale-105 transition-transform cursor-default">
                  questions
                </span>
                <br />
                <span className="bg-gradient-to-br from-foreground via-foreground to-foreground/70 bg-clip-text text-transparent">
                  answered instantly
                </span>
              </motion.h1>

              {/* SUBTITLE */}
              <motion.p variants={itemVariants} className="text-lg text-muted-foreground leading-relaxed max-w-xl font-medium">
                Chat with our AI dental assistant for instant advice, book smart appointments, and
                get personalized care recommendations. Available 24/7.
              </motion.p>
            </div>

            {/* CTA BUTTONS */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4">
              <SignUpButton mode="modal">
                <Button size={"lg"} className="group bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300">
                  <MicIcon className="mr-2 size-5 group-hover:scale-110 transition-transform" />
                  Try voice agent
                </Button>
              </SignUpButton>

              <Link href="/book">
                <Button size={"lg"} variant={"outline"} className="group border-primary/50 hover:border-primary hover:bg-primary/5 transition-all duration-300">
                  <CalendarHeartIcon className="mr-2 size-5 group-hover:text-primary transition-colors" />
                  Book appointment
                </Button>
              </Link>
            </motion.div>

            {/* USER TESTIMONIALS */}
            <motion.div variants={itemVariants} className="pt-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                {/* USER AVATARS */}
                <div className="flex -space-x-3">
                  {[
                    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=100&h=100&fit=crop&crop=face",
                    "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=100&h=100&fit=crop&crop=face"
                  ].map((src, i) => (
                    <motion.div 
                      key={i} 
                      whileHover={{ scale: 1.1, zIndex: 10 }}
                      className="relative w-12 h-12 rounded-full ring-4 ring-background overflow-hidden cursor-pointer shadow-md"
                    >
                      <Image
                        src={src}
                        alt="Patient Avatar"
                        fill
                        sizes="48px"
                        className="object-cover"
                      />
                    </motion.div>
                  ))}
                </div>

                {/* RATING AND STATS */}
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[1, 2, 3, 4, 5].map((star, i) => (
                        <motion.div 
                          key={star}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.5 + (i * 0.1) }}
                        >
                          <StarIcon className="h-4 w-4 fill-amber-400 text-amber-400" />
                        </motion.div>
                      ))}
                    </div>
                    <span className="text-sm font-bold text-foreground">4.9/5</span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Trusted by{" "}
                    <span className="font-semibold text-foreground">1,200+ patients</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT CONTENT - HERO IMAGE */}
          <motion.div 
            className="relative lg:pl-8"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            {/* GRADIENT ORBS */}
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-br from-primary/20 to-primary/10 rounded-2xl rotate-45 blur-xl"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/15 to-primary/5 rounded-full blur-2xl"></div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.4 }}
              className="relative z-10 drop-shadow-2xl"
            >
              <Image
                src={"/hero.png"}
                alt="DentWise AI"
                width={600}
                height={600}
                className="w-full h-auto object-contain"
                priority
              />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  </section>
  )
}

export default Hero
