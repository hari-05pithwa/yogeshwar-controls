"use client";
import { usePathname } from "next/navigation";
import Navbar from "@/components/layout/Navbar";
import Hero from "@/components/sections/Hero";
import Trust from "@/components/sections/Trust";
import Services from "@/components/sections/Services";

export default function Home() {
  const pathname = usePathname();

  return (
    // The key={pathname} is the "Magic Fix" for Back-Button issues.
    // It tells React: "If the path changed, treat this as a brand new page."
    <main key={pathname} className="relative bg-[#0B1221] min-h-screen">
      <Navbar />
      <Hero />
      <Trust />
      <Services />
    </main>
  );
}