import { prisma } from "@/lib/db";

export default async function SubscribersPage() {
  const subscribers = await prisma.newsletterSubscriber.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-extrabold text-navy">مشتركين النشرة البريدية</h1>
        <p className="text-text-light text-sm">{subscribers.length} مشترك</p>
      </div>
      {subscribers.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 border border-border text-center">
          <p className="text-text-light text-lg">لا يوجد مشتركين بعد</p>
          <p className="text-text-light text-sm mt-2">سيظهر المشتركون هنا عندما يسجلون عبر نموذج النشرة البريدية في الفوتر</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-warm-gray border-b border-border">
                <th className="text-right py-4 px-6 text-text-light font-semibold">البريد الإلكتروني</th>
                <th className="text-right py-4 px-6 text-text-light font-semibold">تاريخ الاشتراك</th>
              </tr>
            </thead>
            <tbody>
              {subscribers.map((s) => (
                <tr key={s.id} className="border-b border-border/50">
                  <td className="py-4 px-6 font-medium text-navy">{s.email}</td>
                  <td className="py-4 px-6 text-text-light">{s.createdAt.toLocaleDateString("ar-EG", { year: "numeric", month: "long", day: "numeric" })}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
