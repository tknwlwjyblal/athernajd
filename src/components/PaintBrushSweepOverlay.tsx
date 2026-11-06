import React, { useEffect, useState } from 'react';
import { Sparkles, Paintbrush } from 'lucide-react';
import { Project } from '../types';

interface PaintBrushSweepOverlayProps {
  project: Project | null;
  onFinished: () => void;
}

export const PaintBrushSweepOverlay: React.FC<PaintBrushSweepOverlayProps> = ({
  project,
  onFinished,
}) => {
  const [stage, setStage] = useState<'entering' | 'sweeping' | 'done'>('entering');

  useEffect(() => {
    if (!project) return;
    setStage('sweeping');

    const timer = setTimeout(() => {
      setStage('done');
      onFinished();
    }, 720);

    return () => clearTimeout(timer);
  }, [project, onFinished]);

  if (!project || stage === 'done') return null;

  return (
    <div
      onClick={onFinished}
      className="fixed inset-0 z-[100] pointer-events-auto flex items-center justify-center overflow-hidden bg-black/40 backdrop-blur-xs transition-opacity duration-300"
      dir="rtl"
    >
      {/* Expanding Wet Paint Swath */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-full h-[220px] sm:h-[300px] bg-gradient-to-l from-[#faf5ee] via-[#f5ede2] to-[#e8dbca] shadow-2xl animate-paint-band overflow-hidden border-y border-[#c5a059]/40">
          {/* Bristle Streak Texture */}
          <div className="absolute inset-0 paint-stroke-pattern opacity-40 mix-blend-overlay" />
          
          {/* Subtle wet paint gloss line */}
          <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-white/80 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-1 bg-[#c5a059]/30" />

          {/* Project Preview Reveal in the Stroke */}
          <div className="relative h-full max-w-4xl mx-auto px-6 flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden border-2 border-white shadow-md shrink-0 bg-stone-200">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#c5a059]/20 text-[#775a19] text-xs font-bold mb-1 border border-[#c5a059]/30">
                  <Paintbrush className="w-3 h-3 text-[#c5a059]" />
                  <span>كشف العمل بلمسة دهان ناعمة</span>
                </div>
                <h3 className="text-lg sm:text-2xl font-bold text-[#1e1b17] leading-tight">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5c5446] font-medium mt-0.5">
                  {project.district} • {project.categoryLabel}
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-[#775a19] bg-white/70 px-3 py-1.5 rounded-xl border border-white/80 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-[#c5a059] animate-spin" />
              <span>جاري فتح تفاصيل ومواصفات العمل...</span>
            </div>
          </div>
        </div>
      </div>

      {/* Realistic Moving Paintbrush Leading the Swath */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-full max-w-5xl relative h-[360px]">
          <div className="absolute top-1/2 -translate-y-1/2 right-0 animate-brush-glide flex items-center">
            {/* SVG Paintbrush Graphic */}
            <div className="relative filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.45)] transform -scale-x-100 rotate-12">
              <svg
                width="160"
                height="80"
                viewBox="0 0 160 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-32 sm:w-44 h-auto"
              >
                {/* Paint Bristle Head */}
                <path
                  d="M10 25C10 25 2 35 2 40C2 45 10 55 10 55H42V25H10Z"
                  fill="url(#bristleGrad)"
                />
                {/* Wet Paint Tip Texture */}
                <path
                  d="M2 38C2 38 6 30 14 30C22 30 26 36 34 36C40 36 42 32 42 32V48C42 48 38 44 32 44C24 44 20 50 12 50C6 50 2 42 2 38Z"
                  fill="#fefbf6"
                  opacity="0.9"
                />
                {/* Wet paint drops and shine */}
                <ellipse cx="16" cy="40" rx="6" ry="3" fill="#ffffff" opacity="0.8" />
                <circle cx="6" cy="34" r="1.5" fill="#c5a059" />
                <circle cx="4" cy="46" r="1.2" fill="#c5a059" />

                {/* Metallic Ferrule */}
                <rect x="42" y="24" width="28" height="32" rx="2" fill="url(#ferruleGrad)" stroke="#b89e58" strokeWidth="0.8" />
                {/* Ferrule crimp lines */}
                <line x1="50" y1="24" x2="50" y2="56" stroke="#947933" strokeWidth="1" opacity="0.6" />
                <line x1="58" y1="24" x2="58" y2="56" stroke="#947933" strokeWidth="1" opacity="0.6" />

                {/* Wooden Ergonomic Handle */}
                <path
                  d="M70 27C70 27 100 29 125 33C142 36 158 38 158 40C158 42 142 44 125 47C100 51 70 53 70 53V27Z"
                  fill="url(#woodGrad)"
                  stroke="#4a2810"
                  strokeWidth="0.6"
                />
                {/* Wood reflection highlight */}
                <path
                  d="M72 31C95 33 120 36 145 39C120 40 95 35 72 33Z"
                  fill="#ffffff"
                  opacity="0.25"
                />

                <defs>
                  <linearGradient id="bristleGrad" x1="0" y1="40" x2="42" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#fff8f0" />
                    <stop offset="35%" stopColor="#e8ded1" />
                    <stop offset="70%" stopColor="#c5a059" />
                    <stop offset="100%" stopColor="#8d6e27" />
                  </linearGradient>
                  <linearGradient id="ferruleGrad" x1="42" y1="40" x2="70" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#e5d2a4" />
                    <stop offset="45%" stopColor="#fff2cb" />
                    <stop offset="75%" stopColor="#d3be85" />
                    <stop offset="100%" stopColor="#a38841" />
                  </linearGradient>
                  <linearGradient id="woodGrad" x1="70" y1="40" x2="158" y2="40" gradientUnits="userSpaceOnUse">
                    <stop offset="0%" stopColor="#3d210b" />
                    <stop offset="20%" stopColor="#6e3c15" />
                    <stop offset="55%" stopColor="#8c4e1d" />
                    <stop offset="85%" stopColor="#572e0f" />
                    <stop offset="100%" stopColor="#2c1605" />
                  </linearGradient>
                </defs>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
