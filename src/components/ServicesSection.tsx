import React from 'react';
import {
  ChevronRight,
  Phone,
  Layers,
  Tv,
  Server,
  Laptop,
  Camera,
  Wrench,
  ShieldCheck,
  CheckCircle2,
} from 'lucide-react';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { ServiceItem } from '../types/index.ts';

interface ServicesSectionProps {
  onOpenServiceDetail: (serviceId: string) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onOpenServiceDetail }) => {
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Projector':
        return <Layers className="w-4 h-4 text-[#392080]" />;
      case 'Tv':
        return <Tv className="w-4 h-4 text-[#392080]" />;
      case 'Server':
        return <Server className="w-4 h-4 text-[#392080]" />;
      case 'Laptop':
        return <Laptop className="w-4 h-4 text-[#392080]" />;
      case 'Camera':
        return <Camera className="w-4 h-4 text-[#392080]" />;
      default:
        return <Wrench className="w-4 h-4 text-[#392080]" />;
    }
  };

  return (
    <section id="services" className="py-20 bg-[#F5F5F7] border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#392080] mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5232D]" />
            <span>Authorized Diagnostic Workshop</span>
            <span className="text-neutral-300">|</span>
            <span className="text-neutral-500">Secunderabad</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1E36] font-['Outfit'] tracking-tight">
            Our Certified Repair & Installation Services
          </h2>

          <p className="mt-3 text-sm sm:text-base text-neutral-600 leading-relaxed font-normal">
            Specialized bench diagnostics, component-level micro-soldering, and certified installations backed by our 24-hour testing policy and transparent 20% advance booking.
          </p>
        </div>

        {/* 5 Service Cards Grid Matching Reference Image 1 (image_5016c774.png) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
          {SERVICES_DATA.map((service: ServiceItem) => (
            <div
              key={service.id}
              className="bg-white rounded-3xl p-3.5 sm:p-4 border border-neutral-200/80 shadow-sm hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                {/* Image Container with Badges */}
                <div
                  onClick={() => onOpenServiceDetail(service.id)}
                  className="relative rounded-2xl overflow-hidden aspect-[16/10] bg-neutral-100 cursor-pointer"
                >
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />

                  {/* Top-Left Category Pill (As in reference image) */}
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#0B1E36]/90 backdrop-blur-md text-white border border-white/10 shadow-sm">
                      {service.categoryBadge}
                    </span>
                  </div>

                  {/* Bottom-Right Floating Icon Badge (As in reference image) */}
                  <div className="absolute bottom-3 right-3 w-8 h-8 rounded-lg bg-white/95 backdrop-blur-sm shadow-md flex items-center justify-center border border-white/40">
                    {renderIcon(service.iconName)}
                  </div>
                </div>

                {/* Card Title with Subtle Chevron (As in reference image) */}
                <div
                  onClick={() => onOpenServiceDetail(service.id)}
                  className="mt-4 flex items-center justify-between cursor-pointer group/title"
                >
                  <h3 className="text-base sm:text-lg font-bold text-neutral-900 group-hover/title:text-[#392080] font-['Outfit'] transition-colors">
                    {service.title}
                  </h3>
                  <ChevronRight className="w-4 h-4 text-neutral-400 group-hover/title:text-[#392080] group-hover/title:translate-x-0.5 transition-all shrink-0" />
                </div>

                {/* Short Description */}
                <p className="mt-1.5 text-xs sm:text-[13px] text-neutral-600 leading-relaxed line-clamp-2">
                  {service.shortDesc}
                </p>
              </div>

              {/* Bottom Action Bar (3 Elements: Starts from Green Pill, DETAILS > Button, CALL Button) */}
              <div className="mt-5 pt-3.5 border-t border-neutral-100 flex items-center justify-between gap-2">
                {/* 1. Green Starts from Pill */}
                <div className="bg-[#00B569] text-white text-[11px] sm:text-xs font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-sm font-mono">
                  Starts from ₹{service.startingPrice.toLocaleString('en-IN')}
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {/* 2. DETAILS > Button (Redirects to Service Detail Page) */}
                  <button
                    onClick={() => onOpenServiceDetail(service.id)}
                    className="text-sky-700 bg-sky-50 hover:bg-sky-100 border border-sky-200/90 text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1 active:scale-95"
                  >
                    <span>DETAILS</span>
                    <span className="text-[10px]">&gt;</span>
                  </button>

                  {/* 3. CALL Button (Direct Dialer) */}
                  <a
                    href="tel:7799066626"
                    className="bg-[#0B1E36] hover:bg-[#1E293B] active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 shadow-sm"
                  >
                    <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
                    <span>CALL</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 20% Advance Booking Policy Guarantee Strip */}
        <div className="mt-12 bg-white rounded-2xl p-5 border border-neutral-200/80 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center text-[#392080] shrink-0 border border-purple-100">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-bold text-neutral-900">
                Transparent 20% Advance Booking & Diagnostic Policy
              </h4>
              <p className="text-xs text-neutral-500 mt-0.5">
                Every service configuration is priced clearly. Reserve your diagnostic bench with a 20% token advance; remaining balance is payable only upon successful completion.
              </p>
            </div>
          </div>

          <a
            href="tel:7799066626"
            className="shrink-0 px-4 py-2 text-xs font-bold text-white bg-[#392080] hover:bg-[#2E1A68] rounded-xl transition-colors shadow-sm"
          >
            Direct Support: 7799066626
          </a>
        </div>
      </div>
    </section>
  );
};
