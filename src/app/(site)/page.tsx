import Link from "next/link";
import Image from "next/image";

const LATEST_ARTICLES = [
  {
    title: "أسئلة الأزمات وسؤال جدوى النظام الاقتصادي",
    date: "مايو 7, 2026",
    category: "مقالات",
    image: "https://stimulusgroups.org/wp-content/uploads/2026/05/أسئلة-الأزمات.jpg",
  },
  {
    title: "لماذا يكرهون الحوكمة؟",
    date: "مايو 2, 2026",
    category: "مقالات",
    image: "https://stimulusgroups.org/wp-content/uploads/2026/05/لماذا-يكرهون-الحوكمة؟.jpg",
  },
  {
    title: "هموم المصريين .. من وراثة الاحتجاج إلى تجديد الأمل والفاعلية",
    date: "أبريل 25, 2026",
    category: "مقالات",
    image: "https://stimulusgroups.org/wp-content/uploads/2026/04/هموم-المصريين.jpg",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[600px] py-12">
            <div className="text-center lg:text-right">
              <h1 className="text-5xl sm:text-6xl font-extrabold text-coral leading-tight mb-6">
                منظمة مجموعات<br />التحفيز
              </h1>
              <p className="text-text-light text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mr-0">
                – &quot;منظمة مجموعات التحفيز&quot; هي منظمة أوروبية غير هادفة للربح NPO ومقرها إيستونيا ومسجلة رسمياً برقم 80618910
              </p>
              <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link href="/about" className="bg-navy text-white font-bold px-8 py-3.5 rounded hover:bg-navy-light transition-colors">من نحن</Link>
                <Link href="/contact" className="bg-coral text-white font-bold px-8 py-3.5 rounded hover:bg-coral-hover transition-colors">تواصل معنا</Link>
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-navy mb-5 flex items-center justify-between">
                <span>آخر المقالات</span>
                <Link href="/blog" className="text-sm text-coral font-semibold hover:underline">أكثر...</Link>
              </h2>
              <div className="space-y-3">
                {LATEST_ARTICLES.map((article) => (
                  <Link key={article.title} href="/blog" className="group flex gap-4 bg-white rounded-xl p-4 border border-border hover:border-coral/30 hover:shadow-md transition-all">
                    <div className="w-24 h-20 rounded-lg flex-shrink-0 overflow-hidden">
                      <Image src={article.image} alt={article.title} width={96} height={80} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="inline-block bg-coral text-white text-[10px] font-bold px-2.5 py-0.5 rounded mb-1.5">{article.category}</span>
                      <h3 className="text-sm font-bold text-navy leading-snug group-hover:text-coral transition-colors line-clamp-2">{article.title}</h3>
                      <p className="text-xs text-text-light mt-1">{article.date}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT + من نحن — 50/50 side by side like original ===== */}
      <section className="py-20 bg-[#F4F4F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            {/* RIGHT: فهم الحاضر — image card */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <div className="relative overflow-hidden">
                <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/future.jpg" alt="فهم الحاضر" width={700} height={400} className="w-full h-72 object-cover hover:scale-105 transition-transform duration-700" />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-4 py-1.5 shadow">
                  <p className="text-navy text-xs font-bold">NPO #80618910</p>
                </div>
              </div>
              <div className="p-8">
                <div className="inline-block bg-coral/10 text-coral text-xs font-bold px-3 py-1 rounded-full mb-4">فهم الحاضر لقيادة المستقبل</div>
                <h2 className="text-2xl font-extrabold text-navy mb-4 leading-snug">فهم الحاضر لقيادة المستقبل</h2>
                <p className="text-text-light leading-[1.9] text-sm mb-4">
                  نسعى في &quot;منظمة مجموعات التحفيز&quot; إلى تحقيق تلاحم المجتمع وتعزيز الترابط بين أفراده عبر الحوار الذي يتجاوز الخلاف ويحترم الاختلاف والتنوع. نؤمن بأن التعاون والتضامن هما المفتاح لبناء مجتمع قوي ومزدهر.
                </p>
                <p className="text-text-light leading-[1.9] text-sm mb-6">
                  كما نسعى لتحقيق هذا الهدف عبر برامجنا المبتكرة التي تعمل على تعزيز وتمكين وتمتين الفاعلية الحقيقة المؤثرة لدى الشباب، مما يمكنهم من المساهمة الفاعلة في بناء المجتمع.
                </p>
                <a href="https://wa.me/447506663561" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#1da851] transition-colors text-sm shadow-lg shadow-[#25D366]/20">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  تواصل معنا عبر الواتساب
                </a>
              </div>
            </div>

            {/* LEFT: من نحن — text + bullet cards */}
            <div>
              <div className="inline-block bg-navy/10 text-navy text-xs font-bold px-4 py-1.5 rounded-full mb-4">منظمة مجموعات التحفيز</div>
              <h2 className="text-3xl font-extrabold text-navy mb-6">من نحن؟</h2>
              <p className="text-text-light leading-[1.9] text-sm mb-6">
                نسعى للمساهمة في نشأة نخبة مستقبلية جديدة -في مصر وأفريقيا والشرق الأوسط- يمكنها أن تبتكر حلولا تفتح آفاقا لفاعليات مجتمعية مؤثرة ومتنوعة، وقادرة على مراكمة نجاحتها باتجاه الإصلاح والنهضة والديمقراطية في أشكال مؤسسية قابلة للاستمرار لأجيال قادمة
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                {[
                  { text: "تطوير نخبة مستقبلية مبدعة (الفاعلين الجدد)", icon: "🎯" },
                  { text: "تحقيق تأثير اجتماعي إيجابي", icon: "💡" },
                  { text: "دعم الحوار والنقاش والتدريب", icon: "🤝" },
                  { text: "تعزيز ثقافة العطاء والتعاون", icon: "❤️" },
                  { text: "تشجيع التفكير الإيجابي والتغيير المجتمعي المؤثر", icon: "🌟" },
                ].map((item, i) => (
                  <div key={item.text} className={`bg-white rounded-xl p-4 border border-border/50 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all flex items-start gap-3 ${i === 4 ? "sm:col-span-2" : ""}`}>
                    <span className="text-lg flex-shrink-0">{item.icon}</span>
                    <p className="text-navy text-sm font-semibold leading-relaxed">{item.text}</p>
                  </div>
                ))}
              </div>
              <Link href="/about" className="inline-flex items-center gap-2 bg-navy text-white font-bold px-8 py-3.5 rounded-xl hover:bg-navy-light transition-all shadow-lg shadow-navy/20 group">
                إعرف المزيد
                <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SERVICES — 5 columns: 4 white cards + 1 coral CTA card ===== */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-navy mb-4">خدماتنا</h2>
            <p className="text-text-light max-w-2xl mx-auto">تقوم مجموعات التحفيز السياسي بأنشطة متعددة يمكن إجمالها تحت أربعة عناوين رئيسية</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-0">
            {/* Card 1: البحوث — book-open icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الأولى</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">البحوث والدراسات الأكاديمية</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 2: تحفيز النقاشات — users icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الثانية</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">تحفيز النقاشات المتعلقة بالقضايا المجتمعية والسياسية</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 3: تنمية مهارات — hand-holding-heart icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الثالثة</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">تنمية مهارات المهتمين بالشأن العام وقدراتهم ومعارفهم</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 4: نشر الوعي — share icon */}
            <Link href="/services" className="group bg-[#F8F8F8] p-7 text-center border border-[#eee] hover:bg-white hover:shadow-lg transition-all">
              <svg className="mx-auto mb-5 text-coral" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
              <p className="text-coral text-xs font-bold mb-2">المجموعة الرابعة</p>
              <h3 className="text-sm font-bold text-navy leading-snug mb-4 group-hover:text-coral transition-colors">نشر الوعي العام</h3>
              <span className="text-coral text-xs font-semibold">اقرأ المزيد ←</span>
            </Link>
            {/* Card 5: CTA coral card with bg image */}
            <Link href="/donate" className="relative overflow-hidden p-7 text-center text-white flex flex-col justify-center items-center">
              <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(https://stimulusgroups.org/wp-content/uploads/2023/07/youth-collabor.jpg)" }} />
              <div className="absolute inset-0 bg-coral/85" />
              <div className="relative z-10">
                <h3 className="text-lg font-extrabold leading-snug mb-2">انضم إلينا في صناعة التغيير الإيجابي</h3>
                <p className="text-white/80 text-sm mb-4">مساهمتك تصنع الفارق</p>
                <span className="inline-block bg-white text-coral font-bold text-xs px-4 py-2 rounded hover:bg-warm-gray transition-colors">تواصل معنا ←</span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== معًا لبناء — 50/50 split, image left, text right ===== */}
      <section className="bg-white">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Image side with overlapping accent */}
          <div className="relative min-h-[450px] lg:min-h-[580px]">
            <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/diversity-and-teamwork-as-a-group-of-diverse-peopl-2023-01-26-00-04-28-utc.jpg" alt="Together" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-l from-white/20 to-transparent" />
            {/* Accent stripe */}
            <div className="hidden lg:block absolute top-12 -left-4 w-2 h-32 bg-coral rounded-full" />
          </div>
          {/* Text side */}
          <div className="flex flex-col justify-center p-10 lg:p-16 lg:pr-20">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-[3px] bg-coral rounded-full" />
              <p className="text-coral text-sm font-bold tracking-wide">نحو مستقبل مشرق</p>
            </div>
            <h2 className="text-4xl font-extrabold text-navy mb-6 leading-snug">معًا لبناء مجتمع أفضل</h2>
            <p className="text-text-light leading-[2] mb-4">
              نحن &quot;منظمة مجموعات التحفيز&quot;، نسعى جاهدين لتحقيق التغيير الإيجابي في المجتمع. ونعتقد في أن المجتمع يجب أن يسبق السلطة، وكذلك نرى أن تقوية المجتمع هو ضمانة لتحقيق &quot;حوكمة جيدة وعادلة&quot; ترسخ لمفاهيم مواجهة الفساد والاستبداد والانحراف وسوء الإدارة وغياب القانون وغيرهم.
            </p>
            <p className="text-text-light leading-[2] mb-10">
              كما نؤمن بقوة العطاء والتعاون والتضامن لبناء مستقبل أفضل للجميع. إننا نعمل على تمكين الشباب وتقديم الفرص اللازمة للحوار والنقاش والتفاعل لتطوير قدراتهم ومهاراتهم باتجاه إكسابهم فاعلية حقيقية ومؤثرة.
            </p>
            <Link href="/contact" className="inline-flex items-center gap-3 bg-navy text-white font-bold px-8 py-4 rounded-xl hover:bg-navy-light transition-all hover:shadow-lg hover:shadow-navy/20 w-fit group">
              تواصل معنا
              <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M19 12H5"/><path d="M12 5l-7 7 7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== استراتيجيتنا — REVERSED: text left, image right ===== */}
      <section className="bg-[#FAFAF9]">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          {/* Text side */}
          <div className="flex flex-col justify-center p-10 lg:p-16 lg:pl-20 order-2 lg:order-1">
            <div className="inline-flex items-center gap-2 mb-5">
              <span className="w-8 h-[3px] bg-coral rounded-full" />
              <p className="text-coral text-sm font-bold tracking-wide">رؤية النجاح</p>
            </div>
            <h2 className="text-4xl font-extrabold text-navy mb-8 leading-snug">استراتيجيتنا للتغيير الإيجابي</h2>
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8553D" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 3 6-6"/></svg>
                </div>
                <p className="text-text-light leading-[2]">في منظمتنا، نسعى جاهدين لتحقيق التغيير الإيجابي في المجتمع من خلال استراتيجية مدروسة وهادفة. تتمحور رؤيتنا حول إحداث تحول حقيقي وإيجاد فاعلية وفاعلين يمكنهم صناعة الفارق.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8553D" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 3 6-6"/></svg>
                </div>
                <p className="text-text-light leading-[2]">تتمثل استراتيجيتنا في توفير الدعم اللازم للشباب والشابات من خلال مشروعاتنا وخدماتنا، من خلال مشاريع وبرامج وورش نقاشية، والتشجيع على الحوار والتدريب المتميز.</p>
              </div>
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-coral/10 flex items-center justify-center flex-shrink-0 mt-1">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#E8553D" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 12l2 3 6-6"/></svg>
                </div>
                <p className="text-text-light leading-[2]">إننا نولي اهتمامًا كبيرًا للشفافية والمساءلة، حيث نعمل بجدية على تحقيق الفاعلية والاستدامة في جميع أنشطتنا وضمان أعلى درجات الكفاءة والجودة.</p>
              </div>
            </div>
          </div>
          {/* Image side with floating stat card */}
          <div className="relative min-h-[450px] lg:min-h-[580px] order-1 lg:order-2">
            <Image src="https://stimulusgroups.org/wp-content/uploads/2023/08/cheerful-diverse-teenagers-2022-12-16-00-28-36-utc.jpg" alt="Youth" fill sizes="50vw" className="object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#FAFAF9]/30 to-transparent" />
            {/* Floating stat card */}
            <div className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl p-5 border border-border/30">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-coral flex items-center justify-center">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
                </div>
                <div>
                  <p className="text-2xl font-black text-navy">+1000</p>
                  <p className="text-text-light text-xs">شاب ومشارك في برامجنا</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ساهم — Full-width bg image + dark overlay + dual button ===== */}
      <section className="parallax-section py-24">
        <div className="parallax-bg" style={{ backgroundImage: "url(https://stimulusgroups.org/wp-content/uploads/2023/07/youth-collabor.jpg)" }} />
        <div className="parallax-overlay bg-black/60" />
        <div className="parallax-content max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <p className="text-coral text-sm font-semibold mb-3">ساهم في تحقيق التغيير الإيجابي</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">اجعل تبرعك وتطوعك الآن فرصة للأمل والتغيير</h2>
          <p className="text-white/70 leading-relaxed mb-10 max-w-2xl mx-auto">
            ندعوك للمشاركة في رحلتنا لتحقيق التغيير الإيجابي وتقديم المساهمة في بناء مجتمع أفضل. من خلال تبرعك ودعمك وتطوعك، يمكننا دعم الشباب والشابات وتطوير قدراتهم ومهاراتهم، وتقديم الفرص التي تحتاجها الأجيال القادمة لتحقيق طموحاتهم.
          </p>
          {/* Dual button matching original */}
          <div className="inline-flex items-center rounded-lg overflow-hidden shadow-lg">
            <Link href="/donate" className="bg-navy text-white font-bold px-10 py-4 hover:bg-navy-light transition-colors">تبرع الآن</Link>
            <span className="bg-white text-text-light px-4 py-4 text-sm font-bold">أو</span>
            <Link href="/contact" className="bg-coral text-white font-bold px-10 py-4 hover:bg-coral-hover transition-colors">تواصل معنا</Link>
          </div>
        </div>
      </section>

      {/* Blog section removed — articles already shown in hero */}
    </>
  );
}
