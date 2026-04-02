"use client";
import { useRef } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link
import Button from "../ui/Button";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

export default function ServiceCard({ title, image, slug }) {
  const cardRef = useRef(null);
  const bgImageRef = useRef(null);
  const contentRef = useRef(null);

  const { contextSafe } = useGSAP({ scope: cardRef });

  const onMouseEnter = contextSafe(() => {
    gsap.to(bgImageRef.current, { scale: 1.05, duration: 1, ease: "power2.out" });
    gsap.to(contentRef.current, { y: -5, duration: 0.5 });
  });

  const onMouseLeave = contextSafe(() => {
    gsap.to(bgImageRef.current, { scale: 1, duration: 1, ease: "power2.out" });
    gsap.to(contentRef.current, { y: 0, duration: 0.5 });
  });

  return (
    <Link 
      href={`/services/${slug}`} 
      className="block flex-shrink-0 snap-center md:snap-start"
    >
      <div
        ref={cardRef}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        className="service-card group relative min-w-[300px] md:min-w-[380px]
                   aspect-[4/5] rounded-[30px] overflow-hidden 
                   shadow-lg cursor-pointer bg-[#0B1221]"
      >
        <div ref={bgImageRef} className="absolute inset-0 pointer-events-none">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 800px"
            quality={95}
            priority
          />
        </div>

        {/* IMPROVED OVERLAY: High-Contrast Scrim */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0B1221]/90 from-5% via-[#0B1221]/50 via-35% to-transparent to-65% pointer-events-none z-10" />

        <div ref={contentRef} className="absolute inset-x-0 bottom-0 p-8 z-20">
          <h3 className="text-white text-xl md:text-2xl font-bold mb-6 leading-tight drop-shadow-md">
            {title}
          </h3>

          <div className="flex">
            {/* The button remains for visual cue, but the whole card is the link */}
            <Button className="scale-90 origin-left !py-3 pointer-events-none">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}