"use client";

import React from "react";
import { Code, MapPin, Briefcase, Download, View } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
export default function About() {
  const bio = [
    {
      name: "Full Stack Developer | GHL Technical Specialist",
      icon: <Code size={18} />,
    },
    {
      name: "Based in Manila, Philippines",
      icon: <MapPin size={18} />,
    },
    {
      name: "3+ years of work experience",
      icon: <Briefcase size={18} />,
    },
  ];

  const skillsdev = [
    "React",
    "Next.js",
    "Tailwind CSS",
    "TypeScript",
    "JavaScript",
    "Bootstrap",
    "Material UI",
  ].map((name) => ({ name }));

  const skillsghl = ["GoHighLevel", "Zapier", "Wordpress", "Shopify"].map(
    (name) => ({ name }),
  );

  const { theme, setTheme } = useTheme();

  const isDark = theme === "dark";

  return (
    <div className="m-auto flex flex-col justify-center gap-10 pt-20 font-sans md:flex-row">
      <div>
        <p className="pb-10 font-sans text-sm tracking-widest text-gray-500 uppercase">
          about me
        </p>
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex-1">
            <h1 className="pb-4 text-4xl font-bold">
              Heya! I'm{" "}
              <span className={`rounded-2xl text-orange-400`}>
                {" "}
                Beljohn Luna{" "}
              </span>
            </h1>
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
            <div className="flex gap-2 pt-4">
              <Button size={"lg"} variant="outline">
                <View /> View Work
              </Button>
              <Button size={"lg"}>
                <Download /> Download CV
              </Button>
            </div>
          </div>
          <div className="my-auto flex-1">
            <p className="pb-4 font-bold">Key Skills</p>
            <div className="flex flex-col gap-4">
              <p className="text-sm">Development</p>
              <div className="flex flex-wrap gap-2">
                {skillsdev.map((item) => (
                  <div key={item.name} className="flex items-center gap-2 pb-2">
                    <p className="bg-slate- flex rounded-lg p-2 text-sm text-white">
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
                    <p className="flex rounded-lg bg-gray-800 p-2 text-sm text-white">
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
