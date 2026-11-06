import React, { useState } from 'react';
import {
  Sparkles,
  Sliders,
  Sun,
  Moon,
  Sunset,
  Eye,
  Check,
  Share2,
  Copy,
  Calendar,
  Layers,
  Palette,
  ShieldCheck,
  Maximize2,
  Info,
  ChevronRight,
  ChevronLeft,
} from 'lucide-react';
import { PHONE_NUMBER, WHATSAPP_LINK } from '../data/mockData';

interface RoomSpace {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  baseImage: string;
  recommendedTreatment: string;
}

interface WallTreatment {
  id: string;
  name: string;
  tagline: string;
  type: string;
  texturePattern: string;
  spec: string;
  features: string[];
}

interface PaintColor {
  id: string;
  name: string;
  code: string;
  hex: string;
  rgb: string;
  brand: string;
  finishType: string;
  mood: string;
}

const ROOM_SPACES: RoomSpace[] = [
  {
    id: 'majlis',
    name: 'مجلس ضيافة نجد الفاخر',
    subtitle: 'أصالة تجمع بين فخامة الرخام والدفء الخشبي',
    description: 'فراغ واسع مخصص لاستقبال الضيوف بتوزيع إضاءة مدروس وتشطيبات تعكس الهيبة والراحة.',
    baseImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=2400&q=90',
    recommendedTreatment: 'marble-wood',
  },
  {
    id: 'living',
    name: 'صالة المعيشة الملكية',
    subtitle: 'هدوء عصري وتناغم ألوان مريح للنظر',
    description: 'تدرجات لونية ناعمة مع جداريات بانوهات مودرن تمنح الفراغ وسعاً وانشراحاً طوال اليوم.',
    baseImage: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=2400&q=90',
    recommendedTreatment: 'paint-smooth',
  },
  {
    id: 'master',
    name: 'جناح النوم الماستر المهدئ',
    subtitle: 'لمسات فندقية مخملية مع عزل صوتي ونفسي',
    description: 'تطبيق دهانات ريتش مات المخملية خلف السرير مع تكسية خشب مضلع تعطي إحساس السكينة.',
    baseImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2400&q=90',
    recommendedTreatment: 'wood-ribbed',
  },
  {
    id: 'entrance',
    name: 'مدخل الفيلا والبهو الرئيسي',
    subtitle: 'الانطباع الأول عن فخامة المسكن',
    description: 'بديل رخام بوكماتش متصل مع مرايا وإضاءة مخفية تبرز هوية وتفاصيل المكان.',
    baseImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2400&q=90',
    recommendedTreatment: 'marble-accent',
  },
];

const WALL_TREATMENTS: WallTreatment[] = [
  {
    id: 'paint-smooth',
    name: 'دهان جوتن ريتش مات مخملي',
    tagline: 'ملمس ناعم كالحرير بدون أدنى لمعان مشتت',
    type: 'دهانات ناعمة فئة أولى',
    texturePattern: 'smooth',
    spec: 'مطفي عميق 3%، مقاوم للمسح، تغطية 100%',
    features: ['ضمان 10 سنوات', 'تغطية متجانسة بالليزر', 'بدون أي روائح نفاذة'],
  },
  {
    id: 'marble-accent',
    name: 'بديل رخام كلكتا مع عروق ذهبية',
    tagline: 'ألواح PVC المعالجة بطبقة UV المقاومة للخدش',
    type: 'تكسيات بديل الرخام',
    texturePattern: 'marble',
    spec: 'سماكة 3.5 ملم، مقاوم للماء والحرارة، لمعان زجاجي',
    features: ['عروق متصلة Bookmatch', 'إخفاء كامل للأسلاك', 'مقاوم للرطوبة 100%'],
  },
  {
    id: 'wood-ribbed',
    name: 'تكسيات بديل الخشب الكوري WPC',
    tagline: 'شرائح مضلعة بتظليل هندسي عميق وإحساس طبيعي',
    type: 'تكسيات خشبية ثلاثية الأبعاد',
    texturePattern: 'wood',
    spec: 'خشب بلاستيكي معالج، عازل للصوت والأصداء',
    features: ['عازل للصدى والضوضاء', 'مقاوم للنمل الأبيض والرطوبة', 'دمج بروفايل ليد مخفي'],
  },
  {
    id: 'moldings',
    name: 'بانوهات وإطارات جدارية نيو-كلاسيك',
    tagline: 'إطارات فوم كوري عالية الكثافة مع تفاصيل مذهبة أو سادة',
    type: 'ديكورات بانوهات جدارية',
    texturePattern: 'moldings',
    spec: 'بولي يوريثان عالي الكثافة، مقصوص بزوايا ليزرية 45°',
    features: ['قص ليزري دقيق للزوايا', 'دهان مطابق للون الجدار', 'طابع قصور نيو-كلاسيك'],
  },
  {
    id: 'stucco',
    name: 'إستوكو رخامي فينيسي فاخر',
    tagline: 'تعتيق يدوي حر مع تموجات ضوئية تشبه الرخام الطبيعي',
    type: 'دهانات ديكورية يدوية',
    texturePattern: 'stucco',
    spec: 'معجون جيري مع غبار الرخام وشمع حماية طبيعي',
    features: ['تنفيذ يدوي بمعلم محترف', 'مقاوم للبكتيريا والعفن', 'ملمس رخامي بارد'],
  },
];

