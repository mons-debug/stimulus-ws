import Link from "next/link";
import Image from "next/image";
import { SITE_CONFIG, NAV_LINKS } from "@/lib/constants";
import { NewsletterForm } from "@/components/ui/NewsletterForm";

export function Footer() {
  return (
    <footer className="bg-navy text-white">
      {/* CTA strip */}
      <section className="border-b border-white/10 py-12 lg:py-16">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 text-center">
          <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-[#ff8e7a] font-bold">— GET INVOLVED</span>
          <h2 className="text-2xl lg:text-[40px] font-black leading-tight tracking-tight mt-3 mb-4">انضم إلينا وكن فارقًا يحدث الفرق</h2>
          <p className="text-white/60 text-sm lg:text-base leading-relaxed max-w-xl mx-auto mb-6">
            نحن نقدر تواصلكم معنا ونتطلع دائمًا لسماع آرائكم واقتراحاتكم.
          </p>
          <Link href="/contact" className="inline-block bg-white text-navy font-bold px-6 lg:px-8 py-2.5 lg:py-3 text-sm hover:bg-warm-gray transition-colors">
            تواصل معنا ←
          </Link>
        </div>
      </section>

      {/* Main footer grid */}
      <div className="py-10 lg:py-14">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8">
          {/* Desktop */}
          <div className="hidden lg:grid grid-cols-4 gap-10">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Image src="/logo-icon.png" alt="" width={36} height={36} className="w-9 h-9" />
                <div>
                  <span className="block text-sm font-extrabold leading-none">مجموعات التحفيز</span>
                  <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-white/50 mt-0.5">STIMULUS GROUPS</span>
                </div>
              </div>
              <p className="text-white/60 text-sm leading-relaxed">{SITE_CONFIG.description}</p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40 font-bold mb-4">NAVIGATION</h3>
              <ul className="space-y-2">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}><Link href={link.href} className="text-white/60 text-sm hover:text-coral transition-colors">{link.label}</Link></li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40 font-bold mb-4">CONTACT</h3>
              <p className="text-white/60 text-sm mb-2">{SITE_CONFIG.email}</p>
              <p className="text-white/60 text-sm">{SITE_CONFIG.address}</p>
            </div>
            <div>
              <h3 className="font-mono text-[10px] tracking-[0.14em] uppercase text-white/40 font-bold mb-4">NEWSLETTER</h3>
              <NewsletterForm />
            </div>
          </div>

          {/* Mobile */}
          <div className="lg:hidden">
            <div className="text-center mb-6">
              <Image src="/logo-icon.png" alt="" width={40} height={40} className="w-10 h-10 mx-auto mb-2" />
              <span className="block font-mono text-[9px] tracking-[0.14em] uppercase text-white/50">STIMULUS GROUPS · NPO #80618910</span>
            </div>
            <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 mb-6">
              {NAV_LINKS.map((link) => (
                <Link key={link.href} href={link.href} className="text-white/60 text-[11px] hover:text-coral transition-colors">{link.label}</Link>
              ))}
            </div>
            <div className="max-w-[280px] mx-auto mb-6">
              <p className="text-white/40 text-[10px] text-center mb-2 font-mono tracking-wide">NEWSLETTER</p>
              <NewsletterForm />
            </div>
            <div className="text-center space-y-1">
              <p className="text-white/40 text-[10px]">{SITE_CONFIG.email}</p>
              <p className="text-white/30 text-[9px]">{SITE_CONFIG.address}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-[1280px] mx-auto px-4 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-white/30 text-xs font-mono tracking-wide">&copy; {new Date().getFullYear()} STIMULUS GROUPS ORGANIZATION</p>
          <div className="flex gap-4 text-xs">
            <Link href="#" className="text-white/30 hover:text-white/60 transition-colors">الخصوصية</Link>
            <Link href="#" className="text-white/30 hover:text-white/60 transition-colors">الشروط</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
