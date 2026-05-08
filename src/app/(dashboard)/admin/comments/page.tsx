import { prisma } from "@/lib/db";
import Link from "next/link";
import { CommentActions } from "@/components/dashboard/CommentActions";

export default async function CommentsPage() {
  const comments = await prisma.comment.findMany({
    orderBy: { createdAt: "desc" },
    include: { article: { select: { title: true, slug: true, id: true } } },
  });

  const pending = comments.filter((c) => !c.approved).length;

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-navy">التعليقات</h1>
          <p className="text-text-light text-sm mt-1">{comments.length} تعليق — {pending} معلق</p>
        </div>
      </div>
      <div className="space-y-4">
        {comments.map((c) => (
          <div key={c.id} className={`bg-white rounded-2xl p-6 border ${c.approved ? "border-border" : "border-yellow-300 bg-yellow-50/30"}`}>
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-navy/10 flex items-center justify-center text-navy font-bold text-sm">{c.author.charAt(0)}</div>
                <div>
                  <p className="font-bold text-navy text-sm">{c.author}</p>
                  <p className="text-text-light text-xs">{c.email}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${c.approved ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}>
                  {c.approved ? "مقبول" : "معلق"}
                </span>
                <p className="text-text-light text-xs">{c.createdAt.toLocaleDateString("ar-EG")}</p>
              </div>
            </div>
            <p className="text-text-light text-sm leading-relaxed mb-3">{c.content}</p>
            <div className="flex items-center justify-between pt-3 border-t border-border/50">
              <Link href={`/blog/${c.article.slug}`} target="_blank" className="text-xs text-navy hover:text-coral transition-colors">
                المقال: <span className="font-semibold">{c.article.title.substring(0, 50)}...</span>
              </Link>
              <CommentActions id={c.id} approved={c.approved} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
