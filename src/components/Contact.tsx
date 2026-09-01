"use client";

import { motion } from "framer-motion";
import { socials } from "@/data/content";

const links = [
  { label: "GitHub", href: socials.github },
  { label: "LinkedIn", href: socials.linkedin },
  { label: "Email", href: `mailto:${socials.email}` },
  { label: "Instagram", href: socials.instagram },
  { label: "X", href: socials.x },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 py-32 sm:px-10">
      <div className="mx-auto max-w-4xl text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-mono-custom mb-4 text-xs tracking-[0.3em] text-muted"
        >
          GET IN TOUCH
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl font-bold leading-[0.95] tracking-tighter sm:text-8xl"
        >
          Let&apos;s build
          <br />
          <span className="text-gradient">something real.</span>
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 flex flex-wrap items-center justify-center gap-4"
        >
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              className="group relative overflow-hidden rounded-full border border-white/15 px-6 py-3 font-mono-custom text-sm tracking-wide"
            >
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
                {l.label}
              </span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-accent via-accent-2 to-accent-3 transition-transform duration-300 group-hover:translate-x-0" />
            </a>
          ))}
        </motion.div>
      </div>

      <footer className="mt-32 flex flex-col items-center gap-2 text-center text-xs text-muted/60">
        <p className="font-mono-custom">designed &amp; built by Kushagra Aggarwal</p>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </section>
  );
}
