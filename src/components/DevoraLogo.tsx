import React, { useState } from 'react';

// Developer asset path provided by user
const DEVORA_LOGO_IMG = '/assets/aistudio/____________4214054f.jpeg';
const DEVORA_LOGO_SQUARE = '/devora_square.png';

// Social links
export const DEVORA_LINKS = {
  instagram: 'https://www.instagram.com/ord_ev',
  tiktok: 'https://www.tiktok.com/@devora5200',
  whatsapp: 'https://wa.me/966563507386',
};

interface DevoraLogoProps {
  className?: string;
  size?: number;
}

export const DevoraIcon: React.FC<DevoraLogoProps> = ({
  className = 'w-8 h-8',
}) => {
  const [imgError, setImgError] = useState(false);

  if (imgError) {
    return (
      <svg
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        aria-label="DEVORA Logo"
      >
        <defs>
          <linearGradient id="devora-purple-light" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
          <linearGradient id="devora-cyan-blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="50%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="devora-code-grad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#C084FC" />
            <stop offset="100%" stopColor="#38BDF8" />
          </linearGradient>
        </defs>
        <rect width="100" height="100" rx="20" fill="#080c16" />
        <path d="M26 28 L40 18 L46 25 L32 35 Z" fill="url(#devora-purple-light)" />
        <path d="M26 40 L40 30 L45 37 L31 47 Z" fill="#7C3AED" />
        <path d="M26 52 L39 42 L45 49 L32 59 Z" fill="url(#devora-purple-light)" />
        <path
          d="M36 20 H54 C69 20 81 32 81 50 C81 68 69 80 54 80 H36 L43 72 H53 C64 72 73 63 73 50 C73 37 64 28 53 28 H43 Z"
          fill="url(#devora-cyan-blue)"
        />
        <path
          d="M48 44 L43 49 L48 54 M51 55 L55 43 M58 44 L63 49 L58 54"
          stroke="url(#devora-code-grad)"
          strokeWidth="3.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-xl bg-black border border-[#1e293b] flex items-center justify-center shrink-0 ${className}`}>
      <img
        src={DEVORA_LOGO_SQUARE}
        onError={() => {
          // If square crop fails, fallback to original uploaded asset or svg
          const fallback = new Image();
          fallback.src = DEVORA_LOGO_IMG;
          fallback.onload = () => {};
          fallback.onerror = () => setImgError(true);
        }}
        alt="DEVORA Logo"
        className="w-full h-full object-cover"
      />
    </div>
  );
};

// Social Icons SVGs (Instagram, TikTok, WhatsApp)
export const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    aria-hidden="true"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

export const TikTokIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.68 6.34 6.34 0 0 0 9.33 22a6.34 6.34 0 0 0 6.34-6.34V9.22a8.16 8.16 0 0 0 4.77 1.52V7.3a4.85 4.85 0 0 1-.85-.61z" />
  </svg>
);

export const WhatsAppIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    className={className}
    aria-hidden="true"
  >
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.886 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.336 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

export const DevoraCreditBadge: React.FC = () => {
  return (
    <div
      className="inline-flex flex-wrap sm:flex-nowrap items-center gap-3 px-3.5 py-2 rounded-2xl bg-[#090d16] border border-[#1e293b] text-white shadow-lg hover:border-[#38bdf8]/50 transition-all duration-300"
      dir="rtl"
    >
      {/* Developer Logo and Identity */}
      <div className="flex items-center gap-2.5">
        <DevoraIcon className="w-9 h-9 shrink-0 shadow-md ring-1 ring-white/10" />
        <div className="flex flex-col text-right">
          <div className="flex items-center gap-1.5 text-xs font-bold leading-tight">
            <span className="text-stone-300 font-medium">برمجة وتطوير</span>
            <span className="font-mono text-transparent bg-clip-text bg-gradient-to-r from-[#c084fc] via-[#60a5fa] to-[#38bdf8] font-black tracking-wider text-sm">
              DEVORA
            </span>
          </div>
          <span className="text-[10px] text-stone-400 font-medium leading-tight mt-0.5">
            عالم الابداع والتطوير التقني
          </span>
        </div>
      </div>

      {/* Subtle vertical separator */}
      <div className="hidden sm:block w-px h-6 bg-white/15 mx-0.5" />

      {/* Social Accounts (App Icons only as requested) */}
      <div className="flex items-center gap-1.5">
        {/* Instagram */}
        <a
          href={DEVORA_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="حساب DEVORA انستقرام (@ord_ev)"
          title="انستقرام: @ord_ev"
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#E1306C]/15 border border-white/10 hover:border-[#E1306C]/60 text-stone-300 hover:text-[#E1306C] flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-[0_0_12px_rgba(225,48,108,0.35)] cursor-pointer"
        >
          <InstagramIcon className="w-4 h-4" />
        </a>

        {/* TikTok */}
        <a
          href={DEVORA_LINKS.tiktok}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="حساب DEVORA تيك توك (@devora5200)"
          title="تيك توك: @devora5200"
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#00f2fe]/15 border border-white/10 hover:border-[#00f2fe]/60 text-stone-300 hover:text-[#00f2fe] flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-[0_0_12px_rgba(0,242,254,0.35)] cursor-pointer"
        >
          <TikTokIcon className="w-4 h-4" />
        </a>

        {/* WhatsApp */}
        <a
          href={DEVORA_LINKS.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="تواصل مع DEVORA عبر واتساب (0563507386)"
          title="واتساب: 0563507386"
          className="w-8 h-8 rounded-xl bg-white/5 hover:bg-[#25D366]/15 border border-white/10 hover:border-[#25D366]/60 text-stone-300 hover:text-[#25D366] flex items-center justify-center transition-all duration-200 hover:scale-105 hover:shadow-[0_0_12px_rgba(37,211,102,0.35)] cursor-pointer"
        >
          <WhatsAppIcon className="w-4 h-4" />
        </a>
      </div>
    </div>
  );
};
