// app/data/stats.ts
import { Code2, Briefcase, Users, Award } from "lucide-react";

export const stats = [
  {
    value: "5+",
    label: "Years Experience",
    description: "Building production apps",
    icon: Briefcase,
    suffix: "+"
  },
  {
    value: "50+",
    label: "Projects Completed",
    description: "Across various industries",
    icon: Code2,
    suffix: "+"
  },
  {
    value: "30+",
    label: "Happy Clients",
    description: "Worldwide collaborations",
    icon: Users,
    suffix: "+"
  },
  {
    value: "100%",
    label: "Commitment",
    description: "To quality delivery",
    icon: Award,
    suffix: "%"
  },
];

// ✅ Must be named export (matches import in Stats.tsx)
export type Stat = typeof stats[0];