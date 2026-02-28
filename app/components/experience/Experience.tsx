// Experience.tsx
"use client";

import { experience } from "@/app/data/experience";
import ExperienceItem from "./ExperienceItem";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";

export default function Experience() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Parallax effects matching Stats.tsx style
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.95, 1]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);

  // Staggered children animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative py-32 px-6 bg-[#020617] overflow-hidden"
    >
      {/* Background elements matching Stats.tsx */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-purple-900/10 via-[#020617] to-[#020617]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      {/* Floating ambient orbs */}
      <motion.div
        className="absolute top-40 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-[100px]"
        animate={{
          x: [0, -40, 0],
          y: [0, 40, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-40 left-20 w-80 h-80 bg-blue-500/10 rounded-full blur-[120px]"
        animate={{
          x: [0, 30, 0],
          y: [0, -30, 0],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div 
        style={{ y: ySpring, opacity, scale: scaleSpring }}
        className="relative z-10 max-w-5xl mx-auto"
      >
        {/* Section header matching Stats.tsx style */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="inline-block px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-sm font-medium mb-6"
            whileHover={{ scale: 1.05, borderColor: "rgba(168, 85, 247, 0.4)" }}
            transition={{ duration: 0.2 }}
          >
            Career Path
          </motion.span>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Experience</span>
          </h2>
          
          <p className="text-slate-400 max-w-2xl text-lg leading-relaxed">
            5+ years of building scalable applications, collaborating with cross-functional teams, and delivering high-impact solutions across diverse industries.
          </p>
        </motion.div>

        {/* Timeline container */}
        <motion.div 
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Vertical timeline line */}
          <div className="absolute left-0 md:left-8 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-slate-700 to-transparent hidden md:block" />
          
          {/* Experience items */}
          <div className="space-y-12">
            {experience.map((item, index) => (
              <ExperienceItem key={item.id || index} {...item} index={index} />
            ))}
          </div>
        </motion.div>

        {/* Bottom decoration matching Stats.tsx */}
        <motion.div
          className="mt-20 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-3 text-slate-600 text-sm">
            <div className="w-12 h-[1px] bg-gradient-to-r from-transparent to-slate-700" />
            <span className="tracking-wider uppercase text-xs">Open to new opportunities</span>
            <div className="w-12 h-[1px] bg-gradient-to-l from-transparent to-slate-700" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}