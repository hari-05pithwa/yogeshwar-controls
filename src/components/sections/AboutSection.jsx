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
    <section ref={containerRef} className="about-section-trigger py-20 md:py-28 lg:py-32 xl:py-40 bg-white relative overflow-hidden">
      
      <div className="container mx-auto px-6 md:px-12 lg:px-16 xl:px-24 relative z-10">
        {/* Section Header */}
        <div className="mb-12 md:mb-16 xl:mb-24 about-reveal text-left">
          <SectionHeader 
            title="Who We Are" 
            subtitle="Leading the way in specialized industrial electrical engineering and distribution protection." 
          />
        </div>

        {/* BREAKPOINT ADJUSTMENTS:
            - gap-10 for tablet, xl:gap-20 for desktop.
            - md:grid-cols-12 remains to keep side-by-side layout from 768px+.
        */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 xl:gap-20 items-center">
          
          {/* Left Side: Industrial Power Visual 
              Reduced from col-span-5 to col-span-5 but adjusted sizes for 1279px
          */}
          <div className="md:col-span-5 about-reveal max-w-[450px] md:max-w-none mx-auto md:mx-0 w-full">
            <div className="relative">
              {/* Aspect ratio flips to square on tablets to save vertical space */}
              <div className="aspect-[4/5] md:aspect-square xl:aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] bg-[#0B1221] overflow-hidden relative shadow-2xl">
                <Image 
                  src="/services/service9.jpg" 
                  alt="Industrial Electrical Systems"
                  fill
                  className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1279px) 40vw, 33vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221] via-transparent to-transparent opacity-60"></div>
                
                <div className="absolute bottom-6 md:bottom-8 xl:bottom-10 right-0 bg-[#FFD982] px-6 md:px-8 py-3 md:py-4 rounded-l-full shadow-xl">
                  <p className="text-[#0B1221] font-black text-[10px] md:text-xs uppercase tracking-widest">Est. 2011</p>
                </div>
              </div>

              {/* Decorative Corner: Responsive scaling */}
              <div className="absolute -top-3 -left-3 md:-top-5 md:-left-5 w-16 h-16 md:w-20 xl:w-24 md:h-20 xl:h-24 border-t-4 border-l-4 border-[#FFD982] rounded-tl-3xl -z-10"></div>
            </div>
          </div>

          {/* Right Side: Content */}
          <div className="md:col-span-7 about-reveal mt-8 md:mt-0">
            {/* Title scales down on sub-1280px screens to prevent excessive wrapping */}
            <h2 className="text-4xl md:text-5xl xl:text-7xl font-black text-[#0B1221] uppercase tracking-tighter leading-[1.1] mb-6 xl:mb-8">
              Engineering <br /> <span className="text-[#0B1221]/30">Precision.</span>
            </h2>
            
            <p className="text-gray-600 text-base md:text-lg xl:text-xl leading-relaxed font-medium mb-8 xl:mb-12 max-w-2xl">
              Yogeshwar Controls serves as the technical backbone for industrial plants. As a government-approved licensed contractor, we bridge the gap between complex power requirements and seamless operational execution.
            </p>

            {/* Feature Grid: Spacing adjusted for laptop screens */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 xl:gap-10 mb-10 xl:mb-14">
              <div className="group">
                <div className="flex items-center gap-3 xl:gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                        <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl">verified</span>
                    </div>
                    <h4 className="text-[#0B1221] font-bold text-xs xl:text-sm uppercase tracking-wider">Certified Compliance</h4>
                </div>
                <p className="text-gray-500 text-xs xl:text-sm leading-relaxed font-medium">Executing projects strictly under IS/IEC standards with calibrated precision.</p>
              </div>

              <div className="group">
                <div className="flex items-center gap-3 xl:gap-4 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#0B1221] flex items-center justify-center shrink-0 group-hover:bg-[#FFD982] transition-colors duration-300">
                        <span className="material-symbols-outlined text-[#FFD982] group-hover:text-[#0B1221] text-xl">bolt</span>
                    </div>
                    <h4 className="text-[#0B1221] font-bold text-xs xl:text-sm uppercase tracking-wider">Mission Critical</h4>
                </div>
                <p className="text-gray-500 text-xs xl:text-sm leading-relaxed font-medium">Protecting your expensive assets through expert switchgear and protection relay support.</p>
              </div>
            </div>

            <Link 
              href="/about" 
              className="inline-flex items-center gap-4 xl:gap-6 bg-[#0B1221] text-[#FFD982] font-black uppercase tracking-widest px-8 md:px-10 xl:px-14 py-5 xl:py-6 rounded-full hover:bg-[#FFD982] hover:text-[#0B1221] transition-all duration-300 shadow-xl group text-xs md:text-sm xl:text-base"
            >
              Know More About Us
              <span className="material-symbols-outlined transition-transform group-hover:translate-x-2">arrow_forward</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Separation Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0B1221]/10 to-transparent"></div>
    </section>
  );
}