"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register the ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function GSAPCounter({ 
  value, 
  duration = 2, 
  prefix = "", 
  suffix = "" 
}) {
  const scope = useRef(null);
  const countRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create a dummy object to animate the value
      const countObj = { val: 0 };

      gsap.to(countObj, {
        val: value,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 90%", // Starts when the top of element hits 90% of viewport height
          toggleActions: "play none none none",
          once: true, // Animations plays only once as requested in your snippet
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.innerText = Math.round(countObj.val);
          }
        },
      });
    }, scope);

    return () => ctx.revert(); // Cleanup on unmount
  }, [value, duration]);

  return (
    <span ref={scope}>
      {prefix}
      <span ref={countRef}>0</span>
      {suffix}
    </span>
  );
}