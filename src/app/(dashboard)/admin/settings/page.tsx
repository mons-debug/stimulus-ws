"use client";

import { useState, useEffect } from "react";

const FIELDS = [
  { key: "site_name", label: "اسم المنظمة", type: "text" },
  { key: "site_email", label: "البريد الإلكتروني", type: "email" },
  { key: "site_whatsapp", label: "رقم الواتساب", type: "text" },
  { key: "site_address", label: "العنوان", type: "text" },
  { key: "site_hours", label: "ساعات العمل", type: "text" },
  { key: "donate_content", label: "محتوى صفحة التبرع", type: "textarea" },
];

export default function SettingsPage() {
  const [form, setForm] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    fetch("/api/settings")
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setForm(Object.fromEntries(data.map((s: { key: string; value: string }) => [s.key, s.value])));
        }
      })
      .catch(() => {});
  }, []);

  async function handleSave() {
    setSaving(true);
    setSaved(false);
    await fetch("/api/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-extrabold text-navy mb-8">الإعدادات</h1>
      <div className="bg-white rounded-2xl p-8 border border-border max-w-2xl">
        <div className="space-y-6">
          {FIELDS.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-navy mb-2">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  value={form[f.key] || ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm resize-none"
                />
              ) : (
                <input
                  type={f.type}
                  value={form[f.key] || ""}
                  onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm"
                />
              )}
            </div>
          ))}
          <div className="flex items-center gap-4">
            <button onClick={handleSave} disabled={saving} className="bg-coral text-white font-bold px-8 py-3 rounded-xl hover:bg-coral-hover transition-colors disabled:opacity-50">
              {saving ? "جاري الحفظ..." : "حفظ الإعدادات"}
            </button>
            {saved && <span className="text-green-600 font-bold text-sm">تم الحفظ ✓</span>}
          </div>
        </div>
      </div>
    </div>
  );
}
