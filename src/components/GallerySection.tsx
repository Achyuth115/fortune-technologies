import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, ZoomIn, Wrench, Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface GalleryItem {
  id: string;
  image: string;
  title: string;
  category: string;
  badge: string;
  description: string;
  span?: string; // for masonry/grid layout emphasis
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    image: '/assets/aistudio/ae2c7205-336a-4b79-9835-8bd8a978e46c_024d441e.jpg',
    title: 'Optical Engine & Lens Assembly Teardown',
    category: 'Optical Systems',
    badge: 'Bench Teardown',
    description: 'Precision extraction of the optical engine block, focus ring assembly, and light tunnel for cleanroom de-dusting and prism realignment.',
    span: 'md:col-span-1 md:row-span-2',
  },
  {
    id: 'gal-2',
    image: '/assets/aistudio/67455485-7d8c-473f-8b5a-755aaa84e985_c49417b6.jpg',
    title: 'Smart Portable Projector Calibration',
    category: 'Calibrated Units',
    badge: 'Tested & Verified',
    description: 'Articulated portable smart projector inspected, lumen-tested, and color-profiled following complete internal overhaul.',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-3',
    image: '/assets/aistudio/1a8b2fc0-63cd-43c9-af21-540c6476ff66_847e7022.jpg',
    title: 'Precision Housing & Component Servicing',
    category: 'Bench Servicing',
    badge: 'Component Rework',
    description: 'Component-level motherboard servicing, micro-switch repair, and thermal compound re-application with ESD-safe precision tooling.',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-4',
    image: '/assets/aistudio/b91716af-5476-474c-9d6e-47bd1c645060_51b3f2fa.jpg',
    title: 'ViewSonic High-Definition DLP Unit',
    category: 'DLP Servicing',
    badge: 'Diagnostic Bench',
    description: 'High-performance ViewSonic DLP theater projector undergoing color wheel sync calibration and lamp driver voltage verification.',
    span: 'md:col-span-1 md:row-span-1',
  },
  {
    id: 'gal-5',
    image: '/assets/aistudio/d92fd110-1f46-4138-9d21-7473ca408c61_02e9e113.jpg',
    title: 'Dual Blower & Power Supply Chassis Overhaul',
    category: 'Chassis & Power',
    badge: 'Thermal Clean',
    description: 'Full chassis disassembly revealing high-voltage SMPS power boards, primary blower ducting, and heatsink channels cleared of microscopic dust.',
    span: 'md:col-span-1 md:row-span-2',
  },
];

const CATEGORIES = ['All Photos', 'Optical Systems', 'Calibrated Units', 'Bench Servicing', 'DLP Servicing', 'Chassis & Power'];

