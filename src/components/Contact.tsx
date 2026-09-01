"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { HiOutlineMail } from "react-icons/hi";
import { socials } from "@/data/content";

const links = [
  { label: "GitHub", href: socials.github, icon: FaGithub, color: "#ffffff" },
  { label: "LinkedIn", href: socials.linkedin, icon: FaLinkedinIn, color: "#0a66c2" },
  { label: "Email", href: `mailto:${socials.email}`, icon: HiOutlineMail, color: "#8b5cf6" },
  { label: "Instagram", href: socials.instagram, icon: FaInstagram, color: "#e1306c" },
  { label: "X", href: socials.x, icon: FaXTwitter, color: "#ffffff" },
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
          className="mt-16 flex flex-wrap items-center justify-center gap-5"
        >
          {links.map((l, i) => {
            const Icon = l.icon;
            return (
              <motion.a
                key={l.label}
                href={l.href}
                target="_blank"
                rel="noreferrer"
                data-cursor-hover
                aria-label={l.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.05 * i }}
                whileHover={{
                  y: -10,
                  rotate: [0, -8, 8, -4, 0],
                  transition: { rotate: { duration: 0.5 }, y: { duration: 0.25 } },
                }}
                whileTap={{ scale: 0.9 }}
                style={{ "--hc": l.color } as React.CSSProperties}
                className="group relative flex h-16 w-16 items-center justify-center rounded-full border border-white/15 bg-bg-soft"
              >
                <span
                  className="pointer-events-none absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-300 group-hover:opacity-60"
                  style={{ background: l.color }}
                />
                <span
                  className="pointer-events-none absolute inset-0 rounded-full border opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ borderColor: l.color }}
                />
                <Icon className="relative z-10 h-6 w-6 text-fg/80 transition-colors duration-300 group-hover:text-[var(--hc)]" />
                <span
                  className="pointer-events-none absolute -bottom-8 whitespace-nowrap font-mono-custom text-[10px] tracking-[0.2em] text-muted opacity-0 transition-all duration-300 group-hover:-bottom-9 group-hover:opacity-100"
                >
                  {l.label.toUpperCase()}
                </span>
              </motion.a>
            );
          })}
        </motion.div>
      </div>

      <footer className="mt-32 flex flex-col items-center gap-2 text-center text-xs text-muted/60">
        <p className="font-mono-custom">designed &amp; built by Kushagra Aggarwal</p>
        <p>© {new Date().getFullYear()}</p>
      </footer>
    </section>
  );
}
