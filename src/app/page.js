"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";

export default function Home() {
  return (
    // Set the main background to navy to prevent any white light
    <main className="relative bg-navy min-h-screen">
      {/* Page Reveal Overlay - Matches bg-navy exactly */}
      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "linear" }} // Fast, clean linear fade
        onAnimationComplete={() => (document.body.style.overflow = "auto")}
        className="fixed inset-0 bg-navy z-[100] pointer-events-none"
      />

      <Navbar />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.1 }}
      >
        <Hero />
        {/* Stats and other sections will go here */}
      </motion.div>
    </main>
  );
}