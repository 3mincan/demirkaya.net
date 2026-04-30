"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 pt-20">
      <div className="max-w-4xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-6"
        >
          Senior Frontend Developer
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[1.1] mb-8"
        >
          <span className="block">Emincan Demirkaya</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-lg md:text-xl text-muted-foreground max-w-xl mb-12 leading-relaxed"
        >
          Frontend-focused full-stack developer building scalable React,
          Next.js, and TypeScript applications with clean architecture,
          reusable UI systems, and product-aware delivery.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-wrap gap-4"
        >
          <Link
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3 bg-primary text-primary-foreground rounded-full text-sm font-medium transition-colors hover:bg-primary/90"
          >
            Get in Touch
          </Link>
          <Link
            href="#expertise"
            className="inline-flex items-center justify-center px-8 py-3 border border-border rounded-full text-sm font-medium transition-colors hover:bg-muted hover:text-foreground"
          >
            Explore Work
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="absolute bottom-12 right-6 md:right-12 lg:right-24"
      >
        <p className="text-xs text-muted-foreground tracking-wider">
          Based in London
        </p>
      </motion.div>
    </section>
  );
}