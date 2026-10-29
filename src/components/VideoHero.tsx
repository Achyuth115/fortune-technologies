import React, { useRef, useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

interface VideoHeroProps {
  onBookRepairClick: () => void;
  onExploreServicesClick: () => void;
  onJumpToExperienceClick: () => void;
}

export const VideoHero: React.FC<VideoHeroProps> = ({
  onBookRepairClick,
  onExploreServicesClick,
}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [hasVideoError, setHasVideoError] = useState(false);

  const videoSrc = '/videos/projector-hero.mp4';
  const posterSrc = '/images/equipment_laser_projector_1792993393306.jpg';

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleError = () => {
      setHasVideoError(true);
    };

    video.addEventListener('error', handleError);
    return () => {
      video.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <section className="relative min-h-[85vh] sm:min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden bg-neutral-950 text-white pt-16 sm:pt-24 pb-16 sm:pb-24">
      {/* Background Video Layer - Full Visibility with Zero Overlay Obstruction */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
        {!hasVideoError ? (
          <video
            ref={videoRef}
            src={videoSrc}
            poster={posterSrc}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            className="w-full h-full object-cover scale-100 transition-all duration-700"
          />
        ) : (
          /* Graceful Fallback if Video is unavailable */
          <div className="relative w-full h-full flex items-center justify-center bg-gradient-to-br from-[#1E1045] via-neutral-950 to-neutral-900">
            <img
              src={posterSrc}
              alt="Fortune Technologies Laser Projector"
              className="w-full h-full object-cover opacity-40 mix-blend-luminosity"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-6 left-6 flex items-center gap-2 text-xs text-neutral-400 bg-black/60 px-3 py-1.5 rounded-lg border border-neutral-800">
              <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
              <span>Cinematic projector preview fallback active</span>
            </div>
          </div>
        )}

        {/* Minimal subtle edge blends so background video is bright, crisp, and clearly visible */}
        <div className="absolute inset-x-0 top-0 h-16 sm:h-24 bg-gradient-to-b from-neutral-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-20 sm:h-24 bg-gradient-to-t from-neutral-950/50 to-transparent pointer-events-none" />
      </div>

      {/* Main Hero Content Area */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center">
        <div className="bg-transparent px-2 py-2 sm:px-6 sm:py-6 flex flex-col items-center w-full">
          {/* Fortune Technologies Typography */}
          <div className="mb-2 sm:mb-4 flex flex-col items-center select-none">
            <div className="flex items-baseline font-black tracking-tight text-2xl sm:text-4xl md:text-5xl font-['Outfit'] leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
              <span className="text-white">Fort</span>
              <span className="text-[#E5232D] font-extrabold px-0.5">u</span>
              <span className="text-white">ne</span>
            </div>
            <span className="text-[9px] sm:text-xs tracking-[0.38em] uppercase font-bold text-purple-200 drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)] mt-1 sm:mt-1.5">
              TECHNOLOGIES
            </span>
          </div>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-0.5 sm:px-3 sm:py-1 mb-2 sm:mb-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] sm:text-xs font-semibold tracking-wider text-purple-200">
            <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#E5232D]" />
            <span>AUDIO · VIDEO · IT REPAIR</span>
            <span className="text-white/40">·</span>
            <span className="text-neutral-200 font-mono">SECUNDERABAD</span>
          </div>

          {/* Main Display Headline */}
          <h1 className="text-2xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white font-['Outfit'] max-w-3xl [text-wrap:balance] drop-shadow-[0_4px_16px_rgba(0,0,0,0.9)] leading-tight">
            PRECISION PROJECTOR REPAIR
          </h1>

          {/* Subtitle */}
          <p className="mt-1.5 sm:mt-3 text-xs sm:text-base md:text-lg font-semibold tracking-wider sm:tracking-widest uppercase text-purple-200 font-['Outfit'] drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            AUDIO VIDEO <span className="text-[#E5232D]">·</span> COMPUTER REPAIR <span className="text-[#E5232D]">·</span> IT SOLUTIONS
          </p>

          {/* Detailed Value Description - Shown on Laptop/Desktop, kept hidden on mobile so video remains wide open */}
          <p className="hidden sm:block mt-4 text-sm sm:text-base md:text-lg text-neutral-100 max-w-2xl [text-wrap:balance] leading-relaxed drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] font-normal">
            Professional bench diagnostics and component-level repair for 4K/laser projectors, home theatre systems, AV receivers, and high-performance computing infrastructure.
          </p>

          {/* CTA Button Group - Compact row on mobile, full size on desktop */}
          <div className="mt-4 sm:mt-7 flex flex-row items-center justify-center gap-2.5 sm:gap-4 w-auto">
            <button
              onClick={onBookRepairClick}
              className="px-5 py-2.5 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-bold tracking-wide text-white bg-[#E5232D] hover:bg-[#c91822] active:scale-[0.98] rounded-xl shadow-lg glow-red transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E5232D]"
            >
              BOOK A REPAIR
            </button>

            <button
              onClick={onExploreServicesClick}
              className="px-5 py-2.5 sm:px-7 sm:py-3.5 text-xs sm:text-sm font-semibold tracking-wide text-white bg-white/15 hover:bg-white/25 active:scale-[0.98] rounded-xl border border-white/30 backdrop-blur-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              EXPLORE SERVICES
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