interface GallerySectionProps {
  onBookRepairClick?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({ onBookRepairClick }) => {
  const [selectedCategory, setSelectedCategory] = useState('All Photos');
  const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

  const filteredItems = selectedCategory === 'All Photos'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === selectedCategory);

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeImageIndex === null) return;
      if (e.key === 'Escape') setActiveImageIndex(null);
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev !== null ? (prev + 1) % filteredItems.length : null));
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) =>
          prev !== null ? (prev - 1 + filteredItems.length) % filteredItems.length : null
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeImageIndex, filteredItems.length]);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex - 1 + filteredItems.length) % filteredItems.length);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (activeImageIndex !== null) {
      setActiveImageIndex((activeImageIndex + 1) % filteredItems.length);
    }
  };

  return (
    <section id="gallery" className="py-16 sm:py-24 bg-white border-b border-neutral-200 relative overflow-hidden">
      {/* Background Accent Gradients */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-[#392080]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-0 w-80 h-80 bg-[#E5232D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-semibold text-neutral-800 mb-3 shadow-2xs">
            <Camera className="w-3.5 h-3.5 text-[#E5232D]" />
            <span>Workshop Proof & Real Benchwork</span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1E36] font-['Outfit'] tracking-tight">
            Inside Our Repair Workshop
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Take a behind-the-scenes look at our component-level teardowns, optical engine de-dusting, and certified diagnostics at our Secunderabad center.
          </p>

          {/* Category Filter Pills */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-2.5">
            {CATEGORIES.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-[#0B1E36] text-white shadow-sm scale-105'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700 border border-neutral-200/80'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Interactive Responsive Photo Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {filteredItems.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => setActiveImageIndex(idx)}
              className="group relative bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-200/80 shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer flex flex-col justify-end min-h-[300px] sm:min-h-[340px]"
            >
              {/* Photo Image */}
              <img
                src={item.image}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                referrerPolicy="no-referrer"
                loading="lazy"
              />

              {/* Gradient Dark Backdrop Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/35 to-transparent transition-opacity duration-300 group-hover:from-black/95" />

              {/* Top Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md text-white border border-white/20 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E5232D] animate-ping" />
                  {item.badge}
                </span>
              </div>

              {/* Quick View Button on Hover */}
              <div className="absolute top-4 right-4 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm text-neutral-900 flex items-center justify-center shadow-md">
                  <ZoomIn className="w-4 h-4 text-neutral-800" />
                </div>
              </div>

              {/* Bottom Info Card */}
              <div className="relative z-10 p-5 sm:p-6 text-white transform transition-transform duration-300">
                <p className="text-xs font-semibold text-[#E5232D] uppercase tracking-wider mb-1">
                  {item.category}
                </p>
                <h3 className="text-base sm:text-lg font-bold font-['Outfit'] text-white group-hover:text-amber-300 transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-neutral-300 mt-1.5 line-clamp-2 leading-relaxed opacity-90 group-hover:opacity-100">
                  {item.description}
                </p>

                <div className="mt-3 flex items-center gap-1.5 text-xs font-semibold text-neutral-300 group-hover:text-white">
                  <span>Click to expand</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Workshop Bottom Guarantee Banner */}
        <div className="mt-12 sm:mt-16 rounded-2xl bg-[#0B1E36] text-white p-6 sm:p-8 border border-neutral-800 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#E5232D]/20 border border-[#E5232D]/40 text-[#E5232D] flex items-center justify-center shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-lg font-bold font-['Outfit'] text-white">
                Have an unserviceable or rejected projector?
              </h4>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 max-w-xl">
                We handle optical prism replacements, DMD micro-mirror chips, power supplies, and thermal overhauls on all major brands (BenQ, Epson, Optoma, Zebronics, ViewSonic).
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto shrink-0">
            <button
              onClick={onBookRepairClick}
              className="w-full md:w-auto px-6 py-3 rounded-xl bg-[#E5232D] hover:bg-[#C91A24] text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all cursor-pointer text-center"
            >
              Book Bench Inspection (20% Advance)
            </button>
          </div>
        </div>
      </div>

      {/* Full-Screen Interactive Lightbox Modal */}
      {activeImageIndex !== null && filteredItems[activeImageIndex] && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={() => setActiveImageIndex(null)}
        >
          {/* Close Button */}
          <button
            onClick={() => setActiveImageIndex(null)}
            className="absolute top-5 right-5 z-50 p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Close Lightbox (Esc)"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Left Navigation */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Previous Photo (Left Arrow)"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Right Navigation */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
            title="Next Photo (Right Arrow)"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Center Content Modal */}
          <div
            className="max-w-4xl w-full flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative max-h-[70vh] sm:max-h-[75vh] w-full flex items-center justify-center overflow-hidden rounded-xl bg-black">
              <img
                src={filteredItems[activeImageIndex].image}
                alt={filteredItems[activeImageIndex].title}
                className="max-h-[70vh] sm:max-h-[75vh] max-w-full object-contain rounded-xl shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Captions and Info */}
            <div className="mt-4 text-center max-w-xl text-white">
              <div className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-[#E5232D] text-white uppercase tracking-wider mb-2">
                {filteredItems[activeImageIndex].category} · {filteredItems[activeImageIndex].badge}
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-['Outfit']">
                {filteredItems[activeImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300 mt-1 leading-relaxed">
                {filteredItems[activeImageIndex].description}
              </p>
              <p className="text-[11px] text-neutral-500 mt-2">
                Photo {activeImageIndex + 1} of {filteredItems.length} · Use Left/Right keys or tap buttons to navigate
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
