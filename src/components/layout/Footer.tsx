import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-navy">
      <section className="relative py-12 lg:py-20 overflow-hidden bg-gradient-to-b from-navy-light to-navy">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-coral text-xs lg:text-sm font-semibold mb-2 lg:mb-3">تواصل معنا وكن جزءًا من رحلتنا</p>
          <h2 className="text-xl lg:text-3xl font-bold text-white mb-3 lg:mb-4">انضم إلينا وكن فارقًا يحدث الفرق</h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-5 lg:mb-8 leading-relaxed text-xs lg:text-base">
            نحن نقدر تواصلكم معنا ونتطلع دائمًا لسماع آرائكم واقتراحاتكم. إذا كان لديك أي أسئلة أو تحتاج إلى مزيد من المعلومات حول منظمتنا أو برامجنا، فلا تتردد في التواصل معنا.
          </p>
          <Link href="/contact" className="inline-block bg-white text-navy font-bold px-6 lg:px-8 py-2.5 lg:py-3 rounded-lg hover:bg-warm-gray transition-colors text-sm lg:text-base">
            تواصل معنا
          </Link>
        </div>
      </section>

      {/* Desktop footer */}
      <div className="hidden lg:block bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-4 gap-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">{SITE_CONFIG.name}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-white/60 text-sm hover:text-coral transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">تواصل معنا</h3>
              <p className="text-white/60 text-sm mb-2">{SITE_CONFIG.email}</p>
              <p className="text-white/60 text-sm mt-3">{SITE_CONFIG.address}</p>
            </div>
            <div>
              <h3 className="text-lg font-bold text-white mb-4">تابعنا عبر الإيميل</h3>
              <NewsletterForm />
            </div>
          </div>
        </div>
      </div>

      {/* Mobile footer — clean unified design */}
      <div className="lg:hidden bg-navy px-4 py-8">
        <div className="text-center mb-6">
          <div className="relative h-10 w-[140px] mx-auto mb-3">
            <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt={SITE_CONFIG.name} width={140} height={45} className="h-10 w-auto" />
            <div className="absolute inset-0">
              <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt="" width={140} height={45} className="h-10 w-auto [filter:brightness(0)_invert(1)]" style={{ WebkitMaskImage: "linear-gradient(to left, white 60%, transparent 68%)", maskImage: "linear-gradient(to left, white 60%, transparent 68%)" }} aria-hidden="true" />
            </div>
          </div>
          <p className="text-white/50 text-[10px] leading-relaxed max-w-[250px] mx-auto">{SITE_CONFIG.description}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-6">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} href={link.href} className="text-white/60 text-[11px] hover:text-coral transition-colors">{link.label}</Link>
          ))}
        </div>

        <div className="max-w-[280px] mx-auto mb-6">
          <p className="text-white/50 text-[10px] text-center mb-2">تابعنا عبر الإيميل</p>
          <NewsletterForm />
        </div>

        <div className="text-center space-y-1.5 mb-5">
          <p className="text-white/40 text-[10px]">{SITE_CONFIG.email}</p>
          <p className="text-white/30 text-[9px]">{SITE_CONFIG.address}</p>
        </div>

        <div className="border-t border-white/10 pt-4 pb-16 flex items-center justify-between">
          <p className="text-white/30 text-[9px]">&copy; {new Date().getFullYear()} Stimulus Groups</p>
          <div className="flex gap-3">
            <Link href="#" className="text-white/30 text-[9px] hover:text-white/60 transition-colors">الخصوصية</Link>
            <Link href="#" className="text-white/30 text-[9px] hover:text-white/60 transition-colors">الشروط</Link>
          </div>
        </div>
      </div>

      {/* Desktop bottom bar */}
      <div className="hidden lg:block bg-navy-dark py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <p className="text-white/40 text-sm">&copy; {new Date().getFullYear()} Stimulus Groups Organization</p>
          <Image src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png" alt={SITE_CONFIG.name} width={120} height={40} className="h-8 w-auto opacity-60" />
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-white/40 hover:text-white/70 transition-colors">الخصوصية</Link>
            <Link href="#" className="text-white/40 hover:text-white/70 transition-colors">الشروط و الأقسام</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
