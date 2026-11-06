import React from 'react';
import {
  Shield,
  Wrench,
  FileText,
  MapPin,
  Check,
  Star,
  Quote,
} from 'lucide-react';
import { TESTIMONIALS } from '../data/mockData';
import { TiltCard } from './TiltCard';
import { AnimatedCounter } from './AnimatedCounter';
import { ScrollReveal } from './ScrollReveal';

export const WhyAtharNajd: React.FC = () => {
  return (
    <section className="w-full py-12 sm:py-16 bg-[#fff8f3]" id="why-us">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Text & Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-[#775a19] text-xs sm:text-sm font-semibold">
                معايير لا نقبل المساومة عليها
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17] mt-1 mb-2">
                لماذا يختارنا أصحاب الفلل والقصور في الرياض؟
              </h2>
              <p className="text-sm sm:text-base text-[#4e4639] leading-relaxed">
                نعلم أن مسكنك هو ملاذك واستثمارك الأغلى، لذا نبتعد عن أساليب المقاولات التقليدية ونعتمد منظومة عمل واضحة تضمن راحة بالك من اليوم الأول.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <ScrollReveal delay={50} direction="up">
                <TiltCard maxTilt={6} className="h-full">
                  <div className="p-5 rounded-xl bg-[#faf2ec] border border-[#f4ede6] hover:border-[#c5a059]/50 transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg bg-[#c5a059] text-[#4e3700] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Shield className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#1e1b17] mb-1 group-hover:text-[#775a19] transition-colors">
                      خامات أصلية 100% موثقة
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
                      توريد مباشر من الشركات المصنعة المعتمدة مع إرفاق بطاقات المنشأ وشهادات الضمان.
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={100} direction="up">
                <TiltCard maxTilt={6} className="h-full">
                  <div className="p-5 rounded-xl bg-[#faf2ec] border border-[#f4ede6] hover:border-[#c5a059]/50 transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg bg-[#c5a059] text-[#4e3700] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <Wrench className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#1e1b17] mb-1 group-hover:text-[#775a19] transition-colors">
                      إشراف هندسي ومتابعة يومية
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
                      فريق من الفنيين المحترفين على كفالتنا، تحت إدارة مهندس ديكور يتابع الملاحظات خطوة بخطوة.
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={150} direction="up">
                <TiltCard maxTilt={6} className="h-full">
                  <div className="p-5 rounded-xl bg-[#faf2ec] border border-[#f4ede6] hover:border-[#c5a059]/50 transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg bg-[#c5a059] text-[#4e3700] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <FileText className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#1e1b17] mb-1 group-hover:text-[#775a19] transition-colors">
                      عقود رسمية وجداول واضحة
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
                      عقد مفصل يوضح البنود والأمتار بدقة مع جدول زمني محدد وشروط جزائية ملزمة لمواعيد التسليم.
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>

              <ScrollReveal delay={200} direction="up">
                <TiltCard maxTilt={6} className="h-full">
                  <div className="p-5 rounded-xl bg-[#faf2ec] border border-[#f4ede6] hover:border-[#c5a059]/50 transition-all h-full group">
                    <div className="w-10 h-10 rounded-lg bg-[#c5a059] text-[#4e3700] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-[#1e1b17] mb-1 group-hover:text-[#775a19] transition-colors">
                      معاينة ورفع مقاسات مجانية
                    </h4>
                    <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
                      نصلك إلى موقعك في أي حي من أحياء الرياض خلال 24 ساعة لرفع المقاسات وتقديم النصح الفني.
                    </p>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          </div>

          {/* Credibility Badge & Material Assurance Box */}
          <div className="lg:col-span-5">
            <div className="p-6 sm:p-8 rounded-2xl bg-white shadow-xl space-y-6 border border-[#d1c5b4]/50">
              <div className="flex items-center justify-between">
                <span className="text-lg sm:text-xl font-bold text-[#1e1b17]">
                  ميثاق الجودة والمطابقة
                </span>
                <span className="px-3 py-1 rounded-full bg-[#d8e3d4] text-[#5c655a] text-xs font-bold">
                  معتمد رسمياً
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f4ede6] flex items-center justify-center text-[#775a19] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1e1b17]">
                      طبقات الأساس والمعجون المشبع
                    </div>
                    <div className="text-xs text-[#4e4639] mt-0.5 leading-relaxed">
                      صنفرة ميكانيكية متقدمة بنظام شفط الغبار لضمان أسطح شديدة الاستواء والنعومة قبل دهان الوجه النهائي.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f4ede6] flex items-center justify-center text-[#775a19] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1e1b17]">
                      حماية الأرضيات والأثاث بالكامل
                    </div>
                    <div className="text-xs text-[#4e4639] mt-0.5 leading-relaxed">
                      تغطية كافة أرضيات الرخام والباركيه والنوافذ بطبقات كرتون مقوى وشاش حماية قبل مباشرة أي أعمال.
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-6 h-6 rounded-full bg-[#f4ede6] flex items-center justify-center text-[#775a19] shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-[#1e1b17]">
                      شهادة ضمان مكتوبة 10 سنوات
                    </div>
                    <div className="text-xs text-[#4e4639] mt-0.5 leading-relaxed">
                      تشمل ثبات درجات الألوان، عدم تشقق المعجون، وتماسك تكسيات بديل الخشب والرخام طوال فترة الضمان.
                    </div>
                  </div>
                </div>
              </div>

              {/* Rating Card */}
              <div className="p-4 rounded-xl bg-[#f4ede6] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#655e51] font-medium">معدل رضا العملاء المنفذ لهم</div>
                  <div className="text-base font-bold text-[#1e1b17]">99.4% تقييم ممتاز</div>
                </div>
                <div className="flex text-[#c5a059] gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-[#c5a059] text-[#c5a059]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Riyadh Client Testimonials Carousel/Cards */}
        <div className="mt-12 pt-8 border-t border-[#e8e1db]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg sm:text-xl font-bold text-[#1e1b17] flex items-center gap-2">
              <Quote className="w-5 h-5 text-[#775a19]" />
              <span>تجارب حية من أصحاب المشاريع المنفذة بالرياض</span>
            </h3>
            <span className="text-xs text-[#655e51]">أكثر من 850 عميل راضٍ</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {TESTIMONIALS.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-xl bg-white border border-[#eee7e1] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex text-[#c5a059] gap-0.5">
                      {[...Array(item.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#c5a059] text-[#c5a059]" />
                      ))}
                    </div>
                    <span className="text-[11px] text-[#655e51]">{item.date}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed mb-4">
                    "{item.comment}"
                  </p>
                </div>

                <div className="pt-3 border-t border-[#f4ede6] flex items-center justify-between">
                  <div>
                    <h5 className="font-bold text-[#1e1b17] text-xs sm:text-sm">{item.clientName}</h5>
                    <p className="text-[11px] text-[#655e51]">{item.propertyType} • {item.district}</p>
                  </div>
                  <span className="text-[10px] text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full font-medium">
                    مشروع موثق
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
