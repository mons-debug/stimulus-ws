import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "نطاق العمل" };

const REGIONS = [
  { name: "مصر", image: "https://stimulusgroups.org/wp-content/uploads/2023/08/egypt.png" },
  { name: "أفريقيا", image: "https://stimulusgroups.org/wp-content/uploads/2023/07/northafricav2.png" },
  { name: "الشرق الأوسط", image: "https://stimulusgroups.org/wp-content/uploads/2023/07/middleeast-01.png" },
];

export default function ScopePage() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-extrabold text-navy text-center mb-16">النطاق الجغرافي للعمل</h1>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {REGIONS.map((r) => (
            <div key={r.name} className="text-center group">
              <div className="bg-warm-gray rounded-2xl p-6 border border-border group-hover:border-coral/30 group-hover:shadow-lg transition-all mb-4">
                <Image src={r.image} alt={r.name} width={300} height={250} className="mx-auto h-48 w-auto object-contain" />
              </div>
              <h2 className="text-2xl font-extrabold text-navy">{r.name}</h2>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
