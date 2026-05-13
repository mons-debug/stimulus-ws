"use client";

import { useState } from "react";

export function ShareButtons({ title, slug }: { title: string; slug: string }) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? `${window.location.origin}/blog/${slug}` : `/blog/${slug}`;

  function shareX() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, "_blank");
  }
  function shareFB() {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, "_blank");
  }
  function copyLink() {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="grid grid-cols-3 gap-2">
      <button onClick={shareX} className="py-2.5 bg-warm-gray font-mono text-[10px] tracking-[0.12em] uppercase text-navy font-bold hover:bg-coral hover:text-white transition-colors">X</button>
      <button onClick={shareFB} className="py-2.5 bg-warm-gray font-mono text-[10px] tracking-[0.12em] uppercase text-navy font-bold hover:bg-coral hover:text-white transition-colors">FB</button>
      <button onClick={copyLink} className="py-2.5 bg-warm-gray font-mono text-[10px] tracking-[0.12em] uppercase text-navy font-bold hover:bg-coral hover:text-white transition-colors">
        {copied ? "✓" : "نسخ"}
      </button>
    </div>
  );
}
