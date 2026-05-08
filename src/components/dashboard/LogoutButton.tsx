"use client";

import { useRouter } from "next/navigation";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/login");
  }

  return (
    <button onClick={handleLogout} className="flex items-center gap-2 px-4 py-3 text-red-400/70 hover:text-red-400 text-sm rounded-lg hover:bg-white/10 transition-colors w-full">
      تسجيل الخروج
    </button>
  );
}
