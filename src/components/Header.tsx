import React, { useState, useEffect } from 'react';
import { Copy, Check, Calendar, Menu, X, MapPin, Shield, Sparkles } from 'lucide-react';
import { LOGO_URL, PHONE_NUMBER, FORMATTED_PHONE } from '../data/mockData';
import { soundEngine } from '../utils/audioEffects';
import { triggerGoldenBurst } from '../utils/sparkleBurst';
import { useAdmin } from '../context/AdminContext';

interface HeaderProps {
  activeSection: string;
  onNavigate: (sectionId: string) => void;
  onOpenBookingModal: () => void;
  onOpenAdminLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeSection,
  onNavigate,
  onOpenBookingModal,
  onOpenAdminLogin,
}) => {
  const { isAdmin, openDashboard } = useAdmin();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: 'الرئيسية' },
    { id: 'design-studio', label: 'استوديو الألوان والتنسيق' },
    { id: 'projects-showcase', label: 'معرض أعمالنا' },
    { id: 'services', label: 'خدماتنا' },
    { id: 'packages', label: 'باقات التشطيب' },
    { id: 'calculator', label: 'حاسبة التكلفة' },
    { id: 'why-us', label: 'لماذا أثر نجد' },
    { id: 'contact', label: 'تواصل معنا' },
  ];

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleCopyPhone = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(PHONE_NUMBER);
    setCopiedPhone(true);
    soundEngine.playChime();
    triggerGoldenBurst(e.clientX, e.clientY, 15);
    setTimeout(() => setCopiedPhone(false), 2500);
  };

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#fff8f3]/95 backdrop-blur-2xl shadow-[0_4px_20px_rgba(45,42,38,0.08)] border-b border-[#c5a059]/30 py-0'
          : 'bg-[#fff8f3]/90 backdrop-blur-xl shadow-[0_1px_8px_rgba(45,42,38,0.05)] border-b border-[#e8e1db]/60 py-1'
      }`}
    >
      <div className={`w-full px-4 sm:px-6 lg:px-12 max-w-[1440px] mx-auto flex items-center justify-between gap-4 transition-all duration-300 ${
        isScrolled ? 'h-16' : 'h-20'
      }`}>
        {/* Brand / Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => handleNavClick('home')}
            className="flex items-center gap-2.5 group text-right cursor-pointer"
          >
            <div className="relative flex items-center justify-center p-0.5 rounded-full ring-1 ring-[#c5a059]/50 group-hover:ring-[#c5a059] transition-all bg-[#1e1b17] shadow-sm">
              <img
                alt="أثر نجد للدهانات والديكورات"
                className="w-10 h-10 rounded-full object-contain p-0.5"
                src={LOGO_URL}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/logo.png';
                }}
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="font-bold text-lg text-[#1e1b17] tracking-wide group-hover:text-[#775a19] transition-colors">
                أثر نجد
              </span>
              <span className="text-xs text-[#655e51] tracking-wider">
                للدهانات والديكورات
              </span>
            </div>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`transition-colors py-1.5 text-sm font-medium cursor-pointer relative ${
                  isActive
                    ? 'text-[#775a19] font-bold'
                    : 'text-[#4e4639] hover:text-[#1e1b17]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#c5a059] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Phone & CTA Button (No prominent admin button to keep it discrete) */}
        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end pl-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-[#c5a059] animate-pulse"></span>
              <span className="text-xs text-[#576155] font-medium">الرياض والمناطق المجاورة</span>
            </div>
            <div className="flex items-center gap-1.5 mt-0.5">
              <a
                className="text-xs text-[#1e1b17] hover:text-[#775a19] transition-colors font-bold font-mono text-left tracking-wider"
                href={`tel:${PHONE_NUMBER}`}
                dir="ltr"
              >
                {FORMATTED_PHONE}
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-1 rounded hover:bg-[#f4ede6] text-[#775a19] transition-colors cursor-pointer"
                title="نسخ رقم الجوال"
                aria-label="نسخ رقم الجوال"
              >
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>

          <button
            onClick={() => {
              soundEngine.playChime();
              onOpenBookingModal();
            }}
            data-sparkle="true"
            data-interactive="true"
            data-cursor-action="حجز"
            className="inline-flex items-center justify-center px-4 py-2 sm:px-5 sm:py-2.5 rounded-xl bg-[#c5a059] text-[#4e3700] hover:bg-[#e9c176] text-xs sm:text-sm font-bold shadow-[0_4px_14px_rgba(197,160,89,0.22)] transition-all duration-300 cursor-pointer active:scale-95"
          >
            <Calendar className="w-4 h-4 ml-1.5" />
            <span>طلب معاينة واستشارة</span>
          </button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-lg text-[#1e1b17] hover:bg-[#f4ede6] transition-colors"
            aria-label="القائمة"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-[#fff8f3] border-b border-[#e8e1db] px-6 py-4 shadow-xl">
          <div className="flex flex-col space-y-2 pb-4">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-right py-2 px-3 rounded-lg text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? 'bg-[#f4ede6] text-[#775a19] font-bold'
                    : 'text-[#4e4639] hover:bg-[#faf2ec]'
                }`}
              >
                {link.label}
              </button>
            ))}

            {/* Admin entry in mobile menu */}
            <div className="pt-2 border-t border-[#e8e1db]">
              {isAdmin ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    openDashboard();
                  }}
                  className="w-full text-right py-2 px-3 rounded-lg text-sm font-bold bg-[#2a241c] text-[#e5be70] flex items-center justify-between"
                >
                  <span>لوحة تحكم المعرض (مسؤول)</span>
                  <Sparkles className="w-4 h-4 text-[#c5a059]" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenAdminLogin();
                  }}
                  className="w-full text-right py-2 px-3 rounded-lg text-sm font-medium text-[#775a19] hover:bg-[#faf2ec] flex items-center justify-between"
                >
                  <span>بوابة تسجيل دخول الإدارة</span>
                  <Shield className="w-4 h-4 text-[#775a19]" />
                </button>
              )}
            </div>
          </div>

          <div className="pt-3 border-t border-[#e8e1db] flex items-center justify-between text-xs text-[#576155]">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#775a19]" />
              <span>تغطية شاملة لأحياء الرياض</span>
            </div>
            <div className="flex items-center gap-1.5">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="text-[#775a19] font-bold font-mono text-left tracking-wider"
                dir="ltr"
              >
                {FORMATTED_PHONE}
              </a>
              <button
                onClick={handleCopyPhone}
                className="p-1 rounded bg-[#f4ede6] text-[#775a19]"
                title="نسخ رقم الجوال"
                aria-label="نسخ رقم الجوال"
              >
                {copiedPhone ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
