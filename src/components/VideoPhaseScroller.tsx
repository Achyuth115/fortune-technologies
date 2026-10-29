import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ArrowRight, Wrench, Eye, Cpu, Film, Play, Pause, Sparkles } from 'lucide-react';

interface VideoPhaseScrollerProps {
  onBookRepairClick: () => void;
}

interface PhaseInfo {
  id: number;
  label: string;
  shortLabel: string;
  heading: string;
  subtitle: string;
  description: string;
  timeTarget: number;
  highlightIcon: React.ElementType;
  specs: string[];
}

const PHASES: PhaseInfo[] = [
  {
    id: 1,
    label: '01 / PRECISION',
    shortLabel: '01 Precision',
    heading: 'PROJECTOR ENGINEERING',
    subtitle: 'PERFORMANCE THROUGH PRECISION',
    description:
      'Professional projector diagnostics, repair, and maintenance. We inspect optical paths, ballast voltages, and DLP/LCD prism alignments.',
    timeTarget: 0.2,
    highlightIcon: Wrench,
    specs: ['Optical Path Alignment', 'Laser Phosphor Integrity', 'Ballast Power Stability'],
  },
  {
    id: 2,
    label: '02 / OPTICS',
    shortLabel: '02 Optics',
    heading: 'ENGINEERED FOR CLARITY',
    subtitle: 'ADVANCED OPTICAL TECHNOLOGY',
    description:
      'Discover the technology behind exceptional projection performance. Ultra-high precision lens calibration, anti-reflective coatings, and throw distance tuning.',
    timeTarget: 2.2,
    highlightIcon: Eye,
    specs: ['Multi-Coated Glass Inspection', 'Motorized Lens Shift Calibration', 'Chromatic Aberration Correction'],
  },
  {
    id: 3,
    label: '03 / DIAGNOSTICS',
    shortLabel: '03 Internals',
    heading: 'PRECISION REPAIR',
    subtitle: 'EVERY COMPONENT MATTERS',
    description:
      'Detailed inspection and servicing of projector systems and internal components: DMD micro-mirror chips, cooling fan arrays, high-pressure heat sinks, and mainboards.',
    timeTarget: 4.5,
    highlightIcon: Cpu,
    specs: ['DMD Chip Micro-Mirror Restoration', 'Thermal Heat Pipe Cleanout', 'SMD Motherboard Micro-Soldering'],
  },
  {
    id: 4,
    label: '04 / EXPERIENCE',
    shortLabel: '04 Theatre',
    heading: 'BRING YOUR THEATRE BACK TO LIFE',
    subtitle: 'AUDIO. VIDEO. PERFORMANCE.',
    description:
      'Professional support for projectors, home theatre equipment, and audiovisual systems. Restore native black levels, vivid HDR color gamut, and immersive acoustic staging.',
    timeTarget: 6.8,
    highlightIcon: Film,
    specs: ['Dolby Vision & HDR10 Calibration', 'Surround AV Signal Sync', '24-Hour Stress Tested Delivery'],
  },
];

