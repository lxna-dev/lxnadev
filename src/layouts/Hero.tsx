"use client";

import { Button } from "@/components/ui/button";
import { useLanyard } from "@/hooks/useLanyard";
import { LanyardData } from "@/lib/lanyard";
import { motion } from "motion/react";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
import infinityAnimation from "../../public/animations/Infinity.json";
import { useEffect, useState } from "react";
import { fadeUp } from "@/lib/animations";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
  SiVite,
  SiNodedotjs,
  SiSupabase,
  SiPostgresql,
  SiZapier,
  SiTwilio,
  SiWordpress,
} from "react-icons/si";
import { type IconType } from "react-icons";

const SKILLS: { category: string; items: { name: string; icon?: IconType }[] }[] = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", icon: SiNextdotjs },
      { name: "React", icon: SiReact },
      { name: "Tailwind", icon: SiTailwindcss },
      { name: "TypeScript", icon: SiTypescript },
      { name: "Vite", icon: SiVite },
    ],
  },
  {
    category: "Backend",
    items: [
      { name: "Node", icon: SiNodedotjs },
      { name: "Supabase", icon: SiSupabase },
      { name: "PostgreSQL", icon: SiPostgresql },
      { name: "REST APIs" },
    ],
  },
  {
    category: "Tools",
    items: [
      { name: "GoHighLevel" },
      { name: "Zapier", icon: SiZapier },
      { name: "Twilio", icon: SiTwilio },
      { name: "WordPress", icon: SiWordpress },
      { name: "Lovable" },
    ],
  },
];

const STATUS_COLOR: Record<string, string> = {
  online: "bg-green-500",
  idle: "bg-yellow-400",
  dnd: "bg-flag-red",
  offline: "bg-dim-grey",
};

const STATUS_LABEL: Record<string, string> = {
  online: "Online",
  idle: "Idle",
  dnd: "Do Not Disturb",
  offline: "Offline",
};

function formatElapsed(startMs: number): string {
  const secs = Math.floor((Date.now() - startMs) / 1000);
  const h = Math.floor(secs / 3600);
  const m = Math.floor((secs % 3600) / 60);
  if (h > 0) return `${h}h ${m}m`;
  return `${m}m`;
}

