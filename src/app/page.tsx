import Hero from "@/layouts/Hero";
import Specializations from "@/layouts/Specializations";
import Projects from "@/layouts/Projects";
import Contact from "@/layouts/Contact";
import { fetchLanyard, LanyardData } from "@/lib/lanyard";

export default async function Home() {
  let lanyardData: LanyardData | undefined;
  try {
    lanyardData = await fetchLanyard();
  } catch {
    // fall through — Hero will handle the loading state
  }

  return (
    <div className="w-full">
      <Hero initialData={lanyardData} />
      <Specializations />
      <Projects />
      <Contact />
    </div>
  );
}
