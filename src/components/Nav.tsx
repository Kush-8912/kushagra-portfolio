"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { FaMugSaucer } from "react-icons/fa6";
import { useSectionTransition } from "./PageTransition";
import { socials } from "@/data/content";
import ThemeToggle from "./ThemeToggle";

const links = [
  { href: "#projects", label: "Projects" },
  { href: "#journey", label: "Journey" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export default function Nav({ initialTheme }: { initialTheme: "light" | "dark" }) {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [activeHref, setActiveHref] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useSectionTransition();

  useEffect(() => {
    const hero = document.querySelector("#home");
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter((el): el is Element => !!el);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          setActiveHref(entry.target.id === "home" ? null : `#${entry.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    if (hero) observer.observe(hero);
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function handleClick(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
    e.preventDefault();
    setMenuOpen(false);
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

        <div className="hidden items-center gap-5 sm:flex">
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

          <a
            href={socials.buyMeACoffee}
            target="_blank"
            rel="noreferrer"
            data-cursor-hover
            className="flex items-center gap-2 rounded-full border border-fg/15 bg-bg-soft px-4 py-1.5 font-mono-custom text-xs tracking-[0.1em] text-fg/80 transition-colors hover:border-accent-3/60 hover:text-accent-3"
          >
            <FaMugSaucer className="h-3.5 w-3.5" />
            BUY ME A COFFEE
          </a>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle initialTheme={initialTheme} />

          <button
            type="button"
            data-cursor-hover
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="relative z-50 flex h-9 w-9 flex-col items-center justify-center gap-[5px] sm:hidden"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 6 : 0 }}
              className="h-px w-6 bg-fg"
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="h-px w-6 bg-fg"
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -6 : 0 }}
              className="h-px w-6 bg-fg"
            />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-30 flex flex-col items-center justify-center gap-8 bg-bg/98 backdrop-blur-md sm:hidden"
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                data-cursor-hover
                onClick={(e) => handleClick(e, l.href)}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.08 * i, duration: 0.4 }}
                className={`font-mono-custom text-2xl tracking-[0.15em] ${
                  activeHref === l.href ? "text-gradient" : "text-fg"
                }`}
              >
                {l.label.toUpperCase()}
              </motion.a>
            ))}

            <motion.a
              href={socials.buyMeACoffee}
              target="_blank"
              rel="noreferrer"
              data-cursor-hover
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08 * links.length, duration: 0.4 }}
              className="mt-4 flex items-center gap-2 rounded-full border border-fg/15 bg-bg-soft px-5 py-2.5 font-mono-custom text-sm tracking-[0.1em] text-fg/80"
            >
              <FaMugSaucer className="h-4 w-4" />
              BUY ME A COFFEE
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
