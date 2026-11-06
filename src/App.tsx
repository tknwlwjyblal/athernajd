/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import { AdminProvider } from './context/AdminContext';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { ProjectsShowcase } from './components/ProjectsShowcase';
import { ServicesSection } from './components/ServicesSection';
import { MaterialComparator } from './components/MaterialComparator';
import { LuxuryDesignStudio } from './components/LuxuryDesignStudio';
import { TactileSwatches } from './components/TactileSwatches';
import { WhyAtharNajd } from './components/WhyAtharNajd';
import { ProcessSteps } from './components/ProcessSteps';
import { PackagesSection } from './components/PackagesSection';
import { CostCalculator } from './components/CostCalculator';
import { ConsultationForm } from './components/ConsultationForm';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { BookingModal } from './components/BookingModal';
import { AdminLoginModal } from './components/AdminLoginModal';
import { AdminDashboardModal } from './components/AdminDashboardModal';

function MainAppContent() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [isBookingModalOpen, setIsBookingModalOpen] = useState<boolean>(false);
  const [isAdminLoginOpen, setIsAdminLoginOpen] = useState<boolean>(false);
  const [bookingTopic, setBookingTopic] = useState<string>('');
  const [selectedServiceForForm, setSelectedServiceForForm] = useState<string>('');
  const [estimateForForm, setEstimateForForm] = useState<{
    propertyType: string;
    area: number;
    selectedServices: string[];
    tier: string;
  } | null>(null);

  const globalVideoRef = React.useRef<HTMLVideoElement>(null);

  // Background video plays muted in an infinite seamless loop
  React.useEffect(() => {
    const video = globalVideoRef.current;
    if (!video) return;
    video.muted = true;
    video.volume = 0;
    video.play().catch(() => {});
  }, []);

  React.useEffect(() => {
    document.title = 'أثر نجد للدهانات والديكورات | 0557821701 | فخامة هادئة تجمع بين أصالة نجد وروح العصر';
    let link: HTMLLinkElement | null = document.querySelector("link[rel*='icon']");
    if (!link) {
      link = document.createElement('link');
      link.type = 'image/png';
      link.rel = 'shortcut icon';
      document.getElementsByTagName('head')[0].appendChild(link);
    }
    link.href = '/favicon.png';
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingModal = (topic = '') => {
    setBookingTopic(topic);
    setIsBookingModalOpen(true);
  };

  const handleSelectServiceForBooking = (serviceName: string) => {
    setSelectedServiceForForm(serviceName);
    scrollToSection('consultation-form');
  };

  const handleBookWithEstimate = (estimate: {
    propertyType: string;
    area: number;
    selectedServices: string[];
    tier: string;
  }) => {
    setEstimateForForm(estimate);
    scrollToSection('consultation-form');
  };

  const handleBookSimilarProject = (projectTitle: string) => {
    handleOpenBookingModal(`مشروع مماثل لـ: ${projectTitle}`);
  };

  return (
    <div
      className="site-video-background-active min-h-screen relative text-[#1e1b17] flex flex-col font-sans selection:bg-[#c5a059]/30 selection:text-[#1e1b17]"
      dir="rtl"
    >
      {/* Full-Site Fixed Ambient Video Background */}
      <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden pointer-events-none">
        <video
          ref={globalVideoRef}
          src="/assets/aistudio/WhatsApp_Video_2026-11-06_at_9.36.23_PM_20c8a354.mp4"
          poster="/assets/aistudio/hero_video_poster.jpg"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onEnded={() => {
            const v = globalVideoRef.current;
            if (v) {
              v.currentTime = 0;
              v.play().catch(() => {});
            }
          }}
          className="w-full h-full object-cover"
        />
        {/* Soft architectural shading overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/25 to-black/50 pointer-events-none" />
      </div>

      {/* Sticky Header */}
      <Header
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onOpenBookingModal={() => handleOpenBookingModal('معاينة عامة')}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 pt-20">
        {/* Top Ambient Glow Line */}
        <div className="w-full h-1 bg-gradient-to-r from-[#f4ede6] via-[#c5a059] to-[#f4ede6]"></div>

        {/* Hero Section */}
        <Hero
          onOpenBookingModal={() => handleOpenBookingModal('طلب معاينة من الهيرو')}
          onExploreProjects={() => scrollToSection('projects-showcase')}
        />

        {/* Real Projects Showcase with Live Data */}
        <ProjectsShowcase
          onBookSimilar={handleBookSimilarProject}
          onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
        />

        {/* Interactive Luxury Design & Color Studio */}
        <LuxuryDesignStudio
          onOpenBookingModal={(topic) =>
            handleOpenBookingModal(topic || 'استوديو الألوان والتنسيق')
          }
        />

        {/* Material & Finish Comparator (Before / After) */}
        <MaterialComparator />

        {/* Tactile Luxury Swatches & Texture Microscope */}
        <TactileSwatches
          onSelectFinish={(finishTitle) => {
            handleOpenBookingModal(`طلب عينة ومواصفات: ${finishTitle}`);
          }}
        />

        {/* Core Services Section */}
        <ServicesSection
          onSelectServiceForBooking={handleSelectServiceForBooking}
        />

        {/* Why Athar Najd (Comparison & Trust Factors) */}
        <WhyAtharNajd />

        {/* Easy 4-Step Process */}
        <ProcessSteps />

        {/* Packages Section */}
        <PackagesSection
          onSelectPackage={(pkgName) => {
            handleOpenBookingModal(`باقة: ${pkgName}`);
          }}
        />

        {/* Interactive Cost Estimator Calculator */}
        <CostCalculator onBookWithEstimate={handleBookWithEstimate} />

        {/* Consultation & Booking Form */}
        <ConsultationForm
          initialService={selectedServiceForForm}
          initialEstimate={estimateForForm}
        />

        {/* FAQ Section */}
        <FaqSection />
      </main>

      {/* Footer */}
      <Footer
        onNavigate={scrollToSection}
        onOpenBookingModal={() => handleOpenBookingModal('طلب معاينة من الفوتر')}
        onOpenAdminLogin={() => setIsAdminLoginOpen(true)}
      />

      {/* Floating Fast Action Contact Pill (WhatsApp & Phone) */}
      <div className="fixed bottom-5 left-5 z-40 flex flex-col gap-2.5">
        <a
          href="https://wa.me/966557821701?text=%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D9%85%20%D8%B9%D9%84%D9%8A%D9%83%D9%85%D8%8C%20%D8%A3%D8%B1%D8%BA%D8%A8%20%D9%81%D9%8A%20%D8%A7%D8%B3%D8%AA%D8%B4%D8%A7%D8%B1%D8%A9%20%D8%AF%D9%8A%D9%83%D9%88%D8%B1%20%D9%88%D8%AF%D9%87%D8%A7%D9%86%D8%A7%D8%AA%20%D9%85%D9%86%20%D8%A3%D8%AB%D8%B1%20%D9%86%D8%AC%D8%AF"
          target="_blank"
          rel="noopener noreferrer"
          className="w-13 h-13 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="محادثة واتساب مباشرة"
          title="محادثة واتساب فورية"
        >
          <MessageCircle className="w-7 h-7" />
        </a>

        <a
          href="tel:0557821701"
          className="w-13 h-13 rounded-full bg-[#c5a059] text-[#4e3700] flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="اتصال هاتفي مباشر"
          title="اتصال هاتفي مباشر"
        >
          <Phone className="w-7 h-7" />
        </a>
      </div>

      {/* Booking Modal Dialog */}
      <BookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        presetTopic={bookingTopic}
      />

      {/* Admin Login Modal Dialog */}
      <AdminLoginModal
        isOpen={isAdminLoginOpen}
        onClose={() => setIsAdminLoginOpen(false)}
      />

      {/* Admin Full Management Dashboard Modal */}
      <AdminDashboardModal />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <MainAppContent />
    </AdminProvider>
  );
}
