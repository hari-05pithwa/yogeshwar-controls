"use client";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Services from "@/components/sections/Services";
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="relative bg-navy min-h-screen">
      <Hero />
      <Trust />
      <Services />
      <ContactForm/>
    </main>
  );
}