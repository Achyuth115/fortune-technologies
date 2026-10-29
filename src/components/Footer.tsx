import React from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { Phone, MessageSquare, Mail, MapPin, ArrowUp, ShieldCheck, FileText } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-neutral-900">
          {/* Brand & Summary */}
          <div className="lg:col-span-5 space-y-4">
            <BrandLogo variant="light" size="lg" showPhone={false} />
            <p className="text-xs text-neutral-300 font-semibold uppercase tracking-wider font-mono">
              Service, Computer Equipments & Softwares
            </p>
            <p className="text-xs text-neutral-400 max-w-sm leading-relaxed">
              Professional projector optical engine repair, home theatre servicing, AV receivers, discrete amplifiers, computers, laptops, and IT solutions based in Secunderabad.
            </p>

            {/* GSTIN Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-mono text-emerald-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>GSTIN: <strong>36DANPK8362R1ZM</strong></span>
            </div>

            {/* Direct Contact Links */}
            <div className="pt-2 flex flex-col gap-2.5 text-xs font-mono">
              <div className="flex items-center gap-2 text-neutral-300">
                <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
                <a href="tel:7799066626" className="hover:text-white font-bold transition-colors">
                  7799066626
                </a>
                <span className="text-neutral-500">·</span>
                <a href="tel:9014592867" className="hover:text-white font-bold transition-colors">
                  9014592867
                </a>
              </div>

              <a
                href="https://wa.me/917799066626"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-emerald-400 transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-500" />
                <span>WhatsApp: +91 7799066626</span>
              </a>

              <a
                href="mailto:fortunetechnologies100@gmail.com"
                className="inline-flex items-center gap-2 text-neutral-300 hover:text-purple-300 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-[#392080]" />
                <span>fortunetechnologies100@gmail.com</span>
              </a>
            </div>
          </div>

          {/* Service Links */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono">
              Core Technical Services
            </h4>
            <ul className="space-y-2 text-xs text-neutral-400">
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Projector Optical Engine & DMD Chip Servicing
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  4K / 8K Laser Projector & Cinema Calibration
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  AV Receiver & Multi-Channel Amplifier Repair
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Active Subwoofer Plate Amplifier Recapping
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  Computer & Laptop Motherboard Micro-Soldering
                </a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">
                  IT Infrastructure, Networking & Softwares
                </a>
              </li>
            </ul>
          </div>

          {/* Workshop Exact Registered Address */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 font-mono flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-[#E5232D]" />
              <span>Workshop Address</span>
            </h4>
            <div className="text-xs text-neutral-400 space-y-2 leading-relaxed">
              <p>
                <strong className="text-white block font-semibold">Fortune Technologies</strong>
                Kamakshi Commercial Complex, 3rd Floor,<br />
                1-7-265-275 Shop No. 307,<br />
                Sarojini Devi Road,<br />
                Secunderabad – 500003, Telangana.
              </p>

              <div className="pt-2 text-[11px] text-neutral-400 border-t border-neutral-900">
                <span className="font-semibold text-neutral-200 block">Hours:</span>
                Monday – Saturday: 10:00 AM – 7:30 PM
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar with quiet copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} Fortune Technologies. All rights reserved.</p>

          <div className="flex items-center gap-6">
            <span className="text-neutral-500 font-mono text-[11px]">
              GSTIN: 36DANPK8362R1ZM
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
