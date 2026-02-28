// ProjectCard.tsx
"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  link: string;
  github?: string;
  technologies?: string[];
  index?: number;
  featured?: boolean;
}

export default function ProjectCard({ 
  title, 
  description, 
  image, 
  link, 
  github,
  technologies = [],
  index = 0,
  featured = false
}: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [isHovered, setIsHovered] = useState(false);

  // 3D tilt effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 500, damping: 100 });
  const mouseYSpring = useSpring(y, { stiffness: 500, damping: 100 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["8deg", "-8deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-8deg", "8deg"]);
  
  // Glare effect
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], [0, 100]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], [0, 100]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  };

  return (
    <motion.div
      ref={ref}
      className={`relative group ${featured ? 'md:col-span-2' : ''}`}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.22, 1, 0.36, 1] 
      }}
      style={{ perspective: 1000 }}
    >
      <motion.div
        className={`relative rounded-3xl bg-slate-900/40 backdrop-blur-2xl border border-white/[0.08] overflow-hidden cursor-pointer h-full
          ${featured ? 'md:grid md:grid-cols-2' : ''}
        `}
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        whileHover={{ 
          borderColor: "rgba(255,255,255,0.2)",
          boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5), 0 0 30px rgba(59,130,246,0.15)",
          zIndex: 10
        }}
        transition={{ duration: 0.4 }}
      >
        {/* Glare effect */}
        <motion.div
          className="absolute inset-0 pointer-events-none z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: useTransform(
              [glareX, glareY],
              ([latestX, latestY]) => 
                `radial-gradient(circle at ${latestX}% ${latestY}%, rgba(255,255,255,0.15) 0%, transparent 50%)`
            )
          }}
        />

        {/* Top line */}
        <motion.div 
          className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-blue-500 to-transparent z-20"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, delay: 0.5 + index * 0.2 }}
        />

        {/* Image Section */}
        <div className={`relative overflow-hidden ${featured ? 'md:h-full h-64' : 'h-64'}`}>
          <motion.div
            className="absolute inset-0"
            animate={{ 
              scale: isHovered ? 1.1 : 1,
              filter: isHovered ? "brightness(1.1)" : "brightness(1)"
            }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image 
              src={"/images/projects/image1.png"} 
              alt={title} 
              fill 
              className="object-cover"
              sizes={featured ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 50vw"}
              priority={index < 2}
            />
          </motion.div>
          
          {/* Overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-purple-900/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2 z-20">
            {github && (
              <motion.a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full bg-black/30 backdrop-blur-xl border border-white/10 text-white"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
                whileHover={{ scale: 1.1, backgroundColor: "rgba(255,255,255,0.15)" }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                onClick={(e) => e.stopPropagation()}
              >
                <Github size={18} />
              </motion.a>
            )}
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 rounded-full bg-blue-500/20 backdrop-blur-xl border border-blue-400/30 text-blue-300"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -20 }}
              whileHover={{ scale: 1.1, backgroundColor: "rgba(59,130,246,0.4)" }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
            >
              <ArrowUpRight size={18} />
            </motion.a>
          </div>

          {/* Featured badge */}
          {featured && (
            <motion.div 
              className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500/20 to-orange-500/20 border border-amber-500/30 text-amber-300 text-xs font-semibold tracking-wider uppercase backdrop-blur-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              Featured
            </motion.div>
          )}
        </div>

        {/* Content Section */}
        <div className={`relative p-8 flex flex-col ${featured ? 'md:justify-center' : ''}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative z-10">
            <motion.h3 
              className="text-2xl md:text-3xl font-bold text-white mb-4 tracking-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-slate-300 transition-all duration-300"
            >
              {title}
            </motion.h3>

            <p className="text-slate-400 leading-relaxed mb-6 group-hover:text-slate-300 transition-colors duration-300">
              {description}
            </p>

            {/* Technologies */}
            {technologies.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {technologies.map((tech, i) => (
                  <motion.span
                    key={tech}
                    className="relative px-4 py-1.5 rounded-full text-xs font-medium text-slate-300 overflow-hidden group/tech"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.6 + i * 0.05 + index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <span className="absolute inset-0 bg-white/5 border border-white/10 rounded-full group-hover/tech:bg-white/10 group-hover/tech:border-blue-400/30 transition-all duration-300" />
                    <span className="relative z-10">{tech}</span>
                  </motion.span>
                ))}
              </div>
            )}

            {/* CTA */}
            <motion.a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors group/link"
              whileHover={{ x: 8 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              <span className="tracking-wider uppercase">View Project</span>
              <div className="relative p-2 rounded-full bg-blue-500/10 border border-blue-400/20 group-hover/link:bg-blue-500/20 group-hover/link:border-blue-400/40 transition-all">
                <ExternalLink size={14} className="group-hover/link:rotate-12 transition-transform duration-300" />
              </div>
            </motion.a>
          </div>

          {/* Corner accents */}
          <div className="absolute bottom-6 right-6 w-3 h-3 rounded-full bg-blue-500/20 group-hover:bg-blue-400/40 transition-colors duration-300" />
          <div className="absolute bottom-6 right-10 w-1.5 h-1.5 rounded-full bg-purple-500/20 group-hover:bg-purple-400/40 transition-colors duration-300 delay-75" />
        </div>
      </motion.div>
    </motion.div>
  );
}