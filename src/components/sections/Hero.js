"use client";
import { useRef } from "react";
import Link from "next/link"; // Import Link from Next.js
import Button from '../ui/Button';
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function Hero() {
  const scope = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({ defaults: { ease: "expo.out", duration: 1.5 } });

    // 1. Video Fade & Zoom Effect
    tl.from(".hero-video-container", {
      scale: 1.1,
      opacity: 0,
      duration: 2.5,
    }, 0);

    // 2. Content Stagger
    tl.from(".hero-reveal", {
      y: 60,
      opacity: 0,
      stagger: 0.2,
    }, 0.6);

  }, { scope });

  return (
    <section ref={scope} className="relative w-full h-screen flex items-end pb-24 md:pb-32 overflow-hidden bg-[#080f20]">
      
      {/* Background Video Layer */}
      <div className="hero-video-container absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover opacity-40"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        
        {/* Deep Overlay Gradient for Text Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-[#0B1221]/40 to-transparent" />
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
            {/* Wrapped Button with Link to /services */}
            <Link href="/services">
              <Button>Explore Services</Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}