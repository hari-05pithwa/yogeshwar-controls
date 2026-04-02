"use client";
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function AboutSection() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from(".about-reveal", {
      scrollTrigger: {
        trigger: ".about-section-trigger",
        start: "top 80%",
      },
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "power3.out"
    });
  }, { scope: containerRef });

  return (
    <section ref={containerRef} className="about-section-trigger py-24 md:py-32 bg-white relative overflow-hidden">
     
      <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10">
        {/* Section Header Component */}
        <div className="mb-16 md:mb-24 about-reveal text-left">
          <SectionHeader 
            title="Who We Are" 
            subtitle="Leading the way in specialized industrial electrical engineering and distribution protection." 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Side: Industrial Power Visual */}
          <div className="lg:col-span-5 about-reveal px-2 md:px-0">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2.5rem] bg-[#0B1221] overflow-hidden relative shadow-2xl">
                <Image 
                  src="/services/service9.jpg" 
                  alt="Industrial Electrical Systems"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-10 right-0 bg-[#FFD982] px-8 py-4 rounded-l-full shadow-xl">
                  <p className="text-[#0B1221] font-black text-xs uppercase tracking-widest">Est. 2011</p>
                </div>
              </div>

              <div className="absolute -top-4 -left-4 md:-top-6 md:-left-6 w-24 h-24 border-t-4 border-l-4 border-[#FFD982] rounded-tl-3xl -z-10"></div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="lg:col-span-7 about-reveal">
            <h2 className="text-4xl md:text-6xl font-black text-[#0B1221] uppercase tracking-tighter leading-[1.1] mb-8">
              Engineering <br /> <span className="text-[#0B1221]/30">Precision.</span>
            </h2>
            
            <p className="text-gray-600 text-lg md:text-xl leading-relaxed font-medium mb-10 max-w-2xl">
              Yogeshwar Controls serves as the technical backbone for industrial plants. As a government-approved licensed contractor, we bridge the gap between complex power requirements and seamless operational execution.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
              <div className="group">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                        <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl">verified</span>
                    </div>
                    <h4 className="text-[#0B1221] font-bold text-sm uppercase tracking-wider">Certified Compliance</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Executing projects strictly under IS/IEC standards with calibrated precision.</p>
              </div>

              <div className="group">
                <div className="flex items-center gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                        <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl">bolt</span>
                    </div>
                    <h4 className="text-[#0B1221] font-bold text-sm uppercase tracking-wider">Mission Critical</h4>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed font-medium">Protecting your expensive assets through expert switchgear and protection relay support.</p>
              </div>
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-6 bg-[#0B1221] text-[#FFD982] font-black uppercase tracking-widest px-12 py-6 rounded-full hover:bg-[#FFD982] hover:text-[#0B1221] transition-all duration-300 shadow-xl group"
            >
              Know More About Us
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* --- SEPARATION LINE AT BOTTOM --- */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0B1221]/10 to-transparent"></div>
    </section>
  );
}