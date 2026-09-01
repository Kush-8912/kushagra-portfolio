"use client";

import { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { projects, type Project } from "@/data/content";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="relative"
    >
      <motion.div
        ref={ref}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onClick={() => setOpen((o) => !o)}
        data-cursor-hover
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-bg-soft p-8 sm:p-10"
      >
        <div
          className="pointer-events-none absolute -inset-32 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-20"
          style={{ background: project.color }}
        />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono-custom text-xs tracking-[0.25em] text-muted">
                0{index + 1} / {projects.length.toString().padStart(2, "0")}
              </p>
              <h3 className="mt-2 text-4xl font-bold tracking-tight sm:text-5xl">
                {project.name}
              </h3>
            </div>
            <motion.span
              animate={{ rotate: open ? 45 : 0 }}
              className="mt-2 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg"
              style={{ color: project.color }}
            >
              +
            </motion.span>
          </div>

          <p className="text-muted">{project.tagline}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.stack.map((s) => (
              <span
                key={s}
                className="font-mono-custom rounded-full border border-white/10 px-3 py-1 text-[11px] text-muted"
              >
                {s}
              </span>
            ))}
          </div>

          <motion.div
            initial={false}
            animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <div className="mt-4 border-t border-white/10 pt-6">
              <p className="text-sm leading-relaxed text-fg/80">{project.description}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {project.highlights.map((h) => (
                  <li key={h} className="flex gap-3 text-sm text-muted">
                    <span style={{ color: project.color }}>—</span>
                    {h}
                  </li>
                ))}
              </ul>
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  data-cursor-hover
                  onClick={(e) => e.stopPropagation()}
                  className="mt-6 inline-flex items-center gap-2 text-sm font-medium"
                  style={{ color: project.color }}
                >
                  View live ↗
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-32 sm:px-10">
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="font-mono-custom mb-3 text-xs tracking-[0.3em] text-muted"
      >
        SELECTED WORK
      </motion.p>
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="mb-16 text-4xl font-bold tracking-tight sm:text-6xl"
      >
        Things I&apos;ve <span className="text-gradient">shipped</span>
      </motion.h2>

      <div className="flex flex-col gap-6">
        {projects.map((p, i) => (
          <ProjectCard key={p.slug} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
