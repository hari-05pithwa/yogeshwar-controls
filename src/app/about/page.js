"use client";
import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHeader from "@/components/ui/SectionHeader";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function About() {
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. Initial Hero Entrance
    const tl = gsap.timeline();
    tl.from(".reveal-text", {
      y: 50,
      opacity: 0,
      duration: 1,
      stagger: 0.2,
      ease: "expo.out"
    })
    .from(".reveal-video", {
      opacity: 0,
      duration: 1.5,
      ease: "power2.out"
    }, "-=0.8");

    // 2. Content Section Reveal
    gsap.from(".content-block-trigger", {
      scrollTrigger: {
        trigger: ".content-block-trigger",
        start: "top 85%",
        toggleActions: "play none none none"
      },
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    });

    // 3. Logo/Icon floating effect
    gsap.to(".float-icon", {
      y: -10,
      repeat: -1,
      yoyo: true,
      duration: 2,
      ease: "sine.inOut"
    });

  }, { scope: containerRef });

  return (
    <main ref={containerRef} className="bg-white overflow-x-hidden">
      {/* --- HERO SECTION WITH VIDEO BACKGROUND --- */}
      <section className="min-h-screen flex items-center bg-[#0B1221] text-white relative pt-20 overflow-hidden">
        {/* VIDEO CONTAINER */}
        <div className="absolute inset-0 z-0 reveal-video">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-40"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Gradients to ensure text pop and navbar visibility */}
          <div className="absolute inset-0 bg-gradient-to-b from-[#0B1221]/80 via-transparent to-[#0B1221]"></div>
          <div className="absolute inset-0 bg-[#0B1221]/20"></div>
        </div>

        <div className="container mx-auto px-6 md:px-16 lg:px-24 relative z-10 py-12">
          <div className="max-w-4xl reveal-text">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-[2px] w-8 bg-[#FFD982]"></div>
              <span className="text-[#FFD982] font-bold uppercase tracking-[0.3em] text-[10px] md:text-xs">
                Government Approved Contractor
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-[1.05] tracking-tight uppercase">
              Powering <br /> 
              Industrial <span className="text-[#FFD982]">Excellence.</span>
            </h1>
            <p className="text-gray-300 text-base md:text-lg lg:text-xl leading-relaxed max-w-2xl font-medium">
              Yogeshwar Controls is a licensed electrical contractor dedicated to the 
              installation, protection, and maintenance of high-voltage and low-voltage 
              distribution systems across industrial landscapes.
            </p>
          </div>
        </div>
      </section>

      {/* --- CONTENT SECTION --- */}
      <section className="py-20 md:py-32 bg-white content-block-trigger">
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32 items-start">
            <div className="space-y-6 md:space-y-10">
              <div className="space-y-4">
                <h2 className="text-[#0B1221] text-3xl md:text-5xl font-black leading-tight uppercase tracking-tighter">
                  The Lifeline of <br className="hidden md:block" />
                  Your Plant
                </h2>
                <div className="h-1.5 w-20 bg-[#FFD982]"></div>
              </div>
              <p className="text-gray-600 text-base md:text-lg lg:text-xl leading-relaxed font-medium">
                The low voltage distribution system is the heartbeat of any manufacturing plant. 
                Components like <strong className="text-[#0B1221]">ACBs, MCCBs, SDFs</strong>, and protection relays are critical for 
                switching and guarding expensive equipment like transformers and generators.
              </p>
              <div className="flex flex-wrap gap-2 md:gap-3 pt-2">
                {["Industries", "Buildings", "Utilities", "OEM Support"].map((tag) => (
                  <span key={tag} className="px-5 py-2 bg-[#0B1221] text-[#FFD982] font-bold text-[10px] md:text-xs uppercase tracking-widest shadow-lg">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-[#0B1221] p-10 md:p-16 rounded-[40px] md:rounded-[60px] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FFD982]/5 blur-3xl group-hover:bg-[#FFD982]/15 transition-all duration-700"></div>
              <h3 className="text-[#FFD982] text-xl md:text-2xl font-black mb-10 uppercase tracking-widest text-left">Our Capabilities</h3>
              <ul className="space-y-6 md:space-y-8 relative z-10">
                {[
                  "After Sales Service for HV & LV Systems",
                  "OEM Equipment Maintenance",
                  "Protection Relay Testing & Calibration",
                  "Switchgear Life-cycle Support",
                  "Government Licensed Compliance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FFD982] flex items-center justify-center shrink-0 mt-0.5 text-[#0B1221]">
                      <span className="material-symbols-outlined text-[14px] md:text-[18px] font-bold">bolt</span>
                    </div>
                    <span className="text-gray-200 font-bold text-sm md:text-lg tracking-tight leading-snug">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* --- VISION SECTION --- */}
      <section className="vision-section py-20 md:py-40 bg-[#F8F9FA] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#0B1221]/10 to-transparent"></div>
        
        <div className="container mx-auto px-6 md:px-16 lg:px-24">
          <div className="text-center mb-16 md:mb-24">
            <SectionHeader 
                title="Vision & Quality" 
                subtitle="Setting the gold standard in electrical engineering since our inception." 
            />
          </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-stretch">
  {/* Quality Card (Original Scheme) */}
  <div className="vision-card bg-white p-10 md:p-16 rounded-[40px] md:rounded-[70px] shadow-xl shadow-black/5 border border-white hover:border-[#FFD982] transition-all duration-500 flex flex-col group">
    <div className="float-icon w-16 h-16 md:w-20 md:h-20 bg-[#0B1221] rounded-[25px] flex items-center justify-center mb-10 shadow-lg shadow-[#0B1221]/20 group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-[#FFD982] text-3xl md:text-4xl">verified</span>
    </div>
    <h4 className="text-2xl md:text-4xl font-black text-[#0B1221] mb-6 uppercase tracking-tighter">Quality Standards</h4>
    <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
      We never compromise on Quality. Customer Satisfaction is our primary driver, 
      enabling us to execute complex industrial orders with unwavering precision.
    </p>
  </div>

  {/* Vision Card (Updated to match Quality Card Scheme) */}
  <div className="vision-card bg-white p-10 md:p-16 rounded-[40px] md:rounded-[70px] shadow-xl shadow-black/5 border border-white hover:border-[#FFD982] transition-all duration-500 flex flex-col group">
    <div className="float-icon w-16 h-16 md:w-20 md:h-20 bg-[#0B1221] rounded-[25px] flex items-center justify-center mb-10 shadow-lg shadow-[#0B1221]/20 group-hover:scale-110 transition-transform">
      <span className="material-symbols-outlined text-[#FFD982] text-3xl md:text-4xl">rocket_launch</span>
    </div>
    <h4 className="text-2xl md:text-4xl font-black text-[#0B1221] mb-6 uppercase tracking-tighter">Global Vision</h4>
    <p className="text-gray-500 text-base md:text-lg leading-relaxed font-medium">
      Adapting world-class technologies to provide high-quality services. We build 
      long-term partnerships through technical superiority and reliability.
    </p>
  </div>
</div>
        </div>
      </section>
    </main>
  );
}