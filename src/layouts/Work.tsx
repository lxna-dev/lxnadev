"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";

const WORK = [
  {
    role: "Full Stack Developer",
    company: "Freelance",
    period: "2021 — Present",
    description:
      "Building web apps and automation systems for clients across e-commerce, real estate, and SaaS. Stack ranges from Next.js + Supabase to GoHighLevel and Zapier depending on the job.",
    tags: ["Next.js", "Supabase", "GoHighLevel", "Zapier"],
  },
  {
    role: "GoHighLevel Technical Specialist",
    company: "Agency / Consulting",
    period: "2022 — Present",
    description:
      "Architecting full CRM pipelines, automated follow-up sequences, and white-label sub-account setups. Reduced manual ops time for clients by building end-to-end funnel and automation infrastructure.",
    tags: ["GoHighLevel", "CRM", "Automation", "Twilio"],
  },
  {
    role: "WordPress Developer",
    company: "Freelance",
    period: "2020 — 2022",
    description:
      "Delivered custom themes and plugin integrations for small businesses. Handled performance optimisation, SEO setup, and WooCommerce configurations.",
    tags: ["WordPress", "PHP", "WooCommerce", "SEO"],
  },
];


export default function Work() {
  return (
    <section className="flex flex-col px-3">
      {/* Top meta bar */}
      <motion.div
        {...fadeUp(0)}
        className="border-onyx font-syne text-dim-grey flex items-center justify-between border-b py-2 text-xs tracking-widest uppercase"
      >
        <span>— 02</span>
        <span>Work Experience</span>
      </motion.div>

      {/* Entries */}
      <div className="flex flex-col">
        {WORK.map((item, i) => (
          <motion.div
            key={item.company + item.role}
            {...fadeUp(0.06 + i * 0.08)}
            className="border-onyx grid grid-cols-1 gap-3 border-b py-6 md:grid-cols-[180px_1fr]"
          >
            {/* Left — period + company */}
            <div className="flex flex-col gap-1">
              <span className="font-syne text-dim-grey text-[11px] tracking-widest uppercase">
                {item.period}
              </span>
              <span className="font-syne text-onyx text-xs font-medium tracking-widest uppercase">
                {item.company}
              </span>
            </div>

            {/* Right — role, description, tags */}
            <div className="flex flex-col gap-3">
              <p className="font-sans text-onyx text-base font-black">
                {item.role}
              </p>
              <p className="font-syne text-dim-grey max-w-prose text-sm leading-relaxed">
                {item.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="border-onyx font-syne text-dim-grey border px-2 py-0.5 text-[10px] tracking-widest uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
