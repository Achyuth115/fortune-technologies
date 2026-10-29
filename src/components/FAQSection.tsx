import React, { useState } from 'react';
import { ChevronDown, Phone, MessageSquare } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQ_DATA: FAQItem[] = [
  {
    category: 'Services',
    question: 'What types of audiovisual and IT equipment do you repair and install?',
    answer:
      'Fortune Technologies specializes in 5 core certified areas: 1) 4K and laser Projector service (DMD chips, lamps, optical prisms, ballast voltages); 2) Home Theater setup & AV receiver repair (Dolby Atmos acoustics, protection modes, discrete amplifiers); 3) Enterprise Server repair (multi-socket motherboards, redundant PSUs, RAID pools); 4) Laptop & Desktop computer repair (motherboard micro-soldering, liquid spill recovery, GPU reballing); and 5) 4K CCTV Camera installation & NVR network configuration.',
  },
  {
    category: 'Booking & Payment',
    question: 'How does the 20% advance booking policy work?',
    answer:
      'Every service configuration has transparent, upfront pricing. The 20% advance token reserves your bench diagnostic slot and certified senior technician. The remaining 80% balance is payable only after your equipment has been fully repaired, serviced, and verified through our 24-hour thermal testing policy. Advance payment can be confirmed via PhonePe, Google Pay, UPI, or upon initial inspection.',
  },
  {
    category: 'Location & Drop-off',
    question: 'Can I drop off equipment in person, or can I arrange courier pickup?',
    answer:
      'You are welcome to visit our Secunderabad workshop located at Kamakshi Commercial Complex (3rd Floor, Shop No. 307, Sarojini Devi Road, Secunderabad 500003). For clients across Hyderabad, Telangana, or other states, call our hotline at 7799066626 or 9014592867 to arrange secure courier delivery and return dispatch.',
  },
  {
    category: 'Diagnostics',
    question: 'How do you quote for repairs? Will there be unexpected charges?',
    answer:
      'We operate on complete transparency. After performing initial bench diagnostics to identify the exact faulty components, we explain the diagnosis and provide a clear quote. We never begin repair work or purchase components without your explicit approval.',
  },
];

export const FAQSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="py-14 sm:py-20 bg-[#F5F5F7] border-b border-neutral-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#392080] mb-2 font-mono">
            <span className="w-2 h-2 rounded-full bg-[#E5232D]" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] font-['Outfit'] tracking-tight">
            Frequently Asked Questions
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
            Straightforward answers regarding our services, 20% advance booking, and workshop procedures.
          </p>
        </div>

        {/* FAQ Accordion List - Clean & Mobile Friendly */}
        <div className="mt-8 sm:mt-12 space-y-3">
          {FAQ_DATA.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-white rounded-2xl border border-neutral-200/90 overflow-hidden shadow-sm transition-all duration-200"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-4 sm:p-5 flex items-center justify-between gap-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#392080]"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xs font-mono font-bold text-[#392080] mt-0.5 shrink-0 bg-purple-50 px-2 py-0.5 rounded-md border border-purple-100">
                      0{idx + 1}
                    </span>
                    <span className="text-xs sm:text-base font-bold text-neutral-900 font-['Outfit']">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'transform rotate-180 text-[#392080]' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 pt-1 text-xs sm:text-sm text-neutral-600 leading-relaxed border-t border-neutral-100 bg-neutral-50/50">
                    <p>{item.answer}</p>
                    <div className="mt-3 flex items-center gap-2">
                      <span className="text-[10px] font-mono text-neutral-400 uppercase font-semibold">
                        TOPIC: {item.category}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Box */}
        <div className="mt-8 sm:mt-10 p-5 bg-white rounded-2xl border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h4 className="text-sm font-bold text-[#0B1E36]">Need additional technical help?</h4>
            <p className="text-xs text-neutral-600 mt-0.5">
              Call our Secunderabad technician desk directly or reach us on WhatsApp.
            </p>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-center shrink-0">
            <a
              href="tel:7799066626"
              className="px-4 py-2 text-xs font-bold text-white bg-[#392080] hover:bg-[#2c1766] rounded-xl transition-colors font-mono shadow-sm flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
              <span>7799066626</span>
            </a>

            <a
              href="https://wa.me/917799066626"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors font-mono flex items-center gap-1.5"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
