"use client";

import { motion } from "framer-motion";
import { type FormEvent, useState } from "react";

const socialLinks = [
  { href: "https://linkedin.com/in/edemirkaya", label: "LinkedIn" },
  { href: "https://github.com/3mincan", label: "GitHub" },
  { href: "https://x.com/3mincan", label: "X" },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [message, setMessage] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setMessage("");

    const form = event.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      const data = (await response.json()) as { message?: string };

      if (!response.ok) {
        throw new Error(data.message || "Could not send your message.");
      }

      form.reset();
      setStatus("success");
      setMessage(data.message || "Thanks, I will get back to you soon.");
    } catch (error) {
      setStatus("error");
      setMessage(
        error instanceof Error
          ? error.message
          : "Something went wrong. Please email me directly."
      );
    }
  }

  return (
    <section id="contact" className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-24">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-sm tracking-[0.3em] uppercase text-muted-foreground mb-8"
      >
        Contact
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="text-2xl md:text-3xl lg:text-4xl font-serif leading-[1.3] mb-8"
      >
        Let&apos;s build something useful.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="mb-12"
      >
        <a
          href="mailto:e.demirkaya@gmail.com"
          className="text-lg md:text-xl hover:text-muted-foreground transition-colors"
        >
          e.demirkaya@gmail.com
        </a>
        <p className="mt-3 text-sm text-muted-foreground">London, UK</p>
      </motion.div>

      <motion.form
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.25 }}
        onSubmit={handleSubmit}
        className="grid max-w-3xl grid-cols-1 gap-4 md:grid-cols-2"
      >
        <label className="sr-only" htmlFor="name">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          placeholder="Name"
          className="rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
        />

        <label className="sr-only" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="Email"
          className="rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40"
        />

        <label className="hidden" htmlFor="company">
          Company
        </label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          className="hidden"
        />

        <label className="sr-only" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          minLength={10}
          placeholder="Tell me a bit about your project"
          className="min-h-40 rounded-2xl border border-border bg-secondary/40 px-5 py-4 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-foreground/40 md:col-span-2"
        />

        <div className="flex flex-col gap-4 md:col-span-2 md:flex-row md:items-center">
          <button
            type="submit"
            disabled={status === "sending"}
            className="inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {status === "sending" ? "Sending..." : "Send Message"}
          </button>
          {message ? (
            <p
              className={`text-sm ${
                status === "error" ? "text-red-300" : "text-muted-foreground"
              }`}
              role="status"
            >
              {message}
            </p>
          ) : null}
        </div>
      </motion.form>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.35 }}
        className="mt-16 flex flex-wrap gap-8 border-t border-border pt-8"
      >
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {link.label}
          </a>
        ))}
      </motion.div>
    </section>
  );
}