import React, { useState } from 'react';
import { addReviewDoc } from '../firebase/services';
import { useAuth } from '../context/AuthContext';

export default function DetailsScreen({ navigateTo, equipment, setSelectedEquipment, setBookingDraft }) {
  const { userProfile } = useAuth();

  const item = equipment || {
    id: 'cat-320',
    title: 'CAT 320 Hydraulic Excavator',
    dailyRate: 450,
    rating: 4.9,
    reviewsCount: 124,
    owner: 'Texas Heavy Ops Ltd.',
    location: 'Dallas, TX Industrial Yard • 20 km away',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC',
    specs: {
      weight: '22,500 kg',
      power: '172 HP',
      digDepth: '6.7 m',
      engineHours: '2,450 hrs',
      fuelCapacity: '320 L',
      reachGround: '9.8 m',
      tailSwing: '2.8 m',
      attachments: '36" Trenching Bucket, Thumb'
    },
    description: 'Late model CAT 320 excavator in excellent condition. Perfect for medium to heavy duty earthmoving, trenching, and site preparation.',
    reviews: [
      {
        id: 'rev-1',
        user: 'John D. Construction',
        date: 'Oct 12, 2023',
        rating: 5,
        text: 'Machine arrived on time and fully fueled. The thumb attachment worked flawlessly for clearing concrete debris.'
      }
    ]
  };

  const [startDate, setStartDate] = useState('2023-11-01');
  const [endDate, setEndDate] = useState('2023-11-05');
  const [includeDelivery, setIncludeDelivery] = useState(true);
  const [zipCode, setZipCode] = useState('75001');

  // Review Form State
  const [newRating, setNewRating] = useState(5);
  const [newComment, setNewComment] = useState('');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [submittingReview, setSubmittingReview] = useState(false);

  // Compute days duration dynamically
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1, Math.abs(end - start));
  const diffDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const rentalSubtotal = diffDays * item.dailyRate;
  const deliveryFee = includeDelivery ? 150 : 0;
  const damageWaiver = 75;
  const grandTotal = rentalSubtotal + deliveryFee + damageWaiver;

  const handleProceedToConfig = () => {
    setSelectedEquipment(item);
    setBookingDraft({
      equipment: item,
      startDate,
      endDate,
      durationDays: diffDays,
      includeDelivery,
      zipCode,
      dailyRate: item.dailyRate,
      rentalSubtotal,
      deliveryFee,
      damageWaiver,
      grandTotal
    });
    navigateTo('config');
  };

  const handleAddReview = async (e) => {
    e.preventDefault();
    if (!newComment) return;
    setSubmittingReview(true);

    const reviewPayload = {
      user: userProfile?.name || 'Contractor Partner',
      date: new Date().toLocaleDateString(),
      rating: Number(newRating),
      text: newComment
    };

    await addReviewDoc(item.id, reviewPayload);
    item.reviews = [reviewPayload, ...(item.reviews || [])];
    item.reviewsCount = (item.reviewsCount || 0) + 1;

    setSubmittingReview(false);
    setShowReviewForm(false);
    setNewComment('');
  };

  return (
    <div className="bg-background text-on-background min-h-screen flex flex-col w-full">
      {/* Top Header Navigation */}
      <header className="bg-surface sticky top-0 z-40 border-b border-outline-variant/30 px-4 md:px-margin-desktop py-4 max-w-[1280px] mx-auto w-full flex justify-between items-center">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('search')}
            aria-label="Go Back" 
            className="text-on-surface hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <div className="font-headline-lg font-extrabold text-primary tracking-tighter text-2xl">EquipHub</div>
        </div>
        <div className="flex gap-2">
          <button className="text-on-surface hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">favorite_border</span>
          </button>
          <button className="text-on-surface hover:bg-surface-container-low p-2 rounded-full transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">share</span>
          </button>
        </div>
      </header>

      {/* Main Canvas */}
      <main className="flex-grow w-full max-w-[1280px] mx-auto px-4 md:px-margin-desktop py-6 pb-32 md:pb-16 grid grid-cols-1 lg:grid-cols-12 gap-gutter gap-8">
        {/* Left Column: Content & Specs */}
        <div className="col-span-1 lg:col-span-8 space-y-6">
          {/* Image Gallery */}
          <div className="relative w-full aspect-video md:aspect-[21/9] lg:aspect-[16/9] bg-surface-container rounded-xl overflow-hidden group shadow-sm">
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-4 right-4 flex gap-2">
              <button className="bg-surface/80 backdrop-blur-sm text-on-surface font-label-caps text-xs px-3 py-1.5 rounded flex items-center gap-1 hover:bg-surface transition">
                <span className="material-symbols-outlined text-[16px]">grid_view</span> 5 Photos
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Machine Header */}
            <div className="space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h1 className="font-headline-lg-mobile text-2xl md:text-3xl font-extrabold text-on-surface">
                    {item.title}
                  </h1>
                  <p className="font-body-md text-on-surface-variant flex items-center gap-2 mt-1 text-sm">
                    <span className="material-symbols-outlined text-[20px]">location_on</span> 
                    {item.location}
                  </p>
                </div>
                <div className="flex flex-col items-end">
                  <div className="bg-tertiary text-on-tertiary font-label-caps text-xs px-3 py-1 rounded-sm border border-tertiary-fixed mb-2 inline-flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[14px]">check_circle</span> AVAILABLE
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 py-2 border-b border-outline-variant/40 text-sm">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-outlined text-primary-container" data-weight="fill">star</span>
                  <span className="font-bold text-on-surface">{item.rating}</span>
                  <span className="text-on-surface-variant underline decoration-outline-variant underline-offset-4 text-xs">
                    ({item.reviewsCount || 124} Reviews)
                  </span>
                </div>
                <div className="w-px h-4 bg-outline-variant" />
                <div className="flex items-center gap-2">
                  <img 
                    src={item.ownerAvatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuCund9hJwy5iaWLy-Hn6_dHTcPrepUlEfVZI2Fp6IIF1oj4Bh97rhmlgO35VfiGoyH9G0uB8tZ_mno3eny2sF4ALJ7QnFVashxl4wHVeaAVSmGcQesEcC1N7KlpbIcr-mLHCjqGv-tZmR74G5ewP6x12FIciFx7h25gQV0NEXXSdcYYDDg8KSh6bxMw9bBj6d75CFEBbVSSNRNUh8dH8ccwhglY5dIVYfRNE_u5EkGRLTEWfORP4BLI"} 
                    alt="Owner Avatar"
                    className="w-6 h-6 rounded-full object-cover" 
                  />
                  <span className="font-semibold text-on-surface text-xs">{item.owner}</span>
                </div>
              </div>
            </div>

            {/* Technical Specs Bento */}
            <div>
              <h2 className="font-headline-md text-on-surface mb-3 flex items-center gap-2 text-xl font-bold">
                <span className="material-symbols-outlined text-primary">engineering</span> Technical Specifications
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <div className="bg-surface-container-low p-4 rounded flex flex-col gap-1 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">weight</span>
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase">Operating Weight</span>
                  <span className="font-body-lg font-bold text-on-surface">{item.specs?.weight || '22,500 kg'}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded flex flex-col gap-1 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">bolt</span>
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase">Net Power</span>
                  <span className="font-body-lg font-bold text-on-surface">{item.specs?.power || '172 HP'}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded flex flex-col gap-1 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">architecture</span>
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase">Max Dig Depth</span>
                  <span className="font-body-lg font-bold text-on-surface">{item.specs?.digDepth || '6.7 m'}</span>
                </div>
                <div className="bg-surface-container-low p-4 rounded flex flex-col gap-1 border border-outline-variant/30">
                  <span className="material-symbols-outlined text-on-surface-variant mb-1">speed</span>
                  <span className="font-label-caps text-xs text-on-surface-variant uppercase">Engine Hours</span>
                  <span className="font-body-lg font-bold text-on-surface">{item.specs?.engineHours || '2,450 hrs'}</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-headline-md text-on-surface mb-2 text-xl font-bold">Description</h2>
              <p className="font-body-md text-on-surface-variant leading-relaxed text-sm">
                {item.description}
              </p>
            </div>

            {/* Reviews Section */}
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-headline-md text-on-surface flex items-center gap-2 text-xl font-bold">
                  <span className="material-symbols-outlined text-primary">forum</span> Verified Contractor Reviews
                </h2>
                <button 
                  onClick={() => setShowReviewForm(!showReviewForm)}
                  className="bg-primary-container/20 text-on-primary-container font-label-caps text-xs font-bold px-3 py-1.5 rounded hover:bg-primary-container/30"
                >
                  {showReviewForm ? 'Cancel' : '+ Write Review'}
                </button>
              </div>

              {/* Review Submission Form */}
              {showReviewForm && (
                <form onSubmit={handleAddReview} className="mb-6 p-4 bg-surface-container-low border border-outline-variant rounded-lg flex flex-col gap-3 animate-fade-in">
                  <h3 className="font-bold text-sm text-on-surface">Submit Machine Rating</h3>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-on-surface-variant">Rating:</span>
                    <select 
                      value={newRating} 
                      onChange={(e) => setNewRating(e.target.value)}
                      className="bg-surface border border-outline-variant rounded p-1 text-xs outline-none"
                    >
                      <option value="5">5 ⭐⭐⭐⭐⭐ Excellent</option>
                      <option value="4">4 ⭐⭐⭐⭐ Good</option>
                      <option value="3">3 ⭐⭐⭐ Average</option>
                    </select>
                  </div>
                  <textarea 
                    rows="3"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Describe machine performance on site..."
                    className="w-full bg-surface border border-outline-variant rounded p-2.5 text-xs outline-none"
                    required
                  />
                  <button 
                    type="submit" 
                    disabled={submittingReview}
                    className="self-end bg-primary-container text-on-primary-container font-bold text-xs px-4 py-2 rounded hover:bg-inverse-primary"
                  >
                    {submittingReview ? 'Posting...' : 'Post Review'}
                  </button>
                </form>
              )}

              <div className="space-y-4">
                {(item.reviews || [
                  { id: '1', user: 'John D. Construction', date: 'Oct 12, 2023', rating: 5, text: 'Machine arrived on time and fully fueled. The thumb attachment worked flawlessly for clearing concrete debris.' }
                ]).map((rev, idx) => (
                  <div key={idx} className="p-4 bg-surface-container-lowest border border-outline-variant/50 rounded">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="font-body-sm font-bold text-on-surface text-sm">{rev.user}</p>
                        <p className="font-body-sm text-on-surface-variant text-xs">{rev.date}</p>
                      </div>
                      <div className="flex text-primary-container">
                        {[...Array(rev.rating || 5)].map((_, i) => (
                          <span key={i} className="material-symbols-outlined text-[16px]" data-weight="fill">star</span>
                        ))}
                      </div>
                    </div>
                    <p className="font-body-sm text-on-surface-variant text-xs leading-relaxed">
                      {rev.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Booking & Pricing Plate (Sticky) */}
        <div className="col-span-1 lg:col-span-4">
          <div className="sticky top-24 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-md">
            {/* Pricing Header */}
            <div className="flex items-baseline gap-1 mb-4 border-b border-outline-variant/40 pb-4">
              <span className="font-display-lg text-3xl font-extrabold text-on-surface">₹{item.dailyRate}</span>
              <span className="font-body-md text-on-surface-variant text-sm">/ day</span>
            </div>

            {/* Booking Form */}
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col bg-surface p-2 border-2 border-outline-variant focus-within:border-secondary rounded transition-colors">
                  <label className="font-label-caps text-[11px] text-on-surface-variant mb-1 font-bold">Start Date</label>
                  <input 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="bg-transparent border-none p-0 focus:ring-0 font-body-sm text-xs text-on-surface cursor-pointer w-full outline-none"
                  />
                </div>
                <div className="flex flex-col bg-surface p-2 border-2 border-outline-variant focus-within:border-secondary rounded transition-colors">
                  <label className="font-label-caps text-[11px] text-on-surface-variant mb-1 font-bold">End Date</label>
                  <input 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="bg-transparent border-none p-0 focus:ring-0 font-body-sm text-xs text-on-surface cursor-pointer w-full outline-none"
                  />
                </div>
              </div>

              {/* Delivery Toggle */}
              <div className="bg-surface-container-low p-3 border border-outline-variant/50 rounded">
                <div className="flex justify-between items-center mb-2">
                  <label className="font-body-sm text-xs font-semibold text-on-surface flex items-center gap-2 cursor-pointer">
                    <input 
                      type="checkbox"
                      checked={includeDelivery}
                      onChange={(e) => setIncludeDelivery(e.target.checked)}
                      className="rounded text-primary focus:ring-primary h-4 w-4"
                    /> 
                    Include Delivery
                  </label>
                  <span className="font-body-sm text-xs text-on-surface-variant">₹150 est.</span>
                </div>
                {includeDelivery && (
                  <div className="flex gap-2 items-center text-on-surface-variant bg-surface p-2 rounded border border-outline-variant/30">
                    <span className="material-symbols-outlined text-[18px]">pin_drop</span>
                    <input 
                      type="text" 
                      value={zipCode}
                      onChange={(e) => setZipCode(e.target.value)}
                      placeholder="Zip Code"
                      className="bg-transparent border-none p-0 focus:ring-0 font-body-sm text-xs w-full outline-none"
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-6 font-body-sm text-xs text-on-surface">
              <div className="flex justify-between">
                <span className="text-on-surface-variant">₹{item.dailyRate} x {diffDays} {diffDays === 1 ? 'day' : 'days'}</span>
                <span>₹{rentalSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant underline decoration-dotted">Delivery &amp; Pickup</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-on-surface-variant underline decoration-dotted">Damage Waiver</span>
                <span>₹{damageWaiver}</span>
              </div>
              <div className="w-full h-px bg-outline-variant/50 my-2" />
              <div className="flex justify-between font-bold text-on-surface text-lg">
                <span>Total</span>
                <span>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-3">
              <button 
                onClick={handleProceedToConfig}
                className="w-full bg-primary-container text-on-primary-fixed font-bold py-3 rounded-lg hover:brightness-110 transition-all active:scale-95 shadow-sm text-sm flex justify-center items-center gap-2"
              >
                <span className="material-symbols-outlined text-[20px]">calendar_month</span>
                Request Booking
              </button>
              <button 
                onClick={() => alert(`Contacting ${item.owner}...`)}
                className="w-full bg-surface-container border-2 border-secondary text-secondary font-bold py-3 rounded-lg hover:bg-surface-container-high transition-all active:scale-95 text-sm"
              >
                Contact Owner
              </button>
            </div>
            <p className="text-center font-body-sm text-on-surface-variant mt-4 text-[11px]">
              Owner will review and approve your site delivery dates.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
