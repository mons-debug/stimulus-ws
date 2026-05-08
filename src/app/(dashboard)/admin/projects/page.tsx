"use client";

import { useState, useEffect, useRef } from "react";

type Project = { id: string; title: string; slug: string; description: string; partnerLogo: string | null };

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Project | null>(null);
  const [form, setForm] = useState({ title: "", description: "", partnerLogo: "" });
  const fileRef = useRef<HTMLInputElement>(null);

  async function load() { const r = await fetch("/api/projects"); setProjects(await r.json()); setLoading(false); }
  useEffect(() => { load(); }, []);

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]; if (!file) return;
    const fd = new FormData(); fd.append("file", file);
    const r = await fetch("/api/upload", { method: "POST", body: fd });
    if (r.ok) { const { url } = await r.json(); setForm(f => ({ ...f, partnerLogo: url })); }
  }

  async function handleSave() {
    if (!form.title.trim()) return;
    const method = editing ? "PUT" : "POST";
    const body = editing ? { ...form, id: editing.id } : form;
    await fetch("/api/projects", { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    setForm({ title: "", description: "", partnerLogo: "" }); setEditing(null); load();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل تريد حذف هذا المشروع؟")) return;
    await fetch("/api/projects", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }) });
    load();
  }

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy mb-8">المشروعات</h1>
      <div className="bg-white rounded-2xl p-6 border border-border mb-8 max-w-2xl">
        <h2 className="text-lg font-bold text-navy mb-4">{editing ? "تعديل المشروع" : "إضافة مشروع جديد"}</h2>
        <input type="file" ref={fileRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
        <div className="space-y-4">
          <input type="text" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="عنوان المشروع..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm" />
          <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="وصف المشروع..." rows={4}
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm resize-none" />
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => fileRef.current?.click()} className="text-sm text-coral font-semibold hover:underline">
              {form.partnerLogo ? "تغيير لوجو الشريك" : "رفع لوجو الشريك"}
            </button>
            {form.partnerLogo && <span className="text-xs text-text-light">تم الرفع</span>}
          </div>
          <div className="flex gap-3">
            <button onClick={handleSave} className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm">{editing ? "حفظ" : "إضافة"}</button>
            {editing && <button onClick={() => { setEditing(null); setForm({ title: "", description: "", partnerLogo: "" }); }} className="bg-warm-gray text-navy font-bold px-6 py-3 rounded-xl text-sm">إلغاء</button>}
          </div>
        </div>
      </div>

      {loading ? <p className="text-text-light">جاري التحميل...</p> : (
        <div className="space-y-4 max-w-2xl">
          {projects.map(p => (
            <div key={p.id} className="bg-white rounded-2xl p-5 border border-border flex items-center justify-between">
              <div>
                <p className="font-bold text-navy">{p.title}</p>
                <p className="text-text-light text-xs mt-1 line-clamp-1">{p.description}</p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button onClick={() => { setEditing(p); setForm({ title: p.title, description: p.description, partnerLogo: p.partnerLogo || "" }); }} className="text-coral text-xs font-semibold hover:underline">تعديل</button>
                <button onClick={() => handleDelete(p.id)} className="text-red-500 text-xs font-semibold hover:underline">حذف</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
