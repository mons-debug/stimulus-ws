"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";

type Author = { id: string; name: string; slug: string; bio: string | null; imageUrl: string | null; _count: { articles: number } };

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Author | null>(null);
  const [form, setForm] = useState({ name: "", bio: "", imageUrl: "" });
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() {
    const res = await fetch("/api/authors");
    setAuthors(await res.json());
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, imageUrl: url }));
    }
    setUploading(false);
  }

  async function handleSave() {
    if (!form.name.trim()) return;
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/authors", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setForm({ name: "", bio: "", imageUrl: "" });
    setEditing(null);
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل تريد حذف هذا الكاتب؟")) return;
    await fetch("/api/authors", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  function startEdit(a: Author) {
    setEditing(a);
    setForm({ name: a.name, bio: a.bio || "", imageUrl: a.imageUrl || "" });
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy mb-8">الكُتّاب</h1>

      <div className="bg-white rounded-2xl p-6 border border-border mb-8 max-w-2xl">
        <h2 className="text-lg font-bold text-navy mb-4">{editing ? "تعديل الكاتب" : "إضافة كاتب جديد"}</h2>
        <input type="file" ref={fileRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
        <div className="space-y-4">
          <div className="flex gap-4 items-start">
            <button type="button" onClick={() => fileRef.current?.click()} className="w-20 h-20 rounded-full bg-warm-gray border-2 border-dashed border-border flex items-center justify-center overflow-hidden flex-shrink-0 hover:border-coral transition-colors">
              {form.imageUrl ? (
                <Image src={form.imageUrl} alt="" width={80} height={80} className="w-full h-full object-cover rounded-full" />
              ) : uploading ? (
                <span className="text-xs text-text-light">...</span>
              ) : (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
              )}
            </button>
            <div className="flex-1 space-y-3">
              <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="اسم الكاتب..."
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm" />
              <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} placeholder="نبذة عن الكاتب..." rows={2}
                className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm resize-none" />
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm">
              {editing ? "حفظ التعديلات" : "إضافة"}
            </button>
            {editing && (
              <button onClick={() => { setEditing(null); setForm({ name: "", bio: "", imageUrl: "" }); }} className="bg-warm-gray text-navy font-bold px-6 py-3 rounded-xl text-sm">
                إلغاء
              </button>
            )}
          </div>
        </div>
      </div>

      {loading ? (
        <p className="text-text-light">جاري التحميل...</p>
      ) : authors.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border text-center max-w-2xl">
          <p className="text-text-light">لا يوجد كتّاب بعد</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-2xl">
          {authors.map((a) => (
            <div key={a.id} className="bg-white rounded-2xl p-5 border border-border flex items-center gap-4">
              <div className="w-14 h-14 rounded-full bg-navy/10 flex items-center justify-center overflow-hidden flex-shrink-0">
                {a.imageUrl ? (
                  <Image src={a.imageUrl} alt={a.name} width={56} height={56} className="w-full h-full object-cover rounded-full" />
                ) : (
                  <span className="text-navy font-bold text-xl">{a.name.charAt(0)}</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-navy text-sm">{a.name}</p>
                {a.bio && <p className="text-text-light text-xs line-clamp-1 mt-0.5">{a.bio}</p>}
                <p className="text-text-light text-xs mt-1">{a._count.articles} مقال</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => startEdit(a)} className="text-coral text-xs font-semibold hover:underline">تعديل</button>
                <button onClick={() => handleDelete(a.id)} className="text-red-500 text-xs font-semibold hover:underline">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