const PAINT_COLORS: PaintColor[] = [
  {
    id: 'silk-beige',
    name: 'سيلك بيج نجد',
    code: 'AN-101 (Silk Beige)',
    hex: '#e5d7c3',
    rgb: '229, 215, 195',
    brand: 'مجموعة أثر نجد الخاصة',
    finishType: 'مطفي مخملي',
    mood: 'دفء نجدي عريق ينسجم مع الأثاث المودرن والخشب',
  },
  {
    id: 'pearl-white',
    name: 'أوف وايت لؤلؤي',
    code: 'JT-0567 (Pearl Mist)',
    hex: '#f5f0e6',
    rgb: '245, 240, 230',
    brand: 'جوتن ليدي ديزاين',
    finishType: 'مطفي فائق النعومة',
    mood: 'انشراح وإشراق مضاعف للمساحات وغرف المعيشة',
  },
  {
    id: 'warm-greige',
    name: 'غريج دافئ ملكي',
    code: 'JZ-9022 (Royal Greige)',
    hex: '#cac0b2',
    rgb: '202, 192, 178',
    brand: 'دهانات الجزيرة رويال',
    finishType: 'شبه مطفي ناعم',
    mood: 'اللون الأكثر طلباً في فلل الرياض العصرية لعام 2025',
  },
  {
    id: 'royal-cashmere',
    name: 'كشمير أصيل',
    code: 'AN-304 (Pure Cashmere)',
    hex: '#d6c6b4',
    rgb: '214, 198, 180',
    brand: 'مجموعة أثر نجد الخاصة',
    finishType: 'مطفي حريري',
    mood: 'رقي هادئ يمنح الصالات والمجالس طابعاً راقياً متزناً',
  },
  {
    id: 'mist-grey',
    name: 'رمادي ضبابي هادئ',
    code: 'JT-1032 (Mist Grey)',
    hex: '#bebdb6',
    rgb: '190, 189, 182',
    brand: 'جوتن فينومستك',
    finishType: 'مطفي عميق',
    mood: 'طابع مينيماليست حديث يبرز عناصر الديكور والإضاءة',
  },
  {
    id: 'najd-sage',
    name: 'أخضر زيتوني نجد',
    code: 'JZ-4410 (Najd Sage)',
    hex: '#9ba291',
    rgb: '155, 162, 145',
    brand: 'دهانات الجزيرة جرين',
    finishType: 'مطفي مخملي',
    mood: 'لمسة طبيعية مميزة لجدار التركيز (Accent Wall)',
  },
];

interface LightingMood {
  id: string;
  name: string;
  kelvin: string;
  icon: typeof Sun;
  overlayClass: string;
  glowColor: string;
  description: string;
}

