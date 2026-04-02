"use client";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Services from "@/components/sections/Services";
import AboutSection from "@/components/sections/AboutSection"; // Import the new section
import ContactForm from "@/components/sections/ContactForm";

export default function Home() {
  return (
    <main className="relative bg-navy min-h-screen">
      <Hero />
      <Trust />
      <Services />
      <AboutSection /> {/* Added between Services and Contact */}
      <ContactForm />
    </main>
  );
}