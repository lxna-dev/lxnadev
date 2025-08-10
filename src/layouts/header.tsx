import { ModeToggle } from "@/components/theme/theme-toggle";

export default function Header() {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/10 px-6 py-3 font-sans shadow-[0_0_10px_rgba(255,255,255,0.1)]">
      <div>LXNA</div>
      <div>
        <ul className="flex gap-4 text-sm tracking-widest uppercase">
          <li>About</li>
          <li>Projects</li>
          <li>Contact</li>
        </ul>
      </div>
      <div>
        <ModeToggle></ModeToggle>
      </div>
    </div>
  );
}
