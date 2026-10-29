import React from 'react';
import { FileText, CalendarCheck, Wrench, ShieldCheck, Phone, ArrowRight } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface RepairProcessProps {
  onStartEnquiryClick: () => void;
}

const STEPS = [
  {
    stepNumber: '01',
    title: 'Submitting the Form',
    shortTitle: 'Submit Enquiry',
    description:
      'Describe your equipment type, brand, and observed faults online or via WhatsApp to instantly generate a diagnostic ticket.',
    icon: FileText,
  },
  {
    stepNumber: '02',
    title: 'Consultation & Scheduling',
    shortTitle: 'Diagnostic Schedule',
    description:
      'Senior technicians review symptoms, provide transparent initial estimates, and schedule bench drop-off or courier pickup.',
    icon: CalendarCheck,
  },
  {
    stepNumber: '03',
    title: 'Precision Repair Execution',
    shortTitle: 'Component Execution',
    description:
      'Cleanroom component-level micro-soldering, optical de-dusting, DMD chip swap, or motherboard trace rework with OEM parts.',
    icon: Wrench,
  },
  {
    stepNumber: '04',
    title: 'Inspection & Completion',
    shortTitle: 'Testing & Delivery',
    description:
      '24-Hour thermal stress test, lumen/lux calibration, and certified return delivery backed by our service warranty.',
    icon: ShieldCheck,
  },
];

export const RepairProcess: React.FC<RepairProcessProps> = ({ onStartEnquiryClick }) => {
  return (
    <section id="process" className="py-16 sm:py-24 bg-white border-b border-neutral-200 overflow-hidden relative">
      {/* Background Subtle Wave Curve (matching reference image style) */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg
          className="w-full h-full text-emerald-100/60"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0,160 C320,100,480,240,720,160 C960,80,1120,220,1440,160"
            stroke="currentColor"
            strokeWidth="3"
            strokeDasharray="6 6"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Section Header Matching Reference Image */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#392080] mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5232D]" />
            <span>Structured Workshop Protocol</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] font-['Outfit'] tracking-tight">
            Our 4-Step Repair Process
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-2xl mx-auto font-normal">
            Simple and seamless process designed for your convenience. From booking to completion, we ensure a smooth and professional repair experience.
          </p>
        </div>

        {/* Desktop / Tablet Flow: Horizontal with Circular Emblems & Arched Curved Arrows (Matching Reference Image 270ac52e.png) */}
        <div className="hidden sm:flex items-start justify-between relative max-w-5xl mx-auto">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <React.Fragment key={step.stepNumber}>
                {/* Step Item */}
                <div className="flex flex-col items-center text-center flex-1 px-2 group">
                  {/* Circular Dark Emblem with White Icon (Matching Reference Image) */}
                  <div className="relative">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-[#0B1E36] group-hover:bg-[#392080] text-white flex items-center justify-center shadow-[0_8px_20px_rgba(11,30,54,0.25)] border-4 border-white transition-all duration-300 group-hover:scale-105 group-hover:shadow-[0_12px_28px_rgba(57,32,128,0.35)]">
                      <Icon className="w-7 h-7 md:w-8 md:h-8 stroke-[1.8]" />
                    </div>

                    {/* Step Number Tag */}
                    <span className="absolute -top-1 -right-1 w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#E5232D] text-white text-[10px] md:text-xs font-mono font-bold flex items-center justify-center border-2 border-white shadow-sm">
                      {idx + 1}
                    </span>
                  </div>

                  {/* Title (Bold dark font matching reference image) */}
                  <h3 className="mt-5 text-sm md:text-base font-extrabold text-[#0B1E36] font-['Outfit'] leading-tight">
                    {step.title}
                  </h3>

                  {/* Short Description */}
                  <p className="mt-2 text-xs text-neutral-500 leading-relaxed max-w-[200px]">
                    {step.description}
                  </p>
                </div>

                {/* Arched Curved Connector Arrow between circles (Except after last step) */}
                {idx < STEPS.length - 1 && (
                  <div className="flex items-center justify-center pt-5 sm:pt-6 shrink-0 -mx-2 md:mx-0">
                    <svg
                      className="w-12 h-8 md:w-16 md:h-10 text-emerald-500/80 drop-shadow-sm"
                      viewBox="0 0 60 30"
                      fill="none"
                    >
                      {/* Arched curve curving upwards */}
                      <path
                        d="M 6 24 C 20 6, 40 6, 52 20"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                      />
                      {/* Arrowhead */}
                      <path
                        d="M 45 15 L 54 21 L 52 11 Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Mobile View: Clean Vertical Connected Flow (Highly Mobile Friendly) */}
        <div className="sm:hidden space-y-6 max-w-sm mx-auto">
          {STEPS.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div key={step.stepNumber} className="flex items-start gap-4 relative">
                {/* Connecting Line between steps on mobile */}
                {idx < STEPS.length - 1 && (
                  <div className="absolute left-7 top-14 bottom-[-16px] w-0.5 bg-dashed border-l-2 border-dashed border-emerald-300" />
                )}

                {/* Circular Dark Emblem */}
                <div className="relative shrink-0 z-10">
                  <div className="w-14 h-14 rounded-full bg-[#0B1E36] text-white flex items-center justify-center shadow-lg border-2 border-white">
                    <Icon className="w-6 h-6 stroke-[2]" />
                  </div>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#E5232D] text-white text-[10px] font-mono font-bold flex items-center justify-center border-2 border-white">
                    {idx + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="pt-1.5 flex-1">
                  <h3 className="text-sm font-bold text-[#0B1E36] font-['Outfit']">
                    {step.title}
                  </h3>
                  <p className="mt-1 text-xs text-neutral-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Guarantee Banner */}
        <div className="mt-12 sm:mt-16 bg-[#F8FAFC] rounded-3xl border border-neutral-200/90 p-5 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="text-center md:text-left">
            <h4 className="text-base sm:text-lg font-bold text-[#0B1E36] font-['Outfit']">
              Ready to restore your audiovisual or computer equipment?
            </h4>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Speak directly with a senior bench technician. We offer transparent diagnosis and 20% advance token reservation.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 shrink-0 w-full md:w-auto">
            <a
              href="tel:7799066626"
              className="px-4 py-2.5 text-xs font-bold text-neutral-800 bg-white hover:bg-neutral-100 rounded-xl transition-colors font-mono border border-neutral-200 shadow-sm flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
              <span>Call 7799066626</span>
            </a>

            <a
              href="https://wa.me/917799066626?text=Hello%20Fortune%20Technologies%2C%20I%20would%20like%20to%20enquire%20about%20a%20repair."
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition-colors shadow-sm flex items-center gap-1.5"
            >
              <WhatsAppIcon className="w-4 h-4 text-white" />
              <span>WhatsApp Us</span>
            </a>

            <button
              onClick={onStartEnquiryClick}
              className="px-5 py-2.5 text-xs font-bold text-white bg-[#E5232D] hover:bg-[#c91822] rounded-xl shadow-md transition-all flex items-center gap-1.5"
            >
              <span>Book Service (20% Advance)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
