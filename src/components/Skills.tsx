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
        <div
          key={row}
          className="group relative mb-4 flex overflow-hidden"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage:
              "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          <div
            className={`flex shrink-0 gap-4 pr-4 group-hover:[animation-play-state:paused] ${
              row === 0 ? "animate-[marquee-left_28s_linear_infinite]" : "animate-[marquee-right_28s_linear_infinite]"
            }`}
          >
            {loop.map((s, i) => (
              <span
                key={`${row}-${s}-${i}`}
                data-cursor-hover
                className="font-mono-custom flex shrink-0 items-center rounded-full border border-fg/10 bg-bg-soft px-6 py-3 text-sm text-fg/80 transition-all duration-300 hover:-translate-y-1 hover:border-accent-2/60 hover:text-accent-2 hover:shadow-[0_0_20px_-4px_rgba(34,211,238,0.5)]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
