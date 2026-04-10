"use client";

import { useRef, useEffect, useState } from "react";

interface FluidTextProps {
  text: string;
  className?: string;
  lines?: number;
  justify?: boolean;
}

export default function FluidText({
  text,
  className = "",
  lines = 1,
  justify = false,
}: FluidTextProps) {
  const textRef = useRef<SVGTextElement>(null);
  const [viewBox, setViewBox] = useState("0 0 100 20");
  const [maxWidth, setMaxWidth] = useState(0);

  const splitTextIntoLines = (text: string, lineCount: number): string[] => {
    if (lineCount === 1) return [text];

    const words = text.split(" ");
    const wordsPerLine = Math.ceil(words.length / lineCount);
    const result: string[] = [];

    for (let i = 0; i < lineCount; i++) {
      const start = i * wordsPerLine;
      const end = start + wordsPerLine;
      const line = words.slice(start, end).join(" ");
      if (line) result.push(line);
    }

    return result;
  };

  const textLines = splitTextIntoLines(text, lines);

  useEffect(() => {
    if (textRef.current) {
      const bbox = textRef.current.getBBox();
      setViewBox(`${bbox.x} ${bbox.y} ${bbox.width} ${bbox.height}`);

      if (justify && textRef.current.children.length > 0) {
        let max = 0;
        Array.from(textRef.current.children).forEach((tspan) => {
          const width = (tspan as SVGTSpanElement).getComputedTextLength();
          if (width > max) max = width;
        });
        setMaxWidth(max);
      }
    }
  }, [text, lines, justify]);

  return (
    <div className="w-full leading-none">
      <svg
        viewBox={viewBox}
        className="block w-full h-auto"
        preserveAspectRatio="xMidYMid meet"
      >
        <text
          ref={textRef}
          x="0"
          y="0"
          dominantBaseline="hanging"
          className={`fill-current ${className}`}
        >
          {textLines.map((line, index) => (
            <tspan
              key={index}
              x="0"
              dy={index === 0 ? "0" : "1em"}
              textLength={justify && maxWidth > 0 ? maxWidth : undefined}
              lengthAdjust={justify ? "spacing" : undefined}
            >
              {line}
            </tspan>
          ))}
        </text>
      </svg>
    </div>
  );
}
