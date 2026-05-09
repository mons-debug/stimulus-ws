"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

const RichEditor = dynamic(
  () => import("./RichEditor").then((m) => m.RichEditor),
  { ssr: false, loading: () => <div className="h-[400px] bg-warm-gray rounded-2xl animate-pulse" /> }
);

type Category = { id: string; name: string };
type AuthorOption = { id: string; name: string };
type Article = {
  id?: string;
  title: string;
  content: string;
  excerpt: string;
  featuredImage: string;
  attachmentUrl?: string;
  attachmentName?: string;
  galleryImages?: string[];
  categoryId: string;
  authorId?: string;
  published: boolean;
  authorName?: string;
};

export function ArticleEditor({
  article,
  categories,
  authors,
}: {
  article?: Article;
  categories: Category[];
  authors: AuthorOption[];
}) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const attachRef = useRef<HTMLInputElement>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadingAttach, setUploadingAttach] = useState(false);
  const [form, setForm] = useState({
    title: article?.title || "",
    content: article?.content || "",
    excerpt: article?.excerpt || "",
    featuredImage: article?.featuredImage || "",
    attachmentUrl: (article as any)?.attachmentUrl || "",
    attachmentName: (article as any)?.attachmentName || "",
    categoryId: article?.categoryId || "",
    authorId: article?.authorId || "",
    galleryImages: (article as any)?.galleryImages || [],
    published: article?.published ?? false,
  });

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: formData });
    if (res.ok) {
      const { url } = await res.json();
      setForm((f) => ({ ...f, featuredImage: url }));
    }
    setUploading(false);
  }

  async function handleSave(publish?: boolean) {
    if (!form.title.trim()) { alert("العنوان مطلوب"); return; }
    if (!form.content.trim()) { alert("المحتوى مطلوب"); return; }
    setSaving(true);
    const data = { ...form, published: publish ?? form.published };
    if (article?.id) Object.assign(data, { id: article.id });

    const res = await fetch("/api/articles", {
      method: article?.id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (res.ok) {
      router.push("/admin/articles");
      router.refresh();
    } else {
      alert("حدث خطأ أثناء الحفظ");
    }
    setSaving(false);
  }

  return (
    <div className="max-w-4xl">
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <h1 className="text-3xl font-extrabold text-navy">
          {article?.id ? "تعديل المقال" : "مقال جديد"}
        </h1>
        <div className="flex gap-3">
          <button onClick={() => handleSave(false)} disabled={saving} className="bg-navy text-white font-bold px-6 py-3 rounded-xl hover:bg-navy-light transition-colors text-sm disabled:opacity-50">
            {saving ? "جاري الحفظ..." : "حفظ كمسودة"}
          </button>
          <button onClick={() => handleSave(true)} disabled={saving} className="bg-coral text-white font-bold px-6 py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm disabled:opacity-50">
            {saving ? "جاري النشر..." : "نشر المقال"}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Title */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">عنوان المقال</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="أدخل عنوان المقال..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-lg font-bold"
          />
        </div>

        {/* Author + Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-border">
            <label className="block text-sm font-bold text-navy mb-2">الكاتب</label>
            <select
              value={form.authorId}
              onChange={(e) => setForm({ ...form, authorId: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm"
            >
              <option value="">اختر الكاتب...</option>
              {authors.map((a) => (
                <option key={a.id} value={a.id}>{a.name}</option>
              ))}
            </select>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-border">
            <label className="block text-sm font-bold text-navy mb-2">الفئة</label>
            <select
              value={form.categoryId}
              onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
              className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm"
            >
              <option value="">بدون فئة</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Image */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">صورة المقال</label>
            <input type="file" ref={fileRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
            {form.featuredImage ? (
              <div className="relative">
                <Image src={form.featuredImage} alt="Featured" width={400} height={200} className="w-full h-32 object-cover rounded-xl" />
                <div className="flex gap-2 mt-2">
                  <button type="button" onClick={() => fileRef.current?.click()} className="text-xs text-coral font-semibold hover:underline">تغيير</button>
                  <button type="button" onClick={() => setForm({ ...form, featuredImage: "" })} className="text-xs text-red-500 font-semibold hover:underline">حذف</button>
                </div>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="w-full h-32 border-2 border-dashed border-border rounded-xl flex flex-col items-center justify-center gap-2 hover:border-coral hover:bg-coral/5 transition-colors"
              >
                {uploading ? (
                  <span className="text-text-light text-sm">جاري الرفع...</span>
                ) : (
                  <>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                    <span className="text-text-light text-sm">اضغط لرفع صورة</span>
                  </>
                )}
              </button>
            )}
          </div>

        {/* File Attachment */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">ملف مرفق (PDF أو غيره)</label>
          <input type="file" ref={attachRef} onChange={async (e) => {
            const file = e.target.files?.[0];
            if (!file) return;
            setUploadingAttach(true);
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            if (res.ok) {
              const { url } = await res.json();
              setForm((f) => ({ ...f, attachmentUrl: url, attachmentName: file.name }));
            }
            setUploadingAttach(false);
          }} className="hidden" />
          {form.attachmentUrl ? (
            <div className="flex items-center gap-3 bg-warm-gray rounded-xl p-4">
              <div className="w-10 h-10 rounded-lg bg-coral/10 flex items-center justify-center flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#E8553D" strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-navy">{form.attachmentName || "ملف مرفق"}</p>
                <p className="text-xs text-text-light">{form.attachmentUrl}</p>
              </div>
              <button type="button" onClick={() => setForm((f) => ({ ...f, attachmentUrl: "", attachmentName: "" }))} className="text-xs text-red-500 font-semibold hover:underline">حذف</button>
              <button type="button" onClick={() => attachRef.current?.click()} className="text-xs text-coral font-semibold hover:underline">تغيير</button>
            </div>
          ) : (
            <button type="button" onClick={() => attachRef.current?.click()} disabled={uploadingAttach}
              className="w-full h-20 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-3 hover:border-coral hover:bg-coral/5 transition-colors">
              {uploadingAttach ? (
                <span className="text-text-light text-sm">جاري الرفع...</span>
              ) : (
                <>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#6B7280" strokeWidth="1.5"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>
                  <span className="text-text-light text-sm">اضغط لإرفاق ملف (PDF, DOC, etc.)</span>
                </>
              )}
            </button>
          )}
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">معرض الصور</label>
          <input type="file" id="gallery-upload" onChange={async (e) => {
            const files = e.target.files;
            if (!files) return;
            for (const file of Array.from(files)) {
              const fd = new FormData();
              fd.append("file", file);
              const res = await fetch("/api/upload", { method: "POST", body: fd });
              if (res.ok) {
                const { url } = await res.json();
                setForm((f) => ({ ...f, galleryImages: [...(f.galleryImages || []), url] }));
              }
            }
          }} accept="image/*" multiple className="hidden" />
          <div className="grid grid-cols-3 lg:grid-cols-4 gap-2 lg:gap-3 mb-3">
            {(form.galleryImages || []).map((img: string, i: number) => (
              <div key={i} className="relative group">
                <Image src={img} alt="" width={150} height={100} className="w-full h-24 object-cover rounded-lg" />
                <button type="button" onClick={() => setForm((f) => ({ ...f, galleryImages: (f.galleryImages || []).filter((_: string, j: number) => j !== i) }))}
                  className="absolute top-1 left-1 w-6 h-6 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">×</button>
              </div>
            ))}
          </div>
          <button type="button" onClick={() => document.getElementById("gallery-upload")?.click()}
            className="w-full h-16 border-2 border-dashed border-border rounded-xl flex items-center justify-center gap-2 hover:border-coral hover:bg-coral/5 transition-colors text-sm text-text-light">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
            اضغط لإضافة صور للمعرض
          </button>
        </div>

        {/* Excerpt */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-2">الملخص</label>
          <textarea
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            rows={3}
            placeholder="ملخص قصير يظهر في قائمة المقالات..."
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm resize-none"
          />
        </div>

        {/* Rich Text Editor */}
        <div className="bg-white rounded-2xl p-6 border border-border">
          <label className="block text-sm font-bold text-navy mb-3">محتوى المقال</label>
          <RichEditor content={form.content} onChange={(html) => setForm((f) => ({ ...f, content: html }))} />
        </div>

      </div>
    </div>
  );
}
