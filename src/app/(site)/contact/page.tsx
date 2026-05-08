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

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <>
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">تواصل معنا</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span><span>تواصل معنا</span>
          </div>
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
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2000!2d27.0!3d57.8!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1"
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
                    <input type="text" required className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">الموضوع</label>
                    <input type="text" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">البريد الإلكتروني</label>
                    <input type="email" required className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-navy mb-1">رقم الهاتف</label>
                    <input type="tel" className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-navy mb-1">الرسالة</label>
                  <textarea rows={5} required className="w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:border-coral text-sm bg-white resize-none" />
                </div>
                <div className="text-center pt-4">
                  <button type="submit" className="bg-coral text-white font-bold px-10 py-3 rounded-lg hover:bg-coral-hover transition-colors">إرسال رسالتك</button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
