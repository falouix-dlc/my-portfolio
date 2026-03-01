// components/StatCard.tsx
"use client";

import { motion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  value: string;
  label: string;
  description?: string;
  icon: LucideIcon;
  suffix?: string;
  index?: number;
}

export default function StatCard({ 
  value, 
  label, 
  description, 
  icon: Icon,
  suffix = "",
  index = 0 
}: StatCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Extract numeric value for animation
  const numericValue = parseInt(value.replace(/\D/g, "")) || 0;
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, { stiffness: 50, damping: 20 });
  const rounded = useTransform(springValue, (latest) => Math.round(latest));
  
  useEffect(() => {
    const unsubscribe = rounded.on("change", (latest) => {
      setDisplayValue(latest);
    });
    return () => unsubscribe();
  }, [rounded]);

  // Trigger animation when in view
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          springValue.set(numericValue);
        }
      },
      { threshold: 0.5 }
    );
    
    if (cardRef.current) observer.observe(cardRef.current);
    return () => observer.disconnect();
  }, [numericValue, springValue]);

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        ease: [0.25, 0.46, 0.45, 0.94] 
      }
    },
  };

  // Format display value
  const formattedValue = value.includes("k") 
    ? `${displayValue}k` 
    : value.includes("M") 
    ? `${displayValue}M` 
    : value.includes("%") 
    ? `${displayValue}%` 
    : `${displayValue}${suffix}`;

  return (
    <motion.div
      ref={cardRef}
      variants={itemVariants}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="group relative"
    >
      <motion.div
        className="relative p-6 md:p-8 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/[0.08] hover:border-blue-500/30 dark:hover:border-blue-500/30 transition-colors overflow-hidden"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        {/* Hover glow effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity"
          initial={false}
          animate={{ opacity: isHovered ? 1 : 0 }}
        />

        {/* Icon */}
        <motion.div 
          className="relative mb-4 inline-flex p-3 rounded-xl bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400"
          whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
          transition={{ duration: 0.5 }}
        >
          <Icon size={24} />
        </motion.div>

        {/* Value with counter animation */}
        <div className="relative">
          <motion.span 
            className="block text-4xl md:text-5xl font-bold text-slate-900 dark:text-white tabular-nums"
            key={formattedValue}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {formattedValue}
          </motion.span>
          
          {/* Suffix indicator if present */}
          {suffix && !formattedValue.includes(suffix) && (
            <span className="text-lg text-slate-500 dark:text-slate-500 ml-1">
              {suffix}
            </span>
          )}
        </div>

        {/* Label */}
        <h3 className="relative mt-2 text-sm md:text-base font-medium text-slate-600 dark:text-slate-400 uppercase tracking-wider">
          {label}
        </h3>

        {/* Description tooltip on hover */}
        {description && (
          <motion.p
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: isHovered ? 1 : 0, height: isHovered ? "auto" : 0 }}
            className="relative mt-2 text-xs md:text-sm text-slate-500 dark:text-slate-500"
          >
            {description}
          </motion.p>
        )}

        {/* Corner accent */}
        <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-blue-500/5 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {/* Bottom line accent */}
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500"
          initial={{ width: "0%" }}
          whileHover={{ width: "100%" }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>
    </motion.div>
  );
}