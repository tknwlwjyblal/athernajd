import React, { useState } from 'react';
import {
  Sparkles,
  ShieldCheck,
  Check,
  Layers,
  Award,
  Zap,
  ArrowLeft,
} from 'lucide-react';

interface SwatchItem {
  id: string;
  title: string;
  category: string;
  finish: string;
  textureImage: string;
  specs: { label: string; value: string }[];
  guaranteeYears: number;
  highlightText: string;
  accentColor: string;
}

const SWATCH_DATA: SwatchItem[] = [
  {
    id: 'suede-paint',
    title: 'دهان الشمواه المخملي الفاخر',
    category: 'دهانات داخلية حريرية',
    finish: 'ملمس قماشي مخملي دافئ مع تدرجات ضوئية راقية',
    textureImage: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'مستوى اللمعان', value: 'مطفي عميق مخملي (3%)' },
      { label: 'مقاومة الفرك والغسيل', value: 'فئة 1 عالية التحمل' },
      { label: 'الرائحة والتطاير', value: 'خالٍ من المركبات العضوية VOC' },
      { label: 'مناسب لـ', value: 'المجالس، غرف النوم، الصوالين' },
    ],
    guaranteeYears: 10,
    highlightText: 'يعكس الإضاءة بنعومة فائقة تعطي إحساس الفنادق 5 نجوم',
    accentColor: '#c5a059',
  },
  {
    id: 'calacatta-marble',
    title: 'بديل الرخام كلكتا عروق ذهبية',
    category: 'ألواح PVC كورية معالجة',
    finish: 'سطح زجاجي فائق اللمعان UV مقاوم للخدش 98%',
    textureImage: 'https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'السماكة والصلابة', value: '3.5 مم عالي الكثافة' },
      { label: 'مقاومة الماء والرطوبة', value: '100% ضد الماء والانتفاخ' },
      { label: 'تناسق العروق', value: 'تقنية Bookmatch المتصلة' },
      { label: 'مناسب لـ', value: 'خلفيات التلفزيون، المداخل، الحمامات' },
    ],
    guaranteeYears: 10,
    highlightText: 'وزن خفيف وتركيب سريع بدون تكسير وبنفس فخامة الرخام الطبيعي',
    accentColor: '#e9c176',
  },
  {
    id: 'wpc-wood',
    title: 'بديل الخشب الكوري WPC المضلع',
    category: 'تكسيات جدارية ثلاثية الأبعاد',
    finish: 'ملمس خشبي معتق طبيعي مع تظليل هندسي عميق',
    textureImage: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'العزل الصوتي', value: 'يمتص الصدى والأصوات المرتدة' },
      { label: 'مقاومة الحشرات', value: 'مقاوم للنمل الأبيض والرطوبة' },
      { label: 'التوافق مع الإضاءة', value: 'مجاري مخصصة لليد بروفايل' },
      { label: 'مناسب لـ', value: 'جدران الشاشات، الممرات، المكاتب' },
    ],
    guaranteeYears: 10,
    highlightText: 'يمنح الفراغ دفء الخشب الاسكندنافي مع متانة بلاستيكية تدوم عقوداً',
    accentColor: '#8a6829',
  },
  {
    id: 'french-moldings',
    title: 'بانوهات وإطارات نيو-كلاسيك',
    category: 'إطارات فوم كوري عالية الكثافة',
    finish: 'زوايا ليزرية دقيقة 45° مع دهان متجانس مدمج بالجدار',
    textureImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=85',
    specs: [
      { label: 'مقاومة الصدمات', value: 'بولي يوريثان مرن عالي الكثافة' },
      { label: 'الدهان والتشطيب', value: 'يقبل دهانات الزيت والماء' },
      { label: 'دقة القص', value: 'قص ليزري حاد بدون فراغات' },
      { label: 'مناسب لـ', value: 'صالات القصور، المجالس الكلاسيكية' },
    ],
    guaranteeYears: 10,
    highlightText: 'توزيع هندسي متناسق يحول الجدران الصامتة لتحف فنية ملكية',
    accentColor: '#c5a059',
  },
];

interface TactileSwatchesProps {
  onSelectFinish?: (finishTitle: string) => void;
}

