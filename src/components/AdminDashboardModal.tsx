import React, { useState, useRef } from 'react';
import {
  X,
  Plus,
  Trash2,
  Edit3,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  ExternalLink,
  ShieldCheck,
  LogOut,
  Sparkles,
  UploadCloud,
  Layers,
  MapPin,
  Clock,
  Paintbrush,
  Eye,
  Camera,
  FolderOpen,
  Link as LinkIcon,
  RefreshCw,
  SlidersHorizontal,
  TrendingUp,
  Award,
  BarChart3,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { Project } from '../types';
import { addProject, updateProject, removeProject, seedInitialProjects } from '../lib/firebase';
import { soundEngine } from '../utils/audioEffects';
import { triggerGoldenBurst } from '../utils/sparkleBurst';
import { PROJECTS as DEFAULT_PROJECTS } from '../data/mockData';
import { compressImageFile, formatBytes, CompressedImageResult } from '../utils/imageCompressor';

// Curated high-res interior design imagery presets for quick selection
const IMAGE_PRESETS = [
  {
    label: 'مجلس استقبال فخم',
    category: 'majlis',
    url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'ديكور شاشة وبديل رخام',
    category: 'tv-units',
    url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'مكتبة شاشة خشبية مودرن',
    category: 'tv-units',
    url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'غرفة ماستر فندقية',
    category: 'bedrooms',
    url: 'https://images.unsplash.com/photo-1598928506311-c55ded91a20c?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'خزائن مدمجة ذكية',
    category: 'storage',
    url: 'https://images.unsplash.com/photo-1558997519-83ea9252edf8?auto=format&fit=crop&w=1600&q=85',
  },
  {
    label: 'جدارية ميكروسمنت ناعمة',
    category: 'majlis',
    url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=85',
  },
];

export const AdminDashboardModal: React.FC = () => {
  const {
    currentUser,
    isAdmin,
    isDashboardOpen,
    closeDashboard,
    logout,
    projects,
  } = useAdmin();

  const [activeTab, setActiveTab] = useState<'list' | 'create' | 'edit'>('list');
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Image Source Mode: 'gallery' (from files/phone album), 'url', or 'presets'
  const [imageInputMode, setImageInputMode] = useState<'gallery' | 'url' | 'presets'>('gallery');
  const [isProcessingImage, setIsProcessingImage] = useState(false);
  const [uploadedImageMeta, setUploadedImageMeta] = useState<CompressedImageResult | null>(null);
  const [isDraggingFile, setIsDraggingFile] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'majlis' as 'majlis' | 'tv-units' | 'bedrooms' | 'storage',
    categoryLabel: '',
    district: '',
    image: '',
    description: '',
    paintType: '',
    materials: '',
    lighting: '',
    duration: '',
    tagsString: '',
    featured: false,
    span: 'lg:col-span-4',
    viewsCount: 0,
  });

  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(
    null
  );
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  if (!isDashboardOpen) return null;

  const showNotification = (type: 'success' | 'error', message: string) => {
    setFeedback({ type, message });
    setTimeout(() => setFeedback(null), 4000);
  };

  const handleOpenCreate = () => {
    soundEngine.playClick();
    setEditingProject(null);
    setUploadedImageMeta(null);
    setImageInputMode('gallery');
    setFormData({
      title: '',
      category: 'majlis',
      categoryLabel: 'صالات ومجالس ملكية',
      district: 'حي حطين – الرياض',
      image: '',
      description: '',
      paintType: 'جوتن فينوماستيك ريتش مات ناعم الحرير',
      materials: 'بديل خشب كوري + بانوهات جدارية',
      lighting: 'شريط ليد مخفي 3000 كلفن دافئ',
      duration: '٤ إلى ٥ أيام عمل',
      tagsString: 'دهان جوتن ناعم, بديل خشب, إضاءة ليد مخفية',
      featured: false,
      span: 'lg:col-span-4',
      viewsCount: 0,
    });
    setActiveTab('create');
  };

  const handleOpenEdit = (project: Project) => {
    soundEngine.playClick();
    setEditingProject(project);
    setUploadedImageMeta(null);
    setImageInputMode(project.image.startsWith('data:') ? 'gallery' : 'url');
    setFormData({
      title: project.title,
      category: project.category,
      categoryLabel: project.categoryLabel || '',
      district: project.district || '',
      image: project.image,
      description: project.description || '',
      paintType: project.specs?.paintType || '',
      materials: project.specs?.materials || '',
      lighting: project.specs?.lighting || '',
      duration: project.specs?.duration || '',
      tagsString: project.tags?.join(', ') || '',
      featured: Boolean(project.featured),
      span: project.span || 'lg:col-span-4',
      viewsCount: typeof project.viewsCount === 'number' ? project.viewsCount : 0,
    });
    setActiveTab('edit');
  };

  // Process image from gallery or file picker
  const handleFileSelect = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      showNotification('error', 'يرجى اختيار ملف صورة صالح (JPG, PNG, WebP)');
      return;
    }

    setIsProcessingImage(true);
    soundEngine.playClick();

    try {
      // Auto compress and optimize to crisp interior quality within Firestore limit
      const result = await compressImageFile(file, 1600, 1600, 0.84);
      setUploadedImageMeta(result);
      setFormData((prev) => ({ ...prev, image: result.dataUrl }));
      showNotification(
        'success',
        `تم اختيار وضغط الصورة بنجاح (${formatBytes(result.compressedSize)})`
      );
      soundEngine.playChime();
    } catch (err: any) {
      console.error('Image compression error:', err);
      showNotification('error', err.message || 'فشل معالجة الصورة، يرجى تجربة صورة أخرى');
    } finally {
      setIsProcessingImage(false);
    }
  };

  const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const onDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(true);
  };

  const onDragLeave = () => {
    setIsDraggingFile(false);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDraggingFile(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.image.trim() || !formData.district.trim()) {
      showNotification(
        'error',
        'يرجى تعبئة الحقول الأساسية: العنوان، الحي، واختيار صورة للعمل من المعرض أو الرابط'
      );
      return;
    }

    setSubmitting(true);
    soundEngine.playClick();

    const tagsArray = formData.tagsString
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    const projectPayload = {
      title: formData.title.trim(),
      category: formData.category,
      categoryLabel:
        formData.categoryLabel.trim() ||
        (formData.category === 'majlis'
          ? 'صالات ومجالس'
          : formData.category === 'tv-units'
          ? 'ديكورات الشاشات'
          : formData.category === 'bedrooms'
          ? 'غرف النوم'
          : 'حلول المساحات'),
      district: formData.district.trim(),
      image: formData.image.trim(),
      description: formData.description.trim(),
      tags: tagsArray,
      featured: formData.featured,
      span: formData.span,
      viewsCount: typeof formData.viewsCount === 'number' ? formData.viewsCount : (editingProject?.viewsCount || 0),
      specs: {
        paintType: formData.paintType.trim() || undefined,
        materials: formData.materials.trim() || undefined,
        lighting: formData.lighting.trim() || undefined,
        duration: formData.duration.trim() || undefined,
      },
    };

    try {
      if (editingProject) {
        await updateProject(editingProject.id, projectPayload);
        showNotification('success', 'تم تعديل بيانات وصورة المشروع بنجاح ومزامنته فورياً مع المعرض');
      } else {
        await addProject(projectPayload);
        showNotification('success', 'تمت إضافة المشروع الجديد بصورته بنجاح إلى المعرض!');
      }
      soundEngine.playChime();
      setActiveTab('list');
      setEditingProject(null);
    } catch (err: any) {
      console.error('Error saving project:', err);
      showNotification('error', 'تعذر حفظ المشروع. تحقق من الاتصال وقواعد البيانات.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteProject = async (id: string) => {
    soundEngine.playClick();
    setSubmitting(true);
    try {
      await removeProject(id);
      showNotification('success', 'تم حذف العمل من المعرض بنجاح');
      setDeleteConfirmId(null);
      soundEngine.playChime();
    } catch (err) {
      console.error('Error deleting project:', err);
      showNotification('error', 'تعذر حذف العمل، يرجى المحاولة لاحقاً');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSeedDefaults = async () => {
    soundEngine.playClick();
    setSubmitting(true);
    try {
      await seedInitialProjects(DEFAULT_PROJECTS);
      showNotification('success', 'تمت مزامنة المشاريع النموذجية مع قاعدة بيانات Firestore بنجاح');
      soundEngine.playChime();
    } catch (err) {
      console.error('Error seeding projects:', err);
      showNotification('error', 'تعذر استيراد المشاريع النموذجية');
    } finally {
      setSubmitting(false);
    }
  };

  // Analytics calculations for project views
  const totalViews = projects.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const sortedProjectsByViews = [...projects].sort((a, b) => (b.viewsCount || 0) - (a.viewsCount || 0));
  const topProject =
    sortedProjectsByViews.length > 0 && (sortedProjectsByViews[0].viewsCount || 0) > 0
      ? sortedProjectsByViews[0]
      : null;
  const avgViews = projects.length > 0 ? Math.round(totalViews / projects.length) : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-md animate-fade-in"
      dir="rtl"
    >
      <div className="relative w-full max-w-5xl max-h-[92vh] bg-[#fffaf5] rounded-3xl shadow-2xl border border-[#c5a059]/40 flex flex-col overflow-hidden text-[#1e1b17]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-[#2a241c] via-[#3a3227] to-[#2a241c] text-white flex items-center justify-between border-b border-[#c5a059]/30">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#c5a059]/20 border border-[#c5a059]/40 flex items-center justify-center text-[#e5be70]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-lg text-white">لوحة تحكم معرض الأعمال وصور العرض</h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-[#c5a059] text-[#2a241c]">
                  إدارة حية
                </span>
              </div>
              <p className="text-xs text-stone-300">
                أثر نجد للدهانات والديكورات • التحكم المباشر بمحتوى المعرض وقاعدة البيانات
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {currentUser && (
              <div className="hidden sm:flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 text-xs">
                {currentUser.photoURL && (
                  <img
                    src={currentUser.photoURL}
                    alt="admin"
                    className="w-5 h-5 rounded-full object-cover"
                  />
                )}
                {/* Discrete Admin Title without revealing private email string */}
                <span className="text-stone-200 font-medium">حساب مالك المنصة</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
            )}
            <button
              onClick={() => {
                soundEngine.playClick();
                closeDashboard();
              }}
              className="p-2 rounded-xl text-stone-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              title="إغلاق"
              aria-label="إغلاق"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feedback Alert */}
        {feedback && (
          <div
            className={`px-6 py-3 flex items-center gap-2.5 text-sm font-medium transition-all ${
              feedback.type === 'success'
                ? 'bg-emerald-50 text-emerald-800 border-b border-emerald-200'
                : 'bg-rose-50 text-rose-800 border-b border-rose-200'
            }`}
          >
            {feedback.type === 'success' ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
            )}
            <span>{feedback.message}</span>
          </div>
        )}

        {/* Toolbar & Tabs */}
        <div className="px-6 py-3 bg-[#f5ebe1] border-b border-[#e2d4c5] flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                soundEngine.playClick();
                setActiveTab('list');
                setEditingProject(null);
              }}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'list'
                  ? 'bg-[#c5a059] text-[#2a241c] shadow-sm'
                  : 'bg-white text-[#4e4639] hover:bg-[#eae0d5]'
              }`}
            >
              قائمة الأعمال ({projects.length})
            </button>
            <button
              onClick={handleOpenCreate}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'create'
                  ? 'bg-[#c5a059] text-[#2a241c] shadow-sm'
                  : 'bg-white text-[#4e4639] hover:bg-[#eae0d5]'
              }`}
            >
              <Plus className="w-3.5 h-3.5" />
              <span>إضافة عمل جديد</span>
            </button>
            {activeTab === 'edit' && (
              <span className="px-3 py-1.5 bg-[#e4d5c4] text-[#2a241c] rounded-xl text-xs font-bold flex items-center gap-1">
                <Edit3 className="w-3.5 h-3.5 text-[#775a19]" />
                <span>تعديل: {editingProject?.title.slice(0, 24)}...</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleSeedDefaults}
              disabled={submitting}
              className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-white text-[#775a19] text-xs font-medium border border-[#d6c4b2] flex items-center gap-1.5 cursor-pointer transition-colors"
              title="مزامنة المشاريع الافتراضية مع Firestore"
            >
              <UploadCloud className="w-3.5 h-3.5" />
              <span>حفظ النماذج في السحاب</span>
            </button>
            <button
              onClick={async () => {
                soundEngine.playClick();
                await logout();
              }}
              className="px-3 py-1.5 rounded-lg bg-white/80 hover:bg-rose-50 text-rose-700 text-xs font-medium border border-rose-200 flex items-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>تسجيل الخروج</span>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 bg-[#fffaf5]">
          {activeTab === 'list' && (
            <div className="space-y-5">
              {/* Views & Performance Analytics Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Total views */}
                <div className="p-4 rounded-2xl bg-white border border-[#e8ded3] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#775a19] block mb-1">
                      إجمالي المشاهدات لكافة الأعمال
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold text-[#1e1b17] font-mono">
                        {totalViews.toLocaleString('ar-SA')}
                      </span>
                      <span className="text-xs text-[#6e6354] font-medium">مشاهدة</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#9a7522]">
                    <Eye className="w-5 h-5" />
                  </div>
                </div>

                {/* Top viewed project */}
                <div className="p-4 rounded-2xl bg-white border border-[#e8ded3] shadow-xs flex items-center justify-between">
                  <div className="min-w-0 flex-1 ml-2">
                    <span className="text-[11px] font-bold text-[#775a19] flex items-center gap-1 mb-1">
                      <Award className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>العمل الأكثر تفاعلاً ومشاهدة</span>
                    </span>
                    {topProject ? (
                      <div>
                        <h5 className="text-xs font-bold text-[#1e1b17] truncate" title={topProject.title}>
                          {topProject.title}
                        </h5>
                        <span className="text-[11px] text-[#9a7522] font-semibold mt-0.5 block">
                          {(topProject.viewsCount || 0).toLocaleString('ar-SA')} مشاهدة • {topProject.district}
                        </span>
                      </div>
                    ) : (
                      <span className="text-xs text-[#8c8072]">لا توجد بيانات مشاهدات بعد</span>
                    )}
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#9a7522] shrink-0">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>

                {/* Average views per work */}
                <div className="p-4 rounded-2xl bg-white border border-[#e8ded3] shadow-xs flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-bold text-[#775a19] block mb-1">
                      معدل المشاهدات لكل عمل
                    </span>
                    <div className="flex items-baseline gap-1.5">
                      <span className="text-2xl font-extrabold text-[#1e1b17] font-mono">
                        {avgViews.toLocaleString('ar-SA')}
                      </span>
                      <span className="text-xs text-[#6e6354] font-medium">مشاهدة / عمل</span>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-xl bg-[#c5a059]/15 border border-[#c5a059]/30 flex items-center justify-center text-[#9a7522]">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#6e6354] px-1">
                <span>
                  إجمالي الأعمال المعروضة للزوار: <strong>{projects.length}</strong> عمل
                </span>
                <span>المشاهدات تُحدث آلياً وتخزن سحابياً في Firestore</span>
              </div>

              {projects.length === 0 ? (
                <div className="py-16 text-center bg-white rounded-2xl border border-dashed border-[#c5a059]/40 p-8 space-y-3">
                  <Layers className="w-12 h-12 mx-auto text-[#c5a059]" />
                  <h4 className="font-bold text-base text-[#1e1b17]">لا توجد مشاريع مضافة حالياً</h4>
                  <p className="text-xs text-[#6e6354] max-w-md mx-auto">
                    يمكنك إضافة عمل جديد واختيار صورته من ألبوم الصور أو ملفات جهازك
                  </p>
                  <div className="flex items-center justify-center gap-3 pt-2">
                    <button
                      onClick={handleOpenCreate}
                      className="px-4 py-2 bg-[#c5a059] text-[#2a241c] text-xs font-bold rounded-xl cursor-pointer"
                    >
                      إضافة أول عمل
                    </button>
                    <button
                      onClick={handleSeedDefaults}
                      className="px-4 py-2 bg-[#eee7e1] text-[#4e4639] text-xs font-bold rounded-xl cursor-pointer"
                    >
                      استيراد النماذج
                    </button>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {projects.map((proj) => (
                    <div
                      key={proj.id}
                      className="bg-white rounded-2xl border border-[#e8ded3] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col group"
                    >
                      {/* Image Thumbnail */}
                      <div className="relative h-44 bg-[#f4ede6] overflow-hidden">
                        <img
                          src={proj.image}
                          alt={proj.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-2.5 right-2.5 bg-black/70 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-medium text-white flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-[#c5a059]" />
                          <span>{proj.district}</span>
                        </div>
                        <div className="absolute top-2.5 left-2.5 bg-[#c5a059] px-2 py-0.5 rounded-full text-[11px] font-bold text-[#2a241c]">
                          {proj.category === 'majlis'
                            ? 'مجلس / صالة'
                            : proj.category === 'tv-units'
                            ? 'شاشات TV'
                            : proj.category === 'bedrooms'
                            ? 'غرف نوم'
                            : 'تخزين ودواليب'}
                        </div>
                        {/* Live views counter badge on thumbnail */}
                        <div className="absolute bottom-2.5 right-2.5 bg-black/75 backdrop-blur-md px-2.5 py-1 rounded-full text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/10 shadow-sm">
                          <Eye className="w-3.5 h-3.5 text-[#e5be70]" />
                          <span>{(proj.viewsCount || 0).toLocaleString('ar-SA')} مشاهدة</span>
                        </div>
                      </div>

                      {/* Info & Details */}
                      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <h4 className="font-bold text-sm text-[#1e1b17] line-clamp-1">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-[#6e6354] line-clamp-2 mt-1 leading-relaxed">
                            {proj.description || 'تنفيذ احترافي من أثر نجد مع تناغم الخامات والإنارة.'}
                          </p>
                        </div>

                        {/* Specs Mini badges */}
                        {proj.specs && (
                          <div className="flex flex-wrap gap-1.5 pt-1 text-[11px] text-[#775a19]">
                            {proj.specs.paintType && (
                              <span className="px-2 py-0.5 bg-[#fbf5ee] rounded-md border border-[#eee2d2]">
                                {proj.specs.paintType.slice(0, 22)}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Action buttons & views counter */}
                        <div className="pt-2 border-t border-[#f0e7dd] flex items-center justify-between gap-2">
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => handleOpenEdit(proj)}
                              className="px-3 py-1.5 rounded-lg bg-[#fbf5ee] hover:bg-[#c5a059] hover:text-[#2a241c] text-[#775a19] text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                              <span>تعديل</span>
                            </button>
                            <button
                              onClick={() => setDeleteConfirmId(proj.id)}
                              className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-700 transition-colors cursor-pointer"
                              title="حذف العمل"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>

                          <div className="flex items-center gap-1.5">
                            <div
                              className="flex items-center gap-1 text-[11px] text-[#775a19] bg-[#fbf5ee] px-2.5 py-1 rounded-lg border border-[#eee2d2]"
                              title="إجمالي المشاهدات المسجلة"
                            >
                              <Eye className="w-3 h-3 text-[#c5a059]" />
                              <span className="font-bold">{(proj.viewsCount || 0).toLocaleString('ar-SA')}</span>
                            </div>
                            {proj.image.startsWith('http') && (
                              <a
                                href={proj.image}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-1.5 text-stone-400 hover:text-[#775a19] transition-colors"
                                title="فتح الصورة الأصلية"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            )}
                          </div>
                        </div>

                        {/* Inline Delete Confirmation */}
                        {deleteConfirmId === proj.id && (
                          <div className="p-2.5 bg-rose-50 border border-rose-200 rounded-xl space-y-2 mt-2">
                            <p className="text-xs text-rose-800 font-bold">
                              هل أنت متأكد من حذف هذا العمل نهائياً من المعرض؟
                            </p>
                            <div className="flex items-center gap-2 justify-end">
                              <button
                                onClick={() => setDeleteConfirmId(null)}
                                className="px-2.5 py-1 text-xs text-stone-600 bg-white rounded-md cursor-pointer"
                              >
                                إلغاء
                              </button>
                              <button
                                onClick={() => handleDeleteProject(proj.id)}
                                disabled={submitting}
                                className="px-2.5 py-1 text-xs text-white bg-rose-600 hover:bg-rose-700 font-bold rounded-md cursor-pointer"
                              >
                                {submitting ? 'جارٍ الحذف...' : 'نعم، احذف'}
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Create or Edit Form */}
          {(activeTab === 'create' || activeTab === 'edit') && (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-3xl mx-auto pb-6">
              <div className="bg-white p-5 sm:p-7 rounded-3xl border border-[#e8ded3] shadow-xs space-y-5">
                <div className="flex items-center justify-between border-b border-[#f0e7dd] pb-3">
                  <div className="flex items-center gap-2 text-[#775a19] font-bold text-sm">
                    <Paintbrush className="w-4 h-4 text-[#c5a059]" />
                    <span>
                      {activeTab === 'create' ? 'إضافة عمل وصورة جديدة' : 'تعديل بيانات العمل والصور'}
                    </span>
                  </div>
                  <span className="text-xs text-[#8c7f6f]">* الحقول المطلوبة مشار إليها</span>
                </div>

                {/* Title */}
                <div>
                  <label className="block text-xs font-bold text-[#2a241c] mb-1.5">
                    عنوان العمل / المشروع *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="مثال: مجلس استقبال مفتوح بتناغم السقف والإنارة المخفية"
                    required
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6c4b2] text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] bg-[#fffaf5]"
                  />
                </div>

                {/* Category & District */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-[#2a241c] mb-1.5">
                      القسم / التصنيف *
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          category: e.target.value as any,
                        })
                      }
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6c4b2] text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] bg-[#fffaf5] cursor-pointer"
                    >
                      <option value="majlis">صالات ومجالس</option>
                      <option value="tv-units">ديكورات الشاشات</option>
                      <option value="bedrooms">غرف النوم</option>
                      <option value="storage">حلول المساحات والتخزين</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#2a241c] mb-1.5">
                      الحي والموقع بالرياض *
                    </label>
                    <input
                      type="text"
                      value={formData.district}
                      onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                      placeholder="مثال: حي حطين – الرياض"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6c4b2] text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] bg-[#fffaf5]"
                    />
                  </div>
                </div>

                {/* --- ADVANCED IMAGE SELECTION (Gallery / Files / URL / Presets) --- */}
                <div className="space-y-3 pt-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <label className="block text-xs font-bold text-[#2a241c]">
                      صورة العمل أو المشروع *
                    </label>

                    {/* Method Selector Tabs */}
                    <div className="flex items-center gap-1 bg-[#f4ede6] p-1 rounded-xl">
                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setImageInputMode('gallery');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          imageInputMode === 'gallery'
                            ? 'bg-white text-[#775a19] shadow-xs'
                            : 'text-[#5c5040] hover:text-[#1e1b17]'
                        }`}
                      >
                        <FolderOpen className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>من المعرض والملفات</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setImageInputMode('url');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          imageInputMode === 'url'
                            ? 'bg-white text-[#775a19] shadow-xs'
                            : 'text-[#5c5040] hover:text-[#1e1b17]'
                        }`}
                      >
                        <LinkIcon className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>رابط إنترنت (URL)</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          soundEngine.playClick();
                          setImageInputMode('presets');
                        }}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                          imageInputMode === 'presets'
                            ? 'bg-white text-[#775a19] shadow-xs'
                            : 'text-[#5c5040] hover:text-[#1e1b17]'
                        }`}
                      >
                        <Sparkles className="w-3.5 h-3.5 text-[#c5a059]" />
                        <span>نماذج جاهزة</span>
                      </button>
                    </div>
                  </div>

                  {/* Mode 1: Device Gallery / File Picker */}
                  {imageInputMode === 'gallery' && (
                    <div className="space-y-3">
                      {/* Hidden native input with camera & photo album accept */}
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onFileInputChange}
                      />

                      {/* Dropzone Box */}
                      <div
                        onDragOver={onDragOver}
                        onDragLeave={onDragLeave}
                        onDrop={onDrop}
                        onClick={() => fileInputRef.current?.click()}
                        className={`relative p-6 sm:p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer text-center flex flex-col items-center justify-center gap-3 ${
                          isDraggingFile
                            ? 'border-[#c5a059] bg-[#fdf7ed]'
                            : 'border-[#d6c4b2] hover:border-[#c5a059] bg-[#fffaf5] hover:bg-[#faf2ec]'
                        }`}
                      >
                        <div className="w-14 h-14 rounded-2xl bg-[#c5a059]/15 text-[#775a19] flex items-center justify-center">
                          {isProcessingImage ? (
                            <RefreshCw className="w-7 h-7 animate-spin text-[#c5a059]" />
                          ) : (
                            <ImageIcon className="w-7 h-7" />
                          )}
                        </div>

                        <div>
                          <h4 className="font-bold text-sm text-[#1e1b17] mb-1">
                            {isProcessingImage
                              ? 'جارٍ ضغط ومعالجة الصورة بجودة فائقة...'
                              : 'انقر هنا لاختيار صورة من معرض الصور أو ملفات الجهاز'}
                          </h4>
                          <p className="text-xs text-[#7d7060]">
                            يدعم التقاط الكاميرا، صور الألبوم، أو السحب والإفلات (JPG, PNG, WebP)
                          </p>
                        </div>

                        <button
                          type="button"
                          className="px-4 py-2 rounded-xl bg-[#c5a059] text-[#2a241c] text-xs font-bold shadow-xs hover:bg-[#d8b163] transition-all flex items-center gap-1.5"
                        >
                          <FolderOpen className="w-4 h-4" />
                          <span>تصفح ألبوم الصور / الملفات</span>
                        </button>
                      </div>

                      {/* Upload info banner */}
                      {uploadedImageMeta && (
                        <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-800 flex items-center justify-between">
                          <div className="flex items-center gap-2 truncate">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                            <span className="truncate font-medium">{uploadedImageMeta.fileName}</span>
                            <span className="text-[11px] text-emerald-700">
                              ({uploadedImageMeta.width}×{uploadedImageMeta.height} px)
                            </span>
                          </div>
                          <span className="font-bold text-emerald-900 bg-white px-2 py-0.5 rounded-md border border-emerald-200 text-[11px] shrink-0">
                            الحجم المحسن: {formatBytes(uploadedImageMeta.compressedSize)}
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Mode 2: External Image URL */}
                  {imageInputMode === 'url' && (
                    <div className="space-y-2">
                      <input
                        type="url"
                        value={formData.image}
                        onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                        placeholder="https://images.unsplash.com/photo-..."
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6c4b2] text-xs font-mono focus:outline-none focus:ring-2 focus:ring-[#c5a059] bg-[#fffaf5]"
                        dir="ltr"
                      />
                      <p className="text-[11px] text-[#7d7060]">
                        يمكنك لصق رابط مباشر لأي صورة من Unsplash أو روابط Cloudinary أو خوادم الصور.
                      </p>
                    </div>
                  )}

                  {/* Mode 3: Ready Luxury Presets */}
                  {imageInputMode === 'presets' && (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {IMAGE_PRESETS.map((preset, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => {
                              soundEngine.playClick();
                              setFormData({
                                ...formData,
                                image: preset.url,
                                category: preset.category as any,
                              });
                            }}
                            className={`p-2 rounded-xl border text-right cursor-pointer transition-all flex items-center gap-2 ${
                              formData.image === preset.url
                                ? 'bg-[#c5a059]/15 border-[#c5a059] ring-2 ring-[#c5a059]/50 font-bold'
                                : 'bg-[#fffaf5] border-[#e2d4c5] hover:bg-[#fbf5ee]'
                            }`}
                          >
                            <img
                              src={preset.url}
                              alt={preset.label}
                              className="w-10 h-10 rounded-lg object-cover"
                            />
                            <div className="min-w-0 flex-1">
                              <span className="text-xs text-[#1e1b17] block truncate">
                                {preset.label}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Live Image Preview Frame */}
                  {formData.image && (
                    <div className="relative rounded-2xl overflow-hidden border border-[#d6c4b2] bg-stone-100 h-52 sm:h-64 mt-3 group">
                      <img
                        src={formData.image}
                        alt="معاينة العمل"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as any).src =
                            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 flex items-end justify-between p-3 sm:p-4 text-white">
                        <div className="flex items-center gap-2">
                          <Eye className="w-4 h-4 text-[#c5a059]" />
                          <span className="text-xs font-bold">معاينة ظهور الصورة في المعرض</span>
                        </div>

                        <button
                          type="button"
                          onClick={() => {
                            if (fileInputRef.current) {
                              fileInputRef.current.value = '';
                            }
                            setFormData({ ...formData, image: '' });
                            setUploadedImageMeta(null);
                          }}
                          className="px-2.5 py-1 rounded-lg bg-black/60 hover:bg-rose-600/80 text-white text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                          <span>إزالة الصورة</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {/* Description */}
                <div>
                  <label className="block text-xs font-bold text-[#2a241c] mb-1.5">
                    وصف العمل واللمسات الفنية
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="مثال: تنفيذ بانوهات ناعمة مع دمج بديل خشب عمودي مفرغ يضفي على المجلس سكينة وراحة بصرية..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6c4b2] text-sm focus:outline-none focus:ring-2 focus:ring-[#c5a059] bg-[#fffaf5] leading-relaxed"
                  />
                </div>

                {/* Technical Specifications */}
                <div className="pt-2 border-t border-[#f0e7dd] space-y-3">
                  <h5 className="text-xs font-bold text-[#775a19]">المواصفات الفنية للتشطيب:</h5>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] text-[#4e4639] mb-1">
                        نوع الدهان والدرجة
                      </label>
                      <input
                        type="text"
                        value={formData.paintType}
                        onChange={(e) => setFormData({ ...formData, paintType: e.target.value })}
                        placeholder="مثال: جوتن فينوماستيك ريتش مات"
                        className="w-full px-3 py-2 rounded-lg border border-[#d6c4b2] text-xs bg-[#fffaf5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#4e4639] mb-1">
                        الخامات والمواد المركبة
                      </label>
                      <input
                        type="text"
                        value={formData.materials}
                        onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                        placeholder="مثال: بديل خشب WPC مضلع + بانوهات فوم"
                        className="w-full px-3 py-2 rounded-lg border border-[#d6c4b2] text-xs bg-[#fffaf5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#4e4639] mb-1">
                        تفاصيل الإضاءة المخفية
                      </label>
                      <input
                        type="text"
                        value={formData.lighting}
                        onChange={(e) => setFormData({ ...formData, lighting: e.target.value })}
                        placeholder="مثال: شريط ليد COB تدرج دافئ 3000K"
                        className="w-full px-3 py-2 rounded-lg border border-[#d6c4b2] text-xs bg-[#fffaf5]"
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] text-[#4e4639] mb-1">مدة الإنجاز</label>
                      <input
                        type="text"
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="مثال: ٤ إلى ٥ أيام عمل"
                        className="w-full px-3 py-2 rounded-lg border border-[#d6c4b2] text-xs bg-[#fffaf5]"
                      />
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-xs font-bold text-[#2a241c] mb-1">
                    الكلمات الدلالية (مفصولة بفاصلة)
                  </label>
                  <input
                    type="text"
                    value={formData.tagsString}
                    onChange={(e) => setFormData({ ...formData, tagsString: e.target.value })}
                    placeholder="دهان جوتن, بديل خشب كوري, إضاءة مخفية"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d6c4b2] text-xs bg-[#fffaf5]"
                  />
                </div>

                {/* Views Count Field */}
                <div className="p-3.5 bg-[#fbf6f0] rounded-xl border border-[#e8ded3] space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#2a241c] flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-[#c5a059]" />
                      <span>عدد مشاهدات هذا العمل</span>
                    </label>
                    <span className="text-[11px] text-[#775a19] font-medium bg-[#f5ebe1] px-2 py-0.5 rounded-md">
                      يُحدث تلقائياً مع كل زائر
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      min="0"
                      value={formData.viewsCount}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          viewsCount: Math.max(0, parseInt(e.target.value, 10) || 0),
                        })
                      }
                      className="w-36 px-3 py-1.5 rounded-lg border border-[#d6c4b2] text-xs bg-white font-mono font-bold text-[#1e1b17] focus:outline-none focus:ring-2 focus:ring-[#c5a059]"
                      placeholder="0"
                    />
                    <span className="text-xs text-[#6e6354]">مشاهدة مسجلة في قاعدة البيانات</span>
                  </div>
                  <p className="text-[11px] text-[#7d7060]">
                    يتم احتساب المشاهدات آلياً عند تصفح الزوار لتفاصيل العمل، ويمكنك ضبط العداد أو تعديله في أي وقت.
                  </p>
                </div>

                {/* Grid layout preference */}
                <div className="flex items-center gap-6 pt-1 text-xs">
                  <label className="flex items-center gap-2 cursor-pointer font-medium text-[#2a241c]">
                    <input
                      type="checkbox"
                      checked={formData.featured}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="w-4 h-4 rounded text-[#c5a059] focus:ring-[#c5a059] cursor-pointer"
                    />
                    <span>تمييز هذا المشروع كعمل رئيسي (Featured)</span>
                  </label>

                  <div className="flex items-center gap-2">
                    <span className="text-[#6e6354]">عرض البطاقة:</span>
                    <select
                      value={formData.span}
                      onChange={(e) => setFormData({ ...formData, span: e.target.value })}
                      className="px-2 py-1 rounded-md border border-[#d6c4b2] text-xs bg-[#fffaf5]"
                    >
                      <option value="lg:col-span-4">حجم قياسي (ثلث العرض)</option>
                      <option value="lg:col-span-8">عرض مضاعف (ثُلثين العرض)</option>
                      <option value="lg:col-span-6">نصف العرض</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Form Submit & Cancel */}
              <div className="flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => {
                    soundEngine.playClick();
                    setActiveTab('list');
                    setEditingProject(null);
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[#d6c4b2] text-xs font-bold text-[#4e4639] hover:bg-[#eee5db] cursor-pointer"
                >
                  إلغاء
                </button>
                <button
                  type="submit"
                  disabled={submitting || isProcessingImage || !formData.image}
                  className="px-7 py-2.5 rounded-xl bg-[#c5a059] hover:bg-[#d8b163] text-[#2a241c] text-xs font-bold shadow-md cursor-pointer transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>
                    {submitting
                      ? 'جارٍ الحفظ والمزامنة السحابية...'
                      : activeTab === 'create'
                      ? 'نشر العمل في المعرض الآن'
                      : 'حفظ التعديلات'}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
