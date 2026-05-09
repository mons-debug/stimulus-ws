"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    const res = await fetch("/api/newsletter", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ email }) });
    if (res.ok) { setDone(true); setEmail(""); }
  }

  if (done) return <p className="text-[#25D366] text-sm font-bold">تم الاشتراك بنجاح ✓</p>;

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full">
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="البريد الإلكتروني" required
        className="min-w-0 flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-coral" />
      <button type="submit" className="flex-shrink-0 px-4 py-2.5 bg-coral text-white rounded-lg hover:bg-coral-hover transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
      </button>
    </form>
  );
}
