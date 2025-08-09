import React from "react";
import { Code, MapPin, Briefcase } from "lucide-react";
export default function About() {
  const bio = [
    {
      name: "Full Stack Developer | GHL Technical Specialist",
      icon: <Code />,
    },
    {
      name: "Based in Manila, Philippines",
      icon: <MapPin />,
    },
    {
      name: "3+ years of work experience",
      icon: <Briefcase />,
    },
  ];

  const skillsdev = [
    {
      name: "React",
    },
    {
      name: "Next.js",
    },
    {
      name: "Tailwind CSS",
    },
    {
      name: "TypeScript",
    },
    {
      name: "JavaScript",
    },
    {
      name: "Bootstrap",
    },
    {
      name: "Material UI",
    },
  ];

  const skillsghl = [
    {
      name: "GoHighLevel",
    },
    {
      name: "Zapier",
    },
    {
      name: "Wordpress",
    },
    {
      name: "Shopify",
    },
  ];

  return (
    <div className="m-auto flex w-[900px] justify-center gap-10 font-sans">
      <div>
        <p className="pb-10 font-sans text-sm tracking-widest text-gray-500 uppercase">
          about me
        </p>
        <div className="flex gap-10">
          <div className="flex-1">
            <h1 className="pb-4 text-4xl font-bold">Heya! I'm Beljohn Luna</h1>
            {bio.map((item) => (
              <div key={item.name} className="flex items-center gap-2 pb-2">
                {item.icon}
                <p>{item.name}</p>
              </div>
            ))}
            <p className="pt-4">
              I'm a full stack developer and a GHL Technical Specialist. Expert
              in integrating GoHighLevel with other tools to automate workflows
              and build custom solutions such as Lead Magnets, E-commerce, and
              more for businesses.
            </p>
          </div>
          <div className="my-auto flex-1">
            <p className="pb-4 font-bold">Key Skills</p>
            <div className="flex flex-col gap-4">
              <p className="text-sm">Development</p>
              <div className="flex flex-wrap gap-2">
                {skillsdev.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 pb-2">
                    <p className="flex rounded-lg bg-gray-800 p-2 text-sm">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
              <p className="text-sm">
                GoHighLevel | Integrations Tools | Website Creation Tools
              </p>
              <div className="flex flex-wrap gap-2">
                {skillsghl.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 pb-2">
                    <p className="flex rounded-lg bg-gray-800 p-2 text-sm">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
