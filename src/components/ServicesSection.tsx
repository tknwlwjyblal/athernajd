import React, { useState } from 'react';
import {
  Paintbrush,
  Layers,
  Tv,
  Lightbulb,
  Maximize2,
  Building,
  CheckCircle2,
  Info,
  X,
  ShieldCheck,
  ArrowLeft,
} from 'lucide-react';
import { Service } from '../types';
import { SERVICES } from '../data/mockData';
import { TiltCard } from './TiltCard';
import { ScrollReveal } from './ScrollReveal';
import { soundEngine } from '../utils/audioEffects';

interface ServicesSectionProps {
  onSelectServiceForBooking: (serviceName: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const renderServiceIcon = (id: string, className = 'w-7 h-7') => {
    switch (id) {
      case 's1':
        return <Paintbrush className={className} />;
      case 's2':
        return <Layers className={className} />;
      case 's3':
        return <Tv className={className} />;
      case 's4':
        return <Lightbulb className={className} />;
      case 's5':
        return <Maximize2 className={className} />;
      case 's6':
        return <Building className={className} />;
      default:
        return <Paintbrush className={className} />;
    }
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#faf2ec]" id="services">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 sm:mb-12 gap-4">
          <div>
            <span className="text-[#775a19] text-xs sm:text-sm font-semibold tracking-wide">
              حلول تشطيب متكاملة
            </span>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#1e1b17] mt-1">
              خدماتنا التخصصية للديكور الداخلي
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-[#4e4639] max-w-md leading-relaxed">
            نجمع بين رقي المظهر وجودة الخامات واستدامة التنفيذ، مع ضمان 10 سنوات على كافة البنود.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, idx) => (
            <ScrollReveal key={service.id} delay={idx * 80} direction="up">
              <TiltCard maxTilt={6} className="h-full">
                <div className="p-6 sm:p-7 rounded-2xl bg-white shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between border border-[#eee7e1] hover:border-[#c5a059]/60 group h-full">
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-[#f4ede6] flex items-center justify-center text-[#775a19] mb-5 group-hover:bg-[#c5a059] group-hover:text-white transition-all group-hover:scale-105 duration-300">
                      {renderServiceIcon(service.id, 'w-7 h-7')}
                    </div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#1e1b17] mb-2.5 group-hover:text-[#775a19] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed mb-4">
                      {service.shortDesc}
                    </p>
                  </div>

                  <div>
                    <div className="pt-3 border-t border-[#f4ede6] flex items-center justify-between text-[#775a19] text-xs font-semibold mb-3">
                      <span>{service.badge}</span>
                      <CheckCircle2 className="w-4 h-4" />
                    </div>

                    <button
                      onClick={() => {
                        soundEngine.playChime();
                        setSelectedService(service);
                      }}
                      data-interactive="true"
                      data-cursor-action="استكشف"
                      className="w-full py-2.5 px-3 rounded-lg bg-[#faf2ec] hover:bg-[#c5a059] text-xs font-bold text-[#4e4639] hover:text-[#4e3700] transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-xs active:scale-95"
                    >
                      <Info className="w-3.5 h-3.5 text-[#775a19]" />
                      <span>المواصفات وخيارات التنفيذ</span>
                    </button>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>

      {/* Service Detail Modal */}
      {selectedService && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#1e1b17]/70 backdrop-blur-sm animate-fadeIn">
          <div
            className="bg-[#fff8f3] rounded-2xl max-w-xl w-full p-6 sm:p-7 shadow-2xl border border-[#d1c5b4] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#e8e1db]">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-[#c5a059] text-white flex items-center justify-center">
                  {renderServiceIcon(selectedService.id, 'w-6 h-6')}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-[#1e1b17]">
                    {selectedService.title}
                  </h3>
                  <span className="text-xs text-[#775a19] font-medium">
                    {selectedService.badge}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setSelectedService(null)}
                className="w-8 h-8 rounded-full bg-[#f4ede6] hover:bg-[#e8e1db] text-[#1e1b17] flex items-center justify-center cursor-pointer transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-sm text-[#4e4639] leading-relaxed mb-4">
              {selectedService.fullDesc}
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <h5 className="text-xs font-bold text-[#1e1b17] mb-2 flex items-center gap-1 text-right">
                  <ShieldCheck className="w-4 h-4 text-[#775a19]" />
                  <span>مميزات التنفيذ المعتمدة:</span>
                </h5>
                <ul className="space-y-1.5 text-xs text-[#4e4639]">
                  {selectedService.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c5a059] mt-1.5 shrink-0"></span>
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-3 bg-[#f4ede6] rounded-xl">
                <span className="text-[11px] font-bold text-[#655e51] block mb-1.5">
                  أبرز المواد والماركات المعتمدة:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {selectedService.materialsUsed.map((mat, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-0.5 rounded-md bg-white text-[11px] text-[#576155] font-mono"
                    >
                      {mat}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => {
                  const serviceName = selectedService.title;
                  setSelectedService(null);
                  onSelectServiceForBooking(serviceName);
                }}
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#c5a059] text-[#4e3700] hover:bg-[#e9c176] text-xs sm:text-sm font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-1.5"
              >
                <span>طلب معاينة لهذه الخدمة</span>
                <ArrowLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setSelectedService(null)}
                className="py-2.5 px-4 rounded-xl bg-[#faf2ec] text-[#4e4639] text-xs sm:text-sm font-medium hover:bg-[#f4ede6]"
              >
                إغلاق
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
