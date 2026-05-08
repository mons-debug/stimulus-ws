import { prisma } from "@/lib/db";

export default async function ContactsPage() {
  const contacts = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-navy mb-8">رسائل التواصل</h1>
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
                  <p className="text-text-light text-xs">{c.email} {c.phone && `• ${c.phone}`}</p>
                </div>
                <div className="flex items-center gap-3">
                  {!c.read && <span className="bg-coral text-white text-[10px] font-bold px-2 py-0.5 rounded-full">جديد</span>}
                  <p className="text-text-light text-xs">{c.createdAt.toLocaleDateString("ar-EG")}</p>
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
