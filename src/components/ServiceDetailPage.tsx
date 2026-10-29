import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Check,
  Sparkles,
  Phone,
  Tv,
  Server,
  Laptop,
  Camera,
  Layers,
  Wrench,
} from 'lucide-react';
import { ServiceItem } from '../types/index.ts';
import { AdvanceBookingModal } from './AdvanceBookingModal.tsx';

interface ServiceDetailPageProps {
  service: ServiceItem;
  onBack: () => void;
  onSelectOtherService: (serviceId: string) => void;
  allServices: ServiceItem[];
}

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  service,
  onBack,
  onSelectOtherService,
  allServices,
}) => {
  const defaultSelectedIds = useMemo(() => {
    const defaults = service.configurations
      .filter((c) => c.isDefault)
      .map((c) => c.id);
    return defaults.length > 0 ? defaults : [service.configurations[0].id];
  }, [service]);

  const [selectedConfigIds, setSelectedConfigIds] = useState<string[]>(defaultSelectedIds);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleConfiguration = (configId: string) => {
    setSelectedConfigIds((prev) => {
      if (prev.includes(configId)) {
        if (prev.length === 1) return prev;
        return prev.filter((id) => id !== configId);
      } else {
        return [...prev, configId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedConfigIds(service.configurations.map((c) => c.id));
  };

  const handleReset = () => {
    setSelectedConfigIds(defaultSelectedIds);
  };

  const packageTotal = useMemo(() => {
    return service.configurations
      .filter((c) => selectedConfigIds.includes(c.id))
      .reduce((sum, c) => sum + c.price, 0);
  }, [service, selectedConfigIds]);

  const advanceAmount = Math.round(packageTotal * 0.2);
  const remainingBalance = packageTotal - advanceAmount;

  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case 'Projector':
        return <Layers className="w-5 h-5 text-[#392080]" />;
      case 'Tv':
        return <Tv className="w-5 h-5 text-[#392080]" />;
      case 'Server':
        return <Server className="w-5 h-5 text-[#392080]" />;
      case 'Laptop':
        return <Laptop className="w-5 h-5 text-[#392080]" />;
      case 'Camera':
        return <Camera className="w-5 h-5 text-[#392080]" />;
      default:
        return <Wrench className="w-5 h-5 text-[#392080]" />;
    }
  };

  return (
    <div className="bg-[#F8FAFC] min-h-screen pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb Bar */}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-neutral-700 hover:text-neutral-900 bg-white hover:bg-neutral-50 rounded-xl border border-neutral-200/80 shadow-sm transition-all"
          >
            <ArrowLeft className="w-4 h-4 text-[#392080]" />
            <span>&larr; Back to All Services</span>
          </button>

          {/* Quick Service Switcher Tabs */}
          <div className="hidden lg:flex items-center gap-1.5 bg-white p-1 rounded-xl border border-neutral-200 shadow-sm text-xs">
            {allServices.map((s) => (
              <button
                key={s.id}
                onClick={() => {
                  if (s.id !== service.id) {
                    onSelectOtherService(s.id);
                  }
                }}
                className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
                  s.id === service.id
                    ? 'bg-[#392080] text-white shadow-sm'
                    : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100'
                }`}
              >
                {s.title}
              </button>
            ))}
          </div>

          <a
            href="tel:7799066626"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-[#0B1E36] hover:bg-[#1E293B] rounded-xl shadow-sm transition-colors"
          >
            <Phone className="w-3.5 h-3.5 text-[#E5232D]" />
            <span>Direct Call: 7799066626</span>
          </a>
        </div>

        {/* Main 2-Column Layout Matching Reference Image 2 (image_44ab5c57.png) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Big Image + What's Included Card */}
          <div className="lg:col-span-5 space-y-6">
            {/* Main Service Image with floating icon badge */}
            <div className="relative rounded-3xl overflow-hidden bg-neutral-900 shadow-md border border-neutral-200 aspect-[4/3]">
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {/* Category Badge top-left */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-[#0B1E36]/90 backdrop-blur-md text-white border border-white/20 shadow-md">
                  {service.categoryBadge}
                </span>
              </div>

              {/* Floating Service Icon on top-right as in reference image */}
              <div className="absolute top-4 right-4 w-10 h-10 rounded-xl bg-white/95 backdrop-blur-md shadow-lg flex items-center justify-center border border-white/40">
                {renderIcon(service.iconName)}
              </div>
            </div>

            {/* What's Included Card (Exactly styled as reference image) */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2.5 pb-2 border-b border-neutral-100">
                <Sparkles className="w-4 h-4 text-sky-500" />
                <h3 className="text-xs sm:text-sm font-black text-sky-900 uppercase tracking-wider font-['Outfit']">
                  WHAT'S INCLUDED IN {service.title}
                </h3>
              </div>

              <ul className="space-y-3">
                {service.whatsIncluded.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 text-xs sm:text-[13px] text-neutral-700 leading-snug">
                    <span className="w-5 h-5 rounded-full bg-emerald-50 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5 text-emerald-600">
                      <Check className="w-3 h-3 stroke-[2.5]" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Supported Brands */}
              {service.brands && (
                <div className="pt-3 border-t border-neutral-100">
                  <span className="text-[10px] uppercase font-bold text-neutral-400 tracking-wider block mb-1.5 font-mono">
                    Supported OEM Brands:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {service.brands.map((b) => (
                      <span
                        key={b}
                        className="px-2 py-0.5 rounded bg-neutral-100 text-[11px] font-medium text-neutral-700"
                      >
                        {b}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title + Description + Configurations Table + Summary Card */}
          <div className="lg:col-span-7 space-y-6">
            {/* Service Title & Detailed Description */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 p-6 sm:p-7 shadow-sm">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-[#0B1E36] font-['Outfit'] tracking-tight">
                {service.title}
              </h1>
              <p className="mt-3 text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {service.fullDesc}
              </p>
            </div>

            {/* Configurations Box (Exactly styled as reference image) */}
            <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm overflow-hidden">
              {/* Configurations Header with Select All / Reset */}
              <div className="p-5 sm:p-6 pb-4 flex items-center justify-between gap-3 border-b border-neutral-100">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-sky-500" />
                  <span className="text-xs sm:text-sm font-bold uppercase tracking-wider text-sky-900 font-['Outfit']">
                    SELECT SERVICE CONFIGURATION(S)
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-semibold">
                  <button
                    onClick={handleSelectAll}
                    className="text-sky-600 hover:text-sky-800 hover:underline transition-colors"
                  >
                    Select All
                  </button>
                  <span className="text-neutral-300">|</span>
                  <button
                    onClick={handleReset}
                    className="text-neutral-500 hover:text-neutral-800 hover:underline transition-colors"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Dark Table Header: OPTION / CONFIGURATION & PRICE */}
              <div className="bg-[#0B1E36] text-white px-5 sm:px-6 py-2.5 flex items-center justify-between text-xs uppercase tracking-wider font-mono font-bold">
                <span>Option / Configuration</span>
                <span>Price</span>
              </div>

              {/* Rows List */}
              <div className="divide-y divide-neutral-100">
                {service.configurations.map((config) => {
                  const isChecked = selectedConfigIds.includes(config.id);
                  return (
                    <div
                      key={config.id}
                      onClick={() => toggleConfiguration(config.id)}
                      className={`px-5 sm:px-6 py-3.5 flex items-center justify-between gap-4 cursor-pointer transition-colors ${
                        isChecked ? 'bg-emerald-50/40 hover:bg-emerald-50/70' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        {/* Custom Checkbox */}
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors ${
                            isChecked
                              ? 'bg-[#00B569] text-white shadow-sm'
                              : 'border-2 border-neutral-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>

                        {/* Configuration Title */}
                        <span
                          className={`text-xs sm:text-sm font-medium ${
                            isChecked ? 'text-neutral-900 font-semibold' : 'text-neutral-700'
                          }`}
                        >
                          {config.name}
                        </span>
                      </div>

                      {/* Price Tag Pill */}
                      <div className="shrink-0 bg-emerald-50 text-emerald-800 border border-emerald-200/90 font-mono font-bold text-xs sm:text-sm px-3 py-1 rounded-lg">
                        ₹{config.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Dark Navy Summary & Advance Payment Card (Exactly matching Reference Image 2) */}
            <div className="bg-[#061224] rounded-3xl p-6 sm:p-7 text-white shadow-xl space-y-5 border border-white/10">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <span className="text-[10px] uppercase font-bold tracking-widest text-neutral-400 font-mono block">
                    SELECTED PACKAGE TOTAL
                  </span>
                  <div className="text-2xl sm:text-4xl font-black font-['Outfit'] mt-1">
                    ₹{packageTotal.toLocaleString('en-IN')}
                  </div>
                </div>

                {/* 20% Booking Advance Pill Card */}
                <div className="bg-[#0B2538] border border-emerald-500/30 px-4 py-2.5 rounded-2xl text-right">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400 font-mono block">
                    20% BOOKING ADVANCE
                  </span>
                  <div className="text-lg sm:text-2xl font-black font-mono text-[#00E07A] mt-0.5">
                    ₹{advanceAmount.toLocaleString('en-IN')}
                  </div>
                </div>
              </div>

              {/* Remaining balance notice */}
              <div className="text-xs text-neutral-400 font-medium">
                Remaining Balance (Due After Service):{' '}
                <strong className="text-neutral-200 font-mono">
                  ₹{remainingBalance.toLocaleString('en-IN')}
                </strong>
              </div>

              {/* Proceed Button */}
              <button
                onClick={() => setIsModalOpen(true)}
                className="w-full py-4 px-6 text-sm sm:text-base font-extrabold text-neutral-950 bg-[#00C26D] hover:bg-[#00D97B] active:scale-[0.99] rounded-2xl shadow-xl transition-all flex items-center justify-center gap-2 tracking-wide font-['Outfit']"
              >
                <Sparkles className="w-5 h-5 text-neutral-900" />
                <span>
                  + PROCEED TO BOOK & PAY 20% ADVANCE (₹{advanceAmount.toLocaleString('en-IN')})
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Advance Booking Modal */}
      <AdvanceBookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialServiceId={service.id}
        initialConfigIds={selectedConfigIds}
      />
    </div>
  );
};
