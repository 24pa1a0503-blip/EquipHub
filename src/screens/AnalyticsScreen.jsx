import React, { useState } from 'react';

export default function AnalyticsScreen({ navigateTo, bookingsList, equipmentList }) {
  const [timeframe, setTimeframe] = useState('This Month');

  // Revenue math
  const totalRevenue = bookingsList.reduce((acc, curr) => acc + (curr.totalAmount || 0), 184500);
  const activeCount = bookingsList.length;

  return (
    <main className="flex-1 px-4 md:px-margin-desktop py-6 pb-32 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">Analytics &amp; Earnings</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            Real-time rental revenue, asset utilization rate, and performance metrics.
          </p>
        </div>
        <div className="flex items-center gap-2">
          {['This Month', 'Last 30 Days', 'YTD'].map(t => (
            <button
              key={t}
              onClick={() => setTimeframe(t)}
              className={`px-3 py-1.5 rounded text-xs font-label-caps font-bold transition-colors ${
                timeframe === t ? 'bg-primary-container text-on-primary-container' : 'bg-surface border border-outline-variant text-on-surface-variant'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Overview KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Gross Revenue</span>
            <span className="text-tertiary font-bold">+14.2%</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            ₹{totalRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">vs ₹1,61,500 last period</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Fleet Utilization</span>
            <span className="text-tertiary font-bold">+8.0%</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            78.5%
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">5 of 6 active machines on site</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Total Rental Days</span>
            <span className="text-on-surface-variant font-bold">47 Days</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            {activeCount * 14} Days
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">Avg 15.6 days per booking</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Avg Daily Yield</span>
            <span className="text-tertiary font-bold">High</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            ₹425 <span className="text-xs text-on-surface-variant font-normal">/ day</span>
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">Across all categories</div>
        </div>
      </div>

      {/* Performance Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Progress */}
        <div className="col-span-1 lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
          <h3 className="font-headline-md text-base font-bold text-on-surface mb-4">Revenue Breakdown by Equipment Category</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-on-surface">Excavators (CAT 320, Deere 210G)</span>
                <span className="text-primary font-bold">₹1,15,000 (62%)</span>
              </div>
              <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                <div className="bg-primary-container h-full rounded-full w-[62%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-on-surface">Loaders (Bobcat S650)</span>
                <span className="text-secondary font-bold">₹42,500 (23%)</span>
              </div>
              <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                <div className="bg-secondary h-full rounded-full w-[23%]" />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold mb-1">
                <span className="text-on-surface">Scissor Lifts &amp; Access (JLG 1930ES)</span>
                <span className="text-tertiary font-bold">₹27,000 (15%)</span>
              </div>
              <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                <div className="bg-tertiary h-full rounded-full w-[15%]" />
              </div>
            </div>
          </div>
        </div>

        {/* Top Machinery Ranking */}
        <div className="col-span-1 lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
          <h3 className="font-headline-md text-base font-bold text-on-surface mb-4">Top Performing Machinery</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">1</span>
                <div>
                  <div className="font-bold text-xs text-on-surface">CAT 320 Excavator</div>
                  <div className="text-[11px] text-on-surface-variant">24 rental days</div>
                </div>
              </div>
              <span className="font-bold text-sm text-on-surface">₹78,400</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold text-xs">2</span>
                <div>
                  <div className="font-bold text-xs text-on-surface">Bobcat S650 Loader</div>
                  <div className="text-[11px] text-on-surface-variant">18 rental days</div>
                </div>
              </div>
              <span className="font-bold text-sm text-on-surface">₹42,500</span>
            </div>

            <div className="flex items-center justify-between p-2.5 bg-surface-container-low rounded">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold text-xs">3</span>
                <div>
                  <div className="font-bold text-xs text-on-surface">John Deere 210G</div>
                  <div className="text-[11px] text-on-surface-variant">12 rental days</div>
                </div>
              </div>
              <span className="font-bold text-sm text-on-surface">₹36,600</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
