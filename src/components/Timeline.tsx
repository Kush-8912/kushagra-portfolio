"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { timeline, achievements } from "@/data/content";

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="journey" ref={ref} className="relative px-6 py-32 sm:px-10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono-custom mb-3 text-xs tracking-[0.3em] text-muted"
      >
        THE JOURNEY
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-20 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        How I got <span className="text-gradient">here</span>
      </motion.h2>

      <div className="relative mx-auto max-w-2xl pl-10 sm:pl-14">
        <div className="absolute left-0 top-0 h-full w-px bg-white/10" />
        <motion.div
          style={{ height: lineHeight }}
          className="absolute left-0 top-0 w-px bg-gradient-to-b from-accent via-accent-2 to-accent-3"
        />

        <div className="flex flex-col gap-16">
          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="relative"
            >
              <span
                className={`absolute -left-[45px] top-1.5 h-3 w-3 rounded-full sm:-left-[61px] ${
                  t.status === "active"
                    ? "bg-accent-2 shadow-[0_0_16px_rgba(34,211,238,0.8)]"
                    : "bg-white/30"
                }`}
              />
              <p className="font-mono-custom text-xs tracking-[0.2em] text-muted">
                {t.period}
                {t.status === "active" && (
                  <span className="ml-2 rounded-full bg-accent-2/10 px-2 py-0.5 text-accent-2">
                    ONGOING
                  </span>
                )}
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">{t.title}</h3>
              <p className="mt-1 text-muted">{t.place}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mx-auto mt-24 flex max-w-2xl flex-col gap-3 pl-10 sm:pl-14"
      >
        <p className="font-mono-custom text-xs tracking-[0.3em] text-muted">ACHIEVEMENTS</p>
        {achievements.map((a) => (
          <p key={a} className="text-sm text-fg/80">
            <span className="text-accent-3">★</span> {a}
          </p>
        ))}
      </motion.div>
    </section>
  );
}
