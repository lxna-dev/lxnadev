"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

const SOCIALS = [
  { label: "GitHub", href: "https://github.com/lxna-dev" },
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Contact() {
  return (
    <section id="contact" className="flex flex-col px-3">
      {/* Meta bar */}
      <motion.div
        {...fadeUp(0)}
        className="border-onyx font-syne text-dim-grey flex items-center justify-between border-b py-2 text-xs tracking-widest uppercase"
      >
        <span>— 04</span>
        <span>Contact</span>
      </motion.div>

      {/* CTA block */}
      <div className="flex flex-col gap-10 py-14">
        <motion.div {...fadeUp(0.06)} className="flex flex-col gap-2">
          <p className="font-syne text-dim-grey text-sm tracking-widest uppercase">
            Got a project in mind?
          </p>
          <p
            className="font-mono font-black leading-[0.9] tracking-tight text-onyx"
            style={{ fontSize: "clamp(3rem, 10vw, 7.5rem)" }}
          >
            LET&apos;S{" "}
            <span className="text-flag-red">TALK.</span>
          </p>
        </motion.div>

        {/* Email */}
        <motion.div {...fadeUp(0.12)} className="flex flex-col gap-1">
          <p className="font-syne text-dim-grey mb-2 text-xs tracking-widest uppercase">
            Reach out
          </p>
          <a
            href="mailto:beljohnluna@gmail.com"
            className="font-syne text-onyx group flex w-fit items-center gap-2 text-base tracking-widest uppercase transition-colors hover:text-flag-red"
          >
            <span className="border-onyx group-hover:border-flag-red border-b pb-px transition-colors">
              beljohnluna@gmail.com
            </span>
            <span className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </a>
        </motion.div>

        {/* Socials */}
        <motion.div {...fadeUp(0.18)} className="flex flex-col gap-1">
          <p className="font-syne text-dim-grey mb-2 text-xs tracking-widest uppercase">
            Elsewhere
          </p>
          <div className="flex gap-6">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="font-syne text-dim-grey text-sm tracking-widest uppercase transition-colors hover:text-onyx"
              >
                {social.label} ↗
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <motion.div
        {...fadeUp(0.24)}
        className="border-onyx flex items-center justify-between border-t py-4"
      >
        <p className="font-mono text-onyx text-base font-black tracking-tight">
          LXNA<span className="text-flag-red">.DEV</span>
        </p>
        <p className="font-syne text-dim-grey text-xs tracking-widest uppercase">
          Built with coffee & mild panic
        </p>
      </motion.div>
    </section>
  );
}
