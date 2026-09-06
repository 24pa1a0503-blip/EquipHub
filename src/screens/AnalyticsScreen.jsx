import React, { useState } from 'react';

export default function AnalyticsScreen({ navigateTo, bookingsList = [], equipmentList = [] }) {
  const [timeframe, setTimeframe] = useState('This Month');

  // Dynamic Revenue Math
  const confirmedBookings = bookingsList.filter(b => b.status !== 'cancelled');
  const grossRevenue = confirmedBookings.reduce((acc, curr) => acc + (curr.totalAmount || 0), 0);
  const totalRentalDays = confirmedBookings.reduce((acc, curr) => acc + (curr.durationDays || 0), 0);
  const avgYield = totalRentalDays > 0 ? Math.round(grossRevenue / totalRentalDays) : 0;
  const activeRentalCount = bookingsList.filter(b => b.status === 'confirmed' || b.status === 'dispatched' || b.status === 'delivered').length;
  const totalMachines = Math.max(1, equipmentList.length);
  const utilizationRate = Math.min(100, Math.round((activeRentalCount / totalMachines) * 100));

  // Dynamic Category Revenue Grouping
  const categoryStats = {};
  confirmedBookings.forEach(b => {
    const cat = b.category || 'General Machinery';
    categoryStats[cat] = (categoryStats[cat] || 0) + (b.totalAmount || 0);
  });

  const categoryEntries = Object.entries(categoryStats).map(([cat, amount]) => ({
    category: cat,
    amount,
    percentage: grossRevenue > 0 ? Math.round((amount / grossRevenue) * 100) : 0
  })).sort((a, b) => b.amount - a.amount);

  // Dynamic Machine Leaderboard
  const machineLeaderboard = {};
  confirmedBookings.forEach(b => {
    const name = b.equipmentName || 'Machinery Asset';
    if (!machineLeaderboard[name]) {
      machineLeaderboard[name] = { name, revenue: 0, days: 0 };
    }
    machineLeaderboard[name].revenue += (b.totalAmount || 0);
    machineLeaderboard[name].days += (b.durationDays || 0);
  });

  const leaderboardEntries = Object.values(machineLeaderboard).sort((a, b) => b.revenue - a.revenue);

  return (
    <main className="flex-1 px-4 md:px-margin-desktop py-6 pb-32 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">Fleet Analytics &amp; Revenue</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            Real-time financial yields, fleet utilization rate, and site performance metrics.
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

      {/* Dynamic Overview KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Gross Revenue</span>
            <span className="text-tertiary font-bold">Firestore Sync</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            ₹{grossRevenue.toLocaleString()}
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">{confirmedBookings.length} confirmed rentals</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Fleet Utilization</span>
            <span className="text-primary font-bold">{utilizationRate}%</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            {utilizationRate}%
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">{activeRentalCount} of {equipmentList.length} active machines on site</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Total Rental Days</span>
            <span className="text-on-surface-variant font-bold">{totalRentalDays} Days</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            {totalRentalDays} Days
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">Logged across all site contracts</div>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg shadow-sm">
          <div className="flex justify-between items-center text-on-surface-variant text-xs font-label-caps uppercase font-bold">
            <span>Avg Daily Yield</span>
            <span className="text-tertiary font-bold">Yield</span>
          </div>
          <div className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            ₹{avgYield.toLocaleString()} <span className="text-xs text-on-surface-variant font-normal">/ day</span>
          </div>
          <div className="text-[11px] text-on-surface-variant mt-1">Across active inventory</div>
        </div>
      </div>

      {/* Analytics Visualizations Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Category Breakdown Progress */}
        <div className="col-span-1 lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
          <h3 className="font-headline-md text-base font-bold text-on-surface mb-4">Revenue Breakdown by Equipment Category</h3>
          {categoryEntries.length === 0 ? (
            <div className="py-8 text-center bg-surface-container-low border border-dashed border-outline-variant rounded-lg text-xs text-on-surface-variant">
              No completed rental transactions logged in database yet.
            </div>
          ) : (
            <div className="space-y-4">
              {categoryEntries.map((catItem, idx) => (
                <div key={idx}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span className="text-on-surface">{catItem.category}</span>
                    <span className="text-primary font-bold">₹{catItem.amount.toLocaleString()} ({catItem.percentage}%)</span>
                  </div>
                  <div className="w-full bg-surface-container-low h-3 rounded-full overflow-hidden">
                    <div 
                      className="bg-primary-container h-full rounded-full transition-all duration-500" 
                      style={{ width: `${catItem.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Top Machinery Leaderboard */}
        <div className="col-span-1 lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-lg p-6 shadow-sm">
          <h3 className="font-headline-md text-base font-bold text-on-surface mb-4">Top Performing Machinery</h3>
          {leaderboardEntries.length === 0 ? (
            <div className="py-8 text-center bg-surface-container-low border border-dashed border-outline-variant rounded-lg text-xs text-on-surface-variant">
              No machine performance data available yet.
            </div>
          ) : (
            <div className="space-y-3">
              {leaderboardEntries.slice(0, 5).map((machine, idx) => (
                <div key={idx} className="flex items-center justify-between p-2.5 bg-surface-container-low rounded">
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xs">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="font-bold text-xs text-on-surface">{machine.name}</div>
                      <div className="text-[11px] text-on-surface-variant">{machine.days} rental days</div>
                    </div>
                  </div>
                  <span className="font-bold text-sm text-on-surface">₹{machine.revenue.toLocaleString()}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
