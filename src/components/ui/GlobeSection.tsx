"use client";

import WorldMap from "@/components/ui/world-map";
import { motion } from "motion/react";

export function GlobeSection() {
  return (
    <section className="bg-navy relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="text-center mb-6">
          <motion.p
            className="text-coral text-sm font-semibold mb-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            مصر وأفريقيا والشرق الأوسط
          </motion.p>
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-white leading-snug"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            نعمل عبر ثلاث مناطق جغرافية رئيسية
          </motion.h2>
        </div>
        <WorldMap />
      </div>
    </section>
  );
}
