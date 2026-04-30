"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { href: "#about", label: "About" },
  { href: "#expertise", label: "Expertise" },
  { href: "#contact", label: "Contact" },
];

export function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-12 lg:px-24 py-6"
    >
      <div className="flex items-center justify-between">
        <Link
          href="/"
          aria-label="Emincan Demirkaya home"
          className="group relative grid h-11 w-11 place-items-center rounded-full border border-border bg-secondary/50 font-serif text-lg tracking-tight shadow-[inset_0_1px_0_oklch(1_0_0_/_0.08)] transition-colors hover:border-foreground/30"
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
            className="text-sm font-medium border border-border px-4 py-2 rounded-full hover:bg-muted transition-colors"
          >
            Let&apos;s Talk
          </Link>
        </div>
      </div>
    </motion.nav>
  );
}