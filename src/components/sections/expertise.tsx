"use client";

import { motion } from "framer-motion";

const expertiseAreas = [
  {
    title: "React & Next.js Frontends",
    description: "Building performant, accessible interfaces with React, Next.js, TypeScript, Tailwind CSS, and component-driven architecture.",
  },
  {
    title: "Frontend Architecture",
    description: "Designing reusable UI systems, state patterns, and maintainable code structures for fast-moving product teams.",
  },
  {
    title: "Full-Stack Integration",
    description: "Connecting polished frontends to REST APIs, Node.js services, Django backends, auth flows, payments, and data-heavy dashboards.",
  },
  {
    title: "Product-Aware Delivery",
    description: "Translating product goals and design intent into reliable features, with enough product sense to ask the right trade-off questions.",
  },
];

export function ExpertiseSection() {
  return (
    <section id="expertise" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-16"
      >
        Expertise
      </motion.h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {expertiseAreas.map((area, index) => (
          <motion.div
            key={area.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            className="group"
          >
            <div className="mb-4">
              <span className="text-lg font-serif">{area.title}</span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {area.description}
            </p>
            <div className="mt-6 h-px w-12 bg-border group-hover:w-24 transition-all duration-500" />
          </motion.div>
        ))}
      </div>
    </section>
  );
}