export default function Hero({ initialData }: { initialData?: LanyardData }) {
  const { data, loading } = useLanyard(initialData);

  const discordStatus = data?.discord_status ?? "offline";
  const spotify = data?.listening_to_spotify ? data.spotify : null;

  const [spotifyProgress, setSpotifyProgress] = useState(0);
  useEffect(() => {
    if (!spotify?.timestamps) return;
    const tick = () => {
      const { start, end } = spotify.timestamps!;
      setSpotifyProgress(
        Math.min(100, ((Date.now() - start) / (end - start)) * 100),
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [spotify]);

  const [vsElapsed, setVsElapsed] = useState("");
  useEffect(() => {
    if (!data?.vscode?.elapsed_start) return;
    const tick = () => setVsElapsed(formatElapsed(data.vscode!.elapsed_start!));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [data?.vscode]);

  const platform = data?.active_on_discord_mobile
    ? "Mobile"
    : data?.active_on_discord_desktop
      ? "Desktop"
      : data?.active_on_discord_web
        ? "Web"
        : null;

  return (
    <section className="flex flex-col px-3">
      {/* Meta bar */}
      <motion.div
        {...fadeUp(0)}
        className="border-onyx font-syne text-dim-grey flex items-center justify-between border-b py-2 text-xs tracking-widest uppercase"
      >
        <span>— 01</span>
        <span>Portfolio / 2026</span>
      </motion.div>

      {/* Tagline */}
      <motion.div
        {...fadeUp(0.04)}
        className="font-syne text-dim-grey mt-6 flex flex-wrap items-center gap-1.5 text-sm tracking-widest uppercase"
      >
        currently running on{" "}
        <Lottie
          animationData={infinityAnimation}
          loop
          className="inline-block"
          style={{ width: 13, height: 13 }}
        />{" "}
        amounts of coffee ☕
      </motion.div>

      {/* Name — dominant visual */}
      <motion.div {...fadeUp(0.08)} className="mt-2 leading-none">
        <p
          className="font-mono font-black tracking-tight"
          style={{ fontSize: "clamp(3.5rem, 11vw, 8rem)" }}
        >
          LXNA
          <span className="text-flag-red">.DEV</span>
        </p>
      </motion.div>

      {/* Content grid: roles+desc+CTAs left, widgets right */}
      <div className="mt-8 mb-10 grid grid-cols-1 items-start gap-8 md:grid-cols-[1fr_260px]">
        {/* Left */}
        <motion.div {...fadeUp(0.12)} className="flex flex-col gap-6">
          {/* Roles */}
          <div className="border-onyx flex flex-col gap-0 border-l-2 pl-3">
            <p className="font-syne text-onyx text-sm font-medium tracking-wide">
              Full Stack Developer
            </p>
            <p className="font-syne text-onyx text-sm font-medium tracking-wide">
              GoHighLevel Technical Specialist
            </p>
          </div>

          {/* Description */}
          <p className="font-syne text-dim-grey max-w-sm text-sm leading-relaxed">
            Building web apps and automation systems that{" "}
            <span className="text-flag-red font-medium">actually ship.</span>{" "}
            From Next.js frontends to full CRM pipelines — end to end.
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button
              size="sm"
              className="font-syne rounded-none text-xs tracking-wider uppercase"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work →
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="border-onyx font-syne hover:bg-onyx hover:text-alabaster rounded-none text-xs tracking-wider uppercase"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              Get in Touch
            </Button>
          </div>
        </motion.div>

        {/* Right — Lanyard widgets */}
        <motion.div {...fadeUp(0.16)} className="flex flex-col gap-2.5">
          {/* Discord */}
          <div className="border-onyx flex flex-col gap-2.5 border p-3">
            <div className="font-syne text-dim-grey flex items-center justify-between text-xs tracking-widest uppercase">
              <span>Discord</span>
              {platform && (
                <span className="text-xs tracking-normal normal-case">
                  {platform}
                </span>
              )}
            </div>
            {loading ? (
              <p className="text-dim-grey text-xs">Loading…</p>
            ) : (
              <div className="flex items-center gap-3">
                <div className="relative shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={data?.discord_user.avatar_url}
                    alt="avatar"
                    className="h-10 w-10 rounded-full"
                  />
                  <span
                    className={`border-alabaster absolute -right-0.5 -bottom-0.5 h-3 w-3 rounded-full border-2 ${STATUS_COLOR[discordStatus]}`}
                  />
                </div>
                <div className="font-syne min-w-0 flex-1">
                  <p className="text-onyx text-sm font-medium">
                    {data?.discord_user.display_name ?? "LXNA"}
                  </p>
                  <p className="text-dim-grey text-xs">
                    {STATUS_LABEL[discordStatus]}
                  </p>
                  {data?.custom_status?.text && (
                    <p className="text-dim-grey truncate text-xs italic">
                      {data.custom_status.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Spotify */}
          <div className="border-onyx flex flex-col gap-2.5 border p-3">
            <div className="font-syne text-dim-grey flex items-center justify-between text-xs tracking-widest uppercase">
              <span>Spotify</span>
              {spotify && (
                <span className="text-flag-red flex items-center gap-1.5 text-xs tracking-widest uppercase">
                  <span className="bg-flag-red inline-block h-1.5 w-1.5 animate-pulse rounded-full" />
                  Live
                </span>
              )}
            </div>
            {loading ? (
              <p className="text-dim-grey text-xs">Loading…</p>
            ) : spotify ? (
              <div className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  {spotify.album_art_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={spotify.album_art_url}
                      alt={spotify.album}
                      className="h-10 w-10 shrink-0 object-cover"
                    />
                  )}
                  <div className="font-syne min-w-0">
                    <p className="text-onyx truncate text-sm font-medium">
                      {spotify.song}
                    </p>
                    <p className="text-dim-grey truncate text-xs">
                      {spotify.artist}
                    </p>
                    <p className="text-dim-grey truncate text-xs">
                      {spotify.album}
                    </p>
                  </div>
                </div>
                <div className="bg-silver h-px w-full">
                  <div
                    className="bg-flag-red h-px transition-all duration-1000"
                    style={{ width: `${spotifyProgress}%` }}
                  />
                </div>
              </div>
            ) : (
              <p className="text-dim-grey text-xs">Not playing</p>
            )}
          </div>

          {/* VS Code — conditional */}
          {data?.vscode && (
            <div className="border-onyx flex flex-col gap-2.5 border p-3">
              <div className="font-syne text-dim-grey flex items-center justify-between text-xs tracking-widest uppercase">
                <span>VS Code</span>
                {vsElapsed && (
                  <span className="text-xs tracking-normal normal-case">
                    {vsElapsed}
                  </span>
                )}
              </div>
              <p className="font-syne text-onyx truncate text-sm">
                {data.vscode.details}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Skills */}
      <motion.div {...fadeUp(0.28)} className="border-onyx border-t">
        {SKILLS.map((group, i) => (
          <motion.div
            key={group.category}
            {...fadeUp(0.28 + i * 0.07)}
            className={`border-onyx grid grid-cols-[96px_1fr] items-start gap-4 py-4 ${i !== 0 ? "border-t" : ""}`}
          >
            <div className="flex flex-col gap-1 pt-0.5">
              <span className="font-syne text-dim-grey text-xs tracking-widest uppercase">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-syne text-flag-red text-xs tracking-widest uppercase">
                {group.category}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {group.items.map((item, j) => (
                <motion.span
                  key={item.name}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.32 + i * 0.07 + j * 0.045,
                    duration: 0.25,
                    ease: [0.25, 0.1, 0.25, 1] as [
                      number,
                      number,
                      number,
                      number,
                    ],
                  }}
                  className="border-onyx font-syne text-onyx group relative cursor-default overflow-hidden border px-3 py-1.5 text-xs tracking-widest uppercase"
                >
                  <span
                    className="bg-onyx absolute inset-0 origin-left scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100"
                    aria-hidden
                  />
                  <span className="relative flex items-center gap-1.5 transition-colors duration-300 group-hover:text-alabaster">
                    {item.icon && <item.icon size={12} className="shrink-0" />}
                    {item.name}
                  </span>
                </motion.span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
