"use client";
import Image from 'next/image';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

export default function Hero() {
  return (
    <section className="relative w-full h-screen flex items-end pb-24 md:pb-32 overflow-hidden bg-[#0B1221]">
      {/* Background Image - Scale and Opacity set to final values immediately */}
      <div className="absolute inset-0 z-0">
        <Image 
          src="/hero-bg.jpg" 
          alt="Worksite" 
          fill 
          className="object-cover opacity-60" 
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent" />
      </div>

      <div className="container mx-auto px-8 md:px-20 relative z-10">
        <div className="max-w-4xl">
          <h1 className="text-white text-5xl md:text-[80px] font-bold leading-[1.1] mb-6 tracking-tighter">
            Powering Your Industry <br /> with Precision.
          </h1>
          
          <p className="text-white/80 text-lg md:text-xl font-normal max-w-2xl mb-10 leading-snug">
            Government Approved Electrical License Contractor & Supplier <br className="hidden md:block"/>
            providing expert high and low voltage distribution solutions.
          </p>
          
          <div className="flex">
            <Button>Explore Services</Button>
          </div>
        </div>
      </div>
    </section>
  );
}