"use client";

import { motion } from "framer-motion";
import { skills } from "@/data/content";

export default function Skills() {
  const loop = [...skills, ...skills];

  return (
    <section id="skills" className="relative overflow-hidden py-32">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono-custom mb-3 px-6 text-xs tracking-[0.3em] text-muted sm:px-10"
      >
        TOOLBOX
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 px-6 text-4xl font-bold tracking-tight sm:px-10 sm:text-6xl"
      >
        What I <span className="text-gradient">build with</span>
      </motion.h2>

      {[0, 1].map((row) => (
        <div key={row} className="relative mb-4 flex overflow-hidden">
          <motion.div
            animate={{ x: row === 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            className="flex shrink-0 gap-4 pr-4"
          >
            {loop.map((s, i) => (
              <span
                key={`${row}-${s}-${i}`}
                className="font-mono-custom flex shrink-0 items-center rounded-full border border-fg/10 bg-bg-soft px-6 py-3 text-sm text-fg/80"
              >
                {s}
              </span>
            ))}
          </motion.div>
        </div>
      ))}
    </section>
  );
}
