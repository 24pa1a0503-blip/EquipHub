import React, { useState, useEffect } from 'react';

export default function TrackingScreen({ navigateTo, activeBooking }) {
  const [etaMinutes, setEtaMinutes] = useState(38);
  const [progressPercent, setProgressPercent] = useState(65);
  const [isSimulating, setIsSimulating] = useState(true);
  const [showDriverModal, setShowDriverModal] = useState(false);
  const [showSupportModal, setShowSupportModal] = useState(false);

  // Live GPS Movement Animation Loop
  useEffect(() => {
    if (!isSimulating) return;

    const interval = setInterval(() => {
      setProgressPercent(prev => {
        if (prev >= 98) {
          setEtaMinutes(2);
          return 98;
        }
        const next = prev + 1;
        setEtaMinutes(Math.max(2, Math.round(45 * (1 - next / 100))));
        return next;
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [isSimulating]);

  if (!activeBooking) {
    return (
      <main className="flex-1 px-4 md:px-margin-desktop py-12 pb-32 max-w-4xl mx-auto w-full flex flex-col items-center justify-center text-center min-h-[70vh]">
        <div className="w-20 h-20 bg-primary-container/20 text-primary-container rounded-full flex items-center justify-center mb-4 shadow-sm">
          <span className="material-symbols-outlined text-5xl">local_shipping</span>
        </div>
        <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mb-2">
          No Active Machinery Deliveries
        </h1>
        <p className="text-sm text-on-surface-variant max-w-md mb-6 leading-relaxed">
          You don't have any heavy machinery currently en-route to a job site. Browse our verified marketplace to request your first equipment booking!
        </p>
        <button 
          onClick={() => navigateTo('search')}
          className="bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-lg text-sm hover:bg-inverse-primary transition-colors shadow-sm flex items-center gap-2"
        >
          <span className="material-symbols-outlined text-lg">search</span>
          Explore Machinery Marketplace
        </button>
      </main>
    );
  }

  // Calculate Pin Coordinates along the path
  const pinLeft = 25 + (progressPercent * 0.55);
  const pinTop = 40 + (Math.sin(progressPercent * 0.08) * 15);

  return (
    <div className="bg-surface text-on-surface font-body-md h-full flex flex-col overflow-hidden selection:bg-primary-container selection:text-on-primary-container w-full min-h-screen">
      {/* Top App Bar */}
      <header className="flex justify-between items-center w-full px-4 md:px-margin-desktop py-4 bg-surface border-b-2 border-outline-variant z-10 shrink-0">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigateTo('bookings')}
            aria-label="Go back" 
            className="p-2 rounded-full hover:bg-surface-container-low transition-colors flex items-center justify-center"
          >
            <span className="material-symbols-outlined text-on-surface-variant">arrow_back</span>
          </button>
          <h1 className="font-headline-lg-mobile md:font-headline-lg font-extrabold text-primary tracking-tighter text-xl">
            Live Telemetry GPS
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-3 py-1 rounded text-xs font-label-caps font-bold border transition-colors ${
              isSimulating ? 'bg-tertiary/10 text-tertiary border-tertiary/30' : 'bg-surface border-outline-variant text-on-surface-variant'
            }`}
          >
            {isSimulating ? '● GPS Simulation Active' : 'Pause Simulation'}
          </button>
          <span className="font-label-caps text-xs text-on-surface-variant font-mono font-bold hidden sm:inline">ORDER #{activeBooking.id}</span>
        </div>
      </header>

      {/* Main Content Area: Map + Side/Bottom Sheet Panel */}
      <main className="flex-grow relative flex flex-col md:flex-row w-full h-[calc(100vh-68px)] overflow-hidden">
        {/* Map Canvas Area */}
        <div className="relative w-full h-1/2 md:h-full md:w-2/3 lg:w-3/4 bg-surface-container shrink-0 z-0 border-r-0 md:border-r border-outline-variant overflow-hidden">
          {/* Tactical Map Background Grid */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-multiply transition-all duration-300" 
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcFlD__C9MWVqKMVOl96a0K36AXM0Prk38FftfSJ-hDu4Teh5L6PFGNXUDbXUKdUzunpDH8Q5IuzkoKqMB6JLEP-xaFVPhyzDNgW3LoNudWX_pVXqK7PCSZRGJnIunfYgy542hX8gTvow3EoZbtzhNrkZ9Owcq4ohICguC4wqBKqSB5BsxMNr1U0m-ZvPk_cHq1zhVm-a7bYUS0zX1RTQurEechw1KxQJgksGAoxqtq_kzzMaN4ltG')`
            }}
          />

          {/* Map Status Badge */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <div className="bg-surface/95 backdrop-blur-sm border border-outline-variant rounded shadow-sm px-3 py-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm animate-pulse" data-weight="fill">my_location</span>
              <span className="font-label-caps text-xs font-bold text-on-surface">LIVE TRAJECTORY: {progressPercent}% COMPLETED</span>
            </div>
          </div>

          {/* Destination Pin */}
          <div className="absolute top-1/3 left-3/4 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="bg-surface text-on-surface font-label-caps text-xs font-bold px-2.5 py-1 rounded shadow-md border border-outline-variant mb-1 whitespace-nowrap">
              {activeBooking.deliverySite || 'Dallas Job Site'}
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md border-2 border-surface">
              <span className="material-symbols-outlined text-sm">flag</span>
            </div>
          </div>

          {/* Route Path SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
            <path 
              d="M 250 200 C 400 150, 550 350, 750 220" 
              fill="none" 
              stroke="#f59e0b" 
              strokeDasharray="8,8" 
              strokeWidth="4"
            />
          </svg>

          {/* Live Pulsating Vehicle Pin */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-700 ease-out"
            style={{ top: `${pinTop}%`, left: `${pinLeft}%` }}
          >
            <div className="bg-primary-container text-on-primary-container font-label-caps text-xs px-2 py-1 rounded shadow-md mb-1 whitespace-nowrap font-bold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-tertiary animate-ping" />
              {activeBooking.equipmentName} ({etaMinutes}m ETA)
            </div>
            <div className="pulse-pin w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center shadow-lg border-2 border-surface">
              <span className="material-symbols-outlined text-xl" data-weight="fill">directions_car</span>
            </div>
          </div>
        </div>

        {/* Tracking Details Side/Bottom Panel */}
        <div className="relative w-full h-1/2 md:h-full md:w-1/3 lg:w-1/4 bg-surface z-10 flex flex-col shadow-lg overflow-y-auto p-4 md:p-6">
          <div className="flex flex-col gap-6 h-full justify-between">
            {/* Status Header */}
            <section className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <h2 className="font-headline-md text-lg font-bold text-on-surface">Dispatch Progress</h2>
                <span className="inline-flex items-center gap-1 bg-tertiary/10 text-tertiary border border-tertiary/20 font-label-caps text-[11px] font-bold px-2.5 py-1 rounded uppercase">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  {progressPercent >= 95 ? 'Arriving Site' : 'In Transit'}
                </span>
              </div>

              <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex flex-col gap-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                  <div>
                    <div className="font-body-md text-xs text-on-surface-variant">Estimated Site Arrival</div>
                    <div className="font-headline-md text-2xl text-primary font-bold">{etaMinutes} Minutes</div>
                  </div>
                </div>

                <div className="w-full bg-outline-variant h-2.5 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-700" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>

                <div className="flex justify-between font-label-caps text-[11px] text-on-surface-variant font-bold">
                  <span>Yard Dispatched</span>
                  <span>{progressPercent}% Complete</span>
                  <span>Site Delivery</span>
                </div>
              </div>
            </section>

            {/* Equipment Load Specs */}
            <section className="flex flex-col gap-2">
              <h3 className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">MACHINERY TELEMETRY</h3>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
                <div className="relative h-28 w-full bg-surface-container">
                  <img 
                    src={activeBooking.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC"} 
                    alt={activeBooking.equipmentName} 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <div className="font-headline-md text-base font-bold text-on-surface">{activeBooking.equipmentName}</div>
                  <div className="font-body-sm text-xs text-on-surface-variant">Provider: {activeBooking.provider || 'Texas Heavy Ops'}</div>
                  <div className="font-body-sm text-xs text-on-surface-variant">Destination: {activeBooking.deliverySite}</div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => setShowDriverModal(true)}
                className="w-full bg-primary-container text-on-primary-container hover:bg-inverse-primary transition-colors py-3 px-4 rounded-lg font-label-caps text-xs font-bold flex items-center justify-center gap-2 shadow-sm cursor-pointer"
              >
                <span className="material-symbols-outlined">call</span>
                CONTACT DISPATCH OPERATOR
              </button>
              <button 
                onClick={() => setShowSupportModal(true)}
                className="w-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors py-3 px-4 rounded-lg font-label-caps text-xs font-bold flex items-center justify-center gap-2 border border-outline-variant cursor-pointer"
              >
                <span className="material-symbols-outlined">support_agent</span>
                24/7 SITE SUPPORT
              </button>
            </section>
          </div>
        </div>
      </main>

      {/* Driver Contact Modal */}
      {showDriverModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-sm w-full p-6 shadow-2xl animate-fade-in text-center">
            <div className="w-16 h-16 bg-primary-container/20 text-primary-container rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-3xl">person_pin</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface mb-1">Ramesh Kumar</h3>
            <p className="text-xs text-on-surface-variant mb-4">Certified Transport Operator • Heavy Flatbed Truck #TX-8902</p>

            <div className="bg-surface p-3 rounded border border-outline-variant mb-4 font-mono text-sm font-bold text-on-surface">
              +91 98765 43210
            </div>

            <div className="flex gap-2">
              <button 
                onClick={() => setShowDriverModal(false)}
                className="flex-1 py-2.5 border border-outline-variant rounded text-xs font-bold text-on-surface-variant hover:bg-surface-container"
              >
                Close
              </button>
              <a 
                href="tel:+919876543210"
                className="flex-1 py-2.5 bg-primary-container text-on-primary-container font-bold text-xs rounded hover:bg-inverse-primary flex items-center justify-center gap-1"
              >
                <span className="material-symbols-outlined text-sm">call</span>
                Call Now
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Support Modal */}
      {showSupportModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-sm w-full p-6 shadow-2xl animate-fade-in text-center">
            <div className="w-16 h-16 bg-tertiary-fixed text-on-tertiary-fixed rounded-full flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-3xl">support_agent</span>
            </div>
            <h3 className="font-bold text-lg text-on-surface mb-1">EquipHub Site Helpdesk</h3>
            <p className="text-xs text-on-surface-variant mb-4">24/7 Emergency site assistance and delivery dispatch coordination.</p>

            <div className="bg-surface p-3 rounded border border-outline-variant mb-4 text-xs font-semibold text-on-surface">
              Emergency Dispatch Toll-Free: <br />
              <strong className="text-sm font-mono font-bold text-primary">1800-425-EQUIP</strong>
            </div>

            <button 
              onClick={() => setShowSupportModal(false)}
              className="w-full py-2.5 bg-on-background text-on-primary font-bold text-xs rounded hover:bg-inverse-surface"
            >
              Close Helpdesk
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
