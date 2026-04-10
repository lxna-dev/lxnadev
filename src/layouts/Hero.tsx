"use client";

import { Button } from "@/components/ui/button";
import { useLanyard } from "@/hooks/useLanyard";
import { motion } from "motion/react";
import Marquee from "react-fast-marquee";
import Lottie from "lottie-react";
import infinityAnimation from "../../public/animations/Infinity.json";
import { useEffect, useState } from "react";

const TECH_STACK = [
  "Next.js",
  "React",
  "Node",
  "Supabase",
  "Twilio",
  "GoHighLevel",
  "Zapier",
  "Lovable",
  "WordPress",
];

// --- Replace with real numbers ---
const STATS = [
  { value: "5+", label: "Years of Experience" },
  { value: "20+", label: "Projects Shipped" },
  { value: "10+", label: "Clients Served" },
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

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

export default function Hero() {
  const { data, loading } = useLanyard();

  const discordStatus = data?.discord_status ?? "offline";
  const spotify = data?.listening_to_spotify ? data.spotify : null;

  // Live Spotify progress bar
  const [spotifyProgress, setSpotifyProgress] = useState(0);
  useEffect(() => {
    if (!spotify?.timestamps) return;
    const tick = () => {
      const { start, end } = spotify.timestamps!;
      setSpotifyProgress(Math.min(100, ((Date.now() - start) / (end - start)) * 100));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [spotify]);

  // VS Code elapsed time
  const [vsElapsed, setVsElapsed] = useState("");
  useEffect(() => {
    if (!data?.vscode?.elapsed_start) return;
    const tick = () => setVsElapsed(formatElapsed(data.vscode!.elapsed_start!));
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, [data?.vscode]);

  // Active platform label
  const platform = data?.active_on_discord_mobile
    ? "Mobile"
    : data?.active_on_discord_desktop
      ? "Desktop"
      : data?.active_on_discord_web
        ? "Web"
        : null;

  return (
    <section className="flex flex-col px-3">
      {/* Top meta bar */}
      <motion.div
        {...fadeUp(0)}
        className="border-onyx font-syne text-dim-grey flex items-center justify-between border-b py-2 text-xs tracking-widest uppercase"
      >
        <span>— 01</span>
        <span>Portfolio / 2026</span>
      </motion.div>

      {/* Main grid: content left, widgets right */}
      <div className="grid flex-1 grid-cols-1 gap-6 py-6 md:grid-cols-[1fr_260px]">
        {/* Left — name, subheadline, CTAs */}
        <motion.div
          {...fadeUp(0.08)}
          className="flex flex-col justify-between gap-6"
        >
          {/* Top: coffee tagline + name */}
          <div>
            <p className="font-syne text-dim-grey text-sm mb-0.5 flex items-center gap-1.5 tracking-widest uppercase">
              currently running on{" "}
              <Lottie
                animationData={infinityAnimation}
                loop
                className="inline-block"
                style={{ width: 16, height: 16 }}
              />{" "}
              amounts of coffee ☕
            </p>
            <div>
              <p className="font-mono text-2xl font-black">LXNA.DEV</p>
            </div>
          </div>

          {/* Bottom: subheadline + CTAs */}
          <div className="flex flex-col gap-4">
            <p className="font-syne text-onyx max-w-md text-base leading-relaxed">
              Full Stack Developer & GoHighLevel Technical Specialist building
              web apps and automation systems that{" "}
              <span className="text-flag-red">actually ship.</span>
            </p>
            <div className="flex gap-3">
              <Button
                size="sm"
                className="font-syne rounded-none text-xs tracking-wider uppercase"
              >
                View My Work →
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="border-onyx font-syne hover:bg-onyx hover:text-alabaster rounded-none text-xs tracking-wider uppercase"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Right — status widgets */}
        <motion.div
          {...fadeUp(0.14)}
          className="flex flex-col justify-start gap-3"
        >
          {/* Discord card */}
          <div className="border-onyx flex flex-col gap-2 border p-3">
            <div className="font-syne text-dim-grey flex items-center justify-between text-[11px] tracking-widest uppercase">
              <span>Discord</span>
              {platform && (
                <span className="text-dim-grey text-[10px] normal-case tracking-normal">
                  {platform}
                </span>
              )}
            </div>
            {loading ? (
              <p className="text-dim-grey text-xs">Loading…</p>
            ) : (
              <div className="flex items-center gap-3">
                {/* Avatar with status dot */}
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
                    <p className="text-dim-grey truncate text-[10px] italic">
                      {data.custom_status.text}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Spotify card */}
          <div className="border-onyx flex flex-col gap-2 border p-3">
            <div className="font-syne text-dim-grey flex items-center justify-between text-[11px] tracking-widest uppercase">
              <span>Spotify</span>
              {spotify && (
                <span className="text-flag-red flex items-center gap-1">
                  <span className="bg-flag-red inline-block h-1.5 w-1.5 rounded-full" />
                  Now Playing
                </span>
              )}
            </div>
            {loading ? (
              <p className="text-dim-grey text-xs">Loading…</p>
            ) : spotify ? (
              <>
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
                    <p className="text-dim-grey truncate text-[10px]">
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
              </>
            ) : (
              <p className="text-dim-grey text-xs">Not playing</p>
            )}
          </div>

          {/* VS Code card — only shown when active */}
          {data?.vscode && (
            <div className="border-onyx flex flex-col gap-2 border p-3">
              <div className="font-syne text-dim-grey flex items-center justify-between text-[11px] tracking-widest uppercase">
                <span>VS Code</span>
                {vsElapsed && (
                  <span className="text-dim-grey text-[10px] normal-case tracking-normal">
                    {vsElapsed}
                  </span>
                )}
              </div>
              <p className="font-syne text-onyx truncate text-xs">
                {data.vscode.details}
              </p>
            </div>
          )}
        </motion.div>
      </div>

      {/* Stats strip */}
      <motion.div
        {...fadeUp(0.2)}
        className="border-onyx grid grid-cols-3 border-t"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-0.5 py-4 ${i !== 0 ? "border-onyx border-l pl-4" : ""}`}
          >
            <span className="text-onyx font-sans text-3xl font-black">
              {stat.value}
            </span>
            <span className="font-syne text-dim-grey text-xs tracking-widest uppercase">
              {stat.label}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Tech marquee */}
      <motion.div
        {...fadeUp(0.26)}
        className="border-onyx overflow-hidden border-t py-3"
      >
        <Marquee speed={35} gradient={false}>
          {TECH_STACK.map((tech) => (
            <span
              key={tech}
              className="font-syne text-dim-grey mx-8 text-xs tracking-widest uppercase"
            >
              {tech} <span className="text-flag-red">×</span>
            </span>
          ))}
        </Marquee>
      </motion.div>
    </section>
  );
}
