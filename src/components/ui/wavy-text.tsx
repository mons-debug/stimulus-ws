"use client";

import { motion } from "motion/react";

export function WavyText({ text, className = "", delay = 0 }: { text: string; className?: string; delay?: number }) {
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          className="inline-block whitespace-pre"
          initial={{ y: 15, opacity: 0, filter: "blur(6px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          transition={{
            duration: 0.5,
            delay: delay + i * 0.1,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {word}{i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
