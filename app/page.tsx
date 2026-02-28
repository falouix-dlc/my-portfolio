"use client";


import Hero from "@/app/components/Hero";
import Stats from "@/app/components/stats/Stats";
import Projects from "@/app/components/projects/Projects";
import Experience from "@/app/components/experience/Experience";
export default function Home() {
  return (
    <main className="relative bg-[#020617] text-slate-200">
      <Hero />
      <Stats />
      <Experience />
      <Projects />
    </main>
  );
}