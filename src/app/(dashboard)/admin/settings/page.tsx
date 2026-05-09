import { prisma } from "@/lib/db";

export default async function SettingsPage() {
  const settings = await prisma.siteSetting.findMany();
  const settingsMap = Object.fromEntries(settings.map((s) => [s.key, s.value]));

  const fields = [
    { key: "site_name", label: "اسم المنظمة", type: "text" },
    { key: "site_email", label: "البريد الإلكتروني", type: "email" },
    { key: "site_whatsapp", label: "رقم الواتساب", type: "text" },
    { key: "site_address", label: "العنوان", type: "text" },
    { key: "site_hours", label: "ساعات العمل", type: "text" },
    { key: "donate_content", label: "محتوى صفحة التبرع", type: "textarea" },
  ];

  return (
    <div>
      <h1 className="text-xl lg:text-3xl font-extrabold text-navy mb-8">الإعدادات</h1>
      <div className="bg-white rounded-2xl p-8 border border-border max-w-2xl">
        <form className="space-y-6">
          {fields.map((f) => (
            <div key={f.key}>
              <label className="block text-sm font-bold text-navy mb-2">{f.label}</label>
              {f.type === "textarea" ? (
                <textarea
                  name={f.key}
                  defaultValue={settingsMap[f.key] || ""}
                  rows={4}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm resize-none"
                />
              ) : (
                <input
                  type={f.type}
                  name={f.key}
                  defaultValue={settingsMap[f.key] || ""}
                  className="w-full px-4 py-3 border border-border rounded-xl focus:outline-none focus:border-coral text-sm"
                />
              )}
            </div>
          ))}
          <button type="submit" className="bg-coral text-white font-bold px-8 py-3 rounded-xl hover:bg-coral-hover transition-colors">
            حفظ الإعدادات
          </button>
        </form>
      </div>
    </div>
  );
}
