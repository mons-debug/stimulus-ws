"use client";

import { useState } from "react";

export function ReadMoreContent({ html }: { html: string }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative">
      <div
        className={`prose-arabic transition-all duration-500 ${expanded ? "" : "max-h-[500px] lg:max-h-none overflow-hidden"}`}
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {!expanded && (
        <div className="lg:hidden absolute bottom-0 left-0 right-0">
          <div className="h-32 bg-gradient-to-t from-white via-white/90 to-transparent" />
          <div className="bg-white text-center pb-2">
            <button
              onClick={() => setExpanded(true)}
              className="inline-flex flex-col items-center gap-1 text-coral font-bold text-sm animate-bounce"
            >
              <span>أكمل القراءة</span>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M6 9l6 6 6-6"/></svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