const LIGHTING_MOODS: LightingMood[] = [
  {
    id: 'daylight',
    name: 'إضاءة نهارية منعشة',
    kelvin: '4500K ناصع',
    icon: Sun,
    overlayClass: 'mix-blend-soft-light bg-blue-100/10 contrast-105',
    glowColor: '#e0f2fe',
    description: 'تحاكي أشعة الشمس الطبيعية لإبراز الألوان بدقة ونقاء عالي.',
  },
  {
    id: 'warm',
    name: 'إضاءة دافئة مريحة',
    kelvin: '3000K مريح',
    icon: Sunset,
    overlayClass: 'mix-blend-overlay bg-amber-400/20 brightness-105',
    glowColor: '#fde68a',
    description: 'الإضاءة المثالية للمجالس وغرف المعيشة لتوفير دفء وألفة عائلية.',
  },
  {
    id: 'ambient-night',
    name: 'إضاءة ليلية فاخرة مخفية',
    kelvin: '2700K ليد مخفي',
    icon: Moon,
    overlayClass: 'mix-blend-multiply bg-[#3c2a1e]/40 brightness-95 contrast-110',
    glowColor: '#c5a059',
    description: 'إبراز بروفايلات الليد المخفية وزوايا الديكور بأجواء سينمائية ساحرة.',
  },
];

interface LuxuryDesignStudioProps {
  onOpenBookingModal?: (topic?: string) => void;
}

