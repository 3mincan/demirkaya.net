"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Whitestreets.com",
    category: "Full-Stack Web Application",
    description: "Built and maintained a Django, Vite, React, and Next.js platform analysing 600+ London postcodes for transport, rental, and safety insights.",
    year: "2025",
  },
  {
    title: "Fakedoor",
    category: "Founding Frontend Engineer",
    description: "Shaped frontend architecture and UX from the ground up, including Stripe workflows, Auth.js sessions, Storybook, and tested product features.",
    year: "2023-2024",
  },
  {
    title: "AI Microsite Experience",
    category: "React Interface",
    description: "Developed a multi-step React microsite and AI-powered chatbot interface using REST APIs, AWS Lambda, and Python-backed GenAI endpoints.",
    year: "2022",
  },
];

export function HighlightsSection() {
  return (
    <section id="highlights" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-16"
      >
        Selected Work
      </motion.h2>

      <div className="space-y-0">
        {projects.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group py-12 border-t border-border first:border-none"
          >
            <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-2">{project.category}</p>
                <h3 className="text-2xl md:text-3xl font-serif mb-3 group-hover:opacity-70 transition-opacity">
                  {project.title}
                </h3>
                <p className="text-muted-foreground max-w-md">
                  {project.description}
                </p>
              </div>
              <p className="text-sm text-muted-foreground">{project.year}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}