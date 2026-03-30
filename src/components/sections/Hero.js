"use client";
import Image from 'next/image';
import Button from '../ui/Button';
import { motion } from 'framer-motion';

export default function Hero() {
  // Container variants to manage children stagger
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Delay between each element
        delayChildren: 0.3,   // Initial delay before start
      },
    },
  };

  // Individual item variants
  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] }, // Professional cubic-bezier ease
    },
  };

  return (
    <section className="relative w-full h-[100vh] flex items-end pb-24 md:pb-32 overflow-hidden bg-black">
      {/* Background Image Animation */}
      <motion.div 
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.6 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image 
          src="/hero-bg.jpg" 
          alt="Worksite" 
          fill 
          className="object-cover"
          priority 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      </motion.div>

      <div className="container mx-auto px-8 md:px-20 relative z-10">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          <motion.h1 
            variants={itemVariants}
            className="text-white text-5xl md:text-[70px] font-bold leading-[1.1] mb-6 tracking-tighter"
          >
            Powering Your Industry <br /> with Precision.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="text-white/80 text-lg md:text-xl font-normal max-w-2xl mb-10 leading-snug"
          >
            Government Approved Electrical License Contractor & Supplier <br className="hidden md:block"/>
            providing expert high and low voltage distribution solutions.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex">
            <Button>Explore Services</Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}