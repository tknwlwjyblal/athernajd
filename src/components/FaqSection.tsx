import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { FAQS } from '../data/mockData';

export const FaqSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#fff8f3]" id="contact">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs sm:text-sm font-semibold text-[#775a19] px-4 py-1 rounded-full bg-[#f4ede6]">
            إجابات واضحة لراحة بالك
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#1e1b17]">
            الأسئلة الشائعة حول أعمال التشطيب
          </h2>
          <p className="text-xs sm:text-sm text-[#4e4639]">
            كل ما ترغب بمعرفته قبل البدء بتنفيذ مشروعك السكني مع «أثر نجد».
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS.map((faq, i) => (
            <div
              key={i}
              className="rounded-xl bg-white border border-[#e8e1db] overflow-hidden transition-all shadow-xs"
            >
              <button
                onClick={() => toggle(i)}
                className="w-full p-4 sm:p-5 text-right flex items-center justify-between gap-4 cursor-pointer hover:bg-[#faf2ec]/50 transition-colors"
              >
                <span className="font-bold text-sm sm:text-base text-[#1e1b17]">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-[#775a19] transition-transform duration-200 shrink-0 ${
                    openIdx === i ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {openIdx === i && (
                <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-[#4e4639] leading-relaxed border-t border-[#f4ede6] pt-3 animate-fadeIn">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
