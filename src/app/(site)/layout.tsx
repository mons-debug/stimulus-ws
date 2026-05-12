import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AppBar } from "@/components/layout/AppBar";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 pb-[72px] lg:pb-0">{children}</main>
      <Footer />
      <AppBar />
      <WhatsAppButton />
    </div>
  );
}
