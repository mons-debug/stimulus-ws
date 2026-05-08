"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const RichEditor = dynamic(
  () => import("./RichEditor").then((m) => m.RichEditor),
  { ssr: false, loading: () => <div className="h-[300px] bg-warm-gray rounded-2xl animate-pulse" /> }
);

type Project = {
  id?: string;
  title: string;
  description: string;
  content: string;
  partnerLogos: string[];
};

export function ProjectEditor({ project }: { project?: Project }) {
  const router = useRouter();
  const logoRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    title: project?.title || "",
    description: project?.description || "",
    content: project?.content || "",
    partnerLogos: project?.partnerLogos || [],
  });

  async function handleLogoUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, partnerLogos: [...f.partnerLogos, url] }));
    }
  }

  async function handleSave() {
    if (!form.title.trim()) { alert("العنوان مطلوب"); return; }
    setSaving(true);
    const body = project?.id ? { ...form, id: project.id } : form;
    const res = await fetch("/api/projects", {
      method: project?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    if (res.ok) { router.push("/admin/projects"); router.refresh(); }
    else alert("حدث خطأ");
    setSaving(false);
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-navy">{project?.id ? "تعديل المشروع" : "مشروع جديد"}</h1>
        <button onClick={handleSave} disabled={saving} className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm disabled:opacity-50">
          {saving ? "جاري الحفظ..." : "حفظ المشروع"}
        </button>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">عنوان المشروع</label>
          <input type="text" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="أدخل عنوان المشروع..." className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-lg font-bold" />
        </div>

        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">وصف مختصر</label>
          <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
            rows={3} placeholder="وصف مختصر يظهر في قائمة المشروعات..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm resize-none" />
        </div>

        {/* Partner Logos */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-3">شعارات الشركاء</label>
          <input type="file" ref={logoRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
          <div className="flex flex-wrap gap-4 mb-4">
            {form.partnerLogos.map((logo, i) => (
              <div key={i} className="relative bg-warm-gray border-2 border-border rounded-xl p-4 min-w-[150px] flex items-center justify-center group">
                <Image src={logo} alt={`شريك ${i + 1}`} width={120} height={50} className="max-h-12 w-auto object-contain" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, partnerLogos: f.partnerLogos.filter((_, j) => j !== i) }))}
                  className="absolute -top-2 -left-2 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => logoRef.current?.click()}
            className="border-2 border-dashed border-border rounded-xl px-6 py-3 text-sm text-text-light hover:border-coral hover:text-coral transition-colors">
            + إضافة شعار شريك
          </button>
        </div>

        {/* Rich Content Editor */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-3">محتوى المشروع</label>
          <RichEditor content={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
        </div>
      </div>
    </div>
  );
}
