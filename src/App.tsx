import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar.tsx';
import { VideoHero } from './components/VideoHero.tsx';
import { AboutSection } from './components/AboutSection.tsx';
import { ServicesAutoScroller } from './components/ServicesAutoScroller.tsx';
import { ServicesSection } from './components/ServicesSection.tsx';
import { VideoPhaseScroller } from './components/VideoPhaseScroller.tsx';
import { ServiceDetailPage } from './components/ServiceDetailPage.tsx';
import { RepairProcess } from './components/RepairProcess.tsx';
import { ReviewsSection } from './components/ReviewsSection.tsx';
import { GallerySection } from './components/GallerySection.tsx';
import { WhyChooseUs } from './components/WhyChooseUs.tsx';
import { FAQSection } from './components/FAQSection.tsx';
import { ContactSection } from './components/ContactSection.tsx';
import { Footer } from './components/Footer.tsx';
import { FloatingActions } from './components/FloatingActions.tsx';
import { AdvanceBookingModal } from './components/AdvanceBookingModal.tsx';
import { SERVICES_DATA } from './data/servicesData.ts';

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [targetEquipment, setTargetEquipment] = useState<string>('Projector');
  const [targetIssue, setTargetIssue] = useState<string>('');

  // Global Advance Booking Modal State
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [modalServiceId, setModalServiceId] = useState<string>('projector-service');
  const [modalConfigIds, setModalConfigIds] = useState<string[] | undefined>(undefined);

  // Directly opens the Booking Modal with configurations & 20% advance UPI payment
  const handleOpenBookingModal = (serviceId?: string, configIds?: string[]) => {
    setModalServiceId(serviceId || selectedServiceId || 'projector-service');
    setModalConfigIds(configIds);
    setIsBookingModalOpen(true);
  };

  // Handle URL hash changes for deep linking to service pages
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#service/')) {
        const id = hash.replace('#service/', '');
        const exists = SERVICES_DATA.find((s) => s.id === id);
        if (exists) {
          setSelectedServiceId(id);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      } else if (hash === '#services' || hash === '' || hash === '#') {
        setSelectedServiceId(null);
      }
    };

    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  const scrollToServices = () => {
    if (selectedServiceId) {
      setSelectedServiceId(null);
      setTimeout(() => {
        const el = document.getElementById('services');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToExperience = () => {
    if (selectedServiceId) {
      setSelectedServiceId(null);
      setTimeout(() => {
        const el = document.getElementById('cinematic-experience');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById('cinematic-experience');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenServiceDetail = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    window.location.hash = `#service/${serviceId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToServices = () => {
    setSelectedServiceId(null);
    window.location.hash = '#services';
    setTimeout(() => {
      const el = document.getElementById('services');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const activeService = SERVICES_DATA.find((s) => s.id === selectedServiceId);

  return (
    <div className="min-h-screen bg-[#F5F5F7] text-[#111111] flex flex-col font-['Plus_Jakarta_Sans',sans-serif] overflow-x-hidden">
      {/* Fixed Navigation Bar - Clicking Book Repair directly opens the interactive Booking & 20% Advance Modal */}
      <Navbar onBookRepairClick={() => handleOpenBookingModal()} />

      {/* Floating Actions: Vertical BOOK NOW Tab, Blue Call Circle, Green WhatsApp Circle */}
      <FloatingActions onBookNowClick={() => handleOpenBookingModal()} />

      {/* Main View Router */}
      <main className="flex-1">
        {selectedServiceId && activeService ? (
          /* Dedicated Redirected Service Detail Page matching image_44ab5c57.png */
          <ServiceDetailPage
            service={activeService}
            onBack={handleBackToServices}
            onSelectOtherService={handleOpenServiceDetail}
            allServices={SERVICES_DATA}
          />
        ) : (
          /* Main Homepage View */
          <>
            {/* 1. Main Cinematic Video Hero - Book button directly opens modal */}
            <VideoHero
              onBookRepairClick={() => handleOpenBookingModal('projector-service')}
              onExploreServicesClick={scrollToServices}
              onJumpToExperienceClick={scrollToExperience}
            />

            {/* 2. About Fortune Technologies (Placed above services) */}
            <AboutSection />

            {/* 3. Auto-Scrolling Circular Services Marquee (Matching Reference Video Style) */}
            <ServicesAutoScroller onSelectService={handleOpenServiceDetail} />

            {/* 4. Comprehensive Technical Workshop / Certified Services Grid */}
            <ServicesSection onOpenServiceDetail={handleOpenServiceDetail} />

            {/* 5. Scroll Scrub Sync Video Section - Book button directly opens modal */}
            <VideoPhaseScroller onBookRepairClick={() => handleOpenBookingModal('projector-service')} />

            {/* 6. Interactive 4-Step Repair Process - Book button directly opens modal */}
            <RepairProcess onStartEnquiryClick={() => handleOpenBookingModal()} />

            {/* 7. Real Google Customer Reviews - Auto-scrolling & Mobile Friendly */}
            <ReviewsSection onBookRepairClick={() => handleOpenBookingModal('projector-service')} />

            {/* 8. Workshop Proof & Teardowns Gallery Section */}
            <GallerySection onBookRepairClick={() => handleOpenBookingModal('projector-service')} />

            {/* 9. Workshop Quality Standards & Why Choose Us */}
            <WhyChooseUs />

            {/* 8. Frequently Asked Questions (Reduced to 4 focused questions) */}
            <FAQSection />

            {/* 9. Contact and General Repair Booking Form */}
            <ContactSection
              initialEquipment={targetEquipment}
              initialIssue={targetIssue}
            />
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Booking & 20% Advance UPI QR Modal (Connected directly to all Book Now actions) */}
      <AdvanceBookingModal
        isOpen={isBookingModalOpen}
        onClose={() => setIsBookingModalOpen(false)}
        initialServiceId={modalServiceId}
        initialConfigIds={modalConfigIds}
      />
    </div>
  );
}
