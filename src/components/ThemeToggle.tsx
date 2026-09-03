"use client";

import { useRef, useState } from "react";
import { flushSync } from "react-dom";
import { FaMoon, FaSun } from "react-icons/fa6";

type Theme = "dark" | "light";

type ViewTransition = { finished: Promise<void> };
type ViewTransitionDocument = Document & {
  startViewTransition?: (callback: () => void) => ViewTransition;
};

const THEME_COOKIE_MAX_AGE = 60 * 60 * 24 * 365;

export default function ThemeToggle({ initialTheme }: { initialTheme: Theme }) {
  const [theme, setTheme] = useState<Theme>(initialTheme);
  const transitioning = useRef(false);

  function toggleTheme(e: React.MouseEvent<HTMLButtonElement>) {
    if (transitioning.current) return;

    const next: Theme = theme === "dark" ? "light" : "dark";
    const root = document.documentElement;

    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const maxRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );
    root.style.setProperty("--wipe-x", `${x}px`);
    root.style.setProperty("--wipe-y", `${y}px`);
    root.style.setProperty("--wipe-r", `${maxRadius}px`);

    function apply() {
      if (next === "light") {
        root.setAttribute("data-theme", "light");
      } else {
        root.removeAttribute("data-theme");
      }
      // The server renders an inline bg/color matching the theme cookie at
      // request time, for a flash-free first paint. That's now stale, so
      // clear it and let the CSS variables (updated via data-theme) drive
      // the color from here on.
      root.style.removeProperty("background-color");
      document.body.style.removeProperty("background-color");
      document.body.style.removeProperty("color");
      document.cookie = `theme=${next}; path=/; max-age=${THEME_COOKIE_MAX_AGE}; SameSite=Lax`;
      flushSync(() => setTheme(next));
    }

    const doc = document as ViewTransitionDocument;
    const canAnimate =
      typeof doc.startViewTransition === "function" &&
      doc.visibilityState === "visible" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (canAnimate) {
      transitioning.current = true;
      try {
        const transition = doc.startViewTransition(apply);
        transition.finished.catch(() => {}).finally(() => {
          transitioning.current = false;
        });
      } catch {
        transitioning.current = false;
        apply();
      }
    } else {
      apply();
    }
  }

  return (
    <button
      type="button"
      data-cursor-hover
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-fg/15 bg-bg-soft text-fg/80 transition-colors hover:border-accent-2/60 hover:text-accent-2"
    >
      {theme === "dark" ? <FaSun className="h-4 w-4" /> : <FaMoon className="h-4 w-4" />}
    </button>
  );
}
