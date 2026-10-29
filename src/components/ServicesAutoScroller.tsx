import React from 'react';
import { Layers, Tv, Server, Laptop, Camera, Sparkles, Wrench } from 'lucide-react';

interface ServicesAutoScrollerProps {
  onSelectService: (serviceId: string) => void;
}

interface CircularServiceItem {
  id: string;
  name: string;
  sublabel: string;
  image: string;
  serviceId: string;
}

const CIRCULAR_ITEMS: CircularServiceItem[] = [
  {
    id: 'c1',
    name: 'Projector Service',
    sublabel: 'DLP & Laser',
    image: '/images/services/projector-service.jpg',
    serviceId: 'projector-service',
  },
  {
    id: 'c2',
    name: 'Home Theater',
    sublabel: 'Dolby Atmos',
    image: '/images/services/home-theater.jpg',
    serviceId: 'home-theater',
  },
  {
    id: 'c3',
    name: 'Server Repair',
    sublabel: 'Rackmount & PSU',
    image: '/images/services/server-repair.jpg',
    serviceId: 'server-repair',
  },
  {
    id: 'c4',
    name: 'Laptop & Desktop',
    sublabel: 'Chip-Level Rework',
    image: '/images/services/laptop-desktop-repair.jpg',
    serviceId: 'laptop-desktop',
  },
  {
    id: 'c5',
    name: 'CCTV Installation',
    sublabel: '4K IP & PoE',
    image: '/images/services/cctv-camera.jpg',
    serviceId: 'cctv-installation',
  },
  {
    id: 'c6',
    name: 'Laser Optics',
    sublabel: 'Prisms & Lenses',
    image: '/images/equipment_optics_lens_1792993394416.jpg',
    serviceId: 'projector-service',
  },
  {
    id: 'c7',
    name: 'AV Receivers',
    sublabel: 'Amplifier Circuits',
    image: '/images/equipment_av_receiver_1792993393400.jpg',
    serviceId: 'home-theater',
  },
  {
    id: 'c8',
    name: 'Cleanroom Lab',
    sublabel: 'Micro-Soldering',
    image: '/images/workshop_cleanroom_bench_1792993393913.jpg',
    serviceId: 'server-repair',
  },
];

export const ServicesAutoScroller: React.FC<ServicesAutoScrollerProps> = ({ onSelectService }) => {
  // Duplicate for seamless 360-degree marquee loop
  const marqueeItems = [...CIRCULAR_ITEMS, ...CIRCULAR_ITEMS];

  return (
    <section className="py-12 sm:py-16 bg-white border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Header Matching Reference Video Style */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          {/* Top Pill Badge (As in reference video: "[icon] Cleaning service" -> "[icon] Certified Services") */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-xs font-semibold text-emerald-800 shadow-sm mb-3">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Technical Service Categories</span>
          </div>

          {/* Bold Display Headline (As in reference video: "Cleaning Services in Hyderabad" -> "Audiovisual & IT Services in Hyderabad") */}
          <h2 className="text-2xl sm:text-4xl font-extrabold text-[#0B1E36] font-['Outfit'] tracking-tight">
            Audiovisual & IT Services in Hyderabad
          </h2>
          <p className="mt-2 text-xs sm:text-sm text-neutral-500 font-normal">
            Select any technical category below to explore certified diagnostics and 20% advance booking.
          </p>
        </div>
      </div>

      {/* Marquee Carousel Track with edge gradients */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-10 sm:w-24 bg-gradient-to-r from-white via-white/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-10 sm:w-24 bg-gradient-to-l from-white via-white/80 to-transparent z-10" />

        {/* Continuous Infinite Auto-Scrolling Track */}
        <div className="animate-services-marquee flex items-center gap-6 sm:gap-10 px-4">
          {marqueeItems.map((item, index) => (
            <button
              key={`${item.id}-${index}`}
              onClick={() => onSelectService(item.serviceId)}
              className="flex flex-col items-center group cursor-pointer shrink-0 focus:outline-none"
              title={`View ${item.name}`}
            >
              {/* Circular Avatar (Matching Reference Video Style) */}
              <div className="w-20 h-20 sm:w-28 sm:h-28 rounded-full p-1 bg-white border-2 border-neutral-200/90 shadow-md group-hover:border-[#392080] group-hover:shadow-lg group-hover:scale-105 transition-all duration-300 relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
              </div>

              {/* Title / Label underneath circle */}
              <span className="mt-2.5 text-xs sm:text-sm font-bold text-neutral-800 group-hover:text-[#392080] transition-colors text-center font-['Outfit'] whitespace-nowrap block">
                {item.name}
              </span>

              {/* Sub-label */}
              <span className="text-[10px] sm:text-[11px] text-neutral-400 font-medium whitespace-nowrap block mt-0.5">
                {item.sublabel}
              </span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
