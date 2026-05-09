import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { prisma } from "@/lib/db";

export const metadata: Metadata = { title: "شركاؤنا" };
export const revalidate = 60;

export default async function PartnersPage() {
  const partners = await prisma.partner.findMany({ orderBy: { sortOrder: "asc" } });

  const grouped = partners.reduce<Record<string, typeof partners>>((acc, p) => {
    if (!acc[p.country]) acc[p.country] = [];
    acc[p.country].push(p);
    return acc;
  }, {});

  return (
    <>
      <section className="relative bg-navy overflow-hidden py-10 lg:py-16">
        <div className="absolute inset-0 bg-[radial-gradient(rgb(255_255_255_/_0.3)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_50%,black_30%,transparent_100%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center pt-8">
          <h1 className="text-3xl lg:text-4xl font-extrabold text-white mb-4">شركاؤنا: تحقيق التغيير معًا</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span>
            <span>شركائنا</span>
          </div>
        </div>
      </section>

      <section className="py-10 lg:py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-sm lg:text-xl font-bold text-coral text-center mb-8 lg:mb-12 leading-relaxed">
            تتشارك &quot;منظمة مجموعات التحفيز&quot; وتتعاون في تنفيذ مشروعاتها وتحقيق أهدافها مع العديد من المنظمات الدولية ومن بينهم:
          </h2>

          {Object.keys(grouped).length === 0 ? (
            <p className="text-center text-text-light">لا يوجد شركاء حالياً</p>
          ) : (
            <div className="space-y-10 lg:space-y-12">
              {Object.entries(grouped).map(([country, countryPartners]) => (
                <div key={country}>
                  <h3 className="text-xl lg:text-2xl font-extrabold text-navy mb-4 lg:mb-6 text-center">{country}</h3>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6 max-w-3xl mx-auto">
                    {countryPartners.map((partner) => (
                      <div key={partner.id} className="bg-warm-gray rounded-xl lg:rounded-2xl border border-border p-4 lg:p-8 flex flex-col items-center justify-center min-h-[100px] lg:min-h-[160px] hover:shadow-lg hover:border-coral/20 transition-all">
                        {partner.logoUrl ? (
                          <Image src={partner.logoUrl} alt={partner.name} width={160} height={60} className="max-h-10 lg:max-h-20 w-auto object-contain mb-2 lg:mb-3" />
                        ) : (
                          <div className="w-16 h-12 bg-white rounded-lg flex items-center justify-center mb-2">
                            <span className="text-navy/30 text-xs font-bold">{partner.name.substring(0, 3)}</span>
                          </div>
                        )}
                        <p className="text-navy text-[10px] lg:text-xs font-semibold text-center leading-tight">{partner.name}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
