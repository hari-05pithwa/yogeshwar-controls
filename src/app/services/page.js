"use client";
import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ServiceCard from "@/components/ui/ServiceCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const allServices = [
  { title: "Electrical Installation", image: "/services/service1.jpeg", slug: "electrical-installation" },
  { title: "Maintenance & AMC", image: "/services/service2.jpeg", slug: "maintenance-amc" },
  { title: "Switchgear Services", image: "/services/service3.jpeg", slug: "switchgear-services" },
  { title: "Transformer Services", image: "/services/service4.jpeg", slug: "transformer-services" },
  { title: "Energy Audit", image: "/services/service5.jpeg", slug: "energy-audit" },
  { title: "Automation & Repair", image: "/services/service6.jpeg", slug: "automation-repair" },
  { title: "Electrical Testing & Calibration", image: "/services/service7.jpeg", slug: "testing-calibration" },
  { title: "Earthing & Safety", image: "/services/service8.jpeg", slug: "earthing-safety" },
  { title: "HT/LT Services", image: "/services/service9.jpg", slug: "ht-lt-services" },
  { title: "Breakdown Support", image: "/services/service10.jpg", slug: "breakdown-support" },
];

export default function ServicesPage() {
  const containerRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out",
    });

    gsap.from(".service-item", {
      scrollTrigger: {
        trigger: ".services-grid",
        start: "top 85%",
      },
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-white overflow-x-hidden">
      
      {/* --- HERO SECTION --- */}
      <section className="relative min-h-screen flex items-center bg-[#0B1221] text-white pt-20">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-50"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/80 via-transparent to-[#0B1221]/60"></div>
        </div>

        <div className="container mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="max-w-4xl reveal-text">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-12 bg-[#FFD982]"></div>
              <span className="text-[#FFD982] font-bold uppercase tracking-[0.3em] text-xs md:text-sm">
                Our Expertise
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-[1.1] mb-6">
              Specialized <br /> 
              <span className="text-[#FFD982]">Engineering.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Delivering high-performance industrial electrical solutions. From preventive maintenance and energy audits to mission-critical breakdown support, we ensure your plant's power remains uninterrupted.
            </p>
          </div>
        </div>
      </section>

      {/* --- SERVICES GRID SECTION --- */}
      <section className="services-grid py-24 md:py-32 lg:py-40 bg-white">
        <div className="container mx-auto px-8 md:px-20 lg:px-24">
          
          <div className="mb-16 md:mb-24">
            <h2 className="text-[#0B1221] text-4xl md:text-5xl lg:text-6xl font-black uppercase tracking-tight leading-none">
              Industrial Solutions
            </h2>
            <div className="h-1.5 w-24 bg-[#FFD982] mt-6 md:mt-8"></div>
          </div>

          {/* 
              REFINED GRID LOGIC:
              1. Mobile/Portrait Tablet (up to 1023px): 1 column (gives cards full width to breathe)
              2. Landscape Tablet/Desktop (1024px+): 2 columns
              3. Large Screens (1280px+): 3 columns
              Added large gaps (gap-16) to ensure separation.
          */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-12 md:gap-16 lg:gap-12 xl:gap-16">
            {allServices.map((service, index) => (
              <div key={index} className="service-item h-full">
                <ServiceCard 
                  title={service.title} 
                  image={service.image} 
                  slug={service.slug} 
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="py-24 md:py-32 bg-[#F8F9FA] border-t border-gray-100">
        <div className="container mx-auto px-6 text-center">
          <div className="max-w-3xl mx-auto">
            <h3 className="text-[#0B1221] text-3xl md:text-5xl lg:text-6xl font-black uppercase mb-8 leading-tight tracking-tight">
              Need a Technical <span className="text-[#0B1221]">Evaluation?</span>
            </h3>
            <p className="text-gray-600 font-bold text-lg md:text-xl mb-12 leading-relaxed">
              Our engineering team provides comprehensive audits and breakdown support across industrial landscapes.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[#0B1221] text-[#FFD982] font-black uppercase tracking-[0.2em] px-14 py-6 rounded-full hover:bg-[#FFD982] hover:text-[#0B1221] transition-all duration-300 shadow-xl text-sm md:text-base"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}