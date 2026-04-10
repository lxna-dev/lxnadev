"use client";

import Image from "next/image";
import { motion } from "motion/react";

export default function CustomImageAnimation(props: {
  imageSrc: string;
  altText: string;
}) {
  return (
    <motion.div
      className="w-full overflow-hidden"
      initial={{ clipPath: "inset(100% 0 0 0)" }}
      animate={{ clipPath: "inset(0% 0 0 0)" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <Image
        src={props.imageSrc}
        alt={props.altText}
        width={1920}
        height={1080}
        className="w-full h-auto grayscale"
      />
    </motion.div>
  );
}
