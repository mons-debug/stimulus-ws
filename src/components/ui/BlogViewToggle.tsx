"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Article = {
  id: string;
  slug: string;
  title: string;
  featuredImage: string | null;
  authorName: string;
  publishedAt: string;
  categoryName: string | null;
  authorDisplayName: string | null;
};

export function BlogViewToggle({ articles }: { articles: Article[] }) {
  const [view, setView] = useState<"list" | "grid">("list");

  return (
    <div className="lg:hidden">
      {/* Toggle buttons */}
      <div className="flex items-center justify-between mb-3">
        <p className="text-text-light text-xs">{articles.length} مقال</p>
        <div className="flex bg-warm-gray rounded-lg p-0.5 border border-border">
          <button onClick={() => setView("list")} className={`p-1.5 rounded-md transition-colors ${view === "list" ? "bg-white shadow-sm" : ""}`} aria-label="عرض قائمة">
            <svg className={`w-4 h-4 ${view === "list" ? "text-coral" : "text-text-light"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
          </button>
          <button onClick={() => setView("grid")} className={`p-1.5 rounded-md transition-colors ${view === "grid" ? "bg-white shadow-sm" : ""}`} aria-label="عرض شبكة">
            <svg className={`w-4 h-4 ${view === "grid" ? "text-coral" : "text-text-light"}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          </button>
        </div>
      </div>

      {/* List view */}
      {view === "list" && (
        <div className="space-y-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group flex gap-3 bg-warm-gray rounded-xl p-3 border border-border hover:border-coral/20 hover:shadow-sm transition-all">
              <div className="w-24 h-20 rounded-lg overflow-hidden flex-shrink-0 relative">
                {article.featuredImage ? (
                  <Image src={article.featuredImage} alt={article.title} fill sizes="96px" className="object-cover object-[70%_top]" />
                ) : (
                  <div className="w-full h-full bg-navy/10 flex items-center justify-center"><span className="text-navy/30 text-lg">SGO</span></div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                {article.categoryName && (
                  <span className="inline-block bg-coral text-white text-[8px] font-bold px-1.5 py-0.5 rounded mb-1">{article.categoryName}</span>
                )}
                <h3 className="text-[13px] font-bold text-navy leading-snug group-hover:text-coral transition-colors line-clamp-2">{article.title}</h3>
                <div className="flex items-center gap-2 mt-1">
                  <p className="text-[10px] text-text-light">{article.authorDisplayName}</p>
                  <span className="text-border">·</span>
                  <p className="text-[10px] text-text-light">{article.publishedAt}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div className="grid grid-cols-2 gap-3">
          {articles.map((article) => (
            <Link key={article.id} href={`/blog/${article.slug}`} className="group bg-warm-gray rounded-xl overflow-hidden border border-border hover:shadow-md transition-all">
              <div className="aspect-[4/3] relative overflow-hidden">
                {article.featuredImage ? (
                  <Image src={article.featuredImage} alt={article.title} fill sizes="50vw" className="object-cover object-[70%_top] group-hover:scale-105 transition-transform duration-300" />
                ) : (
                  <div className="w-full h-full bg-navy/10 flex items-center justify-center"><span className="text-navy/30 text-2xl">SGO</span></div>
                )}
                {article.categoryName && (
                  <span className="absolute top-2 right-2 bg-coral text-white text-[7px] font-bold px-1.5 py-0.5 rounded">{article.categoryName}</span>
                )}
              </div>
              <div className="p-2.5">
                <h3 className="text-[11px] font-bold text-navy leading-snug group-hover:text-coral transition-colors line-clamp-2 mb-1">{article.title}</h3>
                <p className="text-[9px] text-text-light">{article.authorDisplayName}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
