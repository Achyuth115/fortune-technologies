import React from 'react';

interface BrandLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'light' | 'dark' | 'icon-only';
  showPhone?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  className = '',
  variant = 'dark',
  showPhone = false,
  size = 'md',
}) => {
  const isLight = variant === 'light';

  // Size mappings
  const emblemSizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  const mainTextSizeClasses = {
    sm: 'text-xl',
    md: 'text-2xl sm:text-[26px]',
    lg: 'text-3xl sm:text-4xl',
    xl: 'text-4xl sm:text-5xl',
  }[size];

  const subTextSizeClasses = {
    sm: 'text-[8px] tracking-[0.25em]',
    md: 'text-[9.5px] sm:text-[10px] tracking-[0.28em]',
    lg: 'text-xs tracking-[0.32em]',
    xl: 'text-sm tracking-[0.35em]',
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Authentic Handshake Circuit Logo Emblem */}
      <div
        className={`relative ${emblemSizeClasses} shrink-0 flex items-center justify-center rounded-xl overflow-hidden ${
          isLight
            ? 'bg-white p-1 shadow-md border border-white/20'
            : 'bg-white p-0.5 shadow-sm border border-neutral-200'
        }`}
      >
        <img
          src="/images/fortune-technologies-logo.jpg"
          alt="Fortune Technologies Emblem"
          className="w-full h-full object-contain block mix-blend-multiply"
          referrerPolicy="no-referrer"
        />
      </div>

      {/* Exact Typographic Wordmark from Reference Image: Fort[u]ne TECHNOLOGIES */}
      <div className="flex flex-col leading-none">
        <div
          className={`flex items-baseline font-black tracking-tight ${mainTextSizeClasses} font-['Outfit']`}
        >
          <span className={isLight ? 'text-white' : 'text-[#392080]'}>Fort</span>
          <span className="text-[#E5232D] font-black px-[1px]">u</span>
          <span className={isLight ? 'text-white' : 'text-[#392080]'}>ne</span>
        </div>

        <span
          className={`uppercase font-extrabold mt-0.5 ${subTextSizeClasses} ${
            isLight ? 'text-purple-200' : 'text-[#392080]'
          }`}
        >
          TECHNOLOGIES
        </span>

        {/* Optional Hotline */}
        {showPhone && (
          <span className="text-[10px] font-mono font-bold text-[#E5232D] mt-0.5">
            7799066626
          </span>
        )}
      </div>
    </div>
  );
};
