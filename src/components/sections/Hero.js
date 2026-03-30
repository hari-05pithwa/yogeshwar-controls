"use client";
import { useRef } from "react";
import Image from 'next/image';
import Button from '../ui/Button';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const scope = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

    // 1. Background Image Zoom & Fade
    tl.from(".hero-bg", {
      scale: 1.2,
      opacity: 0,
      duration: 2.5,
    }, 0);

    // 2. Content Stagger (Title, Paragraph, Button)
    tl.from(".hero-reveal", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
    }, 0.6); // Starts during the background fade

  }, { scope });

  return (
    <section ref={scope} className="relative w-full h-screen flex items-end pb-24 md:pb-32 overflow-hidden bg-[#080f20]">
      {/* Background Image Layer */}
      <div className="hero-bg absolute inset-0 z-0">
        <Image 
          src="/hero-bg.jpg" 
          alt="Worksite" 
          fill 
          className="object-cover opacity-30" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-8 md:px-20 relative z-10">
        <div className="max-w-4xl">
          <h1 className="hero-reveal text-white text-5xl md:text-[70px] font-bold leading-[1.1] mb-6 tracking-tighter">
            Powering Your Industry <br /> with Precision.
          </h1>
          
          <p className="hero-reveal text-white/80 text-lg md:text-xl font-normal max-w-2xl mb-10 leading-snug">
            Government Approved Electrical License Contractor & Supplier <br className="hidden md:block"/>
            providing expert high and low voltage distribution solutions.
          </p>
          
          <div className="hero-reveal flex">
            <Button>Explore Services</Button>
          </div>
        </div>
      </div>
    </section>
  );
}