"use client";

import { useState, useCallback, createContext, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

const TransitionContext = createContext<(href: string) => void>(() => {});

export function useSectionTransition() {
  return useContext(TransitionContext);
}

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState(false);

  const navigate = useCallback((href: string) => {
    setActive(true);

    window.setTimeout(() => {
      const target = document.querySelector(href);
      if (target) {
        window.__lenis?.scrollTo(target as HTMLElement, { offset: 0, duration: 1.1 });
      }
    }, 320);

    window.setTimeout(() => setActive(false), 900);
  }, []);

  return (
    <TransitionContext.Provider value={navigate}>
      {children}
      <AnimatePresence>
        {active && (
          <div className="pointer-events-none fixed inset-0 z-[90] flex">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ scaleY: 0, transformOrigin: "bottom" }}
                animate={{ scaleY: [0, 1, 1, 0], transformOrigin: ["bottom", "bottom", "top", "top"] }}
                exit={{ scaleY: 0 }}
                transition={{
                  duration: 0.6,
                  delay: i * 0.06,
                  times: [0, 0.35, 0.65, 1],
                  ease: [0.76, 0, 0.24, 1],
                }}
                className="h-full flex-1"
              >
                <div
                  className="h-full w-full"
                  style={{
                    background:
                      i === 0
                        ? "linear-gradient(180deg, #8b5cf6, transparent)"
                        : i === 1
                        ? "linear-gradient(180deg, #22d3ee, transparent)"
                        : "linear-gradient(180deg, #f472b6, transparent)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </TransitionContext.Provider>
  );
}
