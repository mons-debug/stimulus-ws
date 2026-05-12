"use client";

import Link from "next/link";
import { useState } from "react";
import type { FormEvent } from "react";

const INFO = [
  { icon: "📍", title: "العنوان", value: "Võru maakond, Võru linn, F. R. Kreutzwaldi tn 43b, 65610, Estonia" },
  { icon: "✉️", title: "الإيميل", value: "info@stimulusgroups.org" },
  { icon: "🕐", title: "ساعات العمل", value: "الإثنين - الجمعة من 9ص إلى 5م" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSending(true);
    const form = e.target as HTMLFormElement;
    const data = {
      fullName: (form.elements.namedItem("fullName") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    const res = await fetch("/api/contacts", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
    if (res.ok) setSubmitted(true);
    setSending(false);
  }

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16"><div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-[1280px] mx-auto px-4 lg:px-8 pt-8">
          <div className="flex items-center gap-2 text-white/50 text-[10px] lg:text-xs mb-4 font-mono tracking-wide">
            <Link href="/" className="hover:text-white transition-colors">الرئيسية</Link>
            <span>/</span>
            <span className="text-white/70">تواصل معنا</span>
          </div>
          <h1 className="text-[28px] sm:text-[38px] lg:text-[56px] font-black text-white leading-[1.05] tracking-tight">تواصل معنا.</h1>
          <p className="text-white/60 text-[13px] lg:text-lg leading-relaxed mt-4">نحن نقدر اهتمامك ونرحب بتواصلك معنا.</p>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-coral text-sm font-semibold mb-2">تواصل معنا</p>
            <h2 className="text-3xl font-extrabold text-navy mb-4">تواصلك محل اهتمام لدينا!</h2>
            <p className="text-text-light max-w-2xl mx-auto">نحن نقدر اهتمامك ونرحب بتواصلك معنا. إذا كان لديك أي أسئلة أو استفسارات أو تود الانضمام لفريق العمل أو التطوع معنا، فنحن هنا لمساعدتك.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
            {INFO.map((item) => (
              <div key={item.title} className="bg-warm-gray rounded-2xl p-6 text-center border border-border">
                <span className="text-3xl mb-3 block">{item.icon}</span>
                <h3 className="text-lg font-bold text-navy mb-2">{item.title}</h3>
                <p className="text-text-light text-sm">{item.value}</p>
              </div>
            ))}
          </div>

          <div className="rounded-2xl overflow-hidden mb-12 border border-border">
            <iframe
              src="https://maps.google.com/maps?q=F.+R.+Kreutzwaldi+tn+43b,+V%C3%B5ru,+65610,+Estonia&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="300"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Location"
            />
          </div>

          <div className="bg-warm-gray rounded-2xl p-8 sm:p-12 border border-border">
            <h2 className="text-lg font-bold text-navy mb-6 text-center">يمكنك ملء نموذج الاتصال أدناه لإرسال رسالتك مباشرة إلينا</h2>
            {submitted ? (
              <div className="text-center py-12">
                <p className="text-2xl text-[#25D366] font-bold mb-2">✓ تم إرسال رسالتك بنجاح</p>
                <p className="text-text-light">سنتواصل معك في أقرب وقت ممكن</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">الإسم الكامل</label>
                    <input type="text" name="fullName" required className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">الموضوع</label>
                    <input type="text" name="subject" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">البريد الإلكتروني</label>
                    <input type="email" name="email" required className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">رقم الهاتف</label>
                    <input type="tel" name="phone" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">الرسالة</label>
                  <textarea name="message" rows={5} required className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white resize-none" />
                </div>
                <div className="text-center pt-4">
                  <button type="submit" disabled={sending} className="bg-coral text-white font-bold px-10 py-3 rounded-lg hover:bg-coral-hover transition-colors disabled:opacity-50">
                    {sending ? "جاري الإرسال..." : "إرسال رسالتك"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
