import React, { useState, useEffect } from 'react';
import { Calendar, X, ArrowLeft } from 'lucide-react';
import { PHONE_NUMBER, FORMATTED_PHONE } from '../data/mockData';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetTopic?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  presetTopic = '',
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [requestedWork, setRequestedWork] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [whatsappLink, setWhatsappLink] = useState('');

  useEffect(() => {
    if (presetTopic) {
      setRequestedWork(presetTopic);
    } else {
      setRequestedWork('دهانات ديكورية وبديل رخام وخشب');
    }
  }, [presetTopic, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !phone.trim()) return;

    const message = `السلام عليكم ورحمة الله وبركاته،
تحية طيبة لإدارة ومهندسي «أثر نجد للدهانات والديكورات»،

أرغب في تأكيد طلب موعد معاينة موقعي بالرياض:
- اسم العميل: ${name}
- رقم الجوال: ${phone}
- المطلوب شغله: ${requestedWork || 'تنفيذ دهانات وديكورات جدارية'}

أرجو التكرم بالتواصل لتنسيق موعد الزيارة وعرض كتالوجات العينات الحية. شكراً لكم.`;

    const url = `https://wa.me/966557821701?text=${encodeURIComponent(message)}`;
    setWhatsappLink(url);

    // Open WhatsApp immediately
    window.open(url, '_blank');
    setSubmitted(true);
  };

  const handleReset = () => {
    setSubmitted(false);
    setName('');
    setPhone('');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1b17]/70 backdrop-blur-sm animate-fadeIn">
      <div
        className="bg-[#fff8f3] rounded-2xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#d1c5b4] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-[#e8e1db]">
          <div className="flex items-center gap-2">
            <Calendar className="w-6 h-6 text-[#775a19]" />
            <h3 className="text-lg sm:text-xl font-bold text-[#1e1b17]">
              تأكيد موعد المعاينة والاستشارة
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-[#f4ede6] hover:bg-[#e8e1db] text-[#1e1b17] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="mt-5 space-y-4">
            <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
              يرجى تزويدنا ببياناتكم للتواصل الفوري ودخول الواتساب لتأكيد الموعد مع المهندس المختص.
            </p>

            {/* 1. اسم العميل */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1e1b17] mb-1.5">
                اسم العميل <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="مثال: خالد العتيبي"
                className="w-full px-4 py-3 rounded-xl bg-white text-sm text-[#1e1b17] border border-[#d1c5b4]/80 outline-none focus:ring-2 focus:ring-[#c5a059] transition-all"
              />
            </div>

            {/* 2. رقم الجوال */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1e1b17] mb-1.5">
                رقم الجوال <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="055XXXXXXX"
                className="w-full px-4 py-3 rounded-xl bg-white text-sm text-[#1e1b17] border border-[#d1c5b4]/80 outline-none focus:ring-2 focus:ring-[#c5a059] font-mono tracking-wider transition-all text-right"
                dir="ltr"
              />
            </div>

            {/* 3. المطلوب شغله */}
            <div>
              <label className="block text-xs sm:text-sm font-bold text-[#1e1b17] mb-1.5">
                المطلوب شغله <span className="text-red-500">*</span>
              </label>
              <textarea
                required
                rows={3}
                value={requestedWork}
                onChange={(e) => setRequestedWork(e.target.value)}
                placeholder="مثال: دهانات مجالس وصالات، بديل رخام للشاشة، تكسيات بديل خشب مع إضاءة مخفية..."
                className="w-full px-4 py-3 rounded-xl bg-white text-sm text-[#1e1b17] border border-[#d1c5b4]/80 outline-none focus:ring-2 focus:ring-[#c5a059] resize-none transition-all leading-relaxed"
              />
            </div>

            {/* زر التأكيد والدخول للواتساب */}
            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-bold text-sm sm:text-base shadow-lg hover:shadow-xl transition-all cursor-pointer flex items-center justify-center gap-2 group active:scale-95"
              >
                <span>تأكيد الموعد وإرسال عبر الواتساب</span>
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              </button>
              <div className="text-center mt-2.5 text-[11px] text-[#655e51]">
                سيتم فتح الواتساب تلقائياً برسالة التفاصيل كاملة
              </div>
            </div>
          </form>
        ) : (
          <div className="py-6 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#25D366]/20 text-[#25D366] flex items-center justify-center mx-auto text-3xl font-bold">
              ✓
            </div>
            <h4 className="text-lg sm:text-xl font-bold text-[#1e1b17]">
              تم تأكيد الطلب بنجاح
            </h4>
            <p className="text-xs sm:text-sm text-[#4e4639] max-w-sm mx-auto leading-relaxed">
              إذا لم يفتح الواتساب تلقائياً، يمكنك الضغط على الزر أدناه لإرسال التفاصيل مباشرة إلى المهندس المختص:
            </p>

            <div className="pt-2 flex flex-col gap-2.5">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-4 rounded-xl bg-[#25D366] text-white font-bold text-sm shadow-md hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2"
              >
                <span>فتح محادثة الواتساب الآن</span>
              </a>

              <a
                href={`tel:${PHONE_NUMBER}`}
                className="w-full py-3 px-4 rounded-xl bg-white border border-[#d1c5b4] text-[#1e1b17] font-bold text-xs hover:bg-[#faf2ec] transition-all flex items-center justify-center gap-2"
              >
                <span>الاتصال المباشر: {FORMATTED_PHONE}</span>
              </a>

              <button
                onClick={handleReset}
                className="text-xs text-[#775a19] font-semibold underline mt-2 cursor-pointer"
              >
                إغلاق النافذة
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
