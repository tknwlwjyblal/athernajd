import React, { useState, useEffect } from 'react';
import { ArrowUp, Volume2, VolumeX, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audioEffects';
import { triggerGoldenBurst } from '../utils/sparkleBurst';
import { PHONE_NUMBER } from '../data/mockData';

export const InteractiveScrollSystem: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);
  const [isSoundEnabled, setIsSoundEnabled] = useState<boolean>(true);
  const [soundPillActive, setSoundPillActive] = useState<boolean>(false);

  useEffect(() => {
    setIsSoundEnabled(soundEngine.getSoundEnabled());

    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, currentProgress)));
      }
      setShowScrollTop(window.scrollY > 280);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // Global tactile click listener for buttons and cards
    const handleGlobalClick = (e: globalThis.MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveEl = target.closest('button, a, input[type="range"], [role="button"], [data-interactive="true"]');
      if (interactiveEl) {
        // Check if element requested sparkles
        const hasSparkle = interactiveEl.getAttribute('data-sparkle') === 'true' ||
          interactiveEl.classList.contains('bg-[#c5a059]') ||
          interactiveEl.classList.contains('bg-[#775a19]');

        if (hasSparkle) {
          triggerGoldenBurst(e.clientX, e.clientY, 16);
          soundEngine.playChime();
        } else {
          soundEngine.playClick();
        }
      }
    };

    window.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    soundEngine.playChime();
    triggerGoldenBurst(e.clientX, e.clientY, 20);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleToggleSound = () => {
    const newState = soundEngine.toggleMute();
    setIsSoundEnabled(newState);
    setSoundPillActive(true);
    setTimeout(() => setSoundPillActive(false), 2000);
  };

  // Circular progress calculation for the dial
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (scrollProgress / 100) * circumference;

  return (
    <>
      {/* 1. Top Glowing Golden Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 z-[100] bg-transparent pointer-events-none">
        <div
          className="h-full bg-gradient-to-r from-[#775a19] via-[#c5a059] to-[#f4ede6] transition-[width] duration-150 ease-out relative shadow-[0_0_12px_rgba(197,160,89,0.8)]"
          style={{ width: `${scrollProgress}%` }}
        >
          {/* Glowing head light on the scrollbar */}
          <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-[0_0_8px_#ffd700] ring-2 ring-[#c5a059]"></div>
        </div>
      </div>

      {/* 2. Floating Action Dock (Bottom Left) */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col items-center gap-2.5">
        {/* Sound toggle button with label badge */}
        <div className="relative group">
          <button
            onClick={handleToggleSound}
            aria-label="تبديل مؤثرات الصوت التفاعلية"
            className={`w-11 h-11 rounded-full flex items-center justify-center transition-all duration-300 shadow-lg border backdrop-blur-md cursor-pointer ${
              isSoundEnabled
                ? 'bg-white/90 text-[#775a19] border-[#c5a059]/40 hover:bg-[#fff8f3] hover:scale-105'
                : 'bg-[#faf2ec]/80 text-[#655e51] border-[#d1c5b4]/40 hover:bg-white'
            }`}
          >
            {isSoundEnabled ? (
              <div className="relative flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-[#775a19]" />
                <span className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#c5a059] animate-ping" />
              </div>
            ) : (
              <VolumeX className="w-5 h-5 text-[#888]" />
            )}
          </button>

          {/* Floating Sound State Tooltip */}
          <div
            className={`absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-3 py-1.5 rounded-lg bg-[#1e1b17] text-white text-xs font-medium shadow-xl pointer-events-none transition-all duration-200 ${
              soundPillActive
                ? 'opacity-100 translate-x-0'
                : 'opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0'
            }`}
          >
            {isSoundEnabled ? 'مؤثرات الصوت الفاخرة: مفعلة 🔔' : 'مؤثرات الصوت: صامت 🔕'}
          </div>
        </div>

        {/* WhatsApp Quick Floating Button */}
        <a
          href={`https://wa.me/966${PHONE_NUMBER.substring(1)}?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AF%D9%8A%D9%83%D9%88%D8%B1%20%D9%88%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA%20%D9%85%D9%86%20%D8%A3%D8%AB%D8%B1%20%D9%86%D8%AC%D8%AF`}
          target="_blank"
          rel="noopener noreferrer"
          data-sparkle="true"
          className="w-12 h-12 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 relative group"
          aria-label="تواصل واتساب مباشر"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
          <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-white rounded-full flex items-center justify-center text-[9px] text-[#25D366] font-bold shadow-xs">
            1
          </span>
          <span className="sr-only">واتساب</span>
        </a>

        {/* Phone Call Floating Button */}
        <a
          href={`tel:${PHONE_NUMBER}`}
          data-sparkle="true"
          className="w-12 h-12 rounded-full bg-[#775a19] text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 group"
          aria-label="اتصال هاتفي مباشر"
        >
          <Phone className="w-5 h-5 transition-transform group-hover:rotate-12" />
          <span className="sr-only">اتصال</span>
        </a>

        {/* 3. Circular Scroll-to-Top Dial with Progress Ring */}
        <div
          className={`transition-all duration-500 transform ${
            showScrollTop
              ? 'opacity-100 translate-y-0 scale-100'
              : 'opacity-0 translate-y-4 scale-75 pointer-events-none'
          }`}
        >
          <button
            onClick={scrollToTop}
            aria-label="الرجوع إلى أعلى الصفحة"
            className="relative w-12 h-12 rounded-full bg-white/95 backdrop-blur-md shadow-xl border border-[#c5a059]/40 flex items-center justify-center text-[#775a19] hover:bg-[#fff8f3] hover:scale-110 active:scale-90 transition-all duration-300 cursor-pointer group"
          >
            {/* SVG Circular Progress Ring */}
            <svg className="w-12 h-12 absolute inset-0 -rotate-90 pointer-events-none">
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="text-[#eee7e1]"
                strokeWidth="2.5"
                stroke="currentColor"
                fill="transparent"
              />
              <circle
                cx="24"
                cy="24"
                r={radius}
                className="text-[#c5a059] transition-[stroke-dashoffset] duration-150"
                strokeWidth="2.5"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                stroke="currentColor"
                fill="transparent"
              />
            </svg>

            {/* Inner Arrow Icon & Percentage on Hover */}
            <div className="relative flex items-center justify-center">
              <ArrowUp className="w-5 h-5 text-[#775a19] transition-transform duration-300 group-hover:-translate-y-0.5" />
            </div>

            {/* Tooltip on hover */}
            <span className="absolute left-14 top-1/2 -translate-y-1/2 whitespace-nowrap px-2.5 py-1 rounded bg-[#1e1b17] text-white text-[11px] font-bold shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              أعلى الصفحة ({Math.round(scrollProgress)}%)
            </span>
          </button>
        </div>
      </div>
    </>
  );
};
