"use client";

import { useEffect, useRef } from "react";

type TickerItem = { title: string; date: string };

export function NewsTicker({ items }: { items: TickerItem[] }) {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let pos = 0;
    const speed = 0.5;
    let animId: number;

    function step() {
      pos -= speed;
      const half = track!.scrollWidth / 2;
      if (Math.abs(pos) >= half) pos = 0;
      track!.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden whitespace-nowrap" dir="ltr">
      <div ref={trackRef} className="inline-flex items-center will-change-transform">
        {doubled.map((item, i) => (
          <span key={i} className="text-[13px] text-white/80 inline-flex items-center gap-3 flex-shrink-0 px-6">
            <span className="w-1.5 h-1.5 rounded-full bg-[#ff8e7a] flex-shrink-0" />
            <span dir="rtl">{item.title}</span>
            <span className="font-mono text-[10px] text-white/40">{item.date}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