export const TactileSwatches: React.FC<TactileSwatchesProps> = ({ onSelectFinish }) => {
  const [activeSwatch, setActiveSwatch] = useState<SwatchItem>(SWATCH_DATA[0]);
  const [isZoomed, setIsZoomed] = useState<boolean>(false);

  return (
    <section className="w-full py-16 sm:py-20 bg-[#faf2ec] border-t border-[#e8e1db]" id="tactile-swatches">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs sm:text-sm font-semibold text-[#775a19] px-4 py-1 rounded-full bg-[#f4ede6] inline-block border border-[#c5a059]/30">
              دقة التفاصيل والملمس الحقيقي
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17] font-serif">
              ملمس وخامات أثر نجد تحت المجهر
            </h2>
            <p className="text-sm sm:text-base text-[#4e4639]">
              تفاعل مع عينات الخامات، واطّلع على المواصفات الفنية المعتمدة والضمان الرسمي لكل مادة نستخدمها في مشاريعنا.
            </p>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold text-[#775a19] bg-white px-4 py-2 rounded-xl shadow-xs border border-[#e8e1db]">
            <ShieldCheck className="w-4 h-4 text-[#c5a059]" />
            <span>جميع الخامات مطابقة للمواصفات والمقاييس السعودية SASO</span>
          </div>
        </div>

        {/* Interactive Swatch Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Swatch Navigation Tabs (4 cols) */}
          <div className="lg:col-span-5 space-y-3">
            {SWATCH_DATA.map((swatch) => {
              const isActive = activeSwatch.id === swatch.id;
              return (
                <div
                  key={swatch.id}
                  onClick={() => {
                    setActiveSwatch(swatch);
                    setIsZoomed(false);
                  }}
                  className={`p-4 sm:p-5 rounded-2xl transition-all cursor-pointer border text-right relative overflow-hidden group ${
                    isActive
                      ? 'bg-white border-[#c5a059] shadow-lg ring-1 ring-[#c5a059]'
                      : 'bg-white/70 hover:bg-white border-[#eee7e1] hover:border-[#d1c5b4]'
                  }`}
                >
                  {/* Subtle active line indicator */}
                  {isActive && (
                    <div className="absolute top-0 bottom-0 right-0 w-1.5 bg-[#c5a059]" />
                  )}

                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-xs font-semibold text-[#775a19] bg-[#f4ede6] px-2.5 py-0.5 rounded-full">
                      {swatch.category}
                    </span>
                    <span className="text-xs text-[#576155] font-mono">ضمان {swatch.guaranteeYears} سنوات</span>
                  </div>

                  <h3 className={`text-base sm:text-lg font-bold mb-1 ${isActive ? 'text-[#1e1b17]' : 'text-[#4e4639]'}`}>
                    {swatch.title}
                  </h3>

                  <p className="text-xs text-[#655e51] line-clamp-1">
                    {swatch.finish}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Detailed Interactive Preview Showcase (7 cols) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#d1c5b4]/80 space-y-6">
            {/* Visual Texture Display with Interactive Zoom */}
            <div className="relative rounded-2xl overflow-hidden h-64 sm:h-80 bg-[#1e1b17] group select-none">
              <img
                src={activeSwatch.textureImage}
                alt={activeSwatch.title}
                className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'group-hover:scale-105 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              {/* Specular Light Reflection Overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/20 pointer-events-none" />

              {/* Top Banner on image */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md text-white text-xs font-bold flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
                <span>{activeSwatch.title}</span>
              </div>

              {/* Bottom Hint */}
              <div className="absolute bottom-4 left-4 px-3 py-1 rounded-lg bg-black/60 backdrop-blur-md text-white/90 text-[11px] font-medium pointer-events-none">
                {isZoomed ? 'انقر للتصغير' : 'انقر على الصورة لتكبير الملمس الفعلي'}
              </div>
            </div>

            {/* Title & Description */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h3 className="text-xl sm:text-2xl font-bold text-[#1e1b17]">
                  {activeSwatch.title}
                </h3>
                <span className="text-xs font-bold text-[#775a19] bg-[#f4ede6] px-3 py-1 rounded-full border border-[#c5a059]/30">
                  شهادة جودة رسمية
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
                {activeSwatch.highlightText}
              </p>
            </div>

            {/* Technical Specs 4-Box Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#eee7e1]">
              {activeSwatch.specs.map((spec, i) => (
                <div key={i} className="p-3 rounded-xl bg-[#faf2ec] border border-[#f4ede6] text-right">
                  <span className="text-[11px] text-[#655e51] block">{spec.label}:</span>
                  <span className="text-xs sm:text-sm font-bold text-[#1e1b17] block mt-0.5">{spec.value}</span>
                </div>
              ))}
            </div>

            {/* Quick Action Button */}
            <div className="pt-2 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-[#576155] font-semibold">
                <Award className="w-4 h-4 text-[#c5a059]" />
                <span>ضمان كتابي موثق مع العقد لمدة {activeSwatch.guaranteeYears} سنوات</span>
              </div>

              {onSelectFinish && (
                <button
                  onClick={() => onSelectFinish(activeSwatch.title)}
                  className="px-5 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#775a19] text-[#4e3700] hover:text-white text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
                >
                  <span>طلب عينة مجانية للموقع</span>
                  <ArrowLeft className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
