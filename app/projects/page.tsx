// app/projects/page.tsx
import ProjectCard from "../components/projects/ProjectCard";

const projects = [
  { title: "Portfolio Website", description: "Next.js portfolio", image: "/images/project1.png", link: "#" },
  { title: "E-commerce App", description: "React & Firebase store", image: "/images/project2.png", link: "#" },
];

export default function Projects() {
  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">
      {projects.map((p, i) => (
        <ProjectCard key={i} {...p} />
      ))}
    </div>
  );
}