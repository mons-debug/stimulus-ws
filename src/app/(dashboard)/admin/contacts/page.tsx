"use client";

import { useState, useEffect } from "react";

type Contact = {
  id: string;
  fullName: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  read: boolean;
  createdAt: string;
};

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contacts").then((r) => r.json()).then((data) => { setContacts(data); setLoading(false); });
  }, []);

  async function markRead(id: string) {
    await fetch("/api/contacts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setContacts((prev) => prev.map((c) => (c.id === id ? { ...c, read: true } : c)));
  }

  const unread = contacts.filter((c) => !c.read).length;

  if (loading) return <p className="text-text-light p-8">جاري التحميل...</p>;

  return (
    <div>
      <div className="flex items-center justify-between mb-4 lg:mb-8">
        <div>
          <h1 className="text-xl lg:text-3xl font-extrabold text-navy">رسائل التواصل</h1>
          <p className="text-text-light text-sm mt-1">{contacts.length} رسالة · <b className="text-coral">{unread} جديدة</b></p>
        </div>
      </div>
      {contacts.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <p className="text-text-light text-lg">لا توجد رسائل بعد</p>
          <p className="text-text-light text-sm mt-2">ستظهر هنا عندما يرسل أحدهم رسالة عبر نموذج التواصل</p>
        </div>
      ) : (
        <div className="space-y-4">
          {contacts.map((c) => (
            <div key={c.id} className={`bg-white rounded-2xl p-6 border ${c.read ? "border-border" : "border-coral/30 shadow-sm"}`}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-bold text-navy">{c.fullName}</p>
                  <p className="text-text-light text-xs">{c.email} {c.phone && `· ${c.phone}`}</p>
                </div>
                <div className="flex items-center gap-3">
                  {!c.read && (
                    <button onClick={() => markRead(c.id)} className="bg-coral text-white text-[10px] font-bold px-2.5 py-1 rounded-full hover:bg-coral-hover transition-colors">
                      تم القراءة ✓
                    </button>
                  )}
                  <p className="text-text-light text-xs">{new Date(c.createdAt).toLocaleDateString("ar-u-nu-latn", { day: "numeric", month: "short", year: "numeric" })}</p>
                </div>
              </div>
              {c.subject && <p className="text-navy font-semibold text-sm mb-2">{c.subject}</p>}
              <p className="text-text-light text-sm leading-relaxed">{c.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
