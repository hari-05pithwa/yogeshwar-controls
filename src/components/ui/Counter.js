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
    // 1. Session check: Unique key for each counter based on its value/prefix
    const sessionKey = `animated-${prefix}-${value}-${suffix}`;
    const hasAlreadyAnimated = sessionStorage.getItem(sessionKey);

    // 2. If it has already animated this session, set final value immediately and skip GSAP
    if (hasAlreadyAnimated && countRef.current) {
      countRef.current.innerText = value;
      return;
    }

    const ctx = gsap.context(() => {
      const countObj = { val: 0 };

      gsap.to(countObj, {
        val: value,
        duration: duration,
        ease: "power2.out",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 90%", 
          toggleActions: "play none none none",
          once: true, 
          onEnter: () => {
            // 3. Mark as animated in sessionStorage when the scroll trigger starts
            sessionStorage.setItem(sessionKey, "true");
          }
        },
        onUpdate: () => {
          if (countRef.current) {
            countRef.current.innerText = Math.round(countObj.val);
          }
        },
      });
    }, scope);

    return () => ctx.revert(); 
  }, [value, duration, prefix, suffix]);

  return (
    <span ref={scope} className="tabular-nums">
      {prefix}
      <span ref={countRef}>0</span>
      {suffix}
    </span>
  );
}