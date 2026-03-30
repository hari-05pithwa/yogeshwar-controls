"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import { 
  useInView, 
  motion, 
  useMotionValue, 
  useSpring, 
  useTransform 
} from "framer-motion";

function Counter({ value }) {
  const ref = useRef(null);
  
  // Changed to once: true so it never resets when scrolling back up
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  
  const springValue = useSpring(motionValue, {
    damping: 80,   
    stiffness: 80, 
  });
  
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
    // Removed the 'else' reset logic to keep the number at its final value
  }, [motionValue, value, isInView]);

  return (
    <span ref={ref}>
      <motion.span>{displayValue}</motion.span>
    </span>
  );
}

const stats = [
  { number: 50, suffix: "+", label: "Major Clients" },
  { number: 20, suffix: "+", label: "Years of Experience" },
  { number: 30, suffix: "+", label: "Skilled Experts" },
];

const logos = Array.from({ length: 16 }, (_, i) => `/logos/logo${i + 1}.jpeg`);

export default function Trust() {
  return (
    <section className="bg-white py-14 md:py-32 overflow-hidden">
      <div className="container mx-auto px-8 md:px-20">
        
        {/* --- Stats Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-38">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <h2 className="text-navy text-7xl md:text-8xl font-black mb-4 tracking-tighter">
                <Counter value={stat.number} />{stat.suffix}
              </h2>
              <p className="text-gray-500 text-lg md:text-xl font-bold uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* --- Trusted Partners Header --- */}
        <div className="text-center mb-8">
          <h3 className="text-navy text-2xl md:text-3xl font-black relative inline-block">
            Trusted by Industry Leaders.
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-24 h-1 bg-primary rounded-full" />
          </h3>
        </div>
      </div>

      {/* --- Infinite Logo Marquee --- */}
      <div className="relative flex mt-8 py-10">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            repeat: Infinity,
            duration: 50, 
            ease: "linear",
          }}
          className="flex flex-nowrap gap-12 md:gap-24 items-center whitespace-nowrap min-w-max px-12"
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
        </motion.div>
      </div>
    </section>
  );
}