export const VideoPhaseScroller: React.FC<VideoPhaseScrollerProps> = ({ onBookRepairClick }) => {
  const sectionRef = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const [activePhaseIndex, setActivePhaseIndex] = useState(0);
  const [scrubProgress, setScrubProgress] = useState(0);
  const [isAutoLoop, setIsAutoLoop] = useState(false);
  const [videoDuration, setVideoDuration] = useState(7.04);

  // Fast seeking lock ref
  const isSeekingRef = useRef<boolean>(false);
  const pendingSeekTargetRef = useRef<number | null>(null);

  const videoSrc = '/videos/projector-hero.mp4';
  const posterSrc = '/images/equipment_laser_projector_1792993393306.jpg';

  // Seek dispatcher with fast intra-frame hardware seek
  const seekToTime = useCallback(
    (timeInSeconds: number) => {
      const video = videoRef.current;
      if (!video) return;

      const duration =
        video.duration && !isNaN(video.duration) && video.duration > 0
          ? video.duration
          : videoDuration || 7.04;

      const clampedTime = Math.max(0, Math.min(duration - 0.05, timeInSeconds));

      if (isSeekingRef.current) {
        pendingSeekTargetRef.current = clampedTime;
        return;
      }

      isSeekingRef.current = true;
      try {
        if ('fastSeek' in video && typeof (video as any).fastSeek === 'function') {
          (video as any).fastSeek(clampedTime);
        } else {
          video.currentTime = clampedTime;
        }
      } catch (err) {
        try {
          video.currentTime = clampedTime;
        } catch (e) {
          // ignore
        }
      }
    },
    [videoDuration]
  );

  // Video metadata and event lifecycle
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (!isAutoLoop) {
      video.pause();
    }

    const updateDuration = () => {
      if (video.duration && !isNaN(video.duration) && video.duration > 0) {
        setVideoDuration(video.duration);
      }
    };

    const handleSeeked = () => {
      isSeekingRef.current = false;
      if (pendingSeekTargetRef.current !== null) {
        const nextTarget = pendingSeekTargetRef.current;
        pendingSeekTargetRef.current = null;
        seekToTime(nextTarget);
      }
    };

    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('loadeddata', updateDuration);
    video.addEventListener('canplay', updateDuration);
    video.addEventListener('seeked', handleSeeked);

    if (video.readyState >= 1) {
      updateDuration();
    }

    return () => {
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('loadeddata', updateDuration);
      video.removeEventListener('canplay', updateDuration);
      video.removeEventListener('seeked', handleSeeked);
    };
  }, [isAutoLoop, seekToTime]);

  // Window scroll sync: map viewport visibility to video progress
  useEffect(() => {
    if (isAutoLoop) return;

    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return;

      rafId = requestAnimationFrame(() => {
        rafId = null;
        const el = sectionRef.current;
        if (!el) return;

        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // When section enters the viewport
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
          // Progress from 0 (section top hits bottom of screen) to 1 (section bottom leaves top of screen)
          const totalTravel = windowHeight + rect.height;
          const currentTravel = windowHeight - rect.top;
          const raw = currentTravel / totalTravel;
          const progress = Math.min(1, Math.max(0, raw));

          setScrubProgress(progress);

          // Map progress to phase (0..3)
          const phaseCount = PHASES.length;
          const segmentSize = 1 / phaseCount;
          const calculatedIndex = Math.min(
            phaseCount - 1,
            Math.max(0, Math.floor(progress / segmentSize))
          );
          setActivePhaseIndex(calculatedIndex);

          // Seek video
          const effectiveDuration = videoRef.current?.duration || videoDuration || 7.04;
          seekToTime(progress * effectiveDuration);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [isAutoLoop, videoDuration, seekToTime]);

  // Handle phase manual selection click
  const selectPhase = (index: number) => {
    setActivePhaseIndex(index);
    const target = PHASES[index].timeTarget;
    seekToTime(target);
    setScrubProgress(index / (PHASES.length - 1));
  };

  // Interactive Click & Drag Scrubbing on Timeline
  const handleProgressBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const bar = progressBarRef.current;
    if (!bar) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const progress = Math.min(1, Math.max(0, clickX / rect.width));

    setScrubProgress(progress);

    const phaseCount = PHASES.length;
    const segmentSize = 1 / phaseCount;
    const calculatedIndex = Math.min(
      phaseCount - 1,
      Math.max(0, Math.floor(progress / segmentSize))
    );
    setActivePhaseIndex(calculatedIndex);

    const effectiveDuration = videoRef.current?.duration || videoDuration || 7.04;
    seekToTime(progress * effectiveDuration);
  };

  // Toggle Auto-loop vs Scroll-scrub mode
  const toggleLoopMode = () => {
    const nextState = !isAutoLoop;
    setIsAutoLoop(nextState);
    const video = videoRef.current;
    if (!video) return;

    if (nextState) {
      video.play().catch(() => {});
    } else {
      video.pause();
      const effectiveDuration = video.duration || videoDuration || 7.04;
      seekToTime(scrubProgress * effectiveDuration);
    }
  };

  const activePhase = PHASES[activePhaseIndex];
  const IconComponent = activePhase.highlightIcon;

  return (
    <section
      id="cinematic-experience"
      ref={sectionRef}
      className="relative bg-neutral-950 text-white py-12 sm:py-16 lg:py-20 border-t border-neutral-900 border-b border-neutral-900 overflow-hidden"
    >
      {/* Background Scrubbed Video Layer - Fits container cleanly with zero extra height */}
      <div className="absolute inset-0 z-0 overflow-hidden bg-neutral-950">
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay={isAutoLoop}
          muted
          loop={isAutoLoop}
          playsInline
          preload="auto"
          className="w-full h-full object-cover opacity-100 transition-opacity duration-300 scale-100"
        />

        {/* Soft edge blends to keep text legible while video remains bright and clear */}
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-neutral-950/80 via-neutral-950/40 to-transparent pointer-events-none" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-neutral-950/60 to-transparent pointer-events-none" />

        {/* Subtle dynamic purple lens glow */}
        <div
          className="absolute top-1/3 right-1/4 w-72 sm:w-96 h-72 sm:h-96 rounded-full pointer-events-none opacity-20 filter blur-3xl"
          style={{
            background:
              activePhaseIndex === 3
                ? 'radial-gradient(circle, rgba(229,35,45,0.4) 0%, transparent 70%)'
                : 'radial-gradient(circle, rgba(57,32,128,0.5) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Content Container - Regular Flow, No Sticky Overhang, Zero Black Void */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-between min-h-[550px] sm:min-h-[600px] lg:min-h-[640px]">
        {/* Top Header Controls */}
        <div className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-[#E5232D] animate-pulse" />
              <span className="text-[11px] sm:text-xs uppercase tracking-widest font-bold text-neutral-200 font-mono">
                SCROLL SCRUB SYNC
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-neutral-400">
              Scroll page or click phases to scrub video frames
            </span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={toggleLoopMode}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] sm:text-xs font-medium border transition-colors ${
                isAutoLoop
                  ? 'bg-[#392080] border-[#392080] text-white'
                  : 'bg-white/10 border-white/20 text-neutral-200 hover:text-white'
              }`}
            >
              {isAutoLoop ? (
                <>
                  <Pause className="w-3 h-3 text-[#E5232D]" />
                  <span>Pause & Scrub</span>
                </>
              ) : (
                <>
                  <Play className="w-3 h-3 text-[#E5232D]" />
                  <span>Continuous Play</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Center Storytelling Content Panel */}
        <div className="max-w-xl my-6 sm:my-8 px-1 sm:px-2 bg-transparent">
          {/* Phase Tag */}
          <div className="inline-flex items-center gap-1.5 sm:gap-2 px-2.5 py-1 rounded-md bg-[#392080]/90 border border-[#392080] text-[10px] sm:text-xs font-mono font-semibold text-purple-200 tracking-wider mb-2.5 shadow-md">
            <IconComponent className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#E5232D]" />
            <span>{activePhase.label}</span>
          </div>

          {/* Heading */}
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-['Outfit'] tracking-tight [text-wrap:balance] drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)] leading-tight">
            {activePhase.heading}
          </h2>

          {/* Subtitle */}
          <p className="mt-1 sm:mt-2 text-xs sm:text-sm font-bold tracking-widest uppercase text-[#E5232D] font-['Outfit'] drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {activePhase.subtitle}
          </p>

          {/* Description */}
          <p className="mt-2.5 sm:mt-3 text-xs sm:text-sm text-neutral-100 leading-relaxed font-normal drop-shadow-[0_2px_8px_rgba(0,0,0,0.95)]">
            {activePhase.description}
          </p>

          {/* Key Engineering Specifications */}
          <div className="mt-4 space-y-1.5 border-l-2 border-[#392080] pl-3 sm:pl-4">
            {activePhase.specs.map((spec, i) => (
              <div
                key={i}
                className="flex items-center gap-2 text-[11px] sm:text-xs text-neutral-200 drop-shadow-[0_2px_6px_rgba(0,0,0,0.9)]"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#E5232D] shrink-0" />
                <span>{spec}</span>
              </div>
            ))}
          </div>

          {/* Action Trigger */}
          <div className="mt-5 sm:mt-6">
            {activePhase.id === 4 ? (
              <button
                onClick={onBookRepairClick}
                className="inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold tracking-wide text-white bg-[#E5232D] hover:bg-[#c91822] rounded-xl shadow-lg glow-red transition-all"
              >
                <span>BOOK A REPAIR</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={() => selectPhase(Math.min(PHASES.length - 1, activePhaseIndex + 1))}
                className="inline-flex items-center gap-2 px-4 py-2 sm:px-5 sm:py-2.5 text-[11px] sm:text-xs font-semibold text-white bg-white/15 hover:bg-white/25 rounded-lg border border-white/25 backdrop-blur-sm transition-all"
              >
                <span>Next: {PHASES[Math.min(PHASES.length - 1, activePhaseIndex + 1)].shortLabel}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Bottom Interactive Phase Stepper Dock */}
        <div className="w-full pt-3 border-t border-white/10">
          {/* Interactive Scrub Progress Bar */}
          <div
            ref={progressBarRef}
            onClick={handleProgressBarClick}
            className="w-full bg-white/20 hover:bg-white/30 h-2.5 rounded-full overflow-hidden mb-3 cursor-pointer relative transition-colors shadow-inner"
            title="Click or drag anywhere on timeline to scrub video"
          >
            <div
              className="bg-gradient-to-r from-[#392080] via-[#E5232D] to-purple-400 h-full transition-all duration-75 relative rounded-full"
              style={{ width: `${Math.round(scrubProgress * 100)}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 rounded-full bg-white shadow-md border border-[#E5232D]" />
            </div>
          </div>

          {/* Mobile Phase Pill Selector (Under sm screens) */}
          <div className="grid grid-cols-4 gap-1.5 sm:hidden">
            {PHASES.map((phase, idx) => {
              const isCurrent = idx === activePhaseIndex;
              return (
                <button
                  key={phase.id}
                  onClick={() => selectPhase(idx)}
                  className={`py-2 px-1 rounded-lg text-center border text-[10px] font-mono font-semibold transition-all ${
                    isCurrent
                      ? 'bg-[#392080] border-[#392080] text-white shadow-sm ring-1 ring-[#392080]'
                      : 'bg-neutral-900/80 border-white/10 text-neutral-400'
                  }`}
                >
                  {phase.shortLabel}
                </button>
              );
            })}
          </div>

          {/* Desktop & Laptop 4 Interactive Phase Cards (sm screens and above) */}
          <div className="hidden sm:grid sm:grid-cols-4 gap-3">
            {PHASES.map((phase, idx) => {
              const isCurrent = idx === activePhaseIndex;
              return (
                <button
                  key={phase.id}
                  onClick={() => selectPhase(idx)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 ${
                    isCurrent
                      ? 'bg-neutral-900/95 border-[#392080] shadow-md ring-1 ring-[#392080]'
                      : 'bg-neutral-950/70 border-white/10 hover:border-white/25 hover:bg-neutral-900/50 text-neutral-400'
                  }`}
                >
                  <div className="flex items-center justify-between text-[10px] font-mono mb-1">
                    <span className={isCurrent ? 'text-[#E5232D] font-bold' : 'text-neutral-500'}>
                      {phase.label}
                    </span>
                    <span className="text-neutral-400">{phase.timeTarget.toFixed(1)}s</span>
                  </div>
                  <div
                    className={`text-xs font-bold truncate ${
                      isCurrent ? 'text-white' : 'text-neutral-300'
                    }`}
                  >
                    {phase.heading}
                  </div>
                  <div className="text-[11px] text-neutral-400 truncate mt-0.5">
                    {phase.subtitle}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
