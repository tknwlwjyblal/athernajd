import React, { useState } from 'react';
import {
  X,
  Shield,
  Lock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Sparkles,
  Globe,
  Copy,
  Check,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { soundEngine } from '../utils/audioEffects';

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { currentUser, isAdmin, login, logout, openDashboard, authError } = useAdmin();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const isDomainUnauthorized = Boolean(authError?.startsWith('DOMAIN_UNAUTHORIZED:'));
  const unauthorizedDomain = isDomainUnauthorized
    ? authError!.replace('DOMAIN_UNAUTHORIZED:', '')
    : 'athernajd.com';

  if (!isOpen) return null;

  const handleGoogleLogin = async () => {
    soundEngine.playClick();
    setIsLoggingIn(true);
    const success = await login();
    setIsLoggingIn(false);
    if (success) {
      soundEngine.playChime();
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-md animate-fade-in"
      dir="rtl"
    >
      <div className="relative w-full max-w-md bg-[#fffaf5] rounded-3xl shadow-2xl border border-[#c5a059]/40 overflow-hidden text-[#1e1b17]">
        {/* Header with Luxury Brand Accent */}
        <div className="relative p-6 bg-gradient-to-br from-[#2a241c] via-[#3a3227] to-[#1c1813] text-white">
          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="absolute top-4 left-4 p-2 rounded-xl text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="إغلاق"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-2xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#e5be70]">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] text-[#c5a059] font-bold tracking-wider uppercase">
                بوابة الإدارة المعتمدة
              </span>
              <h3 className="text-xl font-bold text-white">إدارة صور ومشاريع أثر نجد</h3>
            </div>
          </div>
          <p className="text-xs text-stone-300 leading-relaxed">
            تسجيل دخول آمن لإضافة وتعديل صور العرض، بيانات المشاريع، والمواصفات الفنية المنشورة.
          </p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-5">
          {currentUser ? (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#e8ded3] flex items-center gap-3">
                {currentUser.photoURL ? (
                  <img
                    src={currentUser.photoURL}
                    alt="المسؤول"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#c5a059]"
                  />
                ) : (
                  <div className="w-12 h-12 rounded-full bg-[#f4ede6] text-[#775a19] flex items-center justify-center font-bold text-lg">
                    {currentUser.displayName ? currentUser.displayName[0] : 'أ'}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-[#1e1b17] truncate">
                      {currentUser.displayName || 'حساب الإدارة'}
                    </span>
                    {isAdmin && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#c5a059] text-[#2a241c]">
                        مسؤول معتمد
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-emerald-700 font-medium mt-0.5 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>جلسة مسجلة بنجاح</span>
                  </p>
                </div>
              </div>

              {isAdmin ? (
                <div className="space-y-2">
                  <button
                    onClick={() => {
                      soundEngine.playChime();
                      onClose();
                      openDashboard();
                    }}
                    className="w-full py-3 rounded-xl bg-[#c5a059] hover:bg-[#d8b163] text-[#2a241c] text-sm font-bold shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4" />
                    <span>فتح لوحة تحكم المعرض</span>
                  </button>

                  <button
                    onClick={async () => {
                      soundEngine.playClick();
                      await logout();
                    }}
                    className="w-full py-2.5 rounded-xl border border-rose-200 text-rose-700 hover:bg-rose-50 text-xs font-bold transition-all cursor-pointer"
                  >
                    تسجيل الخروج
                  </button>
                </div>
              ) : (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold">
                    <AlertTriangle className="w-4 h-4 text-amber-700" />
                    <span>حساب غير مصرح له بالإدارة</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed">
                    هذا الحساب ليس مسجلاً ضمن الحسابات المعتمدة لإدارة الموقع. صلاحيات التعديل والإضافة محصورة بمالك وإدارة المنصة.
                  </p>
                  <button
                    onClick={async () => {
                      soundEngine.playClick();
                      await logout();
                    }}
                    className="text-xs font-bold text-amber-900 underline cursor-pointer mt-1"
                  >
                    تسجيل الخروج والتبديل لحساب الإدارة
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {/* Discrete Security Badge without exposing email */}
              <div className="p-3.5 rounded-2xl bg-[#fbf5ee] border border-[#eee2d2] flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-[#c5a059]/20 flex items-center justify-center text-[#775a19] shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div className="text-xs text-[#5c5040] leading-relaxed">
                  <strong className="text-[#1e1b17] font-bold block mb-0.5">
                    منطقة خاصة بمالك وإدارة المنصة
                  </strong>
                  <span>تسجيل دخول مشفر ومحمي للتحكم في صور ومشاريع المعرض.</span>
                </div>
              </div>

              {isDomainUnauthorized ? (
                <div className="p-4 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-3 text-xs leading-relaxed animate-fade-in">
                  <div className="flex items-center gap-2 font-bold text-amber-900 text-sm">
                    <Globe className="w-4 h-4 text-amber-700" />
                    <span>خطوة أخيرة: إضافة الدومين إلى Firebase</span>
                  </div>
                  <p>
                    أمان Google يتطلب إضافة نطاق موقعك الجديد (
                    <strong className="font-bold underline">{unauthorizedDomain}</strong>
                    ) إلى قائمة النطاقات المصرح بها (Authorized Domains) في Firebase لكي يسمح بتسجيل الدخول من الجوال.
                  </p>

                  <div className="p-2.5 bg-white rounded-xl border border-amber-200 flex items-center justify-between gap-2">
                    <span className="font-mono text-xs text-stone-900 font-bold" dir="ltr">
                      {unauthorizedDomain}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        navigator.clipboard.writeText(unauthorizedDomain);
                        setCopiedDomain(true);
                        setTimeout(() => setCopiedDomain(false), 2000);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-[11px] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      {copiedDomain ? (
                        <Check className="w-3 h-3 text-emerald-600" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                      <span>{copiedDomain ? 'تم النسخ' : 'نسخ الدومين'}</span>
                    </button>
                  </div>

                  <div className="space-y-1.5 pt-1">
                    <a
                      href="https://console.firebase.google.com/project/gen-lang-client-0341114660/authentication/settings"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d8b163] text-[#2a241c] font-bold text-xs transition-colors shadow-sm"
                    >
                      <span>فتح إعدادات النطاقات في Firebase</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                    <span className="text-[11px] text-amber-800 block text-center">
                      (في Firebase اضغط Authorized domains ➔ Add domain ➔ أضف {unauthorizedDomain})
                    </span>
                  </div>
                </div>
              ) : authError ? (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                  <span>{authError}</span>
                </div>
              ) : null}

              <button
                onClick={handleGoogleLogin}
                disabled={isLoggingIn}
                className="w-full py-3.5 px-4 rounded-xl bg-white border border-[#d6c4b2] hover:border-[#c5a059] shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-3 cursor-pointer group disabled:opacity-50"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span className="text-sm font-bold text-[#1e1b17] group-hover:text-[#775a19]">
                  {isLoggingIn
                    ? 'جارٍ فتح نافذة تسجيل الدخول...'
                    : 'تسجيل الدخول بحساب Google المعتمد'}
                </span>
              </button>
            </div>
          )}
        </div>

        {/* Footer info */}
        <div className="px-6 py-3 bg-[#f5ebe1] border-t border-[#e8ded3] text-[11px] text-[#7d7060] flex items-center justify-between">
          <span>حماية مشفرة عبر Firebase Cloud Firestore</span>
          <span className="font-semibold text-[#775a19]">أثر نجد ©</span>
        </div>
      </div>
    </div>
  );
};
