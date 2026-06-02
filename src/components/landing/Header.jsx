"use client"
import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '../ui/button'
import { SignInButton, SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'
import { Menu, X } from 'lucide-react'

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <nav className='fixed top-0 right-0 left-0 z-50 px-6 py-2 border-b border-border/50 bg-background/80 backdrop-blur-md h-16'>
            <div className='max-w-6xl mx-auto flex justify-between items-center h-full'>
                <Link href="/" className='flex items-center gap-2'>
                    <Image src={"/Logo.png"} alt='CareTooth Logo' width={32} height={32} className='w-11' />
                    <span className='font-semibold text-lg'> CareTooth </span>
                </Link>

                {/* Desktop Navigation */}
                <div className='hidden md:flex items-center gap-8'>
                    <Link href="/#how-it-works" className='text-muted-foreground hover:text-foreground'> How it Works</Link>
                    <Link href="/#pricing" className='text-muted-foreground hover:text-foreground'> Pricing</Link>
                    <Link href="/#about" className='text-muted-foreground hover:text-foreground'> About</Link>
                </div>

                <div className='hidden md:flex items-center gap-3'>
                    <SignedOut>
                        <SignInButton mode='modal'>
                           <Button variant={"ghost"} size={"sm"}>
                            Login
                           </Button>
                        </SignInButton>
                        <SignUpButton mode='modal'>
                        <Button size={"sm"}>
                            Sign Up
                        </Button>
                        </SignUpButton>
                    </SignedOut>
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
                </div>

                {/* Mobile Hamburger Icon */}
                <div className='md:hidden flex items-center'>
                    <button onClick={toggleMenu} className='text-foreground p-2' aria-label="Toggle menu">
                        {isMenuOpen ? <X className='size-6' /> : <Menu className='size-6' />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className='md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border/50 shadow-lg p-6 flex flex-col gap-6'>
                    <div className='flex flex-col gap-4'>
                        <Link href="/#how-it-works" onClick={toggleMenu} className='text-foreground font-medium text-lg hover:text-primary transition-colors'> How it Works</Link>
                        <Link href="/#pricing" onClick={toggleMenu} className='text-foreground font-medium text-lg hover:text-primary transition-colors'> Pricing</Link>
                        <Link href="/#about" onClick={toggleMenu} className='text-foreground font-medium text-lg hover:text-primary transition-colors'> About</Link>
                    </div>
                    <div className='flex flex-col gap-3 pt-4 border-t border-border/50'>
                        <SignedOut>
                            <SignInButton mode='modal'>
                                <Button variant={"outline"} className="w-full justify-center">
                                    Login
                                </Button>
                            </SignInButton>
                            <SignUpButton mode='modal'>
                                <Button className="w-full justify-center">
                                    Sign Up
                                </Button>
                            </SignUpButton>
                        </SignedOut>
                        <SignedIn>
                            <div className="flex justify-center">
                                <UserButton />
                            </div>
                        </SignedIn>
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Header

