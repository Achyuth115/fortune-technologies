import React, { useState, useMemo } from 'react';
import {
  X,
  CheckCircle2,
  Phone,
  Calendar,
  MapPin,
  Upload,
  CreditCard,
  Sparkles,
  ChevronRight,
  ArrowLeft,
  Check,
  ShieldCheck,
} from 'lucide-react';
import { ServiceItem } from '../types/index.ts';
import { SERVICES_DATA } from '../data/servicesData.ts';
import { WhatsAppIcon } from './WhatsAppIcon.tsx';

interface AdvanceBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServiceId?: string;
  initialConfigIds?: string[];
}

export const AdvanceBookingModal: React.FC<AdvanceBookingModalProps> = ({
  isOpen,
  onClose,
  initialServiceId = 'projector-service',
  initialConfigIds,
}) => {
  // Current active service inside the modal
  const [selectedServiceId, setSelectedServiceId] = useState<string>(initialServiceId);
  const currentService: ServiceItem = useMemo(() => {
    return SERVICES_DATA.find((s) => s.id === selectedServiceId) || SERVICES_DATA[0];
  }, [selectedServiceId]);

  // Selected configuration IDs
  const [selectedConfigIds, setSelectedConfigIds] = useState<string[]>(() => {
    if (initialConfigIds && initialConfigIds.length > 0) return initialConfigIds;
    const defaults = currentService.configurations.filter((c) => c.isDefault).map((c) => c.id);
    return defaults.length > 0 ? defaults : [currentService.configurations[0].id];
  });

  // Modal Step: 1 = Service & Customer Details, 2 = 20% Advance UPI/PhonePe Payment, 3 = Confirmed
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Customer Form State
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredSlot, setPreferredSlot] = useState('Morning (10:00 AM - 1:00 PM)');
  const [notes, setNotes] = useState('');
  const [transactionRef, setTransactionRef] = useState('');
  const [uploadedScreenshotName, setUploadedScreenshotName] = useState<string | null>(null);

  // Ticket & Validation
  const [ticketId, setTicketId] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});

  // When changing service dropdown, update defaults
  const handleServiceChange = (serviceId: string) => {
    setSelectedServiceId(serviceId);
    const newService = SERVICES_DATA.find((s) => s.id === serviceId) || SERVICES_DATA[0];
    const defaults = newService.configurations.filter((c) => c.isDefault).map((c) => c.id);
    setSelectedConfigIds(defaults.length > 0 ? defaults : [newService.configurations[0].id]);
  };

  const toggleConfiguration = (configId: string) => {
    setSelectedConfigIds((prev) => {
      if (prev.includes(configId)) {
        if (prev.length === 1) return prev; // Keep at least one
        return prev.filter((id) => id !== configId);
      } else {
        return [...prev, configId];
      }
    });
  };

  const handleSelectAll = () => {
    setSelectedConfigIds(currentService.configurations.map((c) => c.id));
  };

  const handleReset = () => {
    const defaults = currentService.configurations.filter((c) => c.isDefault).map((c) => c.id);
    setSelectedConfigIds(defaults.length > 0 ? defaults : [currentService.configurations[0].id]);
  };

  // Live Calculations
  const packageTotal = useMemo(() => {
    return currentService.configurations
      .filter((c) => selectedConfigIds.includes(c.id))
      .reduce((sum, c) => sum + c.price, 0);
  }, [currentService, selectedConfigIds]);

  const advanceAmount = Math.round(packageTotal * 0.2);
  const remainingBalance = packageTotal - advanceAmount;

  // Form Validation & Step Transitions
  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!name.trim()) newErrors.name = 'Full name is required';
    if (!phone.trim()) {
      newErrors.phone = 'Mobile number is required';
    } else if (!/^[0-9+\s-]{10,15}$/.test(phone.trim())) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number';
    }
    if (!address.trim()) newErrors.address = 'Service location / address is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setStep(2); // Proceed to 20% Advance UPI QR payment screen
  };

  const handleFinalSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = `FT-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedId);
    setStep(3); // Success Screen
  };

  const handleScreenshotUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedScreenshotName(file.name);
    }
  };

  if (!isOpen) return null;

  // Direct UPI link for mobile app tap
  const upiLink = `upi://pay?pa=7799066626@ybl&pn=Fortune%20Technologies&am=${advanceAmount}&cu=INR&tn=20pct_Advance_Booking_${ticketId || 'FT'}`;

  // Pre-filled WhatsApp message
  const whatsappMessage = encodeURIComponent(
    `Hello Fortune Technologies!\n` +
      `I have booked a service online:\n` +
      `Ticket: ${ticketId}\n` +
      `Service: ${currentService.title}\n` +
      `Total: ₹${packageTotal.toLocaleString('en-IN')}\n` +
      `20% Advance Paid/Reserved: ₹${advanceAmount.toLocaleString('en-IN')}\n` +
      `Customer: ${name} (${phone})\n` +
      `Address: ${address}\n` +
      `Slot: ${preferredDate || 'Earliest available'} - ${preferredSlot}\n` +
      (transactionRef ? `Transaction Ref: ${transactionRef}\n` : '') +
      `Please confirm technician dispatch.`
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-6 animate-in fade-in zoom-in-95 duration-200">
        {/* Header - Matching Video Style */}
        <div className="bg-[#0B1E36] text-white px-5 sm:px-6 py-4 flex items-center justify-between border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#00B569] animate-pulse" />
            <div>
              <h3 className="text-sm sm:text-base font-bold font-['Outfit'] tracking-wide">
                {step === 3
                  ? 'Booking Confirmed - Fortune Technologies'
                  : step === 2
                  ? 'Book Your Premium Service - 20% Advance Payment'
                  : 'Book Your Premium Service - Fortune Technologies'}
              </h3>
              <span className="text-[10px] text-neutral-300 font-mono block">
                Secunderabad Workshop · GSTIN: 36DANPK8362R1ZM
              </span>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-neutral-300 hover:text-white flex items-center justify-center transition-colors focus:outline-none"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* STEP 1: Select Service, Configurations & Customer Details */}
        {step === 1 && (
          <form onSubmit={handleProceedToPayment} className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
            {/* Service Selector Dropdown */}
            <div>
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono mb-1.5">
                Selected Service
              </label>
              <div className="relative">
                <select
                  value={selectedServiceId}
                  onChange={(e) => handleServiceChange(e.target.value)}
                  className="w-full px-4 py-3 bg-[#F8FAFC] border-2 border-neutral-200 rounded-xl font-bold text-sm text-neutral-900 focus:outline-none focus:border-[#392080] focus:bg-white shadow-sm transition-all cursor-pointer"
                >
                  {SERVICES_DATA.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.title} (Starts from ₹{s.startingPrice.toLocaleString('en-IN')})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Configurations Box Matching Reference Video Style (00:00 & 00:05) */}
            <div className="border border-neutral-200 rounded-2xl overflow-hidden shadow-sm bg-white">
              {/* Box Top Bar */}
              <div className="bg-[#F8FAFC] px-4 py-2.5 border-b border-neutral-200 flex items-center justify-between">
                <span className="text-xs font-bold text-neutral-800 uppercase font-mono tracking-wider">
                  Select Specific Package / Sub-service
                </span>
                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    type="button"
                    onClick={handleSelectAll}
                    className="text-sky-600 hover:underline"
                  >
                    Select All
                  </button>
                  <span className="text-neutral-300">|</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-neutral-500 hover:underline"
                  >
                    Reset
                  </button>
                </div>
              </div>

              {/* Checkboxes List */}
              <div className="divide-y divide-neutral-100 max-h-48 overflow-y-auto">
                {currentService.configurations.map((config) => {
                  const isChecked = selectedConfigIds.includes(config.id);
                  return (
                    <div
                      key={config.id}
                      onClick={() => toggleConfiguration(config.id)}
                      className={`px-4 py-2.5 flex items-center justify-between gap-3 cursor-pointer transition-colors ${
                        isChecked ? 'bg-emerald-50/50' : 'hover:bg-neutral-50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center transition-all ${
                            isChecked
                              ? 'bg-[#00B569] text-white shadow-sm'
                              : 'border-2 border-neutral-300 bg-white'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <span
                          className={`text-xs sm:text-sm ${
                            isChecked ? 'font-bold text-neutral-900' : 'text-neutral-700'
                          }`}
                        >
                          {config.name}
                        </span>
                      </div>
                      <span className="shrink-0 font-mono font-bold text-xs bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-lg">
                        ₹{config.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Price Calculation Pill Bar */}
            <div className="bg-[#0B1E36] text-white p-4 rounded-2xl flex flex-wrap items-center justify-between gap-3 shadow-md">
              <div>
                <span className="text-[10px] uppercase font-bold text-neutral-300 font-mono block">
                  Selected Package Total
                </span>
                <span className="text-xl sm:text-2xl font-black font-['Outfit']">
                  ₹{packageTotal.toLocaleString('en-IN')}
                </span>
              </div>

              <div className="bg-emerald-950/80 border border-emerald-500/40 px-3.5 py-2 rounded-xl text-right">
                <span className="text-[10px] uppercase font-bold text-emerald-400 font-mono block">
                  20% Booking Advance
                </span>
                <span className="text-base sm:text-xl font-black font-mono text-[#00E07A]">
                  ₹{advanceAmount.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            {/* Customer Details Form */}
            <div className="space-y-3 pt-1">
              <h4 className="text-xs font-bold text-neutral-900 uppercase tracking-wider font-mono">
                Customer & Location Details
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Full Name <span className="text-[#E5232D]">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Ramesh Chandra"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                      errors.name ? 'border-[#E5232D] ring-1 ring-[#E5232D]' : 'border-neutral-300'
                    } text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]`}
                  />
                  {errors.name && <p className="mt-1 text-[11px] text-[#E5232D]">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Mobile Phone Number <span className="text-[#E5232D]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. 7799066626"
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                      errors.phone ? 'border-[#E5232D] ring-1 ring-[#E5232D]' : 'border-neutral-300'
                    } text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]`}
                  />
                  {errors.phone && <p className="mt-1 text-[11px] text-[#E5232D]">{errors.phone}</p>}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-700 mb-1">
                  Service Address & Landmark (Secunderabad / Hyderabad) <span className="text-[#E5232D]">*</span>
                </label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="e.g. Flat 302, Kamakshi Complex, SD Road, Secunderabad"
                  className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border ${
                    errors.address ? 'border-[#E5232D] ring-1 ring-[#E5232D]' : 'border-neutral-300'
                  } text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]`}
                />
                {errors.address && <p className="mt-1 text-[11px] text-[#E5232D]">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Preferred Date
                  </label>
                  <input
                    type="date"
                    value={preferredDate}
                    onChange={(e) => setPreferredDate(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Preferred Time Slot
                  </label>
                  <select
                    value={preferredSlot}
                    onChange={(e) => setPreferredSlot(e.target.value)}
                    className="w-full px-3.5 py-2 text-xs bg-white rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]"
                  >
                    <option>Morning (10:00 AM - 1:00 PM)</option>
                    <option>Afternoon (1:00 PM - 4:00 PM)</option>
                    <option>Evening (4:00 PM - 7:00 PM)</option>
                    <option>Express Immediate Inspection</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Action Button */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 sm:flex-none px-6 py-3 text-xs sm:text-sm font-bold text-white bg-[#00B569] hover:bg-[#009E5B] active:scale-[0.98] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>PROCEED TO 20% ADVANCE PAYMENT (₹{advanceAmount.toLocaleString('en-IN')})</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: PhonePe / UPI QR Code & 20% Advance Payment Screen (Exact Style of Reference Video 00:01 & 00:02) */}
        {step === 2 && (
          <form onSubmit={handleFinalSubmit} className="p-5 sm:p-6 space-y-5 max-h-[82vh] overflow-y-auto">
            {/* Top Back Nav */}
            <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-neutral-600 hover:text-neutral-900"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back to Package Selection</span>
              </button>
              <span className="text-[10px] font-mono text-neutral-500 uppercase">Step 2 of 2: Payment</span>
            </div>

            {/* QR Code Card (Matching Reference Video Style 00:01 & 00:02) */}
            <div className="bg-[#0B1E36] text-white rounded-3xl p-5 sm:p-6 text-center space-y-4 shadow-xl border border-white/10">
              {/* QR Container */}
              <div className="bg-white rounded-2xl p-4 inline-block mx-auto shadow-2xl border-4 border-emerald-400">
                {/* Real-time Dynamic UPI QR Code */}
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(
                    upiLink
                  )}`}
                  alt="UPI QR Code for 20% Advance"
                  className="w-36 h-36 sm:w-44 sm:h-44 object-contain mx-auto"
                />
                <div className="mt-2 text-neutral-900 text-[10px] font-mono font-bold tracking-wider uppercase flex items-center justify-center gap-1">
                  <span>SCAN QR CODE TO PAY NOW</span>
                </div>
              </div>

              {/* Click to pay on mobile prompt */}
              <div>
                <a
                  href={upiLink}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#5f259f] hover:bg-[#4a1c7c] text-white text-xs font-bold font-mono tracking-wide shadow-md transition-all border border-purple-400/40"
                >
                  <CreditCard className="w-3.5 h-3.5" />
                  <span>PAY ₹{advanceAmount.toLocaleString('en-IN')} VIA UPI / PHONEPE APP</span>
                </a>
                <span className="text-[10px] text-neutral-400 block mt-1 font-mono">
                  (UPI ID: 7799066626@ybl · PhonePe / Google Pay / Paytm)
                </span>
              </div>

              {/* Bill Details Strip (Matching Reference Video 00:01 & 00:02) */}
              <div className="bg-[#061224] rounded-2xl p-4 border border-white/10 text-left space-y-2 text-xs">
                <div className="flex justify-between pb-1.5 border-b border-white/10 text-neutral-300">
                  <span>Service Package:</span>
                  <span className="font-bold text-white">{currentService.title}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-white/10 text-neutral-300">
                  <span>Total Service Value:</span>
                  <span className="font-mono font-bold text-white">₹{packageTotal.toLocaleString('en-IN')}</span>
                </div>
                {/* 20% Advance Highlight */}
                <div className="flex justify-between pb-1.5 border-b border-white/10 bg-emerald-950/60 p-2 rounded-lg text-emerald-300 font-bold">
                  <span>Amount Payable Now (20% Advance):</span>
                  <span className="font-mono text-sm text-[#00E07A]">₹{advanceAmount.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex justify-between text-neutral-400 text-[11px]">
                  <span>Remaining Balance (Due After Service):</span>
                  <span className="font-mono font-semibold text-neutral-300">₹{remainingBalance.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            {/* Upload Payment Screenshot or Transaction UTR (Matching Reference Video 00:01 & 00:02) */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-neutral-800 uppercase tracking-wider font-mono">
                Upload Payment Screenshot / Reference UTR
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* File Upload Box */}
                <label className="border-2 border-dashed border-neutral-300 hover:border-emerald-500 rounded-2xl p-4 text-center cursor-pointer bg-neutral-50 hover:bg-emerald-50/30 transition-all flex flex-col items-center justify-center">
                  <Upload className="w-6 h-6 text-neutral-400 mb-1" />
                  <span className="text-xs font-bold text-neutral-700">
                    {uploadedScreenshotName || 'Drag & drop or click to upload'}
                  </span>
                  <span className="text-[10px] text-neutral-400 mt-0.5">
                    Accepted: JPG, PNG, PDF (Max 10MB)
                  </span>
                  <input
                    type="file"
                    accept="image/*,.pdf"
                    onChange={handleScreenshotUpload}
                    className="hidden"
                  />
                </label>

                {/* Optional UTR / Reference ID Box */}
                <div className="flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold text-neutral-600 block mb-1">
                      Or Enter UPI Reference / UTR Number:
                    </span>
                    <input
                      type="text"
                      value={transactionRef}
                      onChange={(e) => setTransactionRef(e.target.value)}
                      placeholder="e.g. 429381749201"
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-xl border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-500 mt-2 leading-snug">
                    * You can also complete payment upon technician arrival or WhatsApp confirmation.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Booking Request Button */}
            <div className="pt-2 flex items-center justify-between gap-3 border-t border-neutral-200">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl"
              >
                Back
              </button>

              <button
                type="submit"
                className="flex-1 px-7 py-3 text-xs sm:text-sm font-extrabold text-white bg-[#00B569] hover:bg-[#009E5B] active:scale-[0.98] rounded-xl shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>SUBMIT BOOKING REQUEST (20% ADVANCE)</span>
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Confirmed Ticket & Immediate WhatsApp / Call Dispatch */}
        {step === 3 && (
          <div className="p-6 sm:p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center text-[#00B569] mx-auto border-2 border-emerald-200">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div>
              <span className="text-xs font-mono font-bold text-emerald-700 uppercase tracking-widest block">
                Booking Request Submitted Successfully
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-neutral-900 font-['Outfit'] mt-1">
                Diagnostic Ticket #{ticketId}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto mt-2 leading-relaxed">
                Thank you, <strong>{name}</strong>! Your service booking for <strong>{currentService.title}</strong> has been registered with Fortune Technologies.
              </p>
            </div>

            {/* Summary Details */}
            <div className="bg-[#F8FAFC] rounded-2xl border border-neutral-200 p-4 text-left space-y-2 text-xs max-w-lg mx-auto">
              <div className="flex justify-between pb-1.5 border-b border-neutral-200">
                <span className="text-neutral-500 font-medium">Service Package:</span>
                <span className="font-bold text-neutral-900">{currentService.title}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-neutral-200">
                <span className="text-neutral-500 font-medium">Total Package Value:</span>
                <span className="font-mono font-bold text-neutral-900">₹{packageTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-neutral-200 text-emerald-800 font-bold bg-emerald-50/70 p-2 rounded-lg">
                <span>20% Booking Advance:</span>
                <span className="font-mono">₹{advanceAmount.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between pb-1.5 border-b border-neutral-200">
                <span className="text-neutral-500 font-medium">Service Address:</span>
                <span className="font-medium text-neutral-900 truncate max-w-xs">{address}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-500 font-medium">Preferred Slot:</span>
                <span className="font-medium text-neutral-900">{preferredDate || 'Earliest Slot'} · {preferredSlot}</span>
              </div>
            </div>

            {/* Immediate Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <a
                href={`https://wa.me/917799066626?text=${whatsappMessage}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <WhatsAppIcon className="w-4 h-4 text-white" />
                <span>Confirm on WhatsApp (Instant Response)</span>
              </a>

              <a
                href="tel:7799066626"
                className="w-full sm:w-auto px-6 py-3 text-xs font-bold text-white bg-[#0B1E36] hover:bg-[#1E293B] rounded-xl shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Phone className="w-4 h-4 text-[#E5232D]" />
                <span>Call Workshop: 7799066626</span>
              </a>
            </div>

            <button
              onClick={onClose}
              className="text-xs text-neutral-500 hover:text-neutral-800 underline font-medium block mx-auto pt-1"
            >
              Close Window
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
