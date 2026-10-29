import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface FloatingActionsProps {
  onBookNowClick: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onBookNowClick }) => {
  return (
    <>
      {/* 1. Vertical Floating "BOOK NOW" Tab (Right Edge - matching image_048ae4b1.png) */}
      <button
        onClick={onBookNowClick}
        className="fixed right-0 top-1/2 -translate-y-1/2 z-40 bg-[#0A2540] hover:bg-[#081c30] text-white shadow-2xl rounded-l-2xl px-2.5 sm:px-3 py-4 sm:py-6 flex flex-col items-center justify-center border-l border-t border-b border-white/20 transition-all duration-300 hover:-translate-x-1.5 group cursor-pointer focus:outline-none"
        aria-label="Book Service and Pay 20% Advance"
        title="Book Service & Pay 20% Advance"
      >
        <span className="text-[11px] sm:text-xs font-black tracking-widest uppercase [writing-mode:vertical-rl] rotate-180 font-['Outfit'] select-none">
          BOOK NOW
        </span>
      </button>

      {/* 2. Floating Circular Actions (Bottom Right - Phone Call & WhatsApp matching image_048ae4b1.png) */}
      <div className="fixed bottom-6 right-4 sm:right-6 z-40 flex flex-col gap-3 items-end select-none">
        {/* Direct Phone Call Button (Blue Circle) */}
        <a
          href="tel:7799066626"
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#0084FF] hover:bg-[#0070D8] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-blue-500/20 group relative"
          aria-label="Call Fortune Technologies at 7799066626"
          title="Direct Call: 7799066626"
        >
          <Phone className="w-5 h-5 sm:w-6 sm:h-6 fill-current text-white stroke-[2]" />
          {/* Tooltip on hover */}
          <span className="absolute right-14 bg-neutral-900/90 text-white text-[11px] font-mono font-semibold py-1 px-2.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
            Call: 7799066626
          </span>
        </a>

        {/* Direct WhatsApp Chat Button (Green Circle with real WhatsApp symbol) */}
        <a
          href="https://wa.me/917799066626?text=Hello%20Fortune%20Technologies%2C%20I%20would%20like%20to%20enquire%20about%20a%20repair%20and%20book%20a%20service."
          target="_blank"
          rel="noopener noreferrer"
          className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25D366] hover:bg-[#20BD5A] text-white flex items-center justify-center shadow-xl hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-emerald-500/20 group relative"
          aria-label="Chat on WhatsApp with Fortune Technologies"
          title="WhatsApp Support"
        >
          {/* Authentic Real Official WhatsApp Symbol */}
          <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
          {/* Tooltip on hover */}
          <span className="absolute right-14 bg-neutral-900/90 text-white text-[11px] font-mono font-semibold py-1 px-2.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap hidden sm:block">
            WhatsApp Us
          </span>
        </a>
      </div>
    </>
  );
};
