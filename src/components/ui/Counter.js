"use client";
import { useEffect, useRef } from "react";
import { useInView, motion, useMotionValue, useSpring, useTransform } from "framer-motion";

function Counter({ value, direction = "up" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  
  const displayValue = useTransform(springValue, (latest) => Math.round(latest));

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, value, isInView]);

  return <span ref={ref}><motion.span>{displayValue}</motion.span></span>;
}