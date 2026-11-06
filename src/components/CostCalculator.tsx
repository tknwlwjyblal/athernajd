import React, { useState } from 'react';
import { Check, Wrench, Clock, ShieldCheck, ArrowLeft, MessageCircle } from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../data/mockData';

interface CostCalculatorProps {
  onBookWithEstimate: (estimateDetails: {
    propertyType: string;
    area: number;
    selectedServices: string[];
    tier: string;
  }) => void;
}

export const CostCalculator: React.FC<CostCalculatorProps> = ({
  onBookWithEstimate,
}) => {
  const [propertyType, setPropertyType] = useState<string>('فيلا سكنية');
  const [area, setArea] = useState<number>(140);
  const [tier, setTier] = useState<'standard' | 'luxury' | 'royal'>('luxury');
  const [services, setServices] = useState<{ [key: string]: boolean }>({
    paint: true,
    woodMarble: true,
    tvUnit: true,
    ledProfile: false,
    underStair: false,
    microcement: false,
  });

  const toggleService = (key: string) => {
    setServices((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateEstimate = () => {
    const estimatedDays = Math.max(
      3,
      Math.round(area / 28 + (services.tvUnit ? 1 : 0) + (services.underStair ? 2 : 0))
    );

    const warrantyYears = tier === 'royal' || tier === 'luxury' ? 10 : 5;

    return { estimatedDays, warrantyYears };
  };

  const { estimatedDays, warrantyYears } = calculateEstimate();

  const getSelectedServiceNames = () => {
    const list: string[] = [];
    if (services.paint) list.push('دهانات داخلية وجوتن ناعم');
    if (services.woodMarble) list.push('بديل رخام وبديل خشب');
    if (services.tvUnit) list.push('جدارية شاشة تلفزيون (TV Unit)');
    if (services.ledProfile) list.push('ليد بروفايل وأسقف جبس');
    if (services.underStair) list.push('استغلال مساحة تحت الدرج');
    if (services.microcement) list.push('مايكروسمنت ولايم ووش');
    return list;
  };

  const tierLabels = {
    standard: 'تنفيذ كلاسيكي راقٍ',
    luxury: 'تشطيب فندقي فاخر (الأكثر طلباً)',
    royal: 'تشطيب قصور ملكي VIP',
  };

  const handleWhatsAppShare = () => {
    const serviceListStr = getSelectedServiceNames().join('، ');
    const text = encodeURIComponent(
      `السلام عليكم ورحمة الله وبركاته،\nتحية طيبة لفريق «أثر نجد للدهانات والديكورات»،\n\nأرغب في حجز معاينة ميدانية مجانية ورفع مقاسات لموقعي بالرياض:\n- نوع العقار: ${propertyType}\n- المساحة التقديرية: ${area} م²\n- مستوى الخامات: ${tierLabels[tier]}\n- الخدمات المطلوبة: ${serviceListStr}\n- مدة التنفيذ المقدرة: ${estimatedDays} أيام عمل\n\nأرجو التكرم بالتواصل لتنسيق موعد الزيارة وعرض العينات الحية بالموقع. شكراً لكم.`
    );
    window.open(`https://wa.me/966557821701?text=${text}`, '_blank');
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#faf2ec]" id="calculator">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <span className="text-xs sm:text-sm font-semibold text-[#775a19] px-4 py-1 rounded-full bg-[#f4ede6]">
            أداة تحديد نطاق ومواصفات المشروع
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17]">
            محدد مواصفات التشطيب والديكور بالرياض
          </h2>
          <p className="text-sm sm:text-base text-[#4e4639]">
            حدد معايير ومساحة مسكنك لمعرفة مدة التنفيذ المقدرة، الخامات الموصى بها، والضمان المعتمد لمشروعك.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Controls Form (Span 7) */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-[#e8e1db] space-y-6">
            {/* 1. Property Type */}
            <div>
              <label className="block text-sm font-bold text-[#1e1b17] mb-2.5">
                ١. نوع العقار
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {['فيلا سكنية', 'شقة / دور', 'مجلس استقبال', 'مقر تجاري'].map(
                  (type) => (
                    <button
                      key={type}
                      type="button"
                      onClick={() => setPropertyType(type)}
                      className={`p-3 text-xs sm:text-sm font-semibold rounded-xl transition-all cursor-pointer ${
                        propertyType === type
                          ? 'bg-[#c5a059] text-[#4e3700] shadow-xs'
                          : 'bg-[#faf2ec] text-[#4e4639] hover:bg-[#f4ede6]'
                      }`}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* 2. Area Slider */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-bold text-[#1e1b17]">
                  ٢. المساحة الإجمالية للجدران أو الغرف
                </label>
                <div className="flex items-center gap-1 font-bold text-base text-[#775a19] bg-[#f4ede6] px-3 py-1 rounded-lg">
                  <span>{area}</span>
                  <span className="text-xs">متر مربع (م²)</span>
                </div>
              </div>

              <input
                type="range"
                min="30"
                max="500"
                step="10"
                value={area}
                onChange={(e) => setArea(Number(e.target.value))}
                className="w-full h-2 bg-[#f4ede6] rounded-lg appearance-none cursor-pointer accent-[#c5a059]"
              />
              <div className="flex justify-between text-[11px] text-[#655e51] mt-1.5 font-mono">
                <span>30 م² (غرفة أو مجلس)</span>
                <span>250 م² (دور كامل)</span>
                <span>500 م² (فيلا كاملة)</span>
              </div>
            </div>

            {/* 3. Decorative Treatments */}
            <div>
              <label className="block text-sm font-bold text-[#1e1b17] mb-2.5">
                ٣. الخدمات والعناصر المطلوب تنفيذها
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {[
                  {
                    key: 'paint',
                    label: 'دهانات داخلية وجوتن ناعم',
                    sub: 'معالجة وصنفرة ودهان وجهين',
                  },
                  {
                    key: 'woodMarble',
                    label: 'بديل رخام وبديل خشب WPC',
                    sub: 'تكسيات جدارية مضلعة وعروق رخام',
                  },
                  {
                    key: 'tvUnit',
                    label: 'جدارية شاشة تلفزيون TV Unit',
                    sub: 'إخفاء أسلاك ورفوف مضيئة مدمجة',
                  },
                  {
                    key: 'ledProfile',
                    label: 'ليد بروفايل وأسقف جبس بورد',
                    sub: 'إنارة خطية مخفية وزوايا ليزرية',
                  },
                  {
                    key: 'underStair',
                    label: 'استغلال مساحة تحت الدرج',
                    sub: 'خزائن مدمجة أو حديقة داخلية',
                  },
                  {
                    key: 'microcement',
                    label: 'مايكروسمنت / لايم ووش إيطالي',
                    sub: 'ملمس ناعم تجريدي بدون فواصل',
                  },
                ].map((item) => (
                  <button
                    key={item.key}
                    type="button"
                    onClick={() => toggleService(item.key)}
                    className={`p-3 rounded-xl text-right transition-all flex items-start gap-2.5 border cursor-pointer ${
                      services[item.key]
                        ? 'bg-[#fff8f3] border-[#c5a059] shadow-xs'
                        : 'bg-[#faf2ec]/60 border-transparent hover:bg-[#faf2ec]'
                    }`}
                  >
                    <div
                      className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center shrink-0 ${
                        services[item.key]
                          ? 'bg-[#c5a059] text-white'
                          : 'border border-[#d1c5b4] bg-white'
                      }`}
                    >
                      {services[item.key] && (
                        <Check className="w-3 h-3 stroke-[3]" />
                      )}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-[#1e1b17]">
                        {item.label}
                      </div>
                      <div className="text-[11px] text-[#655e51]">
                        {item.sub}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* 4. Tier Selection */}
            <div>
              <label className="block text-sm font-bold text-[#1e1b17] mb-2">
                ٤. مستوى الخامات والتشطيب
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                {[
                  {
                    id: 'standard',
                    label: 'كلاسيكي راقٍ',
                    desc: 'خامات معتمدة وضمان 5 سنوات',
                  },
                  {
                    id: 'luxury',
                    label: 'فندقي فاخر',
                    desc: 'المستوى الأكثر طلباً + ضمان 10 سنوات',
                  },
                  {
                    id: 'royal',
                    label: 'قصور ملكي VIP',
                    desc: 'مواد نخبوية وإشراف يومي مقيم',
                  },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setTier(t.id as any)}
                    className={`p-3 rounded-xl text-right transition-all cursor-pointer border ${
                      tier === t.id
                        ? 'bg-[#fff8f3] border-[#c5a059] shadow-xs'
                        : 'bg-[#faf2ec] border-transparent hover:bg-[#f4ede6]'
                    }`}
                  >
                    <div className="text-xs font-bold text-[#1e1b17]">
                      {t.label}
                    </div>
                    <div className="text-[10px] text-[#655e51] mt-0.5">
                      {t.desc}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Result Card (Span 5) - NO monetary price */}
          <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-[#c5a059]/40 space-y-6 sticky top-28">
            <div className="flex items-center justify-between pb-4 border-b border-[#eee7e1]">
              <span className="text-sm font-bold text-[#775a19] flex items-center gap-1.5">
                <Wrench className="w-4 h-4" />
                <span>النطاق الفني الموصى به لمشروعك</span>
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-[#d8e3d4] text-[#5c655a] font-semibold">
                معاينة مجانية 100%
              </span>
            </div>

            <div className="p-4 bg-[#fff8f3] rounded-xl border border-[#c5a059]/30 text-center space-y-2">
              <span className="text-xs text-[#655e51] block">
                مستوى التنفيذ المقترح
              </span>
              <div className="text-xl sm:text-2xl font-bold text-[#775a19]">
                {tierLabels[tier]}
              </div>
              <p className="text-xs text-[#4e4639] leading-relaxed">
                يتم تحديد التسعير المالي الدقيق بعد المعاينة الميدانية المجانية ورفع الأمتار بالموقع بدون أي التزام مالي.
              </p>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-[#faf2ec] rounded-xl text-xs">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#775a19] shadow-2xs">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#655e51] text-[11px]">مدة التنفيذ المقدرة</div>
                  <div className="font-bold text-[#1e1b17]">{estimatedDays} أيام عمل</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#775a19] shadow-2xs">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[#655e51] text-[11px]">فترة الضمان المعتمد</div>
                  <div className="font-bold text-[#1e1b17]">{warrantyYears} سنوات رسمية</div>
                </div>
              </div>
            </div>

            {/* Scope Summary */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between py-1.5 border-b border-[#f4ede6]">
                <span className="text-[#655e51]">نوع العقار:</span>
                <span className="font-bold text-[#1e1b17]">{propertyType}</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f4ede6]">
                <span className="text-[#655e51]">المساحة المقدرة:</span>
                <span className="font-bold text-[#1e1b17]">{area} متر مربع</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f4ede6]">
                <span className="text-[#655e51]">فريق العمل المخصص:</span>
                <span className="font-bold text-[#775a19]">مهندس موقع مقيم + فنيين معتمدين</span>
              </div>
              <div className="flex justify-between py-1.5 border-b border-[#f4ede6]">
                <span className="text-[#655e51]">حماية الأثاث والأرضيات:</span>
                <span className="font-bold text-[#576155]">تغطية كاملة معتمدة مجانية</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                onClick={() =>
                  onBookWithEstimate({
                    propertyType,
                    area,
                    selectedServices: getSelectedServiceNames(),
                    tier: tierLabels[tier],
                  })
                }
                className="w-full py-3.5 px-4 rounded-xl bg-[#c5a059] text-[#4e3700] hover:bg-[#e9c176] font-bold text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
              >
                <span>حجز موعد معاينة مجانية وتسعير موقعك</span>
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={handleWhatsAppShare}
                className="w-full py-3 px-4 rounded-xl bg-[#25D366] text-white hover:bg-[#20ba59] font-bold text-xs sm:text-sm shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>إرسال المواصفات للمهندس عبر الواتساب</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
