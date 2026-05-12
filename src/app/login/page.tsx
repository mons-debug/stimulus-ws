"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect") || "/admin";
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (res.ok) {
      router.push(redirect);
    } else {
      const data = await res.json();
      setError(data.error || "حدث خطأ");
    }
    setLoading(false);
  }

  return (
    <div className="bg-white rounded-2xl p-8 sm:p-12 w-full max-w-md shadow-2xl">
      <div className="text-center mb-8">
        <Image src="/logo-full.png" alt="SGO" width={160} height={60} className="mx-auto mb-4" />
        <h1 className="text-2xl font-extrabold text-navy">تسجيل الدخول</h1>
        <p className="text-text-light text-sm mt-1">لوحة تحكم المنظمة</p>
      </div>
      {error && <div className="bg-red-50 text-red-600 text-sm p-3 rounded-xl mb-4 text-center">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-navy mb-1">البريد الإلكتروني</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-base" placeholder="البريد الإلكتروني" />
        </div>
        <div>
          <label className="block text-sm font-bold text-navy mb-1">كلمة المرور</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required
            className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-base" />
        </div>
        <button type="submit" disabled={loading} className="w-full bg-coral text-white font-bold py-3 rounded-xl hover:bg-coral-hover transition-colors disabled:opacity-50">
          {loading ? "جاري الدخول..." : "دخول"}
        </button>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="fixed inset-0 bg-navy flex items-center justify-center p-4 overflow-auto">
      <Suspense fallback={<div className="text-white">جاري التحميل...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
