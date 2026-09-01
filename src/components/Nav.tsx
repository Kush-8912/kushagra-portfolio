"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { useSectionTransition } from "./PageTransition";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const navigate = useSectionTransition();

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHref(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    navigate(href);
  }

  return (
    <>
      <motion.div
        className="fixed left-0 top-0 z-50 h-[2px] w-full origin-left bg-gradient-to-r from-accent via-accent-2 to-accent-3"
        style={{ scaleX: progress }}
      />
      <nav className="fixed top-0 z-40 flex w-full items-center justify-between px-6 py-6 sm:px-10">
        <a
          href="#"
          data-cursor-hover
          onClick={(e) => handleClick(e, "body")}
          className="font-mono-custom text-sm tracking-[0.2em] text-fg"
        >
          KA<span className="text-accent">.</span>
        </a>
        <div className="relative flex gap-1 font-mono-custom text-xs tracking-[0.15em] text-muted sm:gap-2">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              data-cursor-hover
              onClick={(e) => handleClick(e, l.href)}
              className={`relative rounded-full px-3 py-1.5 transition-colors duration-300 ${
                activeHref === l.href ? "text-black" : "hover:text-fg"
              }`}
            >
              {activeHref === l.href && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-accent via-accent-2 to-accent-3"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              {l.label.toUpperCase()}
            </a>
          ))}
        </div>
      </nav>
    </>
  );
}
