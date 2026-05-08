"use client";

import { useState } from "react";
import Image from "next/image";

export function GalleryGrid({ images }: { images: string[] }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {images.map((img, i) => (
          <button key={i} onClick={() => setOpen(i)} className="rounded-xl overflow-hidden hover:opacity-90 transition-opacity cursor-zoom-in">
            <Image src={img} alt={`صورة ${i + 1}`} width={300} height={200} className="w-full h-40 object-cover" />
          </button>
        ))}
      </div>

      {open !== null && (
        <div className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-4" onClick={() => setOpen(null)}>
          <button onClick={() => setOpen(null)} className="absolute top-6 left-6 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-2xl transition-colors z-10">
            &times;
          </button>

          {open > 0 && (
            <button onClick={(e) => { e.stopPropagation(); setOpen(open - 1); }} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors">
              &rsaquo;
            </button>
          )}

          {open < images.length - 1 && (
            <button onClick={(e) => { e.stopPropagation(); setOpen(open + 1); }} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white text-xl transition-colors">
              &lsaquo;
            </button>
          )}

          <div onClick={(e) => e.stopPropagation()} className="max-w-4xl max-h-[85vh] relative">
            <Image src={images[open]} alt="" width={1200} height={800} className="max-w-full max-h-[85vh] object-contain rounded-lg" />
            <p className="text-white/50 text-center text-sm mt-3">{open + 1} / {images.length}</p>
          </div>
        </div>
      )}
    </>
  );
}
