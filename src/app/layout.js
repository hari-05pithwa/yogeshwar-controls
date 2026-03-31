"use client";
import { Bricolage_Grotesque } from 'next/font/google';
import "./globals.css";
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import NextTopLoader from 'nextjs-toploader'; // Import the loader

const bricolage = Bricolage_Grotesque({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-bricolage',
});

export default function RootLayout({ children }) {
  
  useGSAP(() => {
    // Reveal the Navbar
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
        clearProps: "transform" 
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
        
        {/* NEXT TOP LOADER CONFIGURATION */}
        <NextTopLoader 
          color="#FFD982" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #FFD982,0 0 5px #FFD982"
        />

        <div className="reveal-nav fixed top-0 left-0 w-full z-[110]">
          <Navbar />
        </div>

        {/* Padding top added to main so content doesn't hide behind fixed navbar */}
        <main className="min-h-screen">{children}</main>

        <Footer />
      </body>
    </html>
  );
}