"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function AboutSection() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <div className="max-w-4xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-12"
        >
          About
        </motion.h2>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex-shrink-0"
          >
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border border-border">
              <Image
                src="/profile.png"
                alt="Emincan Demirkaya"
                width={160}
                height={160}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          <div className="flex-1">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-xl md:text-2xl lg:text-3xl font-serif leading-[1.3] mb-12"
            >
          I&apos;m a frontend-focused full-stack developer with 6+ years of
          experience building scalable React and TypeScript applications. I care
          about clean architecture, reusable components, performance, and the
          product context behind the interface.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8 border-t border-border"
            >
              <div>
                <p className="text-3xl md:text-4xl font-serif mb-2">6+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif mb-2">React</p>
                <p className="text-sm text-muted-foreground">TypeScript Focus</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-serif mb-2">London</p>
                <p className="text-sm text-muted-foreground">Based Developer</p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}