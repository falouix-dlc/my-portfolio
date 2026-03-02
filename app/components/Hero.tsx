"use client";

import Link from "next/link";
import { ArrowRight, Download, MapPin, Sparkles } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Hero() {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const targetRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"], // Changed: track until section ENDS
  });

  const xSpring = useSpring(cursorX, { stiffness: 50, damping: 20 });
  const ySpring = useSpring(cursorY, { stiffness: 50, damping: 20 });
  
  // Fixed: Only start fading when 50% through the section, fully faded at 100%
  const scrollOpacity = useTransform(scrollYProgress, [0.9, 1.1], [1, 0]);
  const scrollScale = useTransform(scrollYProgress, [0.5, 0.9], [1, 0.95]);
  // Fixed: Slower vertical movement
  const scrollYText = useTransform(scrollYProgress, [0, 1], [0, 50]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      cursorX.set((e.clientX - centerX) * 0.15);
      cursorY.set((e.clientY - centerY) * 0.15);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [cursorX, cursorY]);

  const codeLines = [
    { text: "const developer = {", delay: 0 },
    { text: '  name: "Fakhreddine",', delay: 0.1 },
    { text: "  role: FullStack,", delay: 0.2 },
    { text: '  skills: ["Laravel", "React"],', delay: 0.3 },
    { text: "  available: true,", delay: 0.4 },
    { text: "};", delay: 0.5 },
  ];

  return (
    <section
      ref={targetRef}
      className="relative min-h-screen flex items-center pt-20 px-6 overflow-hidden bg-white dark:bg-[#020617]"
    >
      {/* Background - unchanged */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          style={{ x: xSpring, y: ySpring }}
          className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-blue-600/10 dark:bg-blue-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          style={{ x: useTransform(xSpring, v => -v * 0.5), y: useTransform(ySpring, v => -v * 0.5) }}
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-600/10 dark:bg-purple-600/20 rounded-full blur-[100px]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      {/* Content wrapper - NO scroll transforms here anymore */}
      <div className="max-w-7xl mx-auto w-full relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column - Apply scroll transforms HERE instead */}
          <motion.div
            style={{ 
              y: scrollYText,
              opacity: scrollOpacity,
              scale: scrollScale 
            }}
            className="order-2 lg:order-1"
          >
            {/* Status Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-500/10 border border-blue-200 dark:border-blue-500/20"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
              </span>
              <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                Available for opportunities
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-[1.1] tracking-tight text-slate-900 dark:text-white"
            >
              Hi, I'm{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                Fakhreddine
              </span>
              <span className="text-slate-900 dark:text-white">.</span>
              <br />
              <span className="text-slate-600 dark:text-slate-300 text-4xl md:text-5xl lg:text-6xl">
                I build{" "}
                <span className="relative">
                  <span className="relative z-10">scalable</span>
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="absolute bottom-2 left-0 w-full h-3 bg-blue-200 dark:bg-blue-500/30 -skew-x-6 -z-0"
                  />
                </span>{" "}
                digital systems.
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-lg md:text-xl text-slate-600 dark:text-slate-400 max-w-xl mb-8 leading-relaxed"
            >
              Full Stack Developer with <span className="font-semibold text-slate-900 dark:text-white">5+ years</span> of experience 
              building production-ready web and mobile applications using{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">Laravel</span>,{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">React</span>,{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">Node.js</span>, and{" "}
              <span className="text-blue-600 dark:text-blue-400 font-medium">Django</span>.
            </motion.p>

            {/* Location & Availability */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap items-center gap-4 mb-10 text-slate-600 dark:text-slate-500"
            >
              <div className="flex items-center gap-2">
                <MapPin size={18} />
                <span>Based in Italy</span>
              </div>
              <span className="hidden sm:inline text-slate-400">•</span>
              <div className="flex items-center gap-2">
                <Sparkles size={18} className="text-amber-500" />
                <span>Open to relocation</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap gap-4"
            >
              <Link
                href="#projects"
                className="group relative px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold flex items-center gap-2 transition-all overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  View My Work
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600"
                  initial={{ x: "100%" }}
                  whileHover={{ x: 0 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
              
              <Link
                href="Fakhreddine_CV.pdf"
                className="group px-8 py-4 border border-slate-200 dark:border-white/10 hover:border-blue-500/50 dark:hover:border-blue-500/50 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-xl font-semibold flex items-center gap-2 transition-all bg-white/50 dark:bg-transparent hover:bg-blue-50 dark:hover:bg-blue-500/10"
              >
                Download CV
                <Download size={18} className="group-hover:translate-y-1 transition-transform" />
              </Link>
            </motion.div>

            {/* Tech Stack Pills */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="mt-12 flex flex-wrap gap-2"
            >
              {["Laravel", "React", "Node.js", "Django", "TypeScript", "AWS"].map((tech, i) => (
                <motion.span
                  key={tech}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + i * 0.05 }}
                  className="px-3 py-1 text-xs rounded-full bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-white/10"
                >
                  {tech}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Code Visual (also with scroll transforms) */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            style={{ 
              opacity: scrollOpacity,
              scale: scrollScale,
              y: useTransform(scrollYProgress, [0, 1], [0, 30]) // Slower movement
            }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Code Editor Window */}
              <motion.div
                className="rounded-2xl overflow-hidden bg-slate-900 border border-slate-700/50 shadow-2xl"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center gap-2 px-4 py-3 bg-slate-800 border-b border-slate-700/50">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-amber-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="ml-4 text-xs text-slate-400 font-mono">developer.ts</div>
                </div>

                <div className="p-6 font-mono text-sm md:text-base leading-relaxed">
                  {codeLines.map((line, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: 0.5 + line.delay }}
                      className="flex"
                    >
                      <span className="text-slate-500 select-none w-8">
                        {i + 1}
                      </span>
                      <span className={`
                        ${line.text.includes("const") || line.text.includes("role:") ? "text-purple-400" : ""}
                        ${line.text.includes("name:") || line.text.includes("available:") ? "text-sky-300" : ""}
                        ${line.text.includes('"') ? "text-green-400" : ""}
                        ${line.text.includes("[") ? "text-amber-300" : ""}
                        ${line.text === "};" ? "text-slate-300" : ""}
                      `}>
                        {line.text.includes("FullStack") ? (
                          <>
                            role: <span className="text-amber-300">FullStack</span>,
                          </>
                        ) : (
                          line.text
                        )}
                      </span>
                    </motion.div>
                  ))}
                  <motion.span
                    animate={{ opacity: [1, 0] }}
                    transition={{ duration: 0.8, repeat: Infinity }}
                    className="inline-block w-2 h-5 bg-blue-500 ml-8 align-middle"
                  />
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-4 -right-4 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  5+ Years Exp
                </div>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 px-4 py-2 rounded-xl bg-white dark:bg-slate-800 shadow-lg border border-slate-200 dark:border-slate-700"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-800 dark:text-white">
                  <span className="text-blue-500">⚡</span>
                  Open to Work
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator - fades out later too */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
        style={{ opacity: useTransform(scrollYProgress, [0.7, 0.9], [1, 0]) }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 dark:text-slate-400"
      >
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2"
        >
          <motion.div className="w-1.5 h-1.5 rounded-full bg-current" />
        </motion.div>
      </motion.div>
    </section>
  );
}