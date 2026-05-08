import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";

export function Footer() {
  return (
    <footer>
      <section className="relative py-20 overflow-hidden bg-gradient-to-b from-navy-light to-navy">
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")" }} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-coral text-sm font-semibold mb-3">
            تواصل معنا وكن جزءًا من رحلتنا
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">
            انضم إلينا وكن فارقًا يحدث الفرق
          </h2>
          <p className="text-white/70 max-w-2xl mx-auto mb-8 leading-relaxed">
            نحن نقدر تواصلكم معنا ونتطلع دائمًا لسماع آرائكم واقتراحاتكم. إذا
            كان لديك أي أسئلة أو تحتاج إلى مزيد من المعلومات حول منظمتنا أو
            برامجنا، فلا تتردد في التواصل معنا.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-navy font-bold px-8 py-3 rounded-lg hover:bg-warm-gray transition-colors"
          >
            تواصل معنا
          </Link>
        </div>
      </section>

      <div className="bg-navy py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                {SITE_CONFIG.name}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">
                {SITE_CONFIG.description}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">روابط سريعة</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-white/60 text-sm hover:text-coral transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">تواصل معنا</h3>
              <p className="text-white/60 text-sm mb-2">
                {SITE_CONFIG.email}
              </p>
              <h3 className="text-lg font-bold text-white mb-4 mt-6">
                عنوان المنظمة
              </h3>
              <p className="text-white/60 text-sm">{SITE_CONFIG.address}</p>
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-4">
                تابعنا عبر الإيميل
              </h3>
              <form className="flex gap-2">
                <input
                  type="email"
                  placeholder="البريد الإلكتروني"
                  required
                  className="flex-1 px-4 py-2.5 rounded-lg bg-white/10 text-white text-sm placeholder:text-white/40 border border-white/10 focus:outline-none focus:border-coral"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-coral text-white rounded-lg hover:bg-coral-hover transition-colors"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-navy-dark py-5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/40 text-sm">
            &copy; {new Date().getFullYear()} Stimulus Groups Organization
          </p>
          <Image
            src="https://stimulusgroups.org/wp-content/uploads/2023/07/stimulislogo.png"
            alt={SITE_CONFIG.name}
            width={120}
            height={40}
            className="h-8 w-auto opacity-60"
          />
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-white/40 hover:text-white/70 transition-colors">
              الخصوصية
            </Link>
            <Link href="#" className="text-white/40 hover:text-white/70 transition-colors">
              الشروط و الأقسام
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
