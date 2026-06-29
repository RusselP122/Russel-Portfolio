import { motion, AnimatePresence } from "motion/react";
import { useInView } from "./useInView";
import { useState, useEffect } from "react";
import { ExternalLink, Github, X } from "lucide-react";

type Project = {
  title: string;
  description: string;
  image: string;
  tags: string[];
  github: string;
  demo: string;
  fullDescription: string;
};

export function Projects() {
  const [ref, isInView] = useInView({ threshold: 0.1 });
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    if (selectedProject !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const featuredProjects: Project[] = [
    {
      title: "Philippine Typhoon/Weather",
      description: "Weather information for the Philippines including typhoon forecasting.",
      image: "/images/PTW.png",
      tags: ["React", "JavaScript", "Tailwind", "Python", "YAML"],
      github: "confidential",
      demo: "https://philippine-weather-app.vercel.app/",
      fullDescription: "A comprehensive weather forecasting application tailored for the Philippines. Features include real-time weather information, typhoon tracking, and automated deployment workflows built with GitHub Actions. The frontend is built with React and Tailwind CSS, while data processing scripts utilize Python."
    },
    {
      title: "PowerTask VA Academy",
      description: "Virtual assistance learning platform for beginners to advance.",
      image: "/images/PTVA.png",
      tags: ["React", "TypeScript", "Tailwind CSS", "MongoDB"],
      github: "confidential",
      demo: "https://power-task-va-frontend.vercel.app/",
      fullDescription: "A comprehensive virtual assistance learning platform designed to take users from beginners to seasoned virtual assistants. The platform features structured courses, progress tracking, and interactive learning modules."
    }
  ];

  const myWorks: Project[] = [
    {
      title: "NivekPC",
      description: "E-commerce platform for selling PC parts.",
      image: "/images/nivek.png",
      tags: ["PHP", "CSS", "MySQL", "Hostinger"],
      github: "confidential",
      demo: "https://nivekpc.ccs-octa.com/",
      fullDescription: "An online platform dedicated to selling PC parts and components. It features a product catalog, shopping cart, and seamless checkout process hosted on Hostinger."
    },
    {
      title: "DocuStream",
      description: "A web application for storing and managing digital files securely.",
      image: "/images/docustream.png",
      tags: ["PHP", "Tailwind CSS", "MongoDB"],
      github: "https://github.com/RusselP122/DocuStream",
      demo: "confidential",
      fullDescription: "DocuStream provides a streamlined solution for uploading, organizing, and managing files on the web. It uses a modern tech stack to ensure fast and secure document handling."
    },
    {
      title: "EduRegistrar",
      description: "Smart attendance tracking system designed for schools.",
      image: "/images/eduregistrar.png",
      tags: ["PHP", "Tailwind CSS", "MySQL"],
      github: "https://github.com/RusselP122/EduRegistrar",
      demo: "confidential",
      fullDescription: "EduRegistrar is an automated attendance tracking system built for educational institutions. It simplifies the registration process and provides detailed insights into student attendance."
    },
    {
      title: "Real Time Chat",
      description: "Real-time chat application.",
      image: "/images/real.png",
      tags: ["JSX", "Tailwind CSS", "Vite", "Firebase"],
      github: "https://github.com/RusselP122/Real-Time-Chat-App",
      demo: "confidential",
      fullDescription: "A live messaging application built with React, Vite, and Firebase. It features real-time text updates, sleek responsive design using Tailwind CSS, and simple user access."
    }
  ];

  const renderProjectGrid = (projectsToRender: Project[], sectionPrefix: string) => (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
      {projectsToRender.map((project, index) => (
        <motion.div
          key={`${sectionPrefix}-${index}-${activeFilter}`}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: index * 0.2 }}
          whileHover={{ y: -10 }}
          className="group cursor-pointer"
          onClick={() => setSelectedProject(project)}
        >
          <div className="relative overflow-hidden rounded-xl bg-card border border-border">
            <div className="relative h-48 overflow-hidden">
              <motion.img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                {project.github !== "confidential" && (
                  <motion.a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  >
                    <Github size={20} />
                  </motion.a>
                )}
                {project.demo !== "confidential" && (
                  <motion.a
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors"
                  >
                    <ExternalLink size={20} />
                  </motion.a>
                )}
              </div>
            </div>

            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-foreground/70 text-sm mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag, tagIndex) => (
                  <span
                    key={tagIndex}
                    className="text-xs px-3 py-1 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );

  const filters = ["All", "React / Vite", "PHP / Backend", "Python / Automation"];

  const matchesFilter = (project: Project, filter: string) => {
    if (filter === "All") return true;
    const projectTags = project.tags.map(t => t.toLowerCase());
    if (filter === "React / Vite") {
      return projectTags.some(t => t.includes("react") || t.includes("jsx") || t.includes("vite") || t.includes("typescript"));
    }
    if (filter === "PHP / Backend") {
      return projectTags.some(t => t.includes("php") || t.includes("mysql") || t.includes("mongodb"));
    }
    if (filter === "Python / Automation") {
      return projectTags.some(t => t.includes("python") || t.includes("yaml"));
    }
    return false;
  };

  const filteredFeatured = featuredProjects.filter(p => matchesFilter(p, activeFilter));
  const filteredWorks = myWorks.filter(p => matchesFilter(p, activeFilter));

  return (
    <section id="projects" className="min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto w-full" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
            Projects & Works
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mb-8" />
          
          <div className="flex flex-wrap items-center justify-center gap-3">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border transition-all duration-300 cursor-pointer ${
                  activeFilter === filter
                    ? "bg-gradient-to-r from-purple-500 to-blue-500 text-white border-transparent shadow-lg shadow-purple-500/25"
                    : "bg-card/50 hover:bg-card border-border hover:border-purple-500/50 text-foreground/75 hover:text-foreground"
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </motion.div>

        {filteredFeatured.length > 0 && (
          <div className="mb-16">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground/80">
              Featured Projects
            </h3>
            {renderProjectGrid(filteredFeatured, "featured")}
          </div>
        )}

        {filteredWorks.length > 0 && (
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-foreground/80">
              My Works
            </h3>
            {renderProjectGrid(filteredWorks, "works")}
          </div>
        )}

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject !== null && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-card border border-border rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64 sm:h-80">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="w-full h-full object-cover rounded-t-2xl"
                  />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="absolute top-4 right-4 p-2 bg-background/80 backdrop-blur-sm rounded-full hover:bg-background transition-colors cursor-pointer"
                  >
                    <X size={24} />
                  </button>
                </div>

                <div className="p-6 sm:p-8">
                  <h3 className="text-2xl sm:text-3xl font-bold mb-4">
                    {selectedProject.title}
                  </h3>
                  <p className="text-foreground/80 mb-6 leading-relaxed">
                    {selectedProject.fullDescription}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {selectedProject.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="text-sm px-4 py-2 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-full border border-purple-500/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {selectedProject.github !== "confidential" && (
                      <a
                        href={selectedProject.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg text-white font-medium text-center hover:shadow-lg hover:shadow-purple-500/50 transition-shadow flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <Github size={20} />
                        View Code
                      </a>
                    )}
                    {selectedProject.demo !== "confidential" && (
                      <a
                        href={selectedProject.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 px-6 py-3 border border-border rounded-lg hover:bg-accent/50 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                      >
                        <ExternalLink size={20} />
                        View Live
                      </a>
                    )}
                    {selectedProject.github === "confidential" && selectedProject.demo === "confidential" && (
                      <div className="w-full p-4 bg-purple-500/5 border border-purple-500/20 rounded-xl text-center">
                        <p className="text-foreground/75 text-sm">
                          🔒 This project is proprietary. Source code and live deployment are confidential.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
