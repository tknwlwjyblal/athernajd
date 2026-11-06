import React, { useState, useEffect, useRef } from 'react';
import { X, SlidersHorizontal, Calendar, Eye, Paintbrush, RotateCw, ShieldCheck } from 'lucide-react';
import { Project } from '../types';
import { soundEngine } from '../utils/audioEffects';
import { useAdmin } from '../context/AdminContext';

interface ProjectDetailModalProps {
  project: Project | null;
  onClose: () => void;
  onBookSimilar: (projectTitle: string) => void;
}

export const ProjectDetailModal: React.FC<ProjectDetailModalProps> = ({
  project,
  onClose,
  onBookSimilar,
}) => {
  const { isAdmin } = useAdmin();
  const [revealKey, setRevealKey] = useState<number>(0);
  const modalContainerRef = useRef<HTMLDivElement>(null);

  // Reset scroll to top and handle escape key
  useEffect(() => {
    if (project) {
      setRevealKey(0);
      if (modalContainerRef.current) {
        modalContainerRef.current.scrollTop = 0;
      }
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          onClose();
        }
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [project, onClose]);

  if (!project) return null;

  const handleReplayBrush = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playBrushStroke();
    setRevealKey((prev) => prev + 1);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-sm p-3 sm:p-6 flex justify-center items-start animate-fadeIn"
      dir="rtl"
    >
      <div
        ref={modalContainerRef}
        className="my-auto sm:my-8 bg-[#fff8f3] rounded-2xl max-w-3xl w-full shadow-2xl border border-[#d1c5b4] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Sticky Top Header Bar with Prominent Close 'X' Button & District */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-4 sm:px-6 py-3 border-b border-[#eee7e1] flex items-center justify-between gap-3 shadow-xs">
          <div className="flex items-center gap-2 min-w-0">
            <span className="px-3 py-1 rounded-full bg-[#f4ede6] text-[#775a19] text-xs font-bold shrink-0">
              {project.district}
            </span>
            <h3 className="text-sm sm:text-base font-bold text-[#1e1b17] truncate">
              {project.title}
            </h3>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* View Count - ONLY Visible to Admin */}
            {isAdmin && typeof project.viewsCount === 'number' && (
              <div
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold"
                title="خاص بالإدارة فقط: الزوار لا يرون عدد المشاهدات"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-amber-600" />
                <Eye className="w-3.5 h-3.5 text-amber-700" />
                <span>{project.viewsCount.toLocaleString('ar-SA')} مشاهدة</span>
              </div>
            )}

            {/* Replay Brush Sweep Button */}
            <button
              onClick={handleReplayBrush}
              title="إعادة مسحة الفرشاة لكشف العمل"
              className="px-2.5 py-1.5 rounded-xl bg-[#faf5ee] hover:bg-[#c5a059] hover:text-[#4e3700] text-[#775a19] text-xs font-bold transition-all cursor-pointer border border-[#c5a059]/30 flex items-center gap-1 active:scale-95"
            >
              <Paintbrush className="w-3.5 h-3.5 text-[#c5a059]" />
              <span className="hidden sm:inline">مسحة الفرشاة</span>
              <RotateCw className="w-2.5 h-2.5 opacity-70" />
            </button>

            {/* Prominent High-Contrast Close Button */}
            <button
              onClick={onClose}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 hover:bg-[#c5a059] text-white hover:text-[#4e3700] text-xs font-bold shadow-sm transition-all cursor-pointer active:scale-95"
              aria-label="إغلاق النافذة"
            >
              <X className="w-4 h-4" />
              <span>إغلاق</span>
            </button>
          </div>
        </div>

        {/* Modal Image Showcase with Paint Brush Wipe Reveal */}
        <div className="relative w-full h-64 sm:h-80 md:h-96 bg-[#eee7e1] overflow-hidden">
          <img
            key={revealKey}
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover animate-paint-reveal"
            onError={(e) => {
              (e.target as any).src =
                'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
            }}
          />

          {/* Bottom Gradient Overlay on Image */}
          <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-[#1e1b17]/90 via-[#1e1b17]/50 to-transparent p-4 sm:p-6 text-white z-10">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-semibold text-[#ffdea5]">
                {project.categoryLabel}
              </span>
              <span className="text-white/40">•</span>
              <span className="inline-flex items-center gap-1 text-[11px] text-[#f4ede6]/85">
                <Paintbrush className="w-3 h-3 text-[#e5be70]" />
                <span>كشف بلمسة دهان معمارية ناعمة</span>
              </span>
            </div>
            <h2 className="text-lg sm:text-2xl font-bold leading-tight">{project.title}</h2>
          </div>
        </div>

        {/* Modal Body: Details and Specs */}
        <div className="p-4 sm:p-6 space-y-5">
          {/* Implementation Description */}
          <div>
            <h4 className="text-sm font-bold text-[#775a19] mb-1.5">تفاصيل التنفيذ والمعايير</h4>
            <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Technical Specifications */}
          <div className="bg-[#f4ede6] rounded-xl p-3.5 sm:p-5 border border-[#e8e1db]">
            <h5 className="text-xs font-bold text-[#1e1b17] mb-3 flex items-center gap-1.5">
              <SlidersHorizontal className="w-4 h-4 text-[#775a19]" />
              <span>المواصفات الفنية المعتمدة للمشروع:</span>
            </h5>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
              {project.specs.paintType && (
                <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-2xs">
                  <span className="text-[#655e51] font-medium text-[11px]">نوع وماركة الدهان:</span>
                  <span className="font-bold text-[#1e1b17] mt-0.5">{project.specs.paintType}</span>
                </div>
              )}

              {project.specs.colorCode && (
                <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-2xs">
                  <span className="text-[#655e51] font-medium text-[11px]">كود درجات الألوان:</span>
                  <span className="font-bold text-[#775a19] font-mono mt-0.5">{project.specs.colorCode}</span>
                </div>
              )}

              {project.specs.materials && (
                <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-2xs">
                  <span className="text-[#655e51] font-medium text-[11px]">التكسيات والمواد:</span>
                  <span className="font-bold text-[#1e1b17] mt-0.5">{project.specs.materials}</span>
                </div>
              )}

              {project.specs.lighting && (
                <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-2xs">
                  <span className="text-[#655e51] font-medium text-[11px]">تنسيق الإضاءة:</span>
                  <span className="font-bold text-[#1e1b17] mt-0.5">{project.specs.lighting}</span>
                </div>
              )}

              {project.specs.duration && (
                <div className="flex flex-col p-2.5 rounded-lg bg-white shadow-2xs sm:col-span-2">
                  <span className="text-[#655e51] font-medium text-[11px]">مدة التنفيذ والتسليم:</span>
                  <span className="font-bold text-[#1e1b17] mt-0.5">{project.specs.duration}</span>
                </div>
              )}
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-2.5 py-1 rounded-lg bg-[#eee7e1] text-[11px] font-medium text-[#576155]"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Modal Actions */}
          <div className="pt-2 flex flex-col sm:flex-row gap-2.5">
            <button
              onClick={() => {
                onClose();
                onBookSimilar(project.title);
              }}
              className="flex-1 py-3 px-6 rounded-xl bg-[#c5a059] text-[#4e3700] hover:bg-[#e9c176] font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-98"
            >
              <Calendar className="w-4 h-4" />
              <span>طلب تنفيذ تصميم مماثل لمسكنك</span>
            </button>
            <button
              onClick={onClose}
              className="py-3 px-6 rounded-xl bg-[#faf2ec] text-[#4e4639] hover:bg-[#f4ede6] font-semibold text-sm transition-all cursor-pointer active:scale-98 flex items-center justify-center gap-1.5"
            >
              <X className="w-4 h-4" />
              <span>إغلاق النافذة</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
