import React from 'react';
import { PhoneCall, Ruler, FileCheck, CheckCircle2 } from 'lucide-react';

export const ProcessSteps: React.FC = () => {
  const steps = [
    {
      num: '01',
      icon: <PhoneCall className="w-6 h-6 text-[#775a19]" />,
      title: 'طلب المعاينة والاستشارة',
      desc: 'تواصل معنا هاتفياً أو عبر النموذج لتحديد موعد يناسبك لزيارة موقعك بالرياض.',
      badge: 'خلال دقائق من طلبك',
    },
    {
      num: '02',
      icon: <Ruler className="w-6 h-6 text-[#775a19]" />,
      title: 'رفع المقاسات وتجربة العينات',
      desc: 'يقوم الفني برفع الأمتار وعرض كتالوجات الألوان والبدائل الحية تحت إضاءة مسكنك الطبيعية.',
      badge: 'خدمة مجانية 100%',
    },
    {
      num: '03',
      icon: <FileCheck className="w-6 h-6 text-[#775a19]" />,
      title: 'العقد واعتماد المواد',
      desc: 'عرض سعر تفصيلي شفاف وتوقيع العقد الرسمي مع تحديد تواريخ البداية ونهاية التسليم.',
      badge: 'عقد رسمي ملزم وموثق',
    },
    {
      num: '04',
      icon: <CheckCircle2 className="w-6 h-6 text-[#775a19]" />,
      title: 'التنفيذ والتسليم النظيف',
      desc: 'تنفيذ احترافي هادئ، إزالة كافة المخلفات والتنظيف الشامل، وتسليم شهادة الضمان المعتمدة.',
      badge: 'معاينة نهائية واستلام رسمي',
      highlight: true,
    },
  ];

  return (
    <section className="w-full py-12 sm:py-16 bg-[#faf2ec]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-10 sm:mb-14 space-y-2">
          <span className="text-xs sm:text-sm font-semibold text-[#775a19]">
            بساطة وشفافية مطلقة
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17]">
            رحلة تنفيذ مشروعك خطوة بخطوة
          </h2>
          <p className="text-sm sm:text-base text-[#4e4639]">
            من أول اتصال وحتى تسليم المفتاح بمظهر يفوق توقعاتك.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white shadow-xs relative flex flex-col justify-between border border-[#eee7e1] hover:border-[#c5a059]/50 transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span
                    className={`w-10 h-10 rounded-full font-bold text-base flex items-center justify-center ${
                      step.highlight
                        ? 'bg-[#c5a059] text-[#4e3700]'
                        : 'bg-[#f4ede6] text-[#1e1b17]'
                    }`}
                  >
                    {step.num}
                  </span>
                  <div>
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-base font-bold text-[#1e1b17] mb-2">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
                  {step.desc}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-[#f4ede6] text-[#576155] text-xs font-medium">
                {step.badge}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
