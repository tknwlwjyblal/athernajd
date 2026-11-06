import React from 'react';
import { ShieldCheck, CheckCircle2, ArrowLeft } from 'lucide-react';
import { PACKAGES } from '../data/mockData';
import { TiltCard } from './TiltCard';
import { ScrollReveal } from './ScrollReveal';
import { soundEngine } from '../utils/audioEffects';

interface PackagesSectionProps {
  onSelectPackage: (packageName: string) => void;
}

export const PackagesSection: React.FC<PackagesSectionProps> = ({
  onSelectPackage,
}) => {
  return (
    <section className="w-full py-12 sm:py-16 bg-[#fff8f3]" id="packages">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-xs sm:text-sm font-semibold text-[#775a19] px-3.5 py-1 rounded-full bg-[#f4ede6]">
            شفافية التسعير وجودة المخرجات
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17]">
            باقات التشطيب والديكور المعماري
          </h2>
          <p className="text-sm sm:text-base text-[#4e4639]">
            اختر الباقة المتوافقة مع تطلعات مسكنك. أسعارنا محددة ومدروسة بدون أي تكاليف خفية أو مفاجآت لاحقة.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          {PACKAGES.map((pkg, idx) => {
            const isFeatured = pkg.badge === 'الأكثر طلباً واختياراً';
            return (
              <ScrollReveal key={pkg.id} delay={idx * 100} direction="up" className="h-full">
                <TiltCard maxTilt={5} scale={isFeatured ? 1.02 : 1.015} className="h-full">
                  <div
                    className={`rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative h-full ${
                      isFeatured
                        ? 'bg-white shadow-xl ring-2 ring-[#c5a059] lg:-translate-y-2'
                        : 'bg-[#faf2ec] shadow-sm border border-[#e8e1db]'
                    }`}
                  >
                    {pkg.badge && (
                      <span className="absolute -top-3.5 right-6 px-3.5 py-1 rounded-full bg-[#c5a059] text-[#4e3700] text-xs font-bold shadow-md animate-pulse">
                        {pkg.badge}
                      </span>
                    )}

                    <div>
                      <h3 className="text-xl font-bold text-[#1e1b17] mb-1">
                        {pkg.title}
                      </h3>
                      <p className="text-xs text-[#655e51] mb-5">
                        {pkg.tagline}
                      </p>

                      <div className="mb-6 p-4 rounded-xl bg-[#f4ede6]/60 border border-[#eee7e1]">
                        <div className="flex items-center gap-2">
                          <ShieldCheck className="w-5 h-5 text-[#775a19]" />
                          <span className="text-sm sm:text-base font-bold text-[#1e1b17]">
                            {pkg.pricingBadge || 'تسعير مخصص حسب المعاينة'}
                          </span>
                        </div>
                        <span className="text-[11px] text-[#576155] block mt-1.5">
                          * يشمل المعاينة الميدانية ورفع المقاسات وتقديم كتالوجات العينات الحية مجاناً
                        </span>
                      </div>

                      <div className="text-xs font-bold text-[#1e1b17] mb-3">
                        مناسبة لـ: <span className="text-[#775a19]">{pkg.recommendedFor}</span>
                      </div>

                      <div className="space-y-2.5 mb-6">
                        <span className="text-xs font-bold text-[#1e1b17] block">
                          تشمل الباقة:
                        </span>
                        {pkg.features.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-[#4e4639]">
                            <CheckCircle2 className="w-4 h-4 text-[#775a19] mt-0.5 shrink-0" />
                            <span className="leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="mb-4 pt-4 border-t border-[#e8e1db] space-y-1">
                        <span className="text-[11px] font-semibold text-[#655e51] block">
                          مزايا مجانية متضمنة:
                        </span>
                        <div className="flex flex-wrap gap-1">
                          {pkg.includes.map((inc, i) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 rounded bg-white text-[10px] text-[#576155] border border-[#eee7e1]"
                            >
                              + {inc}
                            </span>
                          ))}
                        </div>
                      </div>

                      <button
                        onClick={() => {
                          soundEngine.playChime();
                          onSelectPackage(pkg.title);
                        }}
                        data-sparkle="true"
                        data-interactive="true"
                        className={`w-full py-3.5 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-95 ${
                          isFeatured
                            ? 'bg-[#c5a059] text-[#4e3700] hover:bg-[#e9c176] shadow-md hover:shadow-lg'
                            : 'bg-white text-[#1e1b17] hover:bg-[#f4ede6] border border-[#d1c5b4]'
                        }`}
                      >
                        <span>طلب معاينة لهذه الباقة</span>
                        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                      </button>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
