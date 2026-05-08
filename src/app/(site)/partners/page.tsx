import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "شركاؤنا" };

const PARTNER_GROUPS = [
  { country: "CANADA", partners: [{ name: "Partner 1", logo: null }, { name: "Partner 2", logo: null }] },
  { country: "USA", partners: [{ name: "National Endowment for Democracy", logo: "https://stimulusgroups.org/wp-content/uploads/2023/08/ned.jpg" }, { name: "Partner 2", logo: null }] },
  { country: "Estonia - Europe", partners: [{ name: "Stimulus Groups", logo: "https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" }, { name: "Partner 2", logo: null }] },
  { country: "Türkiye", partners: [{ name: "Partner 1", logo: null }, { name: "Partner 2", logo: null }] },
];

export default function PartnersPage() {
  return (
    <>
      <section className="bg-gradient-to-bl from-navy to-navy-light py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-white mb-4">شركاؤنا: تحقيق التغيير معًا</h1>
          <div className="flex items-center justify-center gap-2 text-white/60 text-sm">
            <Link href="/" className="hover:text-white">الرئيسية</Link>
            <span>›</span>
            <span>شركائنا</span>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-coral text-center mb-12">تتشارك &quot;منظمة مجموعات التحفيز&quot; وتتعاون في تنفيذ مشروعاتها وتحقيق أهدافها مع العديد من المنظمات الدولية ومن بينهم:</h2>

          <div className="space-y-12">
            {PARTNER_GROUPS.map((group) => (
              <div key={group.country}>
                <h3 className="text-2xl font-extrabold text-navy mb-6 text-center">{group.country}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {group.partners.map((partner) => (
                    <div key={partner.name} className="bg-warm-gray rounded-2xl border-2 border-border p-8 flex items-center justify-center min-h-[160px]">
                      {partner.logo ? (
                        <Image src={partner.logo} alt={partner.name} width={200} height={80} className="max-h-20 w-auto object-contain" />
                      ) : (
                        <p className="text-text-light font-semibold">{partner.name}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