export const LuxuryDesignStudio: React.FC<LuxuryDesignStudioProps> = ({
  onOpenBookingModal,
}) => {
  const [selectedSpace, setSelectedSpace] = useState<RoomSpace>(ROOM_SPACES[0]);
  const [selectedTreatment, setSelectedTreatment] = useState<WallTreatment>(WALL_TREATMENTS[0]);
  const [selectedColor, setSelectedColor] = useState<PaintColor>(PAINT_COLORS[0]);
  const [selectedLighting, setSelectedLighting] = useState<LightingMood>(LIGHTING_MOODS[1]);
  const [showTextureMagnifier, setShowTextureMagnifier] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  const currentSummary = `${selectedSpace.name} - بتشطيب: ${selectedTreatment.name} - لون: ${selectedColor.name} (${selectedColor.code}) - إضاءة: ${selectedLighting.name}`;

  const handleCopySummary = () => {
    navigator.clipboard.writeText(
      `أرغب في تنفيذ التنسيق التالي من أثر نجد للدهانات والديكورات:\n` +
      `• الفراغ: ${selectedSpace.name}\n` +
      `• نوع التشطيب: ${selectedTreatment.name}\n` +
      `• اللون المختار: ${selectedColor.name} (${selectedColor.code})\n` +
      `• الإضاءة المقترحة: ${selectedLighting.name} (${selectedLighting.kelvin})\n` +
      `• رقم التواصل: 0557821701`
    );
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2500);
  };

  const handleWhatsAppConsultation = () => {
    const text = encodeURIComponent(
      `السلام عليكم، صممت هذا التنسيق التفاعلي في موقع أثر نجد وأرغب في معاينة الموقع:\n` +
      `📍 الفراغ: ${selectedSpace.name}\n` +
      `🎨 التشطيب: ${selectedTreatment.name}\n` +
      `🏷️ اللون: ${selectedColor.name} (${selectedColor.code})\n` +
      `💡 الإضاءة: ${selectedLighting.name}\n` +
      `هل يمكن تحديد موعد معاينة مجانية بالرياض؟`
    );
    window.open(`${WHATSAPP_LINK}?text=${text}`, '_blank');
  };

  return (
    <section
      id="design-studio"
      className="w-full py-16 sm:py-24 bg-gradient-to-b from-[#fff8f3] via-[#faf2ec] to-[#fff8f3] border-t border-[#e8e1db] relative overflow-hidden"
    >
      {/* Background Subtle Gold Accents */}
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#775a19]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#f4ede6] border border-[#c5a059]/30 text-[#775a19] text-xs sm:text-sm font-bold shadow-xs">
            <Sparkles className="w-4 h-4 text-[#c5a059]" />
            <span>استوديو التنسيق التفاعلي الفاخر 2025</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-[#1e1b17] leading-tight font-serif">
            نسّق فراغك المعماري بلمسات أثر نجد
          </h2>

          <p className="text-sm sm:text-base text-[#4e4639] leading-relaxed">
            جرّب تفاعل الألوان والدهانات المخملية، بديل الرخام وبديل الخشب، وشاهد تأثير الإضاءة المعمارية على فراغك في تجربة تفاعلية حية ومترفة.
          </p>
        </div>

        {/* Studio Grid: Controls & Visualizer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column (Desktop 7 cols): Interactive Visual Canvas */}
          <div className="lg:col-span-7 space-y-4">
            {/* Visualizer Frame */}
            <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xl border-2 border-[#d1c5b4]/80 bg-[#1e1b17] group">
              {/* 1. Base Room Image */}
              <div className="relative w-full h-[360px] sm:h-[480px] lg:h-[540px] overflow-hidden">
                <img
                  src={selectedSpace.baseImage}
                  alt={selectedSpace.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />

                {/* 2. Color Wash Tint Layer (Adjusted to blend realistically with wall surfaces) */}
                <div
                  className="absolute inset-0 transition-all duration-500 pointer-events-none mix-blend-color"
                  style={{
                    backgroundColor: selectedColor.hex,
                    opacity: 0.38,
                  }}
                />

                {/* 3. Texture / Finish Overlay Filter */}
                {selectedTreatment.id === 'marble-accent' && (
                  <div className="absolute inset-0 bg-gradient-to-tr from-black/25 via-white/10 to-transparent mix-blend-overlay pointer-events-none" />
                )}
                {selectedTreatment.id === 'wood-ribbed' && (
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0px,rgba(0,0,0,0.15)_3px,transparent_6px)] bg-[length:12px_100%] pointer-events-none opacity-40 mix-blend-multiply" />
                )}
                {selectedTreatment.id === 'stucco' && (
                  <div className="absolute inset-0 bg-radial from-white/20 via-transparent to-black/30 pointer-events-none opacity-50 mix-blend-soft-light" />
                )}

                {/* 4. Lighting Mood Filter Layer */}
                <div
                  className={`absolute inset-0 transition-all duration-500 pointer-events-none ${selectedLighting.overlayClass}`}
                />

                {/* Top Overlay Badges */}
                <div className="absolute top-4 inset-x-4 flex items-center justify-between pointer-events-none">
                  {/* Space & Finish Badge */}
                  <div className="px-3.5 py-1.5 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20 flex items-center gap-2 shadow-lg">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: selectedColor.hex }} />
                    <span>{selectedSpace.name}</span>
                    <span className="text-white/40">|</span>
                    <span className="text-[#e9c176]">{selectedTreatment.name}</span>
                  </div>

                  {/* Kelvin Badge */}
                  <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[#fde68a] text-xs font-mono font-bold border border-[#fde68a]/30 flex items-center gap-1.5 shadow-lg">
                    <selectedLighting.icon className="w-3.5 h-3.5" />
                    <span>{selectedLighting.kelvin}</span>
                  </div>
                </div>

                {/* Bottom Left Corner: Quick Magnifier Toggle */}
                <div className="absolute bottom-4 left-4 z-20">
                  <button
                    onClick={() => setShowTextureMagnifier(!showTextureMagnifier)}
                    className="px-3.5 py-2 rounded-xl bg-white/90 hover:bg-white text-[#1e1b17] text-xs font-bold shadow-lg backdrop-blur-md flex items-center gap-1.5 transition-all cursor-pointer border border-[#d1c5b4]/60 hover:scale-105"
                  >
                    <Eye className="w-4 h-4 text-[#775a19]" />
                    <span>{showTextureMagnifier ? 'إخفاء مجهر الملمس' : 'مجهر الملمس والتفاصيل'}</span>
                  </button>
                </div>

                {/* Tactile Texture Magnifier Modal Overlay inside canvas */}
                {showTextureMagnifier && (
                  <div className="absolute bottom-16 left-4 max-w-xs p-4 rounded-2xl bg-[#1e1b17]/95 text-white backdrop-blur-xl border border-[#c5a059]/50 shadow-2xl z-30 animate-in fade-in zoom-in-95 duration-200">
                    <div className="flex items-center justify-between pb-2 mb-2 border-b border-white/10">
                      <div className="flex items-center gap-2">
                        <div
                          className="w-5 h-5 rounded-full border border-white/50 shadow-inner"
                          style={{ backgroundColor: selectedColor.hex }}
                        />
                        <span className="text-xs font-bold text-[#e9c176]">مواصفات الخامة الدقيقة</span>
                      </div>
                      <button
                        onClick={() => setShowTextureMagnifier(false)}
                        className="text-white/60 hover:text-white text-xs cursor-pointer"
                      >
                        إغلاق
                      </button>
                    </div>

                    <div className="space-y-1.5 text-[11px] text-[#e0d9d3]">
                      <p className="flex justify-between">
                        <span className="text-white/60">اللون المعتمد:</span>
                        <span className="font-bold text-white">{selectedColor.name}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/60">كود الدهان:</span>
                        <span className="font-mono text-[#e9c176]">{selectedColor.code}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/60">نوع اللمعان:</span>
                        <span>{selectedColor.finishType}</span>
                      </p>
                      <p className="flex justify-between">
                        <span className="text-white/60">المواصفة:</span>
                        <span className="text-right">{selectedTreatment.spec}</span>
                      </p>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-white/10 text-[10px] text-[#c5a059] flex items-center gap-1 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                      <span>ضمان حقيقي 10 سنوات على ثبات اللون والالتصاق</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bottom Canvas Control Bar: Live Lighting Mood Bar */}
              <div className="p-3 sm:p-4 bg-[#23201c] border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-white">
                <div className="flex items-center gap-2 text-xs font-medium text-white/80">
                  <Sliders className="w-4 h-4 text-[#c5a059]" />
                  <span>أجواء الإضاءة الهندسية:</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {LIGHTING_MOODS.map((mood) => {
                    const isSelected = selectedLighting.id === mood.id;
                    const IconComp = mood.icon;
                    return (
                      <button
                        key={mood.id}
                        onClick={() => setSelectedLighting(mood)}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                          isSelected
                            ? 'bg-[#c5a059] text-[#4e3700] shadow-md scale-105'
                            : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                        }`}
                      >
                        <IconComp className="w-3.5 h-3.5" />
                        <span>{mood.name.split(' ')[0]}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Selected Configuration Summary Strip */}
            <div className="p-4 sm:p-5 rounded-2xl bg-white border border-[#e8e1db] shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-[#775a19] bg-[#f4ede6] px-2.5 py-0.5 rounded-full">
                    ملخص التنسيق المختار
                  </span>
                  <span className="text-xs text-[#576155] font-semibold">{selectedSpace.name}</span>
                </div>
                <p className="text-xs sm:text-sm font-bold text-[#1e1b17] leading-relaxed">
                  {selectedTreatment.name} • لون {selectedColor.name} • {selectedLighting.name}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopySummary}
                  className="px-3.5 py-2.5 rounded-xl border border-[#d1c5b4] hover:bg-[#f4ede6] text-[#4e4639] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5"
                  title="نسخ ملخص التنسيق"
                >
                  {copiedSummary ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span className="text-emerald-700">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-[#775a19]" />
                      <span>نسخ</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleWhatsAppConsultation}
                  className="px-4 py-2.5 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                >
                  <Share2 className="w-4 h-4" />
                  <span>حجز عبر واتساب</span>
                </button>

                {onOpenBookingModal && (
                  <button
                    onClick={() => onOpenBookingModal(`تنسيق استوديو: ${currentSummary}`)}
                    className="px-4 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#775a19] text-[#4e3700] hover:text-white text-xs font-bold shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center gap-1.5"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>حجز معاينة</span>
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right Column (Desktop 5 cols): Controls & Palette Selection */}
          <div className="lg:col-span-5 space-y-6">
            {/* Control 1: Select Space */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#e8e1db] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center gap-2">
                  <Maximize2 className="w-4 h-4 text-[#775a19]" />
                  <span>1. اختر الفراغ المراد تنسيقه</span>
                </h3>
                <span className="text-xs text-[#655e51]">4 فراغات معمارية</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {ROOM_SPACES.map((space) => {
                  const isSelected = selectedSpace.id === space.id;
                  return (
                    <button
                      key={space.id}
                      onClick={() => setSelectedSpace(space)}
                      className={`p-3 rounded-xl text-right transition-all cursor-pointer border flex flex-col justify-between ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#faf2ec] shadow-xs ring-1 ring-[#c5a059]'
                          : 'border-[#eee7e1] hover:border-[#d1c5b4] bg-white'
                      }`}
                    >
                      <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#775a19]' : 'text-[#1e1b17]'}`}>
                        {space.name}
                      </span>
                      <span className="text-[11px] text-[#655e51] line-clamp-1 mt-1">
                        {space.subtitle}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 2: Wall Treatment & Material */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#e8e1db] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[#775a19]" />
                  <span>2. اختر نوع التكسية والتشطيب</span>
                </h3>
                <span className="text-xs text-[#775a19] font-bold">معتمد مع الضمان</span>
              </div>

              <div className="space-y-2">
                {WALL_TREATMENTS.map((treatment) => {
                  const isSelected = selectedTreatment.id === treatment.id;
                  return (
                    <button
                      key={treatment.id}
                      onClick={() => setSelectedTreatment(treatment)}
                      className={`w-full p-3 rounded-xl text-right transition-all cursor-pointer border flex items-center justify-between gap-3 ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#f4ede6] shadow-xs ring-1 ring-[#c5a059]'
                          : 'border-[#eee7e1] hover:border-[#d1c5b4] bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className={`text-xs sm:text-sm font-bold ${isSelected ? 'text-[#775a19]' : 'text-[#1e1b17]'}`}>
                            {treatment.name}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#655e51]">{treatment.tagline}</p>
                      </div>

                      <div className="shrink-0 flex items-center">
                        {isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-[#c5a059] text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border border-[#d1c5b4]" />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Control 3: Curated Paint Palette */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-md border border-[#e8e1db] space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm sm:text-base font-bold text-[#1e1b17] flex items-center gap-2">
                  <Palette className="w-4 h-4 text-[#775a19]" />
                  <span>3. لوحة ألوان نجد العصرية المعتمدة</span>
                </h3>
                <span className="text-xs text-[#576155] font-mono">2025 Palette</span>
              </div>

              {/* Color Swatch Circles */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 pt-1">
                {PAINT_COLORS.map((color) => {
                  const isSelected = selectedColor.id === color.id;
                  return (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color)}
                      className={`group p-2 rounded-xl flex flex-col items-center gap-1.5 transition-all cursor-pointer border ${
                        isSelected
                          ? 'border-[#c5a059] bg-[#faf2ec] shadow-sm ring-2 ring-[#c5a059]'
                          : 'border-transparent hover:border-[#d1c5b4] bg-[#fdfaf7]'
                      }`}
                      title={color.name}
                    >
                      <div
                        className="w-10 h-10 rounded-full shadow-inner border border-black/10 relative transition-transform group-hover:scale-110 flex items-center justify-center"
                        style={{ backgroundColor: color.hex }}
                      >
                        {isSelected && <Check className="w-4 h-4 text-[#1e1b17] drop-shadow-sm" />}
                      </div>
                      <span className="text-[11px] font-bold text-[#1e1b17] text-center line-clamp-1">
                        {color.name.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Active Color Info Card */}
              <div className="mt-3 p-3 rounded-xl bg-[#faf2ec] border border-[#eee7e1] text-xs space-y-1">
                <div className="flex items-center justify-between font-bold">
                  <span className="text-[#775a19]">{selectedColor.name}</span>
                  <span className="font-mono text-[11px] text-[#655e51]">{selectedColor.code}</span>
                </div>
                <p className="text-[11px] text-[#4e4639] leading-relaxed">
                  {selectedColor.mood} • الماركة: <span className="font-semibold text-[#1e1b17]">{selectedColor.brand}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
