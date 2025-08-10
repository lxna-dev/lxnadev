import Image from "next/image";
import About from "@/components/sections/about";
import Projects from "@/components/sections/projects";
export default function Home() {
  return (
    <div className="m-auto flex w-[900px] flex-col gap-40">
      <About />
      <Projects />
    </div>
  );
}
