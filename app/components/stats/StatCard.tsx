// StatCard.tsx
"use client";

import { motion, useInView, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface StatCardProps {
  label: string;
  value: string; // e.g., "12k", "100%", "2.5M"
  suffix?: string;
  prefix?: string;
}

export default function StatCard({ label, value, suffix = "", prefix = "" }: StatCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [isHovered, setIsHovered] = useState(false);
  
  // Parse numeric value handling k, M, %, etc.
  const parseValue = (val: string): number => {
    const clean = val.replace(/[^0-9.]/g, "");
    const num = parseFloat(clean);
    if (val.includes("M")) return num * 1000000;
    if (val.includes("k")) return num * 1000;
    if (val.includes("%")) return num;
    return num;
  };

  const numericValue = parseValue(value);
  const hasDecimal = value.includes(".");
  
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 100,
    mass: 1,
  });

  const displayValue = useTransform(springValue, (latest) => {
    if (value.includes("%")) return Math.round(latest);
    if (value.includes("M")) return (latest / 1000000).toFixed(hasDecimal ? 1 : 0);
    if (value.includes("k")) return (latest / 1000).toFixed(hasDecimal ? 1 : 0);
    return Math.round(latest);
  });

  useEffect(() => {
    if (isInView) {
      motionValue.set(numericValue);
    }
  }, [isInView, numericValue, motionValue]);

  // Mouse glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  return (
    <motion.div
      ref={ref}
      className="relative group p-8 rounded-2xl bg-gradient-to-br from-slate-900/50 to-slate-800/30 backdrop-blur-xl border border-white/10 overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ 
        scale: 1.02,
        borderColor: "rgba(59, 130, 246, 0.5)",
        transition: { duration: 0.2 }
      }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
      />
      
      {/* Mouse-following glow */}
      <motion.div
        className="absolute w-32 h-32 bg-blue-400/20 rounded-full blur-3xl pointer-events-none"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />

      {/* Top accent with animation */}
      <motion.div 
        className="absolute top-0 left-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-blue-500"
        initial={{ width: 0 }}
        animate={isInView ? { width: "40%" } : {}}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
      />

      {/* Corner decorations */}
      <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-blue-500/50" />
      <motion.div 
        className="absolute bottom-4 left-4 w-1 h-1 rounded-full bg-purple-500/50"
        animate={{ scale: isHovered ? 1.5 : 1, opacity: isHovered ? 1 : 0.5 }}
      />

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-1 mb-3">
          {prefix && (
            <span className="text-2xl md:text-3xl font-medium text-blue-400/80">
              {prefix}
            </span>
          )}
          <motion.span className="text-5xl md:text-6xl font-bold bg-gradient-to-br from-white via-slate-200 to-slate-400 bg-clip-text text-transparent tracking-tight">
            {displayValue}
          </motion.span>
          <span className="text-2xl md:text-3xl font-medium text-blue-400/80">
            {value.includes("k") ? "k" : value.includes("M") ? "M" : value.includes("%") ? "%" : ""}
          </span>
        </div>
        
        <motion.div 
          className="text-sm uppercase tracking-[0.2em] text-slate-500 font-medium"
          animate={{ color: isHovered ? "rgb(148, 163, 184)" : "rgb(100, 116, 139)" }}
        >
          {label}
        </motion.div>
      </div>

      {/* Bottom line reveal */}
      <motion.div
        className="absolute bottom-0 left-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, delay: 0.4 }}
      />
    </motion.div>
  );
}