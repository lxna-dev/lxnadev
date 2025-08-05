import { MapPin, Code, Briefcase } from "lucide-react";
import Image from "next/image";

export default function Home() {
  const bio = [
    {
      name: "Full Stack Developer",
      icon: <Code />,
    },
    {
      name: "Based in Manila, Philippines",
      icon: <MapPin />,
    },
    {
      name: "2+ years of experience",
      icon: <Briefcase />,
    },
  ];

  return (
    <div className="flex gap-10 font-sans">
      <div>
        <p className="text-sm uppercase pb-10tracking-widest pb-10 text-gray-500 font-sans">
          about me
        </p>
        <h1 className="text-4xl font-bold">Heya, I'm Beljohn Luna</h1>
        <div className="">
          {bio.map((item) => (
            <div key={item.name} className="flex gap-2 items-center pb-2">
              {item.icon}
              <p>{item.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div>Key Skills</div>
    </div>
  );
}
