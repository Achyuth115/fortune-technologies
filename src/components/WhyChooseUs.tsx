import React from 'react';
import { Microscope, ShieldCheck, Cpu, Clock, CheckCircle2, Award } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: Microscope,
      title: 'Cleanroom Optical Environment',
      description:
        'Projector optical engines and DMD chips are serviced under particle-filtered laminar flow hoods to prevent dust specks from baking onto internal glass elements.',
    },
    {
      icon: Cpu,
      title: 'Component-Level Micro-Soldering',
      description:
        'We replace damaged capacitors, MOSFETs, and HDMI controller ICs rather than forcing complete expensive board replacements on your receiver or projector.',
    },
    {
      icon: Clock,
      title: '24-Hour Thermal Burn-In Stress Test',
      description:
        'Every repaired unit runs on our test bench under sustained 4K load for 24 continuous hours to confirm temperature dissipation, fan curve, and picture stability.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Technical Diagnosis',
      description:
        'You receive an honest technical assessment explaining the exact failure mode and replacement parts before any authorized work begins.',
    },
    {
      icon: Award,
      title: 'Precision Calibration Standards',
      description:
        'Optics are aligned with laser centration tools, and audio processors are adjusted for DC offset and channel balance to restore factory performance.',
    },
    {
      icon: CheckCircle2,
      title: 'Direct Technician Consultation',
      description:
        'Speak directly with the bench engineer servicing your gear. No call-center scripts—just straight technical answers and guidance.',
    },
  ];

  return (
    <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-purple-300 mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5232D]" />
            <span>Workshop Discipline</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit'] tracking-tight">
            Why Entrust Your Equipment to Fortune Technologies
          </h2>
          <p className="mt-3 text-base text-neutral-400 leading-relaxed">
            High-performance home theatre gear requires delicate handling and specialized equipment. We combine precision diagnostic tools with years of component-level bench experience.
          </p>
        </div>

        {/* Pillars Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="bg-neutral-900/80 rounded-2xl border border-white/10 p-6 flex flex-col justify-between hover:border-[#392080] hover:bg-neutral-900 transition-all duration-200"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-[#392080]/30 border border-[#392080]/50 flex items-center justify-center text-purple-300 mb-4">
                    <Icon className="w-6 h-6 text-[#E5232D]" />
                  </div>
                  <h3 className="text-lg font-bold text-white font-['Outfit']">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-neutral-400 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-[11px] font-mono text-neutral-500">
                  <span className="text-[#392080] font-bold">CORE VALUE</span>
                  <span>·</span>
                  <span>STANDARD #0{idx + 1}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
