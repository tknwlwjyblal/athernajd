import React from 'react';
import { ArrowLeft, MapPin, Clock, Phone, Shield } from 'lucide-react';
import { DevoraCreditBadge } from './DevoraLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
  onOpenBookingModal: () => void;
  onOpenAdminLogin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenBookingModal,
  onOpenAdminLogin,
}) => {
  const [copiedPhone, setCopiedPhone] = React.useState(false);
  return (
    <footer className="w-full bg-[#faf2ec] text-[#4e4639] border-t border-[#e8e1db]">
      {/* Final Aesthetic Closing Strip */}
      <div className="w-full py-6 sm:py-8 bg-[#f4ede6] border-b border-[#e8e1db]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-right">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a059]"></span>
            <span className="text-base sm:text-lg font-bold text-[#1e1b17]">
              أثر نجد — نحول الجدران إلى تحف معمارية تنبض بالسكينة
            </span>
          </div>
          <button
            onClick={onOpenBookingModal}
            className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-[#775a19] hover:text-[#1e1b17] transition-colors cursor-pointer"
          >
            <span>احجز موعدك اليوم دون انتظار</span>
            <ArrowLeft className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Footer Columns */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Col 1 (Span 4): About */}
          <div className="lg:col-span-4 flex flex-col space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold text-[#1e1b17]">
                أثر نجد للدهانات والديكورات
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
              رواد الحرفية المعمارية وتنسيق الجدران العصرية في مدينة الرياض. نصنع التوازن التام بين الدفء البيئي واللمسات التجريدية الفاخرة، معتمدين أحدث تقنيات الدهانات الديكورية وبدائل الرخام والخشب الطبيعي.
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-2 text-xs text-[#576155]">
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#f4ede6] text-[#5c655a] font-medium">
                سجل تجاري معتمد
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#f4ede6] text-[#5c655a] font-medium">
                ضمان جودة يصل لـ 10 سنوات
              </span>
            </div>
          </div>

          {/* Col 2 (Span 3): Certifications & Materials */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <span className="text-base font-bold text-[#1e1b17]">
              اعتمادات ومواد التشطيب
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                <span>دهانات جوتن العالمية (Jotun)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                <span>دهانات الجزيرة المعتمدة</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                <span>بدائل الرخام والخشب العصرية (PVC/WPC)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                <span>الميكروسمنت واللايم ووش الطبيعي</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059]"></span>
                <span>الفوم والبانوهات والزخارف الجبسية</span>
              </li>
            </ul>
          </div>

          {/* Col 3 (Span 2): Quick Links */}
          <div className="lg:col-span-2 flex flex-col space-y-3">
            <span className="text-base font-bold text-[#1e1b17]">
              روابط سريعة
            </span>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button
                  onClick={() => onNavigate('projects-showcase')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  معرض الفلل والقصور
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('services')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  دهانات داخلية وخارجية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('packages')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  باقات التشطيب السكني
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('calculator')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  حاسبة التكلفة الفورية
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('why-us')}
                  className="hover:text-[#775a19] transition-colors cursor-pointer"
                >
                  فريق العمل والمعايير
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenBookingModal}
                  className="hover:text-[#775a19] transition-colors cursor-pointer font-semibold text-[#775a19]"
                >
                  حجز موعد معاينة الموقع
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4 (Span 3): Location & Contact */}
          <div className="lg:col-span-3 flex flex-col space-y-3">
            <span className="text-base font-bold text-[#1e1b17]">
              التغطية والتواصل
            </span>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <p className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#775a19] mt-0.5 shrink-0" />
                <span>
                  المقر الرئيسي: الرياض، المملكة العربية السعودية (تغطية شاملة لكافة أحياء الرياض والمحافظات المحيطة)
                </span>
              </p>
              <p className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-[#775a19] shrink-0" />
                <span>ساعات الخدمة: السبت – الخميس ٨:٠٠ ص – ٩:٠٠ م</span>
              </p>
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#e8e1db]">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#775a19] shrink-0" />
                  <a
                    href="tel:0557821701"
                    className="font-bold font-mono text-xs sm:text-sm text-[#1e1b17] hover:text-[#775a19] tracking-wider"
                    dir="ltr"
                  >
                    055 782 1701
                  </a>
                </div>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText('0557821701');
                    setCopiedPhone(true);
                    setTimeout(() => setCopiedPhone(false), 2000);
                  }}
                  className="px-2.5 py-1 rounded-lg bg-[#faf2ec] hover:bg-[#f4ede6] text-[11px] font-bold text-[#775a19] cursor-pointer transition-colors"
                  title="نسخ رقم الجوال"
                >
                  {copiedPhone ? 'تم النسخ' : 'نسخ الرقم'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Rights Bar */}
        <div className="mt-12 pt-6 border-t border-[#e8e1db] flex flex-col lg:flex-row items-center justify-between gap-5 text-xs text-[#655e51]">
          <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4 text-center sm:text-right">
            <p>© 2025 أثر نجد للدهانات والديكورات. جميع الحقوق محفوظة.</p>
            <div className="flex items-center gap-3 text-[11px]">
              <span className="hover:text-[#1e1b17] transition-colors cursor-pointer">
                سياسة الخصوصية
              </span>
              <span>•</span>
              <span className="hover:text-[#1e1b17] transition-colors cursor-pointer">
                الشروط والأحكام
              </span>
              {onOpenAdminLogin && (
                <>
                  <span>•</span>
                  <button
                    onClick={onOpenAdminLogin}
                    className="hover:text-[#775a19] transition-colors cursor-pointer flex items-center gap-1 text-[#775a19] font-medium"
                  >
                    <Shield className="w-3.5 h-3.5" />
                    <span>دخول الإدارة</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* Devora Developer Logo & App Social Icons */}
          <DevoraCreditBadge />
        </div>
      </div>
    </footer>
  );
};
