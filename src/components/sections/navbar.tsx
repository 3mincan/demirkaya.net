"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 24);
    }

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed left-0 right-0 top-0 z-50 px-4 py-4 md:px-8 lg:px-20"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-full px-3 py-3 transition-all duration-500 ${
          isScrolled
            ? "border border-border/80 bg-background/55 shadow-2xl shadow-black/20 backdrop-blur-xl"
            : "border border-transparent bg-background/10 backdrop-blur-sm"
        }`}
      >
        <Link
          href="/"
          aria-label="Emincan Demirkaya home"
          className="group relative grid h-10 w-10 place-items-center rounded-full border border-border bg-secondary/55 font-serif text-base tracking-tight shadow-[inset_0_1px_0_oklch(1_0_0_/_0.08)] transition-colors hover:border-foreground/30"
        >
          <span>ED</span>
          <motion.span
            aria-hidden="true"
            className="absolute inset-[-5px] rounded-full"
            animate={{ rotate: [0, 115, 185, 360] }}
            transition={{
              duration: 5.2,
              times: [0, 0.22, 0.62, 1],
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-foreground shadow-[0_0_12px_oklch(1_0_0_/_0.45)]" />
          </motion.span>
        </Link>

        <div className="flex items-center gap-8">
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href="#contact"
            className="rounded-full border border-border bg-background/20 px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}