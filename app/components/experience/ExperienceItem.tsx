interface ExperienceItemProps {
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function ExperienceItem({
  role,
  company,
  period,
  description,
}: ExperienceItemProps) {
  return (
    <div className="relative pl-8 border-l border-white/10 pb-12">
      <div className="absolute left-[-6px] top-2 w-3 h-3 bg-blue-500 rounded-full" />

      <h3 className="text-xl font-bold text-white">{role}</h3>
      <p className="text-sm text-slate-400 mb-2">
        {company} • {period}
      </p>

      <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
        {description}
      </p>
    </div>
  );
}