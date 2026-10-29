import React, { useState, useRef } from 'react';
import { Star, ShieldCheck, CheckCircle2, Pause, Play, ChevronLeft, ChevronRight, X, ExternalLink, MapPin, Award } from 'lucide-react';

export interface CustomerReview {
  id: string;
  author: string;
  role: string;
  isLocalGuide?: boolean;
  rating: number;
  timeAgo: string;
  tag: string;
  content: string;
  ownerReply?: string;
  imageProof?: string;
  avatarBg: string;
  avatarColor: string;
}

export const REAL_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-1',
    author: 'Yashwanth Thouda',
    role: 'Local Guide · 41 reviews · 216 photos',
    isLocalGuide: true,
    rating: 5,
    timeAgo: '2 weeks ago',
    tag: 'Projector & Computer Service',
    content:
      'I had a great experience with Fortune Technologies! I visited the shop to get my projector repaired, and I\'m really happy with the service. The repair work was good, the quality of service was excellent, and the pricing was affordable and reasonable. The person who attended me was very humble, polite, and friendly. It\'s great to find a place that offers quality service at budget-friendly prices without compromising on customer satisfaction. Highly recommended for projector repairs and computer-related services. Thank you for the excellent service!',
    imageProof: '/assets/aistudio/image_1d5d367a.png',
    avatarBg: 'bg-amber-100',
    avatarColor: 'text-amber-800',
  },
  {
    id: 'rev-2',
    author: 'Abhishek Ekbote',
    role: '1 review · Verified Customer',
    rating: 5,
    timeAgo: '3 weeks ago',
    tag: 'Rejected Elsewhere · Fixed in 2 Days',
    content:
      'Excellent service! Highly recommended. Most of the other projector repair companies told me that the issue could not be repaired, but this team took up the challenge, fixed my projector, and delivered it back to me within just 2 days. The team was very cooperative and professional throughout the process. Since I couldn’t travel to pick up the projector, they even arranged delivery with excellent protective packaging, ensuring it reached me safely.',
    imageProof: '/assets/aistudio/image_f3b332fe.png',
    avatarBg: 'bg-purple-100',
    avatarColor: 'text-purple-800',
  },
  {
    id: 'rev-3',
    author: 'Virupaksha Reddy',
    role: '5 reviews · 3 photos',
    rating: 5,
    timeAgo: '4 months ago',
    tag: 'Merlin Cube Mini (Repaired in 2 Hours)',
    content:
      'I had an issue with my projector and visited several service centers, but none were willing to repair it due to its compact design. Fortunately, the team at Fortune Technologies diagnosed and fixed the problem within just 2 hours at a very reasonable service charge. I highly recommend them for any projector repair or maintenance needs.',
    imageProof: '/assets/aistudio/image_6a447a7f.png',
    avatarBg: 'bg-emerald-100',
    avatarColor: 'text-emerald-800',
  },
  {
    id: 'rev-4',
    author: 'Ajay Katikala',
    role: '1 review · 2 photos',
    rating: 5,
    timeAgo: '2 months ago',
    tag: 'Fast Repair & Transparent Issue Explanation',
    content:
      'Excellent service and professional repair work. The projector was repaired quickly, and the issue was explained clearly. Good customer service and reasonable pricing. Highly recommended!',
    imageProof: '/assets/aistudio/image_841996ad.png',
    avatarBg: 'bg-blue-100',
    avatarColor: 'text-blue-800',
  },
  {
    id: 'rev-5',
    author: 'VamsHi BoNd',
    role: 'Local Guide · 8 reviews · 38 photos',
    isLocalGuide: true,
    rating: 5,
    timeAgo: '5 months ago',
    tag: 'Repaired in Just 12 Hours · Like New',
    content:
      'Excellent projector repair done in Just 12hrs. Service done like new one. I would suggest fortune technologies " THE BEST ".',
    imageProof: '/assets/aistudio/image_d3a75d21.png',
    avatarBg: 'bg-rose-100',
    avatarColor: 'text-rose-800',
  },
  {
    id: 'rev-6',
    author: 'Korra Chinna',
    role: '1 review · 2 photos',
    rating: 5,
    timeAgo: '2 months ago',
    tag: 'Came From Nalgonda · 20 Mins Service',
    content:
      'Good working i cm from nalagonda work has done just in 20mints full experience worked has showed good work',
    imageProof: '/assets/aistudio/image_3f236559.png',
    avatarBg: 'bg-cyan-100',
    avatarColor: 'text-cyan-800',
  },
  {
    id: 'rev-7',
    author: 'vamsi krishna Naidu',
    role: '1 review · 2 photos',
    rating: 5,
    timeAgo: '5 months ago',
    tag: 'AUN 8K Internal Screen Dust Cleaning',
    content:
      'I have given for dust cleaning on internal screen which they did excellent service, am completely satisfied withe service',
    imageProof: '/assets/aistudio/image_0035f223.png',
    avatarBg: 'bg-indigo-100',
    avatarColor: 'text-indigo-800',
  },
  {
    id: 'rev-8',
    author: 'Divya P',
    role: '2 reviews · Verified Customer',
    rating: 5,
    timeAgo: '5 months ago',
    tag: 'Zebronics Projector Fixed in 2 Days',
    content:
      'My Zebronics projector was not working, and I didn’t get a proper response from the service center. Then I found Fortune Technologies online and gave my projector for repair. Within just 2 days, they repaired it perfectly at a reasonable price.',
    ownerReply:
      'Thank you so much for your valuable feedback and for trusting Fortune Technologies. We’re glad to hear that you were happy with our quick service, reasonable pricing, and professional support.',
    imageProof: '/assets/aistudio/image_7352fb51.png',
    avatarBg: 'bg-orange-100',
    avatarColor: 'text-orange-800',
  },
  {
    id: 'rev-9',
    author: 'kvs karthik',
    role: '5 reviews · 2 photos',
    rating: 5,
    timeAgo: '4 months ago',
    tag: 'ViewSonic Projector · Cost Effective',
    content: 'Services and respons is very good and cost effective Services.',
    imageProof: '/assets/aistudio/image_0cd4662d.png',
    avatarBg: 'bg-teal-100',
    avatarColor: 'text-teal-800',
  },
  {
    id: 'rev-10',
    author: 'anil reddy',
    role: '1 review · 2 photos',
    rating: 5,
    timeAgo: '4 months ago',
    tag: 'Zebronics Pixaplay 29 (Saved From Rejection)',
    content:
      'Amazing experience with Mr. Kasu who owns fortune technologies and he is very nice person as well. My projector Zebronics pixaplay 29 was not working. I took it to every other place. Even the Zebronics rejected it. But mr. Kasu repaired it and it’s working well. Thankyou so much for the support.',
    imageProof: '/assets/aistudio/image_be536280.png',
    avatarBg: 'bg-amber-100',
    avatarColor: 'text-amber-900',
  },
];

