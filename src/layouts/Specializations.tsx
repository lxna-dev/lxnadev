"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

const SPECIALIZATIONS = [
  {
    title: "Funnel Creation",
    description:
      "End-to-end sales funnels built to convert — from opt-in pages and upsells to automated follow-up sequences. Every step engineered with intent.",
  },
  {
    title: "Landing Page Design",
    description:
      "High-converting landing pages with clean layouts, sharp copy structure, and fast load times. Built to sell, not just look good.",
  },
  {
    title: "CRM Automation",
    description:
      "Full GoHighLevel pipeline architecture — automated workflows, follow-up sequences, sub-account setups, and white-label configurations.",
  },
  {
    title: "Web App Development",
    description:
      "Full stack applications built with Next.js, Supabase, and TypeScript. From MVPs to production systems that handle real traffic.",
  },
];

export default function Specializations() {
  return (
    <section className="flex flex-col px-3">
      {/* Meta bar */}
      <motion.div
        {...fadeUp(0)}
        className="border-onyx font-syne text-dim-grey flex items-center justify-between border-b py-2 text-xs tracking-widest uppercase"
      >
        <span>— 02</span>
        <span>Specializations</span>
      </motion.div>

      {/* Grid */}
      <div className="grid grid-cols-1 gap-px border-b-0 py-8 sm:grid-cols-2">
        {SPECIALIZATIONS.map((item, i) => (
          <motion.div
            key={item.title}
            {...fadeUp(0.06 + i * 0.07)}
            className="border-onyx group flex flex-col gap-3 border-b py-6 sm:odd:pr-8 sm:even:border-l sm:even:pl-8"
          >
            {/* Number + title row */}
            <div className="flex items-baseline gap-3">
              <span className="font-syne text-dim-grey text-xs tracking-widest">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="font-sans text-onyx text-xl font-black leading-tight tracking-tight">
                {item.title}
              </h3>
            </div>

            {/* Divider that fills on hover */}
            <div className="bg-silver relative h-px w-full overflow-hidden">
              <motion.div
                className="bg-flag-red absolute inset-y-0 left-0"
                initial={{ width: "0%" }}
                whileInView={{ width: "30%" }}
                viewport={{ once: true }}
                transition={{
                  delay: 0.1 + i * 0.07,
                  duration: 0.5,
                  ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number],
                }}
              />
            </div>

            {/* Description */}
            <p className="font-syne text-dim-grey text-sm leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
