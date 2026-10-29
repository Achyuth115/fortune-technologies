import React, { useState, useEffect } from 'react';
import {
  Phone,
  MessageSquare,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  MapPin,
  ExternalLink,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import { BookingFormData } from '../types/index.ts';
import { BrandLogo } from './BrandLogo.tsx';

interface ContactSectionProps {
  initialEquipment?: string;
  initialIssue?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  initialEquipment = '',
  initialIssue = '',
}) => {
  const [formData, setFormData] = useState<BookingFormData>({
    name: '',
    phone: '',
    email: '',
    equipmentType: 'Projector',
    brandModel: '',
    issueDescription: '',
    contactMethod: 'phone',
    urgency: 'standard',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof BookingFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<BookingFormData | null>(null);

  useEffect(() => {
    if (initialEquipment) {
      setFormData((prev) => ({
        ...prev,
        equipmentType: initialEquipment.includes('Projector')
          ? 'Projector'
          : initialEquipment.includes('Receiver') || initialEquipment.includes('Amplifier')
          ? 'AV Receiver / Amplifier'
          : initialEquipment.includes('Speaker') || initialEquipment.includes('Subwoofer')
          ? 'Speaker / Subwoofer'
          : initialEquipment.includes('Computer') || initialEquipment.includes('Laptop')
          ? 'Computer / Laptop'
          : 'Home Theatre System',
      }));
    }
    if (initialIssue) {
      setFormData((prev) => ({
        ...prev,
        issueDescription: initialIssue,
      }));
    }
  }, [initialEquipment, initialIssue]);

  const validate = () => {
    const newErrors: Partial<Record<keyof BookingFormData, string>> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Please provide your full name.';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required for diagnostic consultation.';
    } else if (!/^[0-9+() -]{7,16}$/.test(formData.phone.trim())) {
      newErrors.phone = 'Please enter a valid phone number.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please provide a valid email address.';
    }

    if (!formData.issueDescription.trim() || formData.issueDescription.trim().length < 10) {
      newErrors.issueDescription =
        'Please describe the symptoms in at least 10 characters (e.g. error lights, shut-off time, sound distortions).';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedData({ ...formData });
    }, 600);
  };

  const handleReset = () => {
    setSubmittedData(null);
    setFormData({
      name: '',
      phone: '',
      email: '',
      equipmentType: 'Projector',
      brandModel: '',
      issueDescription: '',
      contactMethod: 'phone',
      urgency: 'standard',
    });
    setErrors({});
  };

  return (
    <section id="contact" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#392080] mb-2">
            <span className="w-2 h-2 rounded-full bg-[#E5232D]" />
            <span>Secunderabad Service Workshop</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#111111] font-['Outfit'] tracking-tight">
            Contact & Service Booking
          </h2>
          <p className="mt-3 text-base text-[#666666] leading-relaxed">
            Reach out directly to the Fortune Technologies technical desk or submit your equipment details below for a comprehensive diagnostic consultation.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Direct Workshop Contacts & Exact Address */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick Action Contact Cards */}
            <div className="bg-[#F5F5F7] rounded-2xl border border-neutral-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-mono">
                  Direct Workshop Lines
                </h3>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-100 text-[#392080] font-semibold">
                  GST: 36DANPK8362R1ZM
                </span>
              </div>

              {/* Call Card 1 */}
              <a
                href="tel:7799066626"
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 hover:border-[#392080] transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-red-50 flex items-center justify-center text-[#E5232D] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-medium block">Primary Technician Line</span>
                    <span className="text-base font-bold text-neutral-900 font-mono group-hover:text-[#E5232D] transition-colors">
                      7799066626
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#E5232D] group-hover:underline">
                  Call &rarr;
                </span>
              </a>

              {/* Call Card 2 */}
              <a
                href="tel:9014592867"
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 hover:border-[#392080] transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-50 flex items-center justify-center text-[#392080] group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-medium block">Secondary Support Desk</span>
                    <span className="text-base font-bold text-neutral-900 font-mono group-hover:text-[#392080] transition-colors">
                      9014592867
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#392080] group-hover:underline">
                  Call &rarr;
                </span>
              </a>

              {/* WhatsApp Card */}
              <a
                href="https://wa.me/917799066626?text=Hello%20Fortune%20Technologies%2C%20I%20would%20like%20to%20enquire%20about%20a%20projector%20or%20AV%20repair."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 hover:border-emerald-500 transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs text-neutral-500 font-medium block">WhatsApp Chat</span>
                    <span className="text-sm font-bold text-neutral-900 font-mono">
                      +91 7799066626
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-emerald-600 group-hover:underline">
                  Chat Now &rarr;
                </span>
              </a>

              {/* Official Email */}
              <a
                href="mailto:fortunetechnologies100@gmail.com"
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-neutral-200 hover:border-[#392080] transition-colors group shadow-sm"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 group-hover:scale-105 transition-transform">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div className="overflow-hidden">
                    <span className="text-xs text-neutral-500 font-medium block">Official Email</span>
                    <span className="text-xs sm:text-sm font-bold text-neutral-900 font-mono truncate block">
                      fortunetechnologies100@gmail.com
                    </span>
                  </div>
                </div>
                <span className="text-xs font-semibold text-[#392080] group-hover:underline shrink-0">
                  Write &rarr;
                </span>
              </a>
            </div>

            {/* Official Workshop Address Card */}
            <div className="bg-[#F5F5F7] rounded-2xl border border-neutral-200 p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold uppercase tracking-wider text-neutral-800 font-mono flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-[#392080]" />
                  <span>Workshop Facility</span>
                </h3>
                <span className="text-xs font-semibold text-[#E5232D]">Secunderabad</span>
              </div>

              <div className="bg-white p-4 rounded-xl border border-neutral-200 space-y-2 text-xs text-neutral-700">
                <div className="flex items-start gap-2.5">
                  <MapPin className="w-4 h-4 text-[#E5232D] shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-neutral-900 font-bold block text-sm">Fortune Technologies</strong>
                    <p className="mt-1 leading-relaxed">
                      Kamakshi Commercial Complex, 3rd Floor,<br />
                      1-7-265-275 Shop No. 307, Sarojini Devi Road,<br />
                      Secunderabad – 500003, Telangana, India.
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
                  <span className="text-[11px] text-neutral-500 font-mono">
                    GSTIN: 36DANPK8362R1ZM
                  </span>
                  <a
                    href="https://maps.google.com/?q=Kamakshi+Commercial+Complex+Sarojini+Devi+Road+Secunderabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-bold text-[#392080] hover:underline"
                  >
                    <span>Open in Maps</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              {/* Bench Hours */}
              <div className="flex items-start gap-3 text-xs text-neutral-600 px-1">
                <Clock className="w-4 h-4 text-[#392080] shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-neutral-800">Operational Hours:</span>
                  <p>Monday – Saturday: 10:00 AM – 7:30 PM (Sunday by appointment)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Booking Form */}
          <div className="lg:col-span-7 bg-[#F5F5F7] rounded-2xl border border-neutral-200 p-6 sm:p-8">
            {!submittedData ? (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="border-b border-neutral-200 pb-3 mb-4 flex items-center justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 font-['Outfit']">
                      Register Equipment for Diagnostics
                    </h3>
                    <p className="text-xs text-neutral-500 mt-0.5">
                      Our Secunderabad technical workshop will review and confirm your diagnostic ticket.
                    </p>
                  </div>
                  <div className="shrink-0 hidden sm:block">
                    <BrandLogo variant="dark" size="sm" />
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Customer Name <span className="text-[#E5232D]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Ramesh Chandra"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                        errors.name ? 'border-[#E5232D] ring-1 ring-[#E5232D]' : 'border-neutral-300'
                      } text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#392080]`}
                    />
                    {errors.name && (
                      <p className="mt-1 text-[11px] text-[#E5232D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Phone Number <span className="text-[#E5232D]">*</span>
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 7799066626"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                        errors.phone ? 'border-[#E5232D] ring-1 ring-[#E5232D]' : 'border-neutral-300'
                      } text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#392080]`}
                    />
                    {errors.phone && (
                      <p className="mt-1 text-[11px] text-[#E5232D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.phone}</span>
                      </p>
                    )}
                  </div>
                </div>

                {/* Email & Brand/Model */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Email Address (Optional)
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. contact@domain.com"
                      className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                        errors.email ? 'border-[#E5232D] ring-1 ring-[#E5232D]' : 'border-neutral-300'
                      } text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#392080]`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-[11px] text-[#E5232D] flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        <span>{errors.email}</span>
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Brand & Model (If known)
                    </label>
                    <input
                      type="text"
                      value={formData.brandModel}
                      onChange={(e) => setFormData({ ...formData, brandModel: e.target.value })}
                      placeholder="e.g. BenQ / Epson / Sony / Denon AVR"
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#392080]"
                    />
                  </div>
                </div>

                {/* Equipment Type & Preferred Contact Method */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Equipment Category <span className="text-[#E5232D]">*</span>
                    </label>
                    <select
                      value={formData.equipmentType}
                      onChange={(e) => setFormData({ ...formData, equipmentType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border border-neutral-300 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-[#392080]"
                    >
                      <option value="Projector">Projector (Laser / 4K / DLP / 3LCD)</option>
                      <option value="Home Theatre System">Complete Home Theatre System</option>
                      <option value="AV Receiver / Amplifier">AV Receiver / Power Amplifier</option>
                      <option value="Speaker / Subwoofer">Speaker / Subwoofer</option>
                      <option value="Audio-Video Chain">AV Switcher / Cable / Matrix</option>
                      <option value="Computer / Laptop">Computer / Laptop / Workstation</option>
                      <option value="IT Networking">IT Support / Networking / Software</option>
                      <option value="Other">Other Equipment</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { id: 'phone', label: 'Call', icon: Phone },
                        { id: 'whatsapp', label: 'WhatsApp', icon: MessageSquare },
                        { id: 'email', label: 'Email', icon: Mail },
                      ].map((m) => {
                        const Icon = m.icon;
                        const isSelected = formData.contactMethod === m.id;
                        return (
                          <button
                            type="button"
                            key={m.id}
                            onClick={() =>
                              setFormData({ ...formData, contactMethod: m.id as any })
                            }
                            className={`py-2 px-2 rounded-lg text-xs font-medium border flex items-center justify-center gap-1.5 transition-colors ${
                              isSelected
                                ? 'bg-[#392080] border-[#392080] text-white'
                                : 'bg-white border-neutral-300 text-neutral-700 hover:bg-neutral-100'
                            }`}
                          >
                            <Icon className="w-3.5 h-3.5" />
                            <span>{m.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Problem Description */}
                <div>
                  <label className="block text-xs font-semibold text-neutral-700 mb-1">
                    Problem & Symptom Description <span className="text-[#E5232D]">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={formData.issueDescription}
                    onChange={(e) => setFormData({ ...formData, issueDescription: e.target.value })}
                    placeholder="Describe what happens when you turn on the gear (e.g. red LED blinks, fan runs then shuts off, white specks on picture, HDMI no signal, subwoofer 50Hz hum)."
                    className={`w-full px-3.5 py-2.5 text-xs bg-white rounded-lg border ${
                      errors.issueDescription
                        ? 'border-[#E5232D] ring-1 ring-[#E5232D]'
                        : 'border-neutral-300'
                    } text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-[#392080]` }
                  />
                  {errors.issueDescription && (
                    <p className="mt-1 text-[11px] text-[#E5232D] flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      <span>{errors.issueDescription}</span>
                    </p>
                  )}
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 px-6 rounded-xl text-sm font-bold text-white bg-[#E5232D] hover:bg-[#c91822] active:scale-[0.99] transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        <span>Registering Diagnostic Ticket...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>SUBMIT REPAIR ENQUIRY</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            ) : (
              /* Demo Submission State with Direct WhatsApp Hookup */
              <div className="bg-white rounded-xl p-6 sm:p-8 border border-neutral-200 text-center space-y-4">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                  <CheckCircle2 className="w-8 h-8" />
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-200 text-[#392080] text-[11px] font-mono">
                  <span>TICKET RECORDED — FORTUNE TECHNOLOGIES</span>
                </div>

                <h3 className="text-xl font-bold text-neutral-900 font-['Outfit']">
                  Enquiry Registered Successfully
                </h3>

                <p className="text-xs sm:text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                  Thank you, <strong className="text-neutral-900">{submittedData.name}</strong>. Our workshop technicians at Sarojini Devi Road, Secunderabad will reach out to you via <strong className="capitalize">{submittedData.contactMethod}</strong>.
                </p>

                {/* Submission Summary */}
                <div className="text-left bg-neutral-50 rounded-xl p-4 border border-neutral-200 text-xs space-y-2 max-w-md mx-auto">
                  <div className="flex justify-between border-b border-neutral-200/60 pb-1.5">
                    <span className="text-neutral-500">Equipment:</span>
                    <span className="font-semibold text-neutral-900">{submittedData.equipmentType}</span>
                  </div>
                  {submittedData.brandModel && (
                    <div className="flex justify-between border-b border-neutral-200/60 pb-1.5">
                      <span className="text-neutral-500">Model:</span>
                      <span className="font-semibold text-neutral-900">{submittedData.brandModel}</span>
                    </div>
                  )}
                  <div className="flex justify-between border-b border-neutral-200/60 pb-1.5">
                    <span className="text-neutral-500">Contact Number:</span>
                    <span className="font-mono font-semibold text-neutral-900">{submittedData.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-neutral-200/60 pb-1.5">
                    <span className="text-neutral-500">Workshop Location:</span>
                    <span className="font-semibold text-neutral-900">SD Road, Secunderabad 500003</span>
                  </div>
                  <div className="pt-1">
                    <span className="text-neutral-500 block mb-0.5">Symptom Note:</span>
                    <span className="text-neutral-800 italic">"{submittedData.issueDescription}"</span>
                  </div>
                </div>

                {/* Direct WhatsApp Trigger */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <a
                    href={`https://wa.me/917799066626?text=${encodeURIComponent(
                      `Hello Fortune Technologies, I am ${submittedData.name}. I would like to repair my ${submittedData.equipmentType} (${submittedData.brandModel || 'General'}). Problem: ${submittedData.issueDescription}`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto px-5 py-2.5 rounded-lg text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="w-4 h-4" />
                    <span>Send directly to WhatsApp (+91 7799066626)</span>
                  </a>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-4 py-2.5 rounded-lg text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 transition-colors"
                  >
                    Submit Another Ticket
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
