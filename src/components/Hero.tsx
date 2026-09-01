"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { bio } from "@/data/content";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const letters = "KUSHAGRA".split("");

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <ParticleField />

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(139,92,246,0.12),transparent_60%)]" />

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="font-mono-custom relative z-10 mb-6 text-sm tracking-[0.3em] text-muted"
      >
        HELLO, I&apos;M
      </motion.p>

      <h1 className="relative z-10 flex select-none flex-wrap justify-center text-[14vw] font-bold leading-[0.85] tracking-tighter sm:text-[9vw]">
        {letters.map((l, i) => (
          <motion.span
            key={i}
            initial={{ y: "110%", rotate: 8, opacity: 0 }}
            animate={{ y: "0%", rotate: 0, opacity: 1 }}
            transition={{
              delay: 0.3 + i * 0.045,
              duration: 0.8,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block text-gradient"
          >
            {l}
          </motion.span>
        ))}
      </h1>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.1, duration: 0.6 }}
        className="relative z-10 mt-2 text-[7vw] font-bold leading-none tracking-tighter text-fg/20 sm:text-[4.5vw]"
      >
        AGGARWAL
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="relative z-10 mt-8 max-w-md text-center text-sm text-muted sm:text-base"
      >
        {bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-10 z-10 flex flex-col items-center gap-2 text-muted"
      >
        <span className="font-mono-custom text-[10px] tracking-[0.3em]">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "easeInOut" }}
          className="h-8 w-px bg-gradient-to-b from-muted to-transparent"
        />
      </motion.div>
    </section>
  );
}
