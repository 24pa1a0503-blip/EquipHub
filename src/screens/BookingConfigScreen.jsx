import React, { useState } from 'react';

export default function BookingConfigScreen({ navigateTo, bookingDraft, setBookingDraft }) {
  const equipment = bookingDraft?.equipment || {
    id: 'cat-320',
    title: 'CAT 320 Excavator',
    dailyRate: 450,
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCWX2Mw_wWz3nTAuIU6K0I7rYwTgUdK17cj3G7ZxOqWnVKyyXNqIKTl0df_0QIHJWzAEFimpcvrg1uT6NNDj7mUMz8N4AkVO2bhzBKT8nJ3V48DKB-joG2t2cMbkGIOxJ7fnelF5-xGK_H0NAwXMfWOhjpUGAztVRsjzm8eo8rCFlk7Bgv4S_ApogntN_f6IRpIconDary03eNlNF9UWv4cU4SZMuzxQrN8YlheLLubEaEwmJKHm_7o'
  };

  const [startDate, setStartDate] = useState(bookingDraft?.startDate || '2023-11-01');
  const [endDate, setEndDate] = useState(bookingDraft?.endDate || '2023-11-05');
  const [location, setLocation] = useState(bookingDraft?.deliverySite || 'Dallas, TX 75001');
  const [hasOperator, setHasOperator] = useState(bookingDraft?.hasOperator || false);
  const [notes, setNotes] = useState('');

  // Duration Math
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffTime = Math.max(1, Math.abs(end - start));
  const durationDays = Math.max(1, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

  const dailyRate = equipment.dailyRate || 450;
  const rentalTotal = durationDays * dailyRate;
  const transportFee = 300;
  const operatorFee = hasOperator ? 150 * durationDays : 0;
  const platformFee = 45;
  const grandTotal = rentalTotal + transportFee + operatorFee + platformFee;

  const handleProceedToPayment = () => {
    setBookingDraft({
      equipment,
      startDate,
      endDate,
      durationDays,
      location,
      hasOperator,
      notes,
      dailyRate,
      rentalTotal,
      transportFee,
      operatorFee,
      platformFee,
      grandTotal
    });
    navigateTo('payment');
  };

  return (
    <div className="bg-surface text-on-surface font-body-md antialiased min-h-screen flex flex-col relative pb-32 w-full">
      {/* Header */}
      <header className="bg-surface sticky top-0 z-40 border-b-2 border-outline-variant px-margin-mobile md:px-margin-desktop py-4 flex items-center justify-between px-4 max-w-3xl mx-auto w-full">
        <button 
          onClick={() => navigateTo('details')}
          aria-label="Go back" 
          className="w-10 h-10 flex items-center justify-center rounded hover:bg-surface-container-low transition-colors text-on-surface"
        >
          <span className="material-symbols-outlined">arrow_back</span>
        </button>
        <h1 className="font-headline-md text-headline-md text-on-surface font-bold text-xl">Configure Booking</h1>
        <div className="w-10" />
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 md:px-margin-desktop py-6 flex flex-col gap-6">
        {/* Selected Asset Anchor Plate */}
        <section className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex gap-4 items-center shadow-sm">
          <div className="w-20 h-20 bg-surface-container rounded flex-shrink-0 overflow-hidden border border-outline-variant">
            <img 
              src={equipment.image} 
              alt={equipment.title} 
              className="w-full h-full object-cover" 
            />
          </div>
          <div className="flex flex-col">
            <span className="font-label-caps text-xs text-primary-container font-bold uppercase">Selected Asset</span>
            <h2 className="font-headline-md text-lg font-bold text-on-surface mt-1">{equipment.title}</h2>
            <span className="font-body-sm text-xs text-on-surface-variant">Rate: ₹{dailyRate} / Day</span>
          </div>
        </section>

        {/* Configuration Form */}
        <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-6">
          {/* Schedule */}
          <div className="flex flex-col gap-3">
            <h3 className="font-label-caps text-xs text-on-surface-variant border-b border-outline-variant pb-2 font-bold uppercase">Schedule</h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs text-on-surface-variant font-bold" htmlFor="start_date">Start Date</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">calendar_month</span>
                  <input 
                    id="start_date" 
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-inverse-surface rounded-lg pl-10 pr-3 py-3 font-body-md text-xs text-on-surface outline-none transition-colors shadow-inner" 
                  />
                </div>
              </div>
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs text-on-surface-variant font-bold" htmlFor="end_date">End Date</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm">calendar_month</span>
                  <input 
                    id="end_date" 
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="w-full bg-surface-container-low border-2 border-transparent focus:border-inverse-surface rounded-lg pl-10 pr-3 py-3 font-body-md text-xs text-on-surface outline-none transition-colors shadow-inner" 
                  />
                </div>
              </div>
            </div>
            <div className="bg-inverse-on-surface text-on-surface rounded px-3 py-2 self-start border border-outline-variant">
              <span className="font-body-sm text-xs font-semibold">Duration: {durationDays} Days</span>
            </div>
          </div>

          {/* Delivery Location */}
          <div className="flex flex-col gap-3">
            <h3 className="font-label-caps text-xs text-on-surface-variant border-b border-outline-variant pb-2 font-bold uppercase">Logistics</h3>
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-xs text-on-surface-variant font-bold" htmlFor="location">Delivery Site Location</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant pointer-events-none text-sm" data-weight="fill">location_on</span>
                <input 
                  id="location" 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Enter site address, coordinates or Pincode..." 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-inverse-surface rounded-lg pl-10 pr-3 py-3 font-body-md text-xs text-on-surface outline-none transition-colors shadow-inner"
                />
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="flex flex-col gap-3">
            <h3 className="font-label-caps text-xs text-on-surface-variant border-b border-outline-variant pb-2 font-bold uppercase">Requirements</h3>
            {/* Operator Toggle */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex items-center justify-between">
              <div className="flex flex-col">
                <span className="font-body-md text-sm font-semibold text-on-surface">Operator Required</span>
                <span className="font-body-sm text-xs text-on-surface-variant">Add a certified operator (+₹150/day).</span>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox"
                  checked={hasOperator}
                  onChange={(e) => setHasOperator(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-surface-container-high peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-container"></div>
              </label>
            </div>

            {/* Notes */}
            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-xs text-on-surface-variant font-bold" htmlFor="notes">Job Notes &amp; Specifications</label>
              <textarea 
                id="notes" 
                rows="3"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Specify any attachments, site hazards, or specific delivery instructions..." 
                className="w-full bg-surface-container-low border-2 border-transparent focus:border-inverse-surface rounded-lg p-3 font-body-md text-xs text-on-surface outline-none transition-colors shadow-inner resize-y"
              />
            </div>
          </div>
        </form>

        {/* Pricing Estimate */}
        <section className="bg-inverse-surface text-inverse-on-surface rounded-xl p-6 mt-4 flex flex-col gap-4 shadow-lg border border-on-surface-variant/20">
          <div className="flex items-center gap-2 mb-1">
            <span className="material-symbols-outlined text-primary-container" data-weight="fill">receipt_long</span>
            <h3 className="font-headline-md text-lg font-bold text-surface-container-lowest">Estimate Summary</h3>
          </div>
          <div className="flex flex-col gap-2 font-body-md text-xs">
            <div className="flex justify-between items-center">
              <span className="text-secondary-fixed-dim">Rental ({durationDays} Days @ ₹{dailyRate})</span>
              <span className="font-semibold text-surface-container-lowest">₹{rentalTotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-secondary-fixed-dim">Transport (Round Trip)</span>
              <span className="font-semibold text-surface-container-lowest">₹{transportFee}</span>
            </div>
            {hasOperator && (
              <div className="flex justify-between items-center">
                <span className="text-secondary-fixed-dim">Certified Operator</span>
                <span className="font-semibold text-surface-container-lowest">₹{operatorFee}</span>
              </div>
            )}
            <div className="flex justify-between items-center">
              <span className="text-secondary-fixed-dim">Platform Fee</span>
              <span className="font-semibold text-surface-container-lowest">₹{platformFee}</span>
            </div>
          </div>
          <div className="h-px w-full bg-on-surface-variant opacity-50 my-1" />
          <div className="flex justify-between items-end">
            <div className="flex flex-col">
              <span className="font-label-caps text-[11px] text-primary-container uppercase tracking-wider font-bold">Total Amount</span>
              <span className="font-body-sm text-[11px] text-secondary-fixed-dim">Inclusive of platform fees</span>
            </div>
            <span className="font-price-display text-primary-container text-2xl font-bold">₹{grandTotal.toLocaleString()}</span>
          </div>
        </section>
      </main>

      {/* Sticky Proceed Action */}
      <footer className="fixed bottom-0 left-0 w-full bg-surface border-t-2 border-outline-variant px-4 py-4 pb-safe z-50 shadow-lg">
        <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
          <div className="hidden md:flex flex-col">
            <span className="font-label-caps text-xs text-on-surface-variant">Total Due</span>
            <span className="font-headline-md text-lg font-bold text-on-surface">₹{grandTotal.toLocaleString()}</span>
          </div>
          <button 
            onClick={handleProceedToPayment}
            className="w-full md:w-auto flex-1 bg-primary-container hover:bg-inverse-primary text-on-primary-container font-headline-md text-base py-3 px-8 rounded-lg font-bold flex items-center justify-center gap-2 transition-transform active:scale-95 duration-100 shadow-sm border border-primary/20"
          >
            Proceed to Payment
            <span className="material-symbols-outlined text-xl" data-weight="fill">arrow_forward</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
