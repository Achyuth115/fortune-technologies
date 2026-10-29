import React, { useState, useEffect } from 'react';
import { BrandLogo } from './BrandLogo.tsx';
import { Phone, MessageSquare, Menu, X, Mail } from 'lucide-react';

interface NavbarProps {
  onBookRepairClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onBookRepairClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Video Experience', href: '#cinematic-experience' },
    { label: 'Process', href: '#process' },
    { label: 'Reviews', href: '#reviews' },
    { label: 'Gallery', href: '#gallery' },
    { label: 'FAQ', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Main Navbar */}
      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-neutral-200/80 py-3'
            : 'bg-white/90 backdrop-blur-sm border-b border-neutral-200/40 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-8">
            {/* Zone 1: Single element brand wordmark */}
            <a
              href="#"
              className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#392080] rounded-lg"
              aria-label="Fortune Technologies Home"
            >
              <BrandLogo variant="dark" showPhone={false} />
            </a>

            {/* Zone 2: Single-line text navigation links */}
            <nav
              className="hidden lg:flex items-center gap-6 text-sm font-medium text-neutral-700"
              aria-label="Main Navigation"
            >
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="whitespace-nowrap shrink-0 hover:text-[#392080] transition-colors duration-150 py-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#392080] rounded"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Zone 3: 1 Primary Action + Quick Direct Hotline */}
            <div className="hidden sm:flex items-center gap-3 shrink-0">
              <div className="flex items-center gap-2">
                <a
                  href="tel:7799066626"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-[#392080] px-3 py-2 rounded-lg border border-neutral-200/80 bg-neutral-50 hover:bg-neutral-100 transition-colors whitespace-nowrap"
                  title="Call Fortune Technologies Hotline 1"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
                  <span className="font-mono tabular-nums">7799066626</span>
                </a>
                <a
                  href="tel:9014592867"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-800 hover:text-[#392080] px-3 py-2 rounded-lg border border-neutral-200/80 bg-neutral-50 hover:bg-neutral-100 transition-colors whitespace-nowrap"
                  title="Call Fortune Technologies Hotline 2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#392080]" />
                  <span className="font-mono tabular-nums">9014592867</span>
                </a>
              </div>

              <button
                onClick={onBookRepairClick}
                className="inline-flex items-center justify-center px-4.5 py-2.5 text-xs font-bold text-white bg-[#E5232D] hover:bg-[#c91822] active:scale-[0.98] transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5232D]"
              >
                BOOK A REPAIR
              </button>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex sm:hidden items-center gap-2">
              <a
                href="tel:7799066626"
                className="p-2 text-neutral-800 rounded-lg border border-neutral-200 bg-neutral-50"
                aria-label="Call Fortune Technologies"
              >
                <Phone className="w-4 h-4 text-[#E5232D]" />
              </a>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-800 hover:text-[#392080] rounded-lg border border-neutral-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#392080]"
                aria-label={mobileMenuOpen ? 'Close Menu' : 'Open Menu'}
                aria-expanded={mobileMenuOpen}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-neutral-200 bg-white px-4 pt-3 pb-6 shadow-xl max-h-[85vh] overflow-y-auto">
          {/* Official Logo in Mobile Drawer */}
          <div className="mb-3 pb-2 border-b border-neutral-100 flex items-center justify-between">
            <BrandLogo variant="dark" size="sm" />
            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-50 text-[#392080] font-bold">
              SECUNDERABAD
            </span>
          </div>

          {/* Business verified badge */}
          <div className="p-3 bg-purple-50 rounded-xl border border-purple-100 mb-3 text-xs text-neutral-700">
            <div className="flex items-center justify-between font-mono text-[11px] font-bold text-[#392080]">
              <span>GSTIN: 36DANPK8362R1ZM</span>
              <span className="text-[#E5232D]">Secunderabad</span>
            </div>
            <p className="text-[11px] text-neutral-600 mt-1">
              Shop 307, Kamakshi Commercial Complex, SD Road
            </p>
          </div>

          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded-lg hover:text-[#392080] transition-colors"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 border-t border-neutral-100 flex flex-col gap-2.5">
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="tel:7799066626"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-neutral-800 bg-neutral-100 rounded-lg"
                >
                  <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
                  <span>7799066626</span>
                </a>
                <a
                  href="tel:9014592867"
                  className="flex items-center justify-center gap-1.5 py-2 px-2 text-xs font-semibold text-neutral-800 bg-neutral-100 rounded-lg"
                >
                  <Phone className="w-3.5 h-3.5 text-[#392080]" />
                  <span>9014592867</span>
                </a>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://wa.me/917799066626?text=Hello%20Fortune%20Technologies%2C%20I%20would%20like%20to%20enquire%20about%20a%20projector%20or%20AV%20repair."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 rounded-lg"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  WhatsApp
                </a>
                <a
                  href="mailto:fortunetechnologies100@gmail.com"
                  className="flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 rounded-lg"
                >
                  <Mail className="w-3.5 h-3.5" />
                  Email Us
                </a>
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onBookRepairClick();
                }}
                className="w-full mt-2 py-3 text-sm font-bold text-white bg-[#E5232D] rounded-lg text-center shadow-sm"
              >
                BOOK A REPAIR
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
