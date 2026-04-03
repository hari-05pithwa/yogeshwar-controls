"use client";
import { useEffect, useRef, useMemo } from "react";
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

const logosData = [
  { src: "/logos/logo1.jpg", scale: 1.0 }, { src: "/logos/logo2.jpg", scale: 1.0 },
  { src: "/logos/logo3.jpg", scale: 1.1 }, { src: "/logos/logo4.jpg", scale: 1.5 },
  { src: "/logos/logo5.jpg", scale: 1.5 }, { src: "/logos/logo6.jpg", scale: 1.4 },
  { src: "/logos/logo7.jpg", scale: 1.0 }, { src: "/logos/logo8.jpg", scale: 1.0 },
  { src: "/logos/logo9.jpg", scale: 1.0 }, { src: "/logos/logo10.jpg", scale: 1.3 },
  { src: "/logos/logo11.jpg", scale: 1.4 }, { src: "/logos/logo12.jpg", scale: 1.0 },
  { src: "/logos/logo13.jpg", scale: 1.0 }, { src: "/logos/logo14.jpg", scale: 1.0 },
  { src: "/logos/logo15.jpg", scale: 1.0 }, { src: "/logos/logo16.jpg", scale: 1.0},
];

export default function Trust() {
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const row3Ref = useRef(null);

  // Distribute logos evenly and randomize for each row
  const rowLogos = useMemo(() => {
    const shuffled = [...logosData].sort(() => Math.random() - 0.5);
    return [
      [...shuffled.slice(0, 6)],
      [...shuffled.slice(5, 11)], // slightly overlapping to keep counts similar
      [...shuffled.slice(10, 16)]
    ];
  }, []);

  useEffect(() => {
    const setupMarquee = (el, direction = "left") => {
      if (!el) return;
      const isRight = direction === "right";
      
      gsap.fromTo(el, 
        { xPercent: isRight ? -50 : 0 },
        {
          xPercent: isRight ? 0 : -50,
          repeat: -1,
          duration: 30,
          ease: "none",
        }
      );
    };

    setupMarquee(row1Ref.current, "left");
    setupMarquee(row2Ref.current, "right");
    setupMarquee(row3Ref.current, "left");
  }, []);

  return (
    <section className="bg-white py-14 md:py-32 overflow-hidden">
      <div className="container mx-auto px-8 md:px-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 lg:gap-16 mb-28 md:mb-38">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h2 className="text-[#0B1221] text-7xl md:text-6xl lg:text-8xl font-black mb-4 tracking-tighter tabular-nums">
                <StatCounter value={stat.number} />
                {stat.suffix}
              </h2>
              <p className="text-gray-500 text-lg md:text-sm font-bold uppercase tracking-widest whitespace-nowrap">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center mb-8">
          <h3 className="text-[#0B1221] text-2xl md:text-3xl font-black relative inline-block uppercase tracking-tight">
            Trusted by Industry Leaders
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-[#FFD982] rounded-full" />
          </h3>
        </div>
      </div>

      {/* Marquee Wrapper with subtle side blur */}
      <div 
        className="relative mt-12 flex flex-col gap-10 md:gap-12 py-10"
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 5%, black 95%, transparent)'
        }}
      >
        {[row1Ref, row2Ref, row3Ref].map((ref, rowIndex) => (
          <div key={rowIndex} className="overflow-hidden flex">
            <div ref={ref} className="flex whitespace-nowrap">
              {/* Tripling the array ensures smooth infinite transition */}
              {[...rowLogos[rowIndex], ...rowLogos[rowIndex], ...rowLogos[rowIndex]].map((logo, index) => (
                <div key={index} className="flex-shrink-0 px-6 md:px-12 flex items-center justify-center">
                  <div 
                    className="relative"
                    style={{ 
                      width: '160px', 
                      height: '80px', 
                      transform: `scale(${logo.scale || 1})` 
                    }}
                  >
                    <Image
                      src={logo.src}
                      alt="Client Logo"
                      fill
                      className="object-contain"
                      sizes="160px"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function StatCounter({ value }) {
  const countRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      const obj = { val: 0 };
      gsap.to(obj, {
        val: value,
        duration: 2.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 90%",
          once: true,
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



//  { src: "/logos/logo1.jpg", scale: 1.0 },
//   { src: "/logos/logo2.jpg", scale: 1.0 },
//   { src: "/logos/logo3.jpg", scale: 1.1 },
//   { src: "/logos/logo4.jpg", scale: 1.6 },
//   { src: "/logos/logo5.jpg", scale: 1.6 },
//   { src: "/logos/logo6.jpg", scale: 1.5 },
//   { src: "/logos/logo7.jpg", scale: 1.0 },
//   { src: "/logos/logo8.jpg", scale: 1.0 },
//   { src: "/logos/logo9.jpg", scale: 1.0 },
//   { src: "/logos/logo10.jpg", scale: 1.4 },
//   { src: "/logos/logo11.jpg", scale: 1.5 }, 
//   { src: "/logos/logo12.jpg", scale: 1.0 },
//   { src: "/logos/logo13.jpg", scale: 1.0 },
//   { src: "/logos/logo14.jpg", scale: 1.0 },
//   { src: "/logos/logo15.jpg", scale: 1.2 }, 
//   { src: "/logos/logo16.jpg", scale: 1.3 },