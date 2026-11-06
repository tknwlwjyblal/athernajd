import React from 'react';
import {
  ShieldCheck,
  ArrowLeft,
  Sparkles,
  Award,
  Building2,
  Smile,
  Compass,
} from 'lucide-react';
import { TiltCard } from './TiltCard';
import { AnimatedCounter } from './AnimatedCounter';
import { ScrollReveal } from './ScrollReveal';
import { soundEngine } from '../utils/audioEffects';
import { triggerGoldenBurst } from '../utils/sparkleBurst';

interface HeroProps {
  onOpenBookingModal: () => void;
  onExploreProjects: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenBookingModal,
  onExploreProjects,
}) => {
  const handleHeroAction = (e: React.MouseEvent, action: 'book' | 'explore') => {
    soundEngine.playChime();
    triggerGoldenBurst(e.clientX, e.clientY, 28);
    if (action === 'book') {
      onOpenBookingModal();
    } else {
      onExploreProjects();
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    soundEngine.playChime();
    triggerGoldenBurst(e.clientX, e.clientY, 30);
  };

  return (
    <section className="relative w-full overflow-hidden bg-transparent pt-2 sm:pt-4 pb-12 sm:pb-16" id="home">
      <div className="max-w-[1440px] mx-auto px-3 sm:px-6 lg:px-12">
        {/* Open Hero Content Layered Directly on Background Video without any black card */}
        <div className="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[600px] flex flex-col justify-between py-6 sm:py-8">
          {/* Top Pre-heading Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/35 backdrop-blur-md border border-white/20 text-[#f6e0a4] text-[11px] sm:text-xs font-semibold shadow-md animate-pulse-gold">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
              <span>رواد الدهانات والديكور الداخلي الراقي بالرياض</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/35 backdrop-blur-md border border-white/15 text-stone-200 text-[11px] sm:text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-[#e5be70]" />
              <span>اعتماد رسمي للمشاريع السكنية والتجارية</span>
            </div>
          </div>

          {/* Center Refined Headline & Call-To-Action (Directly on Video) */}
          <div className="py-6 sm:py-10 max-w-2xl space-y-3 sm:space-y-4">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white leading-snug tracking-tight drop-shadow-[0_2px_12px_rgba(0,0,0,0.9)]">
              نبتكر لمساحاتكم{' '}
              <span className="text-[#e5be70] font-extrabold inline-block relative px-1 drop-shadow-[0_2px_14px_rgba(229,190,112,0.6)]">
                فخامة هادئة
                <span className="absolute bottom-1 left-0 right-0 h-2 bg-[#c5a059]/40 -z-10 rounded-xs" />
              </span>{' '}
              تجمع بين أصالة نجد وروح العصر
            </h1>

            <p className="text-xs sm:text-sm text-stone-100 max-w-lg leading-relaxed drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] font-normal">
              تنفيذ أرقى الدهانات العصرية، بديل الرخام والخشب، وتكسيات الجدران الهندسية بأيدي كوادر متخصصة وضمان معتمد.
            </p>

            {/* Action Buttons - Compact & Refined with Interactive Sparkle Bursts */}
            <div className="flex flex-wrap items-center gap-2.5 pt-1.5">
              <button
                onClick={(e) => handleHeroAction(e, 'book')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-gradient-to-r from-[#d8b163] via-[#c5a059] to-[#b38e47] text-[#1e1b17] text-xs sm:text-sm font-bold shadow-xl hover:shadow-[0_0_20px_rgba(197,160,89,0.5)] hover:scale-[1.02] active:scale-95 transition-all duration-300 cursor-pointer"
              >
                <span>احجز معاينة موقعك مجاناً</span>
                <ArrowLeft className="w-3.5 h-3.5 transition-transform group-hover:-translate-x-1" />
              </button>
              <button
                onClick={(e) => handleHeroAction(e, 'explore')}
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-xl bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/25 text-white text-xs sm:text-sm font-semibold shadow-md transition-all duration-300 cursor-pointer hover:scale-[1.02] active:scale-95"
              >
                <span>تصفح أعمالنا المنفذة</span>
                <Sparkles className="w-3.5 h-3.5 text-[#e5be70]" />
              </button>
            </div>
          </div>

          {/* Bottom Floating Feature Information */}
          <div className="flex flex-wrap items-center justify-between gap-2.5 pt-4">
            <div className="flex items-center gap-2 text-stone-200 text-xs drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              <Compass className="w-3.5 h-3.5 text-[#e5be70] shrink-0" />
              <span className="font-semibold text-white">مشروع سكني خاص – حي النرجس:</span>
              <span className="hidden sm:inline text-stone-200">صالون استقبال بلمسات الـ Cove Light وبديل الخشب</span>
            </div>
            <div className="flex items-center gap-2 text-stone-300 text-[11px] font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
              <span>درجات الأوف وايت والبيج</span>
              <span>•</span>
              <span className="text-[#e5be70] font-bold">تنفيذ أثر نجد</span>
            </div>
          </div>
        </div>

        {/* Trust Highlights Strip - Compact & Sleek Modern Cards */}
        <ScrollReveal delay={120}>
          <div className="mt-3 sm:mt-4 grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-2.5">
            {/* Card 1: Experience */}
            <TiltCard maxTilt={6} className="cursor-pointer">
              <div
                onClick={handleCardClick}
                className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-white/85 hover:bg-white backdrop-blur-md shadow-xs border border-[#eee7e1] hover:border-[#c5a059] hover:shadow-[0_4px_16px_rgba(197,160,89,0.18)] transition-all flex items-center gap-2 sm:gap-2.5 h-full group active:scale-95"
              >
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-gradient-to-br from-[#f4ede6] to-[#eee2d2] border border-[#c5a059]/30 flex items-center justify-center text-[#775a19] shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#775a19] group-hover:text-[#c5a059] transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center leading-none mb-0.5">
                    <AnimatedCounter end={12} prefix="+" suffix=" عاماً" duration={1600} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#5c5446] font-medium truncate">من الحرفية والريادة</div>
                </div>
              </div>
            </TiltCard>

            {/* Card 2: Warranty */}
            <TiltCard maxTilt={6} className="cursor-pointer">
              <div
                onClick={handleCardClick}
                className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-white/85 hover:bg-white backdrop-blur-md shadow-xs border border-[#eee7e1] hover:border-[#c5a059] hover:shadow-[0_4px_16px_rgba(197,160,89,0.18)] transition-all flex items-center gap-2 sm:gap-2.5 h-full group active:scale-95"
              >
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-gradient-to-br from-[#f4ede6] to-[#eee2d2] border border-[#c5a059]/30 flex items-center justify-center text-[#775a19] shrink-0 group-hover:scale-110 group-hover:-rotate-6 transition-all duration-300 shadow-2xs">
                  <Award className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#775a19] group-hover:text-[#c5a059] transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center leading-none mb-0.5">
                    <AnimatedCounter end={10} suffix=" سنوات" duration={1800} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#5c5446] font-medium truncate">ضمان معتمد على الأعمال</div>
                </div>
              </div>
            </TiltCard>

            {/* Card 3: Projects */}
            <TiltCard maxTilt={6} className="cursor-pointer">
              <div
                onClick={handleCardClick}
                className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-white/85 hover:bg-white backdrop-blur-md shadow-xs border border-[#eee7e1] hover:border-[#c5a059] hover:shadow-[0_4px_16px_rgba(197,160,89,0.18)] transition-all flex items-center gap-2 sm:gap-2.5 h-full group active:scale-95"
              >
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-gradient-to-br from-[#f4ede6] to-[#eee2d2] border border-[#c5a059]/30 flex items-center justify-center text-[#775a19] shrink-0 group-hover:scale-110 transition-all duration-300 shadow-2xs">
                  <Building2 className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#775a19] group-hover:text-[#c5a059] transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center leading-none mb-0.5">
                    <AnimatedCounter end={480} prefix="+" suffix=" مشروعاً" duration={2000} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#5c5446] font-medium truncate">منفذاً بأعلى المقاييس</div>
                </div>
              </div>
            </TiltCard>

            {/* Card 4: Punctuality */}
            <TiltCard maxTilt={6} className="cursor-pointer">
              <div
                onClick={handleCardClick}
                className="py-2 px-2.5 sm:py-2.5 sm:px-3 rounded-xl bg-white/85 hover:bg-white backdrop-blur-md shadow-xs border border-[#eee7e1] hover:border-[#c5a059] hover:shadow-[0_4px_16px_rgba(197,160,89,0.18)] transition-all flex items-center gap-2 sm:gap-2.5 h-full group active:scale-95"
              >
                <div className="w-8 h-8 sm:w-8.5 sm:h-8.5 rounded-lg bg-gradient-to-br from-[#f4ede6] to-[#eee2d2] border border-[#c5a059]/30 flex items-center justify-center text-[#775a19] shrink-0 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-2xs">
                  <Smile className="w-4 h-4 sm:w-4.5 sm:h-4.5 text-[#775a19] group-hover:text-[#c5a059] transition-colors" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center leading-none mb-0.5">
                    <AnimatedCounter end={100} suffix="%" duration={1500} />
                  </div>
                  <div className="text-[10px] sm:text-[11px] text-[#5c5446] font-medium truncate">التزام تام بالمواعيد</div>
                </div>
              </div>
            </TiltCard>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
