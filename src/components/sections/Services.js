"use client";
import { useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Button from "../ui/Button";

const services = [
  { title: "Preventive Maintenance", image: "/hero-bg.jpg" },
  { title: "High Voltage Distribution", image: "/hero-bg.jpg" },
  { title: "Industrial Automation", image: "/hero-bg.jpg" },
  { title: "Panel Board Manufacturing", image: "/hero-bg.jpg" },
  { title: "Electrical Energy Audits", image: "/hero-bg.jpg" },
];

export default function Services() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const card = scrollRef.current.querySelector('.service-card');
      const cardWidth = card.clientWidth;
      const gap = 24; 
      const scrollAmount = cardWidth + gap;

      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    /* Background changed to a very soft gray/white for section separation */
    <section className="bg-[#fafafa] py-20 md:py-28">
      <div className="container mx-auto px-0 md:px-16 lg:px-24">
        
        {/* Section Header */}
        <div className="text-center mb-8 px-6">
          <h2 className="text-black text-3xl md:text-5xl font-black tracking-tight">
            Our Core Services
          </h2>
          <div className="w-16 h-1 bg-primary mx-auto mt-4 rounded-full opacity-50" />
        </div>

        {/* Carousel Container */}
        <div className="relative">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-8 
                       px-10 md:px-0" 
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {services.map((service, index) => (
              <motion.div
                key={index}
             // Reduced from -10 to -5 for minimal lift
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="service-card 
                           min-w-[80%] sm:min-w-[45%] md:min-w-[32%] lg:min-w-[28%] 
                           aspect-[4/5] relative rounded-[45px] overflow-hidden 
                           snap-center md:snap-start flex-shrink-0 shadow-lg group cursor-pointer"
              >
                {/* Image with very subtle hover zoom */}
                <div className="absolute inset-0 transition-transform duration-1000 group-hover:scale-105">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>

                {/* Dark gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                
                {/* Content Overlay */}
                <div className="absolute bottom-10 left-8 right-8">
                  <h3 className="text-white text-2xl md:text-3xl font-bold mb-6 leading-tight tracking-tight">
                    {service.title}
                  </h3>
                  
                  <div className="flex">
                    <Button>Explore</Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
<div className="flex justify-center gap-4 mt-12">
  <button 
    onClick={() => scroll("left")}
    className="w-14 h-14 rounded-full bg-[#FFED98] flex items-center justify-center 
               hover:scale-105 active:scale-95 transition-all"
  >
    <span 
      className="material-symbols-outlined text-black" 
      style={{ fontVariationSettings: "'wght' 700" }} // This makes the icon bold
    >
      arrow_back
    </span>
  </button>
  
  <button 
    onClick={() => scroll("right")}
    className="w-14 h-14 rounded-full bg-[#FFED98] flex items-center justify-center 
               hover:scale-105 active:scale-95 transition-all"
  >
    <span 
      className="material-symbols-outlined text-black" 
      style={{ fontVariationSettings: "'wght' 700" }} // This makes the icon bold
    >
      arrow_forward
    </span>
  </button>
</div>
        </div>
      </div>
    </section>
  );
}