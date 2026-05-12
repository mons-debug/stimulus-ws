"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

type SlideArticle = {
  slug: string;
  title: string;
  featuredImage: string | null;
  categoryName: string | null;
  authorName: string;
  date: string;
};

export function ArticleSlider({ articles }: { articles: SlideArticle[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (articles.length <= 1) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % articles.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [articles.length]);

  if (articles.length === 0) return null;
  const article = articles[active];

  return (
    <div>
      <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-text-light font-semibold mb-4">مقال محرّر العدد</p>
      <Link href={`/blog/${article.slug}`} className="group block">
        <div className="relative h-40 mb-4 overflow-hidden bg-warm-gray">
          {article.featuredImage && (
            <Image
              src={article.featuredImage}
              alt={article.title}
              fill
              className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-500"
              key={article.slug}
            />
          )}
        </div>
        {article.categoryName && (
          <p className="font-mono text-[10px] tracking-[0.12em] uppercase text-coral font-bold mb-2">{article.categoryName}</p>
        )}
        <h3 className="text-[19px] font-extrabold text-navy leading-[1.35] mb-2 group-hover:text-coral transition-colors">{article.title}</h3>
        <p className="text-xs text-text-light mb-4">{article.authorName} · {article.date}</p>
        <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-coral font-bold">اقرأ المقال ←</span>
      </Link>

      {/* Dot indicators */}
      {articles.length > 1 && (
        <div className="flex items-center gap-2 mt-5">
          {articles.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`transition-all duration-300 rounded-full ${i === active ? "w-6 h-1.5 bg-coral" : "w-1.5 h-1.5 bg-navy/20 hover:bg-navy/40"}`}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
