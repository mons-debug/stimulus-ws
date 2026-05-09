"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Partner = { id: string; name: string; logoUrl: string | null; country: string; website: string | null };

export default function PartnersAdmin() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [form, setForm] = useState({ name: "", country: "", website: "" });
  const [logoUrl, setLogoUrl] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  const load = () => fetch("/api/partners").then(r => r.json()).then(setPartners);
  useEffect(() => { load(); }, []);

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) { const { url } = await res.json(); setLogoUrl(url); }
  }

  async function handleAdd() {
    if (!form.name.trim() || !form.country.trim()) return;
    await fetch("/api/partners", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, logoUrl: logoUrl || null }),
    });
    setForm({ name: "", country: "", website: "" });
    setLogoUrl("");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("حذف هذا الشريك؟")) return;
    await fetch("/api/partners", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy mb-8">الشركاء</h1>

      <div className="bg-white rounded-2xl p-6 border border-border mb-8 max-w-2xl">
        <h2 className="text-lg font-bold text-navy mb-4">إضافة شريك جديد</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="اسم الشريك..." className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm" />
          <input type="text" value={form.country} onChange={e => setForm({ ...form, country: e.target.value })} placeholder="الدولة..." className="px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm" />
        </div>
        <input type="text" value={form.website} onChange={e => setForm({ ...form, website: e.target.value })} placeholder="الموقع (اختياري)..." className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm mb-4" />
        <div className="flex items-center gap-4 mb-4">
          <input type="file" ref={fileRef} onChange={handleUpload} accept="image/*" className="hidden" />
          <button type="button" onClick={() => fileRef.current?.click()} className="border-2 border-dashed border-border rounded-xl px-4 py-2 text-sm text-text-light hover:border-coral hover:text-coral transition-colors">
            {logoUrl ? "تغيير الشعار" : "رفع شعار"}
          </button>
          {logoUrl && <Image src={logoUrl} alt="" width={80} height={40} className="max-h-10 w-auto object-contain" />}
        </div>
        <button onClick={handleAdd} className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm">إضافة</button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl">
        {partners.map(p => (
          <div key={p.id} className="bg-white rounded-2xl p-5 border border-border flex items-center gap-4">
            {p.logoUrl ? (
              <Image src={p.logoUrl} alt={p.name} width={80} height={40} className="max-h-10 w-auto object-contain flex-shrink-0" />
            ) : (
              <div className="w-14 h-10 bg-warm-gray rounded-lg flex items-center justify-center text-text-light text-xs flex-shrink-0">لا شعار</div>
            )}
            <div className="flex-1 min-w-0">
              <p className="font-bold text-navy text-sm truncate">{p.name}</p>
              <p className="text-text-light text-xs">{p.country}</p>
            </div>
            <button onClick={() => handleDelete(p.id)} className="text-red-500 text-xs font-semibold hover:underline flex-shrink-0">حذف</button>
          </div>
        ))}
      </div>
    </div>
  );
}
