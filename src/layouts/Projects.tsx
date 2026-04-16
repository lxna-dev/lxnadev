"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/animations";
import Image from "next/image";

export interface Project {
  title: string;
  description: string;
  tags: string[];
  imageUrl: string;
  liveUrl?: string;
  repoUrl?: string;
  year: string;
}

const PROJECTS: Project[] = [
  {
    title: "Helios",
    description:
      "A portfolio and commission website built for a friend — a clean space to showcase her work and let clients reach out.",
    tags: [],
    imageUrl: "https://image.thum.io/get/width/1280/https://helios.lxna.dev",
    liveUrl: "https://helios.lxna.dev",
    year: "2025",
  },
  {
    title: "New Hues",
    description:
      "A marketing company website currently in development — building out the brand presence and web foundation.",
    tags: [],
    imageUrl: "https://image.thum.io/get/width/1280/https://newhues.vercel.app",
    liveUrl: "https://newhues.vercel.app",
    year: "2025",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="flex flex-col px-3">
      {/* Meta bar */}
      <motion.div
        {...fadeUp(0)}
        className="border-onyx font-syne text-dim-grey flex items-center justify-between border-b py-2 text-xs tracking-widest uppercase"
      >
        <span>— 03</span>
        <span>Projects</span>
      </motion.div>

      {/* Projects list */}
      <div className="flex flex-col">
        {PROJECTS.map((project, i) => (
          <motion.div
            key={project.title}
            {...fadeUp(0.06 + i * 0.1)}
            className="border-onyx group border-b py-8"
          >
            <div className="grid grid-cols-1 items-center gap-6 md:grid-cols-[28px_1fr_300px]">
              {/* Index */}
              <span className="font-syne text-dim-grey hidden text-xs tracking-widest uppercase md:block">
                {String(i + 1).padStart(2, "0")}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-4">
                <div className="flex items-baseline gap-3">
                  <span className="font-syne text-dim-grey text-xs tracking-widest uppercase md:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="font-sans text-onyx text-4xl font-black uppercase leading-none tracking-tight transition-colors duration-200 group-hover:text-flag-red">
                    {project.title}
                  </h3>
                </div>

                <p className="font-syne text-dim-grey text-sm leading-relaxed">
                  {project.description}
                </p>

                {project.tags.length > 0 && (
                  <div className="flex flex-wrap gap-1.5">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="border-onyx font-syne text-dim-grey border px-2 py-0.5 text-xs tracking-widest uppercase"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-6">
                  <span className="font-syne text-dim-grey text-xs tracking-widest uppercase">
                    {project.year}
                  </span>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-syne text-onyx border-onyx border-b pb-px text-sm tracking-widest uppercase transition-colors duration-200 hover:text-flag-red"
                    >
                      Live ↗
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-syne text-onyx border-onyx border-b pb-px text-sm tracking-widest uppercase transition-colors duration-200 hover:text-flag-red"
                    >
                      Repo ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Screenshot */}
              <div
                className="border-onyx relative overflow-hidden border"
                style={{ aspectRatio: "16/9" }}
              >
                <Image
                  src={project.imageUrl}
                  alt={project.title}
                  fill
                  unoptimized
                  className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 opacity-[0.05]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(0deg, transparent, transparent 2px, #000 2px, #000 3px)",
                  }}
                />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
