import { motion } from "motion/react";
import { useInView } from "./useInView";
import { useState, useEffect } from "react";

export function Skills() {
  const [ref, isInView] = useInView({ threshold: 0.1 });

  const skills = [
    { name: "React / Next.js", level: 95, color: "from-blue-500 to-cyan-500" },
    { name: "JavaScript / TypeScript", level: 92, color: "from-amber-400 to-yellow-500" },
    { name: "Tailwind CSS / UI Styling", level: 90, color: "from-purple-500 to-pink-500" },
    { name: "Node.js / Express", level: 85, color: "from-emerald-500 to-teal-500" },
    { name: "PHP / MySQL", level: 85, color: "from-indigo-500 to-blue-600" },
    { name: "Python / Automation", level: 80, color: "from-sky-500 to-indigo-500" },
  ];

  const tools = [
    "HTML5 & CSS3", "MongoDB", "Firebase", "Recharts", "Git & GitHub", "GitHub Actions",
    "Vite", "Vercel", "Hostinger", "Figma", "Postman", "VS Code"
  ];

  return (
    <section id="skills" className="min-h-screen flex items-center py-20 px-4 sm:px-6 lg:px-8 bg-accent/20">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
            Skills & Expertise
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-12" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Skills with Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-8">Technical Skills</h3>
            <div className="space-y-6">
              {skills.map((skill, index) => (
                <SkillBar
                  key={index}
                  skill={skill}
                  delay={index * 0.1}
                  isInView={isInView}
                />
              ))}
            </div>
          </motion.div>

          {/* Tools & Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h3 className="text-xl sm:text-2xl font-semibold mb-8">Tools & Technologies</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {tools.map((tool, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { 
                    opacity: 1, 
                    scale: 1,
                    y: [0, -8, 0],
                    transition: {
                      y: {
                        duration: 3,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: index * 0.2 // Stagger the floating effect
                      },
                      opacity: { delay: 0.6 + index * 0.05 },
                      scale: { delay: 0.6 + index * 0.05 }
                    }
                  } : {}}
                  whileHover={{ scale: 1.1, rotate: 5, y: 0 }}
                  className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg blur-lg group-hover:blur-xl transition-all" />
                  <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-lg p-4 text-center hover:border-purple-500/50 transition-colors">
                    <span className="text-sm font-medium">{tool}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function SkillBar({ 
  skill, 
  delay, 
  isInView 
}: { 
  skill: { name: string; level: number; color: string }; 
  delay: number; 
  isInView: boolean;
}) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setWidth(skill.level);
      }, delay * 1000);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.level, delay]);

  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="font-medium">{skill.name}</span>
        <span className="text-foreground/60">{skill.level}%</span>
      </div>
      <div className="h-3 bg-muted rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
          className={`h-full bg-gradient-to-r ${skill.color} relative`}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
}
