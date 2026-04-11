"use client";

import { useState } from "react";
import { ArrowDownRight, ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setOpen(false)}
            />

            {/* Sidebar */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="bg-flag-red fixed top-0 left-0 z-50 flex h-full w-72 flex-col p-6"
            >
              {/* Close button */}
              <button
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="text-alabaster/70 hover:text-alabaster mb-10 self-end transition-colors"
              >
                <X size={20} />
              </button>

              {/* Site mark */}
              <p className="text-alabaster mb-10 font-mono text-xl font-black tracking-tight">
                LXNA.DEV
              </p>

              {/* Nav links */}
              <nav className="flex flex-col gap-1">
                {NAV_LINKS.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: 0.15 + i * 0.07,
                      duration: 0.3,
                      ease: [0.22, 1, 0.36, 1] as [
                        number,
                        number,
                        number,
                        number,
                      ],
                    }}
                    className="font-syne text-alabaster hover:text-alabaster/70 border-alabaster/20 border-b py-3 text-sm tracking-widest uppercase transition-colors last:border-none"
                  >
                    {link.label}
                  </motion.a>
                ))}
              </nav>

              {/* Bottom meta */}
              <div className="mt-auto">
                <p className="font-syne text-alabaster/40 text-[10px] tracking-widest uppercase">
                  Portfolio / 2026
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
