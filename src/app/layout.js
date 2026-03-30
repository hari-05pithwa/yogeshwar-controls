"use client";
import { Bricolage_Grotesque } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const bricolage = Bricolage_Grotesque({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

export default function RootLayout({ children }) {
  
  useGSAP(() => {
    // Reveal the Navbar
    // Use .fromTo to be 100% explicit about the start and end states
    gsap.fromTo(".reveal-nav", 
      { 
        y: -100, 
        opacity: 0 
      }, 
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.2, 
        ease: "expo.out", 
        delay: 0.3,
        clearProps: "transform" // This is CRITICAL: it removes GSAP styles after animation so fixed positioning works perfectly
      }
    );

    gsap.to("body", {
      backgroundColor: "#0B1221",
      duration: 0.5,
    });
  }, []);

  return (
    <html lang="en" className={bricolage.variable}>
      <head>
        <link 
          rel="stylesheet" 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
        />
      </head>
      <body className={`${bricolage.className} antialiased bg-[#0B1221] text-white`}>
        
        {/* Added relative and z-index to wrapper to ensure it stays on top */}
        <div className="reveal-nav fixed top-0 left-0 w-full z-[110]">
          <Navbar />
        </div>

        <main>{children}</main>

        <Footer />
      </body>
    </html>
  );
}