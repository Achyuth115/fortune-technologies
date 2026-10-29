import React from 'react';
import { Shield, Microscope, Phone, MapPin, CheckCircle2, Server, Award, Wrench } from 'lucide-react';
import { BrandLogo } from './BrandLogo.tsx';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-14 sm:py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-12">
          {/* Official Brand Logo */}
          <div className="mb-4 inline-block">
            <BrandLogo variant="dark" size="lg" />
          </div>

          <div className="flex items-center justify-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#392080] mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5232D]" />
            <span>About Fortune Technologies</span>
            <span className="text-neutral-300">·</span>
            <span className="text-neutral-500">Secunderabad Workshop</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] font-['Outfit'] tracking-tight">
            Precision Audiovisual, Projector & IT Diagnostic Engineers
          </h2>

          <p className="mt-4 text-xs sm:text-base text-neutral-600 leading-relaxed font-normal">
            Based in <strong>Secunderabad (Sarojini Devi Road)</strong>, <strong>Fortune Technologies</strong> is a premier technical center specializing in component-level projector repair, home theatre calibration, enterprise servers, computer workstations, and professional CCTV camera installations.
          </p>

          {/* GSTIN Registered Badge */}
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-mono text-emerald-800 font-bold">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>Government GSTIN Registered: <strong>36DANPK8362R1ZM</strong></span>
          </div>
        </div>

        {/* 3 Pillar Feature Cards - Highly Mobile Friendly */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {/* Card 1 */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-purple-100 flex items-center justify-center text-[#392080] mb-4">
                <Microscope className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-['Outfit']">
                Cleanroom Optical Precision
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Dedicated dust-free environment for projector optical engines, DMD micro-mirror chips, laser phosphor paths, and ballast voltage calibration.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] font-mono font-semibold text-[#392080]">
              4K / Laser Projectors Serviced
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-[#E5232D] mb-4">
                <Wrench className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-['Outfit']">
                Component-Level Bench Repair
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Rather than costly whole-unit swaps, our technicians replace individual failed MOSFETs, capacitors, HDMI transceivers, and controller chips.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] font-mono font-semibold text-[#E5232D]">
              Micro-Soldering & Circuit Diagnostics
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-[#F8FAFC] rounded-2xl p-5 sm:p-6 border border-neutral-200/90 shadow-sm flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-[#0B1E36] mb-4">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-neutral-900 font-['Outfit']">
                Enterprise IT & Surveillance
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 mt-2 leading-relaxed">
                Full hardware support for rackmount servers, high-performance computing motherboards, NAS storage, and 4K CCTV camera installations.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-neutral-200 text-[11px] font-mono font-semibold text-[#0B1E36]">
              Servers, Workstations & CCTV
            </div>
          </div>
        </div>

        {/* Workshop Location & Direct Hotline Bar */}
        <div className="mt-8 bg-[#0B1E36] text-white rounded-2xl p-5 sm:p-6 flex flex-col md:flex-row items-center justify-between gap-5 shadow-lg">
          <div className="flex items-start sm:items-center gap-3.5 text-left w-full md:w-auto">
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center text-[#E5232D] shrink-0 mt-0.5 sm:mt-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-purple-200 block">
                Secunderabad Workshop Facility
              </span>
              <p className="text-xs sm:text-sm font-medium text-neutral-200 leading-snug">
                Shop No. 307, 3rd Floor, Kamakshi Commercial Complex, Sarojini Devi Road, Secunderabad 500003
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 w-full md:w-auto shrink-0">
            <a
              href="tel:7799066626"
              className="px-5 py-2.5 rounded-xl bg-[#E5232D] hover:bg-[#c91822] text-white text-xs font-bold font-mono text-center flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: 7799066626</span>
            </a>

            <a
              href="https://wa.me/917799066626?text=Hello%20Fortune%20Technologies%2C%20I%20would%20like%20to%20enquire%20about%20a%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold text-center flex items-center justify-center gap-2 shadow-md transition-colors"
            >
              <WhatsAppIcon className="w-3.5 h-3.5 text-white" />
              <span>WhatsApp Us</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
