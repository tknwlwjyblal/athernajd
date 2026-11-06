import React, { useState, useEffect } from 'react';
import { Phone, Copy, Check, MessageCircle, Clock, User, Send } from 'lucide-react';

interface ConsultationFormProps {
  initialService?: string;
  initialEstimate?: {
    propertyType: string;
    area: number;
    selectedServices: string[];
    tier: string;
  } | null;
}

export const ConsultationForm: React.FC<ConsultationFormProps> = ({
  initialService,
  initialEstimate,
}) => {
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [requestedWork, setRequestedWork] = useState<string>('دهانات داخلية وبديل رخام وخشب');
  const [copiedPhone, setCopiedPhone] = useState<boolean>(false);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    if (initialEstimate) {
      const servicesStr = initialEstimate.selectedServices.join(' + ');
      setRequestedWork(`تشطيب ${initialEstimate.propertyType} بمساحة تقريبية ${initialEstimate.area} م² (${servicesStr})`);
    } else if (initialService) {
      setRequestedWork(initialService);
    }
  }, [initialEstimate, initialService]);

  const handleCopyPhone = () => {
    navigator.clipboard.writeText('0557821701');
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientPhone.trim()) return;

    const message = `السلام عليكم ورحمة الله وبركاته،
أرغب في حجز موعد معاينة ميدانية مجانية لموقعي بالرياض مع «أثر نجد»:

- اسم العميل: ${clientName}
- رقم الجوال: ${clientPhone}
- المطلوب شغله: ${requestedWork || 'معاينة عامة وتشطيب ديكور'}

أرجو التكرم بالتواصل لتأكيد موعد الزيارة وعرض كتالوجات العينات الحية بالموقع. شكراً لكم.`;

    const whatsappUrl = `https://wa.me/966557821701?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsSubmitted(true);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#fff8f3]" id="consultation-form">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="rounded-3xl bg-[#faf2ec] p-6 sm:p-10 lg:p-14 shadow-xl border border-[#e8e1db]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Form Header & Direct Phone Call CTA (Span 5) */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
              <div>
                <span className="px-4 py-1.5 rounded-full bg-[#f4ede6] text-[#775a19] text-xs sm:text-sm font-bold inline-flex items-center gap-1.5 shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#c5a059]"></span>
                  <span>استجابة فورية خلال دقائق</span>
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17] mt-3 mb-2">
                  احصل على استشارة ومعاينة مجانية لمشروعك
                </h2>
                <p className="text-sm sm:text-base text-[#4e4639] leading-relaxed">
                  فريقنا الهندسي جاهز لزيارة موقعك بالرياض، ورفع المقاسات بدقة، وعرض كتالوجات الألوان والبدائل الحية بدون أي التزام مالي.
                </p>
              </div>

              {/* Direct Contact Card with Correct LTR Phone Layout */}
              <div className="p-6 rounded-2xl bg-white shadow-xs space-y-4 border border-[#eee7e1]">
                <div className="text-base font-bold text-[#1e1b17]">
                  تواصل فورياً مع المهندس المسؤول:
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-[#faf2ec]/60 border border-[#eee7e1]">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-[#f4ede6] flex items-center justify-center text-[#775a19] shrink-0">
                      <Phone className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="text-xs text-[#655e51]">الاتصال الهاتفي المباشر</div>
                      <a
                        className="text-lg font-bold text-[#1e1b17] hover:text-[#775a19] transition-colors font-mono inline-block text-left"
                        href="tel:0557821701"
                        dir="ltr"
                      >
                        055 782 1701
                      </a>
                    </div>
                  </div>

                  <button
                    onClick={handleCopyPhone}
                    className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#f4ede6] text-xs font-semibold text-[#775a19] border border-[#d1c5b4] transition-all flex items-center gap-1 cursor-pointer"
                    title="نسخ رقم الجوال"
                  >
                    {copiedPhone ? (
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                    <span>{copiedPhone ? 'تم النسخ' : 'نسخ'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-4 p-3 rounded-xl bg-[#d8e3d4]/40 border border-[#d8e3d4]">
                  <div className="w-12 h-12 rounded-xl bg-[#d8e3d4] flex items-center justify-center text-[#5c655a] shrink-0">
                    <MessageCircle className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs text-[#655e51]">محادثة واتساب سريعة</div>
                    <a
                      className="text-sm font-bold text-[#1e1b17] hover:text-[#775a19] transition-colors"
                      href="https://wa.me/966557821701"
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      إرسال مخطط أو صور الموقع مباشرة
                    </a>
                  </div>
                </div>

                <div className="pt-2 text-[#655e51] text-xs flex items-center gap-1.5 border-t border-[#f4ede6]">
                  <Clock className="w-4 h-4 text-[#775a19]" />
                  <span>فريق الاستشارات متواجد 7 أيام في الأسبوع</span>
                </div>
              </div>
            </div>

            {/* The Simplified Form (Span 7): Name, Phone, and Required Work */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-[#e8e1db]">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="border-b border-[#eee7e1] pb-3 mb-2 flex items-center justify-between">
                      <h3 className="text-lg font-bold text-[#1e1b17]">
                        طلب المعاينة الميدانية السريعة
                      </h3>
                      <span className="text-xs text-[#775a19] font-medium bg-[#f4ede6] px-3 py-1 rounded-full">
                        مجانية بالكامل
                      </span>
                    </div>

                    {/* 1. Client Name */}
                    <div>
                      <label
                        className="block text-sm font-bold text-[#1e1b17] mb-2"
                        htmlFor="client_name"
                      >
                        اسم العميل الكريم <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute right-3.5 top-3.5 text-[#775a19] w-5 h-5 pointer-events-none" />
                        <input
                          id="client_name"
                          type="text"
                          required
                          value={clientName}
                          onChange={(e) => setClientName(e.target.value)}
                          placeholder="مثال: صالح علي"
                          className="w-full pr-11 pl-4 py-3 rounded-xl bg-[#faf2ec] text-[#1e1b17] text-sm font-medium outline-none focus:ring-2 focus:ring-[#c5a059] transition-all border border-transparent"
                        />
                      </div>
                    </div>

                    {/* 2. Client Phone */}
                    <div>
                      <label
                        className="block text-sm font-bold text-[#1e1b17] mb-2"
                        htmlFor="client_phone"
                      >
                        رقم الجوال أو الواتساب <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Phone className="absolute right-3.5 top-3.5 text-[#775a19] w-5 h-5 pointer-events-none" />
                        <input
                          id="client_phone"
                          type="tel"
                          required
                          value={clientPhone}
                          onChange={(e) => setClientPhone(e.target.value)}
                          placeholder="0557821701"
                          dir="ltr"
                          className="w-full pr-11 pl-4 py-3 rounded-xl bg-[#faf2ec] text-[#1e1b17] text-sm font-medium outline-none focus:ring-2 focus:ring-[#c5a059] transition-all border border-transparent text-right font-mono"
                        />
                      </div>
                      <span className="text-[11px] text-[#655e51] mt-1 block">
                        أدخل رقمك للتواصل وتأكيد موعد وصول المهندس للموقع
                      </span>
                    </div>

                    {/* 3. Requested Work / المطلوب شغله */}
                    <div>
                      <label
                        className="block text-sm font-bold text-[#1e1b17] mb-2"
                        htmlFor="requested_work"
                      >
                        المطلوب شغله <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <textarea
                          id="requested_work"
                          required
                          rows={3}
                          value={requestedWork}
                          onChange={(e) => setRequestedWork(e.target.value)}
                          placeholder="مثال: دهانات صالة ومجلس، جدارية شاشة بديل رخام وخشب، استغلال مساحة تحت الدرج..."
                          className="w-full p-3.5 rounded-xl bg-[#faf2ec] text-[#1e1b17] text-sm font-medium outline-none focus:ring-2 focus:ring-[#c5a059] transition-all border border-transparent leading-relaxed"
                        />
                      </div>

                      {/* Quick chips for easy selection */}
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {[
                          'دهانات داخلية جوتن',
                          'بديل رخام وبديل خشب',
                          'ديكور شاشة TV Wall',
                          'جبس بورد وليد بروفايل',
                          'استغلال مساحة تحت الدرج',
                          'تشطيب كامل للفيلا',
                        ].map((chip) => (
                          <button
                            key={chip}
                            type="button"
                            onClick={() => {
                              if (!requestedWork || requestedWork.includes('دهانات داخلية وبديل رخام وخشب')) {
                                setRequestedWork(chip);
                              } else if (!requestedWork.includes(chip)) {
                                setRequestedWork(`${requestedWork} + ${chip}`);
                              }
                            }}
                            className="px-2.5 py-1 rounded-lg bg-[#f4ede6] hover:bg-[#e8e1db] text-[#4e4639] text-xs font-medium transition-colors cursor-pointer"
                          >
                            + {chip}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-3">
                      <button
                        type="submit"
                        className="w-full py-4 px-6 rounded-xl bg-[#c5a059] hover:bg-[#e9c176] text-[#4e3700] font-bold text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                      >
                        <span>تأكيد الطلب ودخول الواتساب فوراً</span>
                        <Send className="w-5 h-5" />
                      </button>
                      <p className="text-center text-xs text-[#655e51] mt-2.5">
                        لا يترتب على هذا الطلب أي التزام مالي. المعاينة وتقديم النصح الفني مجانية بالكامل.
                      </p>
                    </div>
                  </form>
                ) : (
                  /* Success Confirmation Screen */
                  <div className="py-8 px-4 text-center space-y-5 animate-fadeIn">
                    <div className="w-16 h-16 rounded-full bg-[#d8e3d4] text-[#5c655a] flex items-center justify-center mx-auto shadow-inner text-3xl font-bold">
                      ✓
                    </div>

                    <div>
                      <h3 className="text-2xl font-bold text-[#1e1b17] mb-2">
                        تم تحويل طلبكم بنجاح يا {clientName}!
                      </h3>
                      <p className="text-sm text-[#4e4639] max-w-md mx-auto leading-relaxed">
                        تم تجهيز تفاصيل طلبك: <span className="font-bold text-[#775a19]">«{requestedWork}»</span> وفتح محادثة الواتساب للتنسيق مع المهندس المختص.
                      </p>
                    </div>

                    <div className="p-4 bg-[#f4ede6] rounded-xl max-w-md mx-auto text-xs text-[#4e4639] space-y-2 text-right">
                      <div className="flex justify-between border-b border-[#e8e1db] pb-1.5">
                        <span className="text-[#655e51]">اسم العميل:</span>
                        <span className="font-bold">{clientName}</span>
                      </div>
                      <div className="flex justify-between border-b border-[#e8e1db] pb-1.5">
                        <span className="text-[#655e51]">رقم التواصل:</span>
                        <span className="font-mono font-bold" dir="ltr">{clientPhone}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-[#655e51]">المطلوب شغله:</span>
                        <span className="font-bold text-[#775a19]">{requestedWork}</span>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                      <a
                        href={`https://wa.me/966557821701?text=${encodeURIComponent(
                          `السلام عليكم ورحمة الله وبركاته،\nأرغب في حجز موعد معاينة ميدانية مجانية لموقعي بالرياض مع «أثر نجد»:\n\n- اسم العميل: ${clientName}\n- رقم الجوال: ${clientPhone}\n- المطلوب شغله: ${requestedWork}\n\nأرجو التكرم بالتواصل لتأكيد موعد الزيارة وعرض كتالوجات العينات الحية بالموقع. شكراً لكم.`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#25D366] text-white text-sm font-bold shadow-md hover:bg-[#20ba59] transition-all"
                      >
                        <MessageCircle className="w-5 h-5" />
                        <span>فتح محادثة الواتساب الآن</span>
                      </a>
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-5 py-3 rounded-xl bg-[#faf2ec] text-[#4e4639] text-xs sm:text-sm font-semibold hover:bg-[#f4ede6] transition-colors"
                      >
                        تقديم طلب آخر
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
