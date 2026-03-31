"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const stats = [
  { number: 50, suffix: "+", label: "Major Clients" },
  { number: 20, suffix: "+", label: "Years of Experience" },
  { number: 30, suffix: "+", label: "Skilled Experts" },
];

const logos = Array.from({ length: 16 }, (_, i) => `/logos/logo${i + 1}.jpeg`);

export default function Trust() {
  const marqueeRef = useRef(null);

  useEffect(() => {
    // Infinite Marquee Animation
    const marquee = marqueeRef.current;
    if (marquee) {
      gsap.to(marquee, {
        xPercent: -50,
        repeat: -1,
        duration: 40,
        ease: "none",
      });
    }
  }, []);

  return (
    <section className="bg-white py-14 md:py-32 overflow-hidden">
      <div className="container mx-auto px-8 md:px-20">
        
        {/* --- Stats Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-28 md:mb-38">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h2 className="text-[#0B1221] text-7xl md:text-8xl font-black mb-4 tracking-tighter tabular-nums">
                <StatCounter value={stat.number} />
                {stat.suffix}
              </h2>
              <p className="text-gray-500 text-lg md:text-xl font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- Trusted Partners Header --- */}
        <div className="text-center mb-8">
          <h3 className="text-[#0B1221] text-2xl md:text-3xl font-black relative inline-block">
            Trusted by Industry Leaders.
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FFD982] rounded-full" />
          </h3>
        </div>
      </div>

      {/* --- Infinite Logo Marquee --- */}
      <div className="relative mt-8 py-10 overflow-hidden">
        <div 
          ref={marqueeRef}
          className="flex whitespace-nowrap gap-12 md:gap-24 w-max px-12"
        >
          {[...logos, ...logos].map((logo, index) => (
            <div
              key={index}
              className="relative w-32 h-16 md:w-44 md:h-20 transition-all duration-500 flex-shrink-0"
            >
              <Image
                src={logo}
                alt="Partner Logo"
                fill
                className="object-contain"
                sizes="(max-width: 768px) 128px, 176px"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Internal GSAP Counter - Plays on every Refresh/Mount
function StatCounter({ value }) {
  const countRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // Removed sessionKey and hasAnimated logic to ensure it plays every refresh

    let ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2, // Slightly faster for better "snappiness" on refresh
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true, // Only plays once as you scroll down, but restarts if you refresh
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.innerText = Math.floor(obj.val);
          }
        },
      });
    });

    return () => ctx.revert();
  }, [value]);

  return (
    <span ref={containerRef}>
      <span ref={countRef}>0</span>
    </span>
  );
}