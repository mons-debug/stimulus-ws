"use client";

import { useState, useEffect } from "react";

type Category = { id: string; name: string; slug: string; _count: { articles: number } };

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [newName, setNewName] = useState("");
  const [loading, setLoading] = useState(true);

  async function load() {
    const res = await fetch("/api/categories");
    const data = await res.json();
    setCategories(data);
    setLoading(false);
  }

  useEffect(() => { load(); }, []);

  async function handleAdd() {
    if (!newName.trim()) return;
    await fetch("/api/categories", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: newName }),
    });
    setNewName("");
    load();
  }

  async function handleDelete(id: string) {
    if (!confirm("هل تريد حذف هذه الفئة؟")) return;
    await fetch("/api/categories", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    load();
  }

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-extrabold text-navy mb-8">الفئات</h1>

      <div className="bg-white rounded-2xl p-6 border border-border mb-8 max-w-xl">
        <h2 className="text-lg font-bold text-navy mb-4">إضافة فئة جديدة</h2>
        <div className="flex gap-3">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="اسم الفئة..."
            className="flex-1 px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm"
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
          <button onClick={handleAdd} className="bg-coral text-white font-bold px-4 lg:px-6 py-2.5 lg:py-3 rounded-xl hover:bg-coral-hover transition-colors text-sm">
            إضافة
          </button>
        </div>
      </div>

      {loading ? (
        <div className="text-text-light">جاري التحميل...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden max-w-xl">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-warm-gray border-b border-border">
                <th className="text-right py-4 px-6 text-text-light font-semibold">الفئة</th>
                <th className="text-right py-4 px-6 text-text-light font-semibold">المقالات</th>
                <th className="text-right py-4 px-6 text-text-light font-semibold">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((c) => (
                <tr key={c.id} className="border-b border-border/50">
                  <td className="py-4 px-6 font-bold text-navy">{c.name}</td>
                  <td className="py-4 px-6 text-text-light">{c._count.articles}</td>
                  <td className="py-4 px-6">
                    <button onClick={() => handleDelete(c.id)} className="text-red-500 text-xs font-semibold hover:underline">حذف</button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && (
                <tr><td colSpan={3} className="py-8 text-center text-text-light">لا توجد فئات</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
