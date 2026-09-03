"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { bio } from "@/data/content";

const ParticleField = dynamic(() => import("./ParticleField"), { ssr: false });

const NAME_LINE_1 = "KUSHAGRA";
const NAME_LINE_2 = "AGGARWAL";
const TYPE_START_DELAY = 500;
const TYPE_SPEED = 85;
const LINE_PAUSE = 250;

export default function Hero() {
  const [typedLine1, setTypedLine1] = useState("");
  const [typedLine2, setTypedLine2] = useState("");

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    function typeLine2(j = 0) {
      const next = j + 1;
      setTypedLine2(NAME_LINE_2.slice(0, next));
      if (next < NAME_LINE_2.length) timer = setTimeout(() => typeLine2(next), TYPE_SPEED);
    }

    function typeLine1(i = 0) {
      const next = i + 1;
      setTypedLine1(NAME_LINE_1.slice(0, next));
      if (next < NAME_LINE_1.length) {
        timer = setTimeout(() => typeLine1(next), TYPE_SPEED);
      } else {
        timer = setTimeout(() => typeLine2(), LINE_PAUSE);
      }
    }

    timer = setTimeout(() => typeLine1(), TYPE_START_DELAY);
    return () => clearTimeout(timer);
  }, []);

  const line1Done = typedLine1.length === NAME_LINE_1.length;
  const line2Done = typedLine2.length === NAME_LINE_2.length;

  const cursor = (
    <motion.span
      animate={{ opacity: [1, 1, 0, 0] }}
      transition={{ repeat: Infinity, duration: 0.9, times: [0, 0.5, 0.5, 1] }}
      className="ml-1 inline-block h-[0.75em] w-[3px] translate-y-[0.05em] bg-accent-2 align-middle"
    />
  );

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
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

      <h1 className="relative z-10 select-none text-center text-[14vw] font-bold leading-[0.85] tracking-tighter sm:text-[9vw]">
        <span className="text-gradient">
          {typedLine1}
          {!line1Done && cursor}
        </span>
      </h1>

      <h2 className="relative z-10 mt-2 text-[7vw] font-bold leading-none tracking-tighter text-fg/20 sm:text-[4.5vw]">
        {typedLine2}
        {line1Done && !line2Done && cursor}
      </h2>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: line2Done ? 1 : 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 mt-8 max-w-md text-center text-sm text-muted sm:text-base"
      >
        {bio}
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: line2Done ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.4 }}
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
