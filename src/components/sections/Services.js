"use client";
import { useRef } from "react";
import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import ServiceCard from "../ui/ServiceCard";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 1. ADD SLUGS HERE
const services = [
  { 
    title: "Electrical Installation", 
    image: "/services/service1.jpg", 
    slug: "electrical-installation" 
  },
  { 
    title: "Maintenance & AMC", 
    image: "/services/service2.jpg", 
    slug: "maintenance-amc" 
  },
  { 
    title: "Switchgear Services", 
    image: "/services/service3.jpg", 
    slug: "switchgear-services" 
  },
  { 
    title: "Transformer Services", 
    image: "/services/service4.jpg", 
    slug: "transformer-services" 
  },
  { 
    title: "Energy Audit", 
    image: "/services/service5.jpg", 
    slug: "energy-audit" 
  },
  { 
    title: "Automation & Repair", 
    image: "/services/service6.jpg", 
    slug: "automation-repair" 
  },
];

export default function Services() {
  const scrollRef = useRef(null);
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 80%",
      }
    });

    tl.from(".service-card", {
      y: 40,
      opacity: 0,
      duration: 1,
      stagger: 0.1,
      ease: "power3.out",
    })
    .from(".explore-link", {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    }, "-=0.6");
  }, { scope: containerRef });

  const scroll = (direction) => {
    if (scrollRef.current) {
      const container = scrollRef.current;
      const card = container.querySelector(".service-card");
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24; 
        const scrollAmount = cardWidth + gap; 
        container.scrollBy({
          left: direction === "left" ? -scrollAmount : scrollAmount,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section ref={containerRef} className="py-20 md:py-28 bg-[#F8F9FA] overflow-hidden">
      <div className="container mx-auto px-0 md:px-16 lg:px-24 relative">
        
        <div className="max-w-3xl mx-auto mb-12 text-center px-6">
          <SectionHeader 
            title="Our Core Services" 
            subtitle="Expert electrical solutions tailored for industrial excellence and safety."
          />
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute -left-20 top-1/2 -translate-y-1/2 z-30">
            <NavButton direction="left" onClick={() => scroll("left")} />
          </div>

          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory py-4 px-[15%] scroll-px-[15%] md:px-2 md:scroll-px-0 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {services.map((service, index) => (
              <ServiceCard 
                key={index} 
                title={service.title} 
                image={service.image} 
                slug={service.slug} // 2. PASS SLUG TO CARD
              />
            ))}
          </div>

          <div className="hidden lg:flex absolute -right-20 top-1/2 -translate-y-1/2 z-30">
            <NavButton direction="right" onClick={() => scroll("right")} />
          </div>
        </div>

        <div className="flex lg:hidden justify-center gap-6 mt-10">
          <NavButton direction="left" onClick={() => scroll("left")} />
          <NavButton direction="right" onClick={() => scroll("right")} />
        </div>

        <div className="explore-link flex justify-center mt-16 md:mt-10">
          <Link 
            href="/services" 
            className="bg-[#FFD982] hover:bg-[#0B1221] hover:text-white text-[#0B1221] font-bold py-4 px-10 rounded-xl flex items-center justify-center gap-2 transition-all group shadow-lg active:scale-95"
          >
            <span className="tracking-widest text-sm">
              Explore All Services
            </span>
            <span className="material-symbols-outlined transition-transform group-hover:translate-x-1">
              arrow_forward
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}

function NavButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className="w-14 h-14 rounded-full bg-[#0B1221] border border-white/10 flex items-center justify-center 
                 hover:bg-[#FFD982] transition-all duration-300 
                 shadow-2xl active:scale-95 group z-40"
    >
      <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] transition-colors text-[32px] font-bold">
        {direction === "left" ? "chevron_left" : "chevron_right"}
      </span>
    </button>
  );
}