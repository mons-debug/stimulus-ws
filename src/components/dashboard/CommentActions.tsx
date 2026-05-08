"use client";

import { useRouter } from "next/navigation";

export function CommentActions({ id, approved }: { id: string; approved: boolean }) {
  const router = useRouter();

  async function handleApprove() {
    await fetch("/api/comments", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, approved: !approved }),
    });
    router.refresh();
  }

  async function handleDelete() {
    if (!confirm("هل تريد حذف هذا التعليق؟")) return;
    await fetch("/api/comments", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    router.refresh();
  }

  return (
    <div className="flex gap-2">
      <button onClick={handleApprove} className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${approved ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-200" : "bg-green-100 text-green-700 hover:bg-green-200"}`}>
        {approved ? "إلغاء القبول" : "قبول"}
      </button>
      <button onClick={handleDelete} className="px-3 py-1.5 rounded-lg text-xs font-bold bg-red-100 text-red-700 hover:bg-red-200 transition-colors">
        حذف
      </button>
    </div>
  );
}
