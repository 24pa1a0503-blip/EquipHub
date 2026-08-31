import React, { useState, useEffect } from 'react';

export default function TrackingScreen({ navigateTo, activeBooking }) {
  const [etaMinutes, setEtaMinutes] = useState(45);
  const [progressPercent, setProgressPercent] = useState(65);

  useEffect(() => {
    const timer = setInterval(() => {
      setEtaMinutes(prev => (prev > 1 ? prev - 1 : 45));
      setProgressPercent(prev => (prev < 95 ? prev + 1 : 65));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const booking = activeBooking || {
    id: 'EQ-8902-CAT',
    equipmentName: 'CAT 320 Excavator',
    deliverySite: 'Site Alpha (Delivery)',
    provider: 'Texas Heavy Ops Ltd.'
  };

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
            EquipHub
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <span className="font-label-caps text-xs text-on-surface-variant font-mono font-bold">ORDER #{booking.id}</span>
        </div>
      </header>

      {/* Main Content Area: Map + Side/Bottom Sheet Panel */}
      <main className="flex-grow relative flex flex-col md:flex-row w-full h-[calc(100vh-68px)] overflow-hidden">
        {/* Map Canvas Area */}
        <div className="relative w-full h-1/2 md:h-full md:w-2/3 lg:w-3/4 bg-surface-container shrink-0 z-0 border-r-0 md:border-r border-outline-variant overflow-hidden">
          {/* Tactical Map Grid */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-85 mix-blend-multiply" 
            style={{
              backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAcFlD__C9MWVqKMVOl96a0K36AXM0Prk38FftfSJ-hDu4Teh5L6PFGNXUDbXUKdUzunpDH8Q5IuzkoKqMB6JLEP-xaFVPhyzDNgW3LoNudWX_pVXqK7PCSZRGJnIunfYgy542hX8gTvow3EoZbtzhNrkZ9Owcq4ohICguC4wqBKqSB5BsxMNr1U0m-ZvPk_cHq1zhVm-a7bYUS0zX1RTQurEechw1KxQJgksGAoxqtq_kzzMaN4ltG')`
            }}
          />

          {/* Map Overlay Badge */}
          <div className="absolute top-4 left-4 flex flex-col gap-2 z-10">
            <div className="bg-surface/90 backdrop-blur-sm border border-outline-variant rounded shadow-sm px-3 py-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary text-sm" data-weight="fill">my_location</span>
              <span className="font-label-caps text-xs font-bold text-on-surface">GPS ACTIVE</span>
            </div>
          </div>

          {/* Destination Pin */}
          <div className="absolute top-1/4 left-1/3 transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
            <div className="bg-surface text-on-surface font-label-caps text-xs font-bold px-2 py-1 rounded shadow-sm border border-outline-variant mb-1 whitespace-nowrap">
              {booking.deliverySite}
            </div>
            <div className="w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md border-2 border-surface">
              <span className="material-symbols-outlined text-sm">flag</span>
            </div>
          </div>

          {/* Route SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10 opacity-70">
            <path 
              d="M 280 140 C 350 220, 480 260, 620 320" 
              fill="none" 
              stroke="#f59e0b" 
              strokeDasharray="8,8" 
              strokeWidth="4"
            />
          </svg>

          {/* Live Vehicle GPS Pin */}
          <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-20 transition-all duration-1000"
            style={{ top: `${45 + (100 - progressPercent) * 0.2}%`, left: `${40 + progressPercent * 0.35}%` }}
          >
            <div className="bg-primary-container text-on-primary-container font-label-caps text-xs px-2 py-1 rounded shadow-sm mb-1 whitespace-nowrap font-bold">
              CAT 320 (En-Route)
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
                <h2 className="font-headline-md text-lg font-bold text-on-surface">Live Tracking</h2>
                <span className="inline-flex items-center gap-1 bg-surface-container-high text-on-surface-variant font-label-caps text-[11px] font-bold px-2 py-1 rounded">
                  <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
                  EN ROUTE
                </span>
              </div>

              <div className="bg-surface-container-low border border-outline-variant rounded-lg p-4 flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">local_shipping</span>
                  <div>
                    <div className="font-body-md text-xs text-on-surface-variant">Estimated Arrival</div>
                    <div className="font-headline-md text-2xl text-primary font-bold">{etaMinutes} Mins</div>
                  </div>
                </div>
                <div className="w-full bg-outline-variant h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-primary h-full rounded-full transition-all duration-500" 
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
                <div className="flex justify-between font-label-caps text-[11px] text-on-surface-variant">
                  <span>Dispatched</span>
                  <span>Arriving Site</span>
                </div>
              </div>
            </section>

            {/* Equipment Load Specs */}
            <section className="flex flex-col gap-2">
              <h3 className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">EQUIPMENT LOAD</h3>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col">
                <div className="relative h-28 w-full bg-surface-container">
                  <img 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC8FOUVqDl_6_nOsL8Oqun83SmsnJbiPwytpUClTOCLigiq00sEszkWxSGoekZm0SjOLZIj882-fSDezdhApMVRMRY7euV_5K7pch1DMiixMo1A1aGUBbZBLWMddZ-ZwmSAlS_FTE8-_cdwz4wEXjK1yV4M9FeH7pxDk7Ibbh2zFogkY3w3EMGuZOldT7IXEKeYxV-jd0bi3R-_tVWklwpLGG9_ha9UQMTdlfjarRzxOuIiehtSs_87" 
                    alt="CAT 320"
                    className="w-full h-full object-cover" 
                  />
                  <div className="absolute top-2 left-2 bg-on-secondary-fixed-variant text-on-secondary px-2 py-0.5 rounded font-label-caps text-[10px] font-bold border border-outline-variant">
                    RENTED
                  </div>
                </div>

                <div className="p-3 flex flex-col gap-2">
                  <div className="font-headline-md text-base font-bold text-on-surface">{booking.equipmentName}</div>
                  <div className="font-body-sm text-xs text-on-surface-variant">Heavy Earthmoving • 2022 Model</div>

                  <div className="mt-1 border-t border-outline-variant pt-2 flex flex-col text-xs">
                    <div className="flex justify-between items-center py-1 font-label-caps">
                      <span className="text-on-surface-variant text-[11px]">OPERATING WEIGHT</span>
                      <span className="font-bold text-on-surface">22,500 kg</span>
                    </div>
                    <div className="flex justify-between items-center py-1 bg-surface-container-low font-label-caps px-1">
                      <span className="text-on-surface-variant text-[11px]">ENGINE POWER</span>
                      <span className="font-bold text-on-surface">170 hp</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Action Buttons */}
            <section className="flex flex-col gap-2 pt-2">
              <button 
                onClick={() => alert("Calling Dispatch Driver: +91 98765 43210...")}
                className="w-full bg-primary-container text-on-primary-container hover:bg-primary-container/90 transition-colors py-3 px-4 rounded-lg font-label-caps text-xs font-bold flex items-center justify-center gap-2 shadow-sm"
              >
                <span className="material-symbols-outlined">call</span>
                CONTACT OPERATOR / DRIVER
              </button>
              <button 
                onClick={() => alert("Connecting to EquipHub 24/7 Support...")}
                className="w-full bg-surface-container-lowest text-on-surface hover:bg-surface-container-low transition-colors py-3 px-4 rounded-lg font-label-caps text-xs font-bold flex items-center justify-center gap-2 border border-outline-variant"
              >
                <span className="material-symbols-outlined">support_agent</span>
                CONTACT SUPPORT
              </button>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
