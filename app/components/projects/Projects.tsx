// Projects.tsx
"use client";

import { projects } from "@/app/data/projects";
import ProjectCard from "./ProjectCard";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useRef } from "react";
import { Sparkles } from "lucide-react";

export default function Projects() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2], [0.9, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5], [5, 0]);
  
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const ySpring = useSpring(y, springConfig);
  const scaleSpring = useSpring(scale, springConfig);
  const rotateXSpring = useSpring(rotateX, springConfig);

  return (
    <section
      ref={sectionRef}
      id="projects"
      className="relative py-40 px-6 bg-[#020617] overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/20 via-transparent to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-purple-900/20 via-transparent to-transparent" />
      
      <div className="absolute inset-0 opacity-30">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      </div>

      {/* Floating orbs */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[120px]"
        animate={{ x: [0, 100, 0], y: [0, -50, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[140px]"
        animate={{ x: [0, -80, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div 
        style={{ y: ySpring, opacity, scale: scaleSpring, rotateX: rotateXSpring }}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-24 text-center">
          <motion.div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 text-blue-300 text-sm font-medium mb-8 backdrop-blur-xl"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.05, borderColor: "rgba(59,130,246,0.3)", backgroundColor: "rgba(59,130,246,0.1)" }}
          >
            <Sparkles size={16} className="text-amber-400" />
            <span className="tracking-wider uppercase text-xs">Portfolio</span>
          </motion.div>

          <motion.h2 
            className="text-5xl md:text-7xl font-bold mb-6 text-white"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">Projects</span>
          </motion.h2>

          <motion.div 
            className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-8"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
          />

          <motion.p 
            className="text-slate-400 max-w-2xl mx-auto text-xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            Crafting digital experiences with cutting-edge technologies. 
            Each project represents a unique challenge solved with precision.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {projects
            .filter((project): project is typeof projects[number] & { image: string } => !!project.image)
            .map((project, index) => (
              <ProjectCard 
                key={project.title} 
                {...project} 
                index={index}
              />
            ))}
        </div>

        {/* Footer */}
        <motion.div
          className="mt-32 flex flex-col items-center gap-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-4">
            <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-slate-700" />
            <span className="text-slate-600 text-sm tracking-[0.3em] uppercase font-light">Always innovating</span>
            <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-slate-700" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}