import React, { useState } from 'react';
import { ArrowLeftRight } from 'lucide-react';

export const MaterialComparator: React.FC = () => {
  const [sliderPos, setSliderPos] = useState<number>(50);
  const [activeMaterial, setActiveMaterial] = useState<'paint' | 'marble' | 'wood'>('paint');

  // يتم استخدام نفس الصورة بدقة 4K لكل مادة لمقارنة دقيقة وواقعية 100% في نفس المكان والزاوية
  const materials = {
    paint: {
      title: 'دهانات جوتن ريتش مات ناعمة كالحرير',
      sheen: 'مطفي عميق مخملي (3% لميع)',
      reflectance: 'تشتت ضوئي هادئ وتغطية كاملة 99%',
      resistance: 'مقاوم للغسيل والفرك فئة 1 مع ضمان 10 سنوات',
      beforeLabel: 'جدار خام، تشققات ومعجون غير متوازن',
      afterLabel: 'سطح حريري ناعم بإضاءة معمارية متناسقة',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=3840&q=95',
    },
    marble: {
      title: 'ألواح بديل الرخام الإيطالي مع العروق الذهبية',
      sheen: 'عالي اللمعان كريستالي UV (98%)',
      reflectance: 'عروق متصلة طبيعية Bookmatch متناسقة',
      resistance: 'مقاوم للخدش والرطوبة والحرارة حتى 80°C',
      beforeLabel: 'جدار اسمنتي خشن مع تمديدات أسلاك مكشوفة',
      afterLabel: 'لوح كالاكاتا عالي الفخامة مع إخفاء تام للتمديدات',
      image:
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=3840&q=95',
    },
    wood: {
      title: 'تكسيات بديل الخشب الكوري WPC المضلع',
      sheen: 'ملمس خشبي دافئ معتق Matt طبيعي',
      reflectance: 'تظليل ثلاثي الأبعاد هندسي عميق ومريح للعين',
      resistance: 'مقاوم للماء والعثة وعازل للصوت والأصداء',
      beforeLabel: 'فراغ تقليدي بارد بدون أي هوية ديكورية',
      afterLabel: 'جدارية مضلعة دافئة مع بروفايل ليد مخفي 3000K',
      image:
        'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=3840&q=95',
    },
  };

  const current = materials[activeMaterial];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#fff8f3] border-t border-[#eee7e1]" id="comparator">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs sm:text-sm font-semibold text-[#775a19] px-4 py-1 rounded-full bg-[#f4ede6]">
            معاينة فرق الإتقان المعماري
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17]">
            مقارنة التشطيب المعماري وقبل/بعد
          </h2>
          <p className="text-sm sm:text-base text-[#4e4639]">
            حرك المؤشر يميناً ويساراً لمشاهدة تأثير التجهيز الاحترافي وتطبيق المواد الفاخرة على نفس المساحة.
          </p>
        </div>

        {/* Material Selector Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {[
            { id: 'paint', label: 'الدهانات المخملية الناعمة' },
            { id: 'marble', label: 'بديل الرخام الإيطالي' },
            { id: 'wood', label: 'بديل الخشب المضلع' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveMaterial(tab.id as 'paint' | 'marble' | 'wood')}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                activeMaterial === tab.id
                  ? 'bg-[#c5a059] text-[#4e3700] shadow-xs'
                  : 'bg-[#faf2ec] text-[#4e4639] hover:bg-[#f4ede6]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Split Comparison Slider Container - Using the EXACT SAME IMAGE */}
        <div className="max-w-4xl mx-auto bg-white rounded-2xl p-4 sm:p-6 shadow-md border border-[#d1c5b4]/60">
          <div className="relative w-full h-[320px] sm:h-[460px] rounded-xl overflow-hidden select-none bg-[#1e1b17]">
            {/* 1. After Image Layer (Full width, crisp color & light) */}
            <img
              src={current.image}
              alt="بعد التشطيب الفاخر"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* After Label Badge (Left side) */}
            <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-[#c5a059] text-[#4e3700] text-xs font-bold shadow-md z-10">
              بعد: {current.afterLabel}
            </div>

            {/* 2. Before Image Layer (The EXACT SAME image, clipped from left by sliderPos, with raw unpainted treatment) */}
            <div
              className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none"
              style={{
                clipPath: `inset(0 0 0 ${sliderPos}%)`,
              }}
            >
              <img
                src={current.image}
                alt="قبل التشطيب"
                className="absolute inset-0 w-full h-full object-cover filter grayscale contrast-125 brightness-75 sepia-25"
              />
              <div className="absolute inset-0 bg-[#2d2a26]/20 mix-blend-multiply"></div>

              {/* Before Label Badge (Right side) */}
              <div className="absolute top-4 right-4 px-3.5 py-1.5 rounded-full bg-black/80 text-white text-xs font-bold shadow-md z-10">
                قبل: {current.beforeLabel}
              </div>
            </div>

            {/* Slider Divider Line */}
            <div
              className="absolute inset-y-0 w-1 bg-[#c5a059] z-20 pointer-events-none shadow-[0_0_12px_rgba(0,0,0,0.6)]"
              style={{ left: `${sliderPos}%` }}
            >
              {/* Handle Button */}
              <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-[#c5a059] text-[#4e3700] flex items-center justify-center shadow-xl border-2 border-white text-xs font-bold">
                <ArrowLeftRight className="w-5 h-5" />
              </div>
            </div>

            {/* Range input controller over the entire image */}
            <input
              type="range"
              min="0"
              max="100"
              value={sliderPos}
              onChange={(e) => setSliderPos(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-30"
              aria-label="مؤشر المقارنة قبل وبعد على نفس الصورة"
            />
          </div>

          {/* Technical Specs Strip */}
          <div className="mt-6 pt-4 border-t border-[#f4ede6] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-[#faf2ec]">
              <span className="text-[#655e51] block text-[11px]">مستوى اللمعان والانعكاس:</span>
              <span className="font-bold text-[#1e1b17] mt-0.5 block">{current.sheen}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#faf2ec]">
              <span className="text-[#655e51] block text-[11px]">التشتت الضوئي والعروق:</span>
              <span className="font-bold text-[#775a19] mt-0.5 block">{current.reflectance}</span>
            </div>

            <div className="p-3 rounded-xl bg-[#faf2ec]">
              <span className="text-[#655e51] block text-[11px]">مقاومة الاحتكاك والرطوبة:</span>
              <span className="font-bold text-[#1e1b17] mt-0.5 block">{current.resistance}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
