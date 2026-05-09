"use client";

import { useMemo } from "react";
import { motion } from "motion/react";
import DottedMap from "dotted-map";

type Region = "egypt" | "africa" | "middleeast" | "none";

function xyToLatLng(x: number, y: number): { lat: number; lng: number } {
  const lng = (x - 99) / 0.55;
  const lat = (59.76 - y) / 0.606;
  return { lat, lng };
}

function getRegion(lat: number, lng: number): Region {
  if (lat >= 22 && lat <= 31.7 && lng >= 24.7 && lng <= 36.9) return "egypt";
  if (
    (lat >= 36 && lat <= 42 && lng >= 26 && lng <= 45) ||
    (lat >= 29 && lat <= 37.5 && lng >= 35 && lng <= 48.5) ||
    (lat >= 12 && lat <= 32 && lng >= 36 && lng <= 60) ||
    (lat >= 25 && lat <= 40 && lng >= 44 && lng <= 63.5)
  ) return "middleeast";
  if (lat >= -35 && lat <= 37.5 && lng >= -18 && lng <= 52) return "africa";
  return "none";
}

const COLORS: Record<Region, string> = {
  egypt: "rgb(232,85,61)",
  africa: "rgb(232,85,61)",
  middleeast: "rgb(232,85,61)",
  none: "rgb(255,255,255)",
};

const OPACITIES: Record<Region, string> = {
  egypt: "0.4",
  africa: "0.4",
  middleeast: "0.4",
  none: "0.2",
};

const RADII: Record<Region, string> = {
  egypt: "0.6",
  africa: "0.6",
  middleeast: "0.6",
  none: "0.5",
};

export default function WorldMap() {
  const mapSvg = useMemo(() => {
    const map = new DottedMap({ height: 100, grid: "diagonal" });
    const points = map.getPoints() as Array<{ x: number; y: number }>;

    const circles = points.map((p) => {
      const { lat, lng } = xyToLatLng(p.x, p.y);
      const region = getRegion(lat, lng);
      return `<circle cx="${p.x}" cy="${p.y}" r="${RADII[region]}" fill="${COLORS[region]}" opacity="${OPACITIES[region]}"/>`;
    }).join("");

    return `data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 100">${circles}</svg>`)}`;
  }, []);

  return (
    <div className="w-full aspect-[2/1] rounded-lg relative">
      <motion.img
        src={mapSvg}
        className="w-full h-full [mask-image:linear-gradient(to_bottom,transparent,white_10%,white_90%,transparent)] pointer-events-none select-none"
        alt="world map"
        draggable={false}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />
      <svg viewBox="0 0 200 100" className="absolute inset-0 w-full h-full pointer-events-none">
        <motion.text
          x="113" y="42"
          textAnchor="middle" dominantBaseline="central"
          fill="white" fontSize="3.5" fontFamily="Cairo, sans-serif" fontWeight="700"
          initial={{ opacity: 0 }} animate={{ opacity: 0.95 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >مصر</motion.text>
        <motion.text
          x="95" y="65"
          textAnchor="middle" dominantBaseline="central"
          fill="white" fontSize="4" fontFamily="Cairo, sans-serif" fontWeight="700"
          initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >أفريقيا</motion.text>
        <motion.text
          x="128" y="38"
          textAnchor="middle" dominantBaseline="central"
          fill="white" fontSize="3" fontFamily="Cairo, sans-serif" fontWeight="700"
          initial={{ opacity: 0 }} animate={{ opacity: 0.7 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >الشرق الأوسط</motion.text>
      </svg>
    </div>
  );
}