interface ReviewsSectionProps {
  onBookRepairClick?: () => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({ onBookRepairClick }) => {
  const [isPaused, setIsPaused] = useState(false);
  const [activeModalReview, setActiveModalReview] = useState<CustomerReview | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Marquee duplicates to ensure seamless continuous scroll
  const marqueeReviews = [...REAL_REVIEWS, ...REAL_REVIEWS];

  const handleManualScroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#F8F9FA] border-b border-neutral-200 relative overflow-hidden">
      {/* Background Decorative Accents */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#392080]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-[#E5232D]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
          {/* Google Verified Review Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-neutral-200/90 shadow-sm text-xs font-semibold text-neutral-800 mb-4">
            <svg className="w-4 h-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
              />
            </svg>
            <span className="text-neutral-900 font-bold">5.0 Star Rated on Google</span>
            <span className="text-neutral-300">|</span>
            <span className="text-emerald-700 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> 100% Genuine Reviews
            </span>
          </div>

          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-[#0B1E36] font-['Outfit'] tracking-tight">
            Real Reviews From Real Customers
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            Read direct feedback from projector owners, local guides, and corporate clients across Hyderabad, Secunderabad, and Telangana who trusted Mr. Kasu and Fortune Technologies.
          </p>

          {/* Quick Stats Grid */}
          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl mx-auto">
            <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs text-center">
              <div className="flex justify-center items-center gap-1 text-amber-500 mb-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-base font-extrabold text-[#0B1E36]">5.0 / 5.0</p>
              <p className="text-[11px] text-neutral-500 font-medium">Google Rating</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs text-center">
              <p className="text-base font-extrabold text-[#0B1E36]">20 Min – 48h</p>
              <p className="text-[11px] text-neutral-500 font-medium">Fast Turnaround</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs text-center">
              <p className="text-base font-extrabold text-emerald-600">Saved</p>
              <p className="text-[11px] text-neutral-500 font-medium">Models Rejected Elsewhere</p>
            </div>

            <div className="bg-white p-3 rounded-xl border border-neutral-200/80 shadow-xs text-center">
              <p className="text-base font-extrabold text-[#392080]">Secunderabad</p>
              <p className="text-[11px] text-neutral-500 font-medium">Kamakshi Complex, 3rd Fl</p>
            </div>
          </div>

          {/* Scrolling Controls */}
          <div className="mt-6 flex items-center justify-between sm:justify-end gap-3 px-2">
            <div className="text-xs text-neutral-500 font-medium hidden sm:block">
              {isPaused ? 'Auto-scroll is paused' : 'Auto-scrolling · Hover or tap to pause'}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-neutral-200 text-xs font-semibold text-neutral-700 hover:bg-neutral-50 transition-colors shadow-xs"
                title={isPaused ? 'Resume auto-scroll' : 'Pause auto-scroll'}
              >
                {isPaused ? (
                  <>
                    <Play className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" /> Resume Auto-Scroll
                  </>
                ) : (
                  <>
                    <Pause className="w-3.5 h-3.5 text-neutral-600" /> Pause
                  </>
                )}
              </button>

              <button
                onClick={() => handleManualScroll('left')}
                className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
                title="Scroll Left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <button
                onClick={() => handleManualScroll('right')}
                className="w-8 h-8 rounded-lg bg-white border border-neutral-200 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 shadow-xs transition-colors"
                title="Scroll Right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Marquee Track Container */}
      <div
        ref={scrollContainerRef}
        className="relative w-full overflow-x-auto no-scrollbar py-3 focus:outline-none"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
      >
        {/* Soft edge gradient fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 sm:w-28 bg-gradient-to-r from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 sm:w-28 bg-gradient-to-l from-[#F8F9FA] via-[#F8F9FA]/80 to-transparent z-10" />

        {/* Continuous Auto-Scrolling Flex Track */}
        <div
          className={`animate-reviews-marquee flex items-stretch gap-4 sm:gap-6 px-4 ${
            isPaused ? 'marquee-paused' : ''
          }`}
        >
          {marqueeReviews.map((rev, index) => {
            const initial = rev.author.charAt(0).toUpperCase();

            return (
              <div
                key={`${rev.id}-${index}`}
                className="w-[290px] sm:w-[380px] shrink-0 bg-white rounded-2xl border border-neutral-200/90 shadow-sm hover:shadow-xl hover:border-[#392080]/30 transition-all duration-300 p-5 flex flex-col justify-between group cursor-pointer"
                onClick={() => setActiveModalReview(rev)}
              >
                <div>
                  {/* Top Header: Reviewer info + Google Mark */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full ${rev.avatarBg} ${rev.avatarColor} font-black text-sm flex items-center justify-center shrink-0 border border-neutral-200 shadow-xs`}
                      >
                        {initial}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-1.5">
                          <h4 className="text-sm font-bold text-neutral-900 truncate font-['Outfit']">
                            {rev.author}
                          </h4>
                          {rev.isLocalGuide && (
                            <span className="inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200 shrink-0">
                              <Award className="w-2.5 h-2.5 text-amber-600" /> Guide
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-neutral-500 truncate">{rev.role}</p>
                      </div>
                    </div>

                    {/* Google G icon */}
                    <div className="w-6 h-6 shrink-0 pt-0.5">
                      <svg viewBox="0 0 24 24" className="w-5 h-5">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                  </div>

                  {/* Stars & Time */}
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="flex items-center gap-0.5">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                      ))}
                    </div>
                    <span className="text-[11px] text-neutral-400 font-medium">{rev.timeAgo}</span>
                  </div>

                  {/* Highlight Tag */}
                  <div className="mb-2.5">
                    <span className="inline-block px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-neutral-100 text-[#0B1E36] border border-neutral-200">
                      {rev.tag}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed line-clamp-4">
                    "{rev.content}"
                  </p>

                  {/* Optional Owner Response snippet */}
                  {rev.ownerReply && (
                    <div className="mt-3 p-2.5 rounded-lg bg-neutral-50 border-l-2 border-[#392080] text-[11px] text-neutral-600 italic">
                      <span className="font-semibold text-neutral-800 not-italic block mb-0.5">
                        Response from Fortune:
                      </span>
                      "{rev.ownerReply.slice(0, 100)}..."
                    </div>
                  )}
                </div>

                {/* Bottom Card Footer: Attached Projector/Shop Proof Thumbnail */}
                {rev.imageProof && (
                  <div className="mt-4 pt-3 border-t border-neutral-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={rev.imageProof}
                        alt={`${rev.author}'s repair proof`}
                        className="w-12 h-10 object-cover rounded-md border border-neutral-200 shadow-2xs group-hover:scale-105 transition-transform"
                        referrerPolicy="no-referrer"
                      />
                      <span className="text-[11px] font-medium text-neutral-500">
                        Verified Repair Photo
                      </span>
                    </div>
                    <span className="text-[11px] font-semibold text-[#E5232D] group-hover:underline flex items-center gap-1">
                      Read full
                    </span>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Workshop Location & Direct CTA */}
      <div className="max-w-4xl mx-auto mt-12 px-4 text-center">
        <div className="p-6 sm:p-8 rounded-2xl bg-white border border-neutral-200 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-left">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
              <MapPin className="w-4 h-4 text-[#E5232D]" /> Secunderabad Diagnostic Center
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#0B1E36] font-['Outfit']">
              Have an issue with your projector or home theater?
            </h3>
            <p className="text-xs sm:text-sm text-neutral-600 mt-1">
              Experience the same trusted service. Transparent diagnostic pricing and 20% advance booking.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full sm:w-auto">
            <button
              onClick={onBookRepairClick}
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-[#E5232D] hover:bg-[#C91A24] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all"
            >
              Book Diagnostic (20% Advance)
            </button>
            <a
              href="tel:+917799066626"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs sm:text-sm border border-neutral-300 transition-colors text-center"
            >
              Call +91 77990 66626
            </a>
          </div>
        </div>
      </div>

      {/* Expanded Review Modal with High-Res Screenshot/Photo */}
      {activeModalReview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-neutral-200 relative max-h-[90vh] overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setActiveModalReview(null)}
              className="absolute top-4 right-4 p-2 rounded-full text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Author Details */}
            <div className="flex items-center gap-3 mb-4">
              <div
                className={`w-12 h-12 rounded-full ${activeModalReview.avatarBg} ${activeModalReview.avatarColor} font-black text-lg flex items-center justify-center shrink-0 border border-neutral-200`}
              >
                {activeModalReview.author.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="text-base font-bold text-neutral-900 font-['Outfit']">
                  {activeModalReview.author}
                </h3>
                <p className="text-xs text-neutral-500">{activeModalReview.role}</p>
                <div className="flex items-center gap-1.5 mt-1">
                  <div className="flex items-center gap-0.5">
                    {[...Array(activeModalReview.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="text-[11px] text-neutral-400 font-medium">
                    · {activeModalReview.timeAgo}
                  </span>
                </div>
              </div>
            </div>

            {/* Tag */}
            <div className="mb-3">
              <span className="inline-block px-2.5 py-1 rounded-md text-xs font-semibold bg-neutral-100 text-[#0B1E36] border border-neutral-200">
                {activeModalReview.tag}
              </span>
            </div>

            {/* Full Review Text */}
            <p className="text-sm text-neutral-800 leading-relaxed mb-4">
              "{activeModalReview.content}"
            </p>

            {/* Owner Response */}
            {activeModalReview.ownerReply && (
              <div className="mb-4 p-3 rounded-xl bg-neutral-50 border-l-4 border-[#392080] text-xs text-neutral-700">
                <span className="font-bold text-[#0B1E36] block mb-1">
                  Official Response from Fortune Technologies:
                </span>
                "{activeModalReview.ownerReply}"
              </div>
            )}

            {/* Image Proof */}
            {activeModalReview.imageProof && (
              <div className="mt-4">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">
                  Customer Uploaded Photo / Proof:
                </p>
                <div className="rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                  <img
                    src={activeModalReview.imageProof}
                    alt={`${activeModalReview.author} review attachment`}
                    className="w-full max-h-72 object-contain mx-auto"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
            )}

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setActiveModalReview(null)}
                className="px-4 py-2 rounded-xl bg-neutral-900 text-white text-xs font-bold hover:bg-neutral-800 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
