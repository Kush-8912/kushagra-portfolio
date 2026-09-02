"use client";

import { useState } from "react";
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

type FormState = "idle" | "submitting" | "success" | "error";

export default function Contact() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [state, setState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong");
      setState("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch (err) {
      setState("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    }
  }

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

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mx-auto mt-16 flex max-w-lg flex-col gap-4 text-left"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-name" className="font-mono-custom text-[11px] tracking-[0.2em] text-muted">
                NAME
              </label>
              <input
                id="contact-name"
                type="text"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={state === "submitting"}
                className="rounded-lg border border-white/15 bg-bg-soft px-4 py-3 text-sm text-fg placeholder:text-muted/50 outline-none transition-colors focus:border-accent-2 disabled:opacity-50"
                placeholder="Your name"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-email" className="font-mono-custom text-[11px] tracking-[0.2em] text-muted">
                EMAIL
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={state === "submitting"}
                className="rounded-lg border border-white/15 bg-bg-soft px-4 py-3 text-sm text-fg placeholder:text-muted/50 outline-none transition-colors focus:border-accent-2 disabled:opacity-50"
                placeholder="you@example.com"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="contact-message" className="font-mono-custom text-[11px] tracking-[0.2em] text-muted">
              MESSAGE
            </label>
            <textarea
              id="contact-message"
              required
              maxLength={2000}
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={state === "submitting"}
              className="resize-none rounded-lg border border-white/15 bg-bg-soft px-4 py-3 text-sm text-fg placeholder:text-muted/50 outline-none transition-colors focus:border-accent-2 disabled:opacity-50"
              placeholder="Want to collaborate, or just want to say hi? Tell me what's on your mind."
            />
          </div>

          <motion.button
            type="submit"
            data-cursor-hover
            disabled={state === "submitting"}
            whileHover={{ scale: state === "submitting" ? 1 : 1.02 }}
            whileTap={{ scale: state === "submitting" ? 1 : 0.98 }}
            className="mt-2 rounded-lg bg-gradient-to-r from-accent via-accent-2 to-accent-3 px-6 py-3 text-sm font-semibold text-bg transition-opacity disabled:opacity-60"
          >
            {state === "submitting" ? "Sending…" : "Send message"}
          </motion.button>

          {state === "success" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono-custom text-xs tracking-[0.1em] text-accent-2"
            >
              Message sent — check your inbox for a confirmation. I&apos;ll reply soon.
            </motion.p>
          )}
          {state === "error" && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-mono-custom text-xs tracking-[0.1em] text-accent-3"
            >
              {errorMsg}
            </motion.p>
          )}
        </motion.form>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="font-mono-custom mt-20 text-xs tracking-[0.3em] text-muted"
        >
          OR CONNECT WITH ME ON
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 flex flex-wrap items-center justify-center gap-5"
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
