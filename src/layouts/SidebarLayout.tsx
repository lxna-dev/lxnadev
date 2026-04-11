"use client";

import { useState } from "react";
import { X, ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useScramble } from "use-scramble";

const SIDEBAR_WIDTH = 500;

const BG = {
  backgroundImage: "url('/assets/sidebarbg.jpg')",
  backgroundPosition: "fill",
  backgroundAttachment: "fixed",
  backgroundRepeat: "repeat",
} as const;

const NAV_LINKS = [
  { label: "Home", href: "#" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

function ScrambleLink({
  label,
  href,
  onClick,
  className,
  motionProps,
}: {
  label: string;
  href: string;
  onClick: () => void;
  className: string;
  motionProps?: React.ComponentProps<typeof motion.a>;
}) {
  const { ref, replay } = useScramble({
    text: label,
    speed: 0.6,
    tick: 1,
    step: 1,
    scramble: 6,
    seed: 2,
    playOnMount: false,
  });

  return (
    <motion.a
      href={href}
      onClick={onClick}
      onMouseEnter={replay}
      className={className}
      {...motionProps}
    >
      <span ref={ref} />
    </motion.a>
  );
}

function SidebarContent({
  onClose,
  animate,
}: {
  onClose: () => void;
  animate: boolean;
}) {
  return (
    <div className="flex h-full w-72 flex-col p-6">
      <button
        onClick={onClose}
        aria-label="Close menu"
        className="text-alabaster/70 hover:text-alabaster mb-10 self-end transition-colors"
      >
        <X size={20} />
      </button>

      <p className="text-alabaster mb-10 font-mono text-xl font-black tracking-tight">
        LXNA.DEV
      </p>

      <nav className="flex flex-col gap-2">
        {NAV_LINKS.map((link, i) => (
          <ScrambleLink
            key={link.label}
            label={link.label}
            href={link.href}
            onClick={onClose}
            className="font-syne text-flag-red hover:text-flag-red/70 px-4 py-2.5 text-7xl font-bold tracking-widest uppercase transition-colors duration-200"
            motionProps={{
              initial: animate ? { opacity: 0, x: -12 } : false,
              animate: { opacity: 1, x: 0 },
              transition: {
                delay: 0.15 + i * 0.07,
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              },
            }}
          />
        ))}
      </nav>

      <div className="mt-auto">
        <p className="font-syne text-alabaster/40 text-[10px] tracking-widest uppercase">
          Portfolio / 2026
        </p>
      </div>
    </div>
  );
}

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed inset-0 flex" style={BG}>
      {/* Invisible flex spacer — holds layout width so content gets pushed */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: open ? SIDEBAR_WIDTH : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="hidden shrink-0 md:block"
      />

      {/* Fixed visual sidebar — stays in viewport on scroll */}
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: open ? SIDEBAR_WIDTH : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
        className="fixed top-0 left-0 hidden h-screen overflow-hidden md:block"
      >
        <div className="flex h-full flex-col gap-6 p-6 pr-14" style={BG}>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="text-alabaster/70 hover:text-alabaster self-end transition-colors"
          >
            <X size={20} />
          </button>

          <p className="text-alabaster font-mono text-xl font-black tracking-tight">
            LXNA.DEV
          </p>

          <nav className="flex flex-col gap-2">
            {NAV_LINKS.map((link, i) => (
              <ScrambleLink
                key={link.label}
                label={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="font-syne text-flag-red hover:text-flag-red/70 px-4 py-2.5 text-7xl font-bold tracking-widest uppercase transition-colors duration-200"
                motionProps={{
                  initial: open ? { opacity: 0, x: -12 } : false,
                  animate: { opacity: 1, x: 0 },
                  transition: {
                    delay: 0.15 + i * 0.07,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
                  },
                }}
              />
            ))}
          </nav>
        </div>
      </motion.div>

      {/* Mobile sidebar — fixed overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              onClick={() => setOpen(false)}
            />
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
              }}
              className="fixed top-0 left-0 z-50 h-full md:hidden"
              style={BG}
            >
              <SidebarContent onClose={() => setOpen(false)} animate />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main content */}
      <motion.div
        animate={{ x: open ? 24 : 0, rotate: open ? 3 : 0 }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
        }}
        style={{
          transformOrigin: "bottom left",
          boxShadow: "-8px 0 40px rgba(0,0,0,0.5), -2px 0 8px rgba(0,0,0,0.3)",
        }}
        className="bg-alabaster min-w-0 flex-1 overflow-y-auto"
      >
        <div className="flex p-3">
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            className="bg-onyx cursor-pointer p-1 transition-opacity hover:opacity-75"
          >
            {open ? (
              <ArrowUpRight className="text-alabaster" />
            ) : (
              <ArrowDownRight className="text-alabaster" />
            )}
          </button>
        </div>

        {children}
      </motion.div>
    </div>
  );
}
