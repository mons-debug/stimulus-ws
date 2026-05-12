"use client";

import { useEffect, useRef } from "react";

type TickerItem = { title: string; date: string };

export function NewsTicker({ items }: { items: TickerItem[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;

    let pos = 0;
    const speed = 1.2;
    let animId: number;
    const contentWidth = track.scrollWidth / 2;

    function step() {
      pos -= speed;
      if (pos <= -contentWidth) {
        pos = wrap!.offsetWidth;
      }
      track!.style.transform = `translateX(${pos}px)`;
      animId = requestAnimationFrame(step);
    }

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, []);

  return (
    <div ref={wrapRef} className="overflow-hidden whitespace-nowrap" style={{ direction: "ltr" }}>
      <div ref={trackRef} className="inline-flex items-center will-change-transform">
        {[0, 1].map((copy) =>
          items.map((item, i) => (
            <span key={`${copy}-${i}`} className="text-[13px] text-white/80 inline-flex items-center gap-3 flex-shrink-0 px-6" style={{ direction: "rtl" }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ff8e7a] flex-shrink-0" />
              {item.title}
              <span className="font-mono text-[10px] text-white/40">{item.date}</span>
            </span>
          ))
        )}
      </div>
    </div>
  );
}
