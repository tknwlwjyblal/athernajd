import React, { useState } from 'react';
import { Eye, Shield, Sparkles, Plus, SlidersHorizontal, Layers, Tv, Bed, Box, Paintbrush } from 'lucide-react';
import { Project } from '../types';
import { ProjectDetailModal } from './ProjectDetailModal';
import { PaintBrushSweepOverlay } from './PaintBrushSweepOverlay';
import { TiltCard } from './TiltCard';
import { ScrollReveal } from './ScrollReveal';
import { soundEngine } from '../utils/audioEffects';
import { useAdmin } from '../context/AdminContext';
import { incrementProjectViews } from '../lib/firebase';
import { triggerGoldenBurst } from '../utils/sparkleBurst';

interface ProjectsShowcaseProps {
  onBookSimilar: (projectTitle: string) => void;
  onOpenAdminLogin?: () => void;
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({
  onBookSimilar,
  onOpenAdminLogin,
}) => {
  const { projects, isAdmin, openDashboard } = useAdmin();
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [sweepingProject, setSweepingProject] = useState<Project | null>(null);

  const filters = [
    { id: 'all', label: 'الكل', icon: Sparkles },
    { id: 'majlis', label: 'صالات ومجالس', icon: Layers },
    { id: 'tv-units', label: 'ديكورات الشاشات', icon: Tv },
    { id: 'bedrooms', label: 'غرف النوم', icon: Bed },
    { id: 'storage', label: 'حلول المساحات', icon: Box },
  ];

  const filteredProjects =
    selectedFilter === 'all'
      ? projects
      : projects.filter((p) => p.category === selectedFilter);

  const handleOpenProjectWithBrush = (project: Project, e: React.MouseEvent) => {
    e.stopPropagation();
    soundEngine.playBrushStroke();
    triggerGoldenBurst(e.clientX, e.clientY, 28);
    incrementProjectViews(project.id);
    setSweepingProject(project);
  };

  return (
    <section className="w-full py-12 sm:py-16 bg-[#fff8f3]" id="projects-showcase">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 sm:mb-12">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-[#775a19] text-xs sm:text-sm font-semibold">
              <span className="w-4 h-0.5 bg-[#c5a059]"></span>
              <span>واقعية المواد والنور الطبيعي</span>
            </div>
            <h2 className="text-2xl sm:3xl lg:text-4xl font-bold text-[#1e1b17]">
              معرض الأعمال الواقعية بألوان طبيعية مشرقة
            </h2>
            <p className="text-sm sm:text-base text-[#4e4639] max-w-2xl leading-relaxed">
              مشاهد حية وموثقة من مواقعنا السكنية في أحياء الرياض، مجردة من الفلاتر المصطنعة لتشهد دقة التشطيب ونعومة الأسطح.
            </p>
          </div>

          {/* Filter Chips & Admin Quick Control with Interactive Bursts */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2">
              <span className="text-[#655e51] text-xs font-medium ml-1">تصفية حسب النمط:</span>
              {filters.map((f) => {
                const isActive = selectedFilter === f.id;
                const Icon = f.icon;
                return (
                  <button
                    key={f.id}
                    onClick={(e) => {
                      soundEngine.playClick();
                      triggerGoldenBurst(e.clientX, e.clientY, 15);
                      setSelectedFilter(f.id);
                    }}
                    className={`px-3 sm:px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-[#c5a059] text-[#4e3700] font-bold shadow-xs scale-105 ring-1 ring-[#c5a059]'
                        : 'bg-[#eee7e1] text-[#4e4639] hover:bg-[#e8e1db] hover:scale-102'
                    }`}
                  >
                    <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#4e3700] animate-bounce-gentle' : 'text-[#775a19]'}`} />
                    <span>{f.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Projects Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6">
          {filteredProjects.map((project, idx) => (
            <div key={project.id} className={`${project.span || 'lg:col-span-4'}`}>
              <ScrollReveal delay={idx * 60} direction="up" className="h-full">
                <TiltCard
                  maxTilt={5}
                  onClick={(e) => handleOpenProjectWithBrush(project, e)}
                  className="h-full"
                >
                  <div
                    data-interactive="true"
                    data-cursor-action="كشف العمل"
                    className="flex flex-col h-full rounded-2xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#eee7e1] hover:border-[#c5a059]/60"
                  >
                    {/* Project Image Frame */}
                    <div
                      className={`relative w-full ${
                        project.id === 'p1' || project.span === 'lg:col-span-8'
                          ? 'h-[340px] sm:h-[420px]'
                          : project.id === 'p6' || project.id === 'p7'
                          ? 'h-[260px] sm:h-[300px]'
                          : 'h-[300px] sm:h-[320px]'
                      } overflow-hidden bg-[#f4ede6]`}
                    >
                      <img
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        src={project.image}
                        loading="lazy"
                        onError={(e) => {
                          (e.target as any).src =
                            'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85';
                        }}
                      />
                      <span className="absolute top-4 right-4 px-3 py-1 rounded-full bg-[#fff8f3]/95 backdrop-blur-sm text-[#1e1b17] text-xs font-semibold shadow-xs">
                        {project.district}
                      </span>

                      {/* Paintbrush Reveal Hover Callout */}
                      <div className="absolute inset-0 bg-black/35 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center gap-2.5 p-4">
                        <button
                          onClick={(e) => handleOpenProjectWithBrush(project, e)}
                          className="px-4 py-2.5 rounded-xl bg-white/95 hover:bg-white text-[#1e1b17] text-xs font-bold shadow-lg flex items-center gap-2 transform translate-y-2 group-hover:translate-y-0 transition-all border border-[#c5a059]/40 cursor-pointer active:scale-95"
                        >
                          <Paintbrush className="w-4 h-4 text-[#c5a059] animate-bounce-gentle" />
                          <span>عرض العمل بمسحة الفرشاة</span>
                        </button>
                        <span className="text-[11px] text-white/95 drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)] font-medium">
                          انقر للكشف بلمسة دهان معمارية
                        </span>
                      </div>
                    </div>

                    {/* Project Card Content */}
                    <div className="p-5 sm:p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex items-center gap-2 mb-2 text-[#775a19] text-xs font-semibold">
                          <span>{project.categoryLabel}</span>
                        </div>
                        <h3 className="text-lg sm:text-xl font-bold text-[#1e1b17] mb-2 group-hover:text-[#775a19] transition-colors leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-[#4e4639] leading-relaxed line-clamp-3">
                          {project.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-[#f4ede6] flex items-center justify-between gap-2">
                        <div className="flex flex-wrap items-center gap-1.5 flex-1">
                          {project.tags?.map((tag, tagIdx) => (
                            <span
                              key={tagIdx}
                              className="px-2.5 py-1 rounded-lg bg-[#faf2ec] text-[11px] font-medium text-[#576155]"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                        {isAdmin && typeof project.viewsCount === 'number' && project.viewsCount > 0 && (
                          <div
                            className="flex items-center gap-1 text-[11px] text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200 shrink-0 font-semibold"
                            title="خاص بالإدارة: إحصائية عدد المشاهدات"
                          >
                            <Eye className="w-3 h-3 text-amber-600" />
                            <span>{project.viewsCount.toLocaleString('ar-SA')}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              </ScrollReveal>
            </div>
          ))}
        </div>
      </div>

      {/* Paint Brush Sweep Transition Overlay */}
      <PaintBrushSweepOverlay
        project={sweepingProject}
        onFinished={() => {
          const target = sweepingProject;
          setSweepingProject(null);
          if (target) {
            setActiveProject(target);
          }
        }}
      />

      {/* Project Detail Modal */}
      <ProjectDetailModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
        onBookSimilar={onBookSimilar}
      />
    </section>
  );
};
