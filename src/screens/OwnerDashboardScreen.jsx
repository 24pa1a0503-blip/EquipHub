import React from 'react';

export default function OwnerDashboardScreen({ navigateTo, equipmentList, bookingsList }) {
  // Pending bookings requiring owner approval
  const pendingRequests = bookingsList.filter(b => b.status === 'pending');
  const activeBookings = bookingsList.filter(b => b.status === 'confirmed' || b.status === 'dispatched' || b.status === 'delivered' || b.status === 'Active');

  const totalEarnings = bookingsList.reduce((acc, curr) => acc + (curr.totalAmount || 0), 184500);

  return (
    <main className="flex-grow px-4 md:px-margin-desktop py-6 pb-32 max-w-6xl mx-auto w-full">
      {/* Executive Welcome Banner */}
      <header className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-surface-container-lowest border border-outline-variant p-6 rounded-xl shadow-sm">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-primary/10 text-primary font-label-caps text-xs px-2 py-0.5 rounded font-bold uppercase">
              Owner Dashboard
            </span>
          </div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">
            Welcome, Industrial Fleet Owner
          </h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            Monitor incoming rental requests, asset dispatch status, and revenue analytics.
          </p>
        </div>

        <div className="flex gap-3">
          <button 
            onClick={() => navigateTo('fleet')}
            className="bg-surface-container border border-outline-variant hover:bg-surface-container-high text-on-surface font-bold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-lg">inventory</span>
            Fleet Studio
          </button>
          <button 
            onClick={() => navigateTo('requests')}
            className="bg-primary-container text-on-primary-container font-bold px-4 py-2.5 rounded-lg text-sm transition-colors flex items-center gap-2 shadow-sm"
          >
            <span className="material-symbols-outlined text-lg">pending_actions</span>
            Booking Requests ({pendingRequests.length})
          </button>
        </div>
      </header>

      {/* Pending Requests Alert Banner */}
      {pendingRequests.length > 0 && (
        <section className="mb-6 bg-primary-container/20 border-2 border-primary-container p-4 rounded-xl flex items-center justify-between shadow-sm animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center font-bold text-xl">
              !
            </div>
            <div>
              <h3 className="font-bold text-on-surface text-base">
                {pendingRequests.length} Pending Booking {pendingRequests.length === 1 ? 'Request' : 'Requests'}
              </h3>
              <p className="text-xs text-on-surface-variant">
                Contractors are waiting for your approval to confirm site dispatch.
              </p>
            </div>
          </div>
          <button 
            onClick={() => navigateTo('requests')}
            className="bg-primary-container text-on-primary-container font-bold text-xs px-4 py-2 rounded-lg hover:bg-inverse-primary transition-colors shrink-0"
          >
            Review Requests
          </button>
        </section>
      )}

      {/* Key Metric Tiles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Total Revenue</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            ₹{totalEarnings.toLocaleString()}
          </span>
          <span className="text-[11px] text-tertiary font-bold mt-1">↑ +14.2% this month</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Pending Approval</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary-container mt-2">
            {pendingRequests.length}
          </span>
          <span className="text-[11px] text-on-surface-variant mt-1">Requires action</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Active On Rent</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-tertiary mt-2">
            {activeBookings.length}
          </span>
          <span className="text-[11px] text-on-surface-variant mt-1">Dispatched to job sites</span>
        </div>

        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Listed Fleet Assets</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">
            {equipmentList.length}
          </span>
          <span className="text-[11px] text-on-surface-variant mt-1">Yard inventory</span>
        </div>
      </div>

      {/* Recent Fleet Activity Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Managed Equipment Quick View */}
        <div className="col-span-1 lg:col-span-7 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-headline-md text-lg font-bold text-on-surface">Your Fleet Inventory</h2>
            <button 
              onClick={() => navigateTo('fleet')}
              className="text-xs text-primary font-bold hover:underline"
            >
              Manage All
            </button>
          </div>

          <div className="space-y-3">
            {equipmentList.slice(0, 4).map(item => (
              <div key={item.id} className="flex items-center justify-between p-3 bg-surface-container-low rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-surface-container rounded overflow-hidden border border-outline-variant shrink-0">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <div className="font-bold text-xs text-on-surface">{item.title}</div>
                    <div className="text-[11px] text-on-surface-variant">{item.location}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-sm text-on-surface">₹{item.dailyRate}/day</div>
                  <span className={`text-[10px] font-label-caps font-bold uppercase px-2 py-0.5 rounded ${
                    item.available ? 'bg-tertiary/10 text-tertiary' : 'bg-primary-container/20 text-on-primary-container'
                  }`}>
                    {item.available ? 'Available' : 'Occupied'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Analytics Summary */}
        <div className="col-span-1 lg:col-span-5 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-headline-md text-lg font-bold text-on-surface">Revenue Insights</h2>
              <button 
                onClick={() => navigateTo('analytics')}
                className="text-xs text-primary font-bold hover:underline"
              >
                View Full Analytics
              </button>
            </div>
            <p className="text-xs text-on-surface-variant leading-relaxed mb-4">
              Your equipment utilization rate is currently **78.5%**. Heavy Excavators represent 62% of overall rental earnings this month.
            </p>
          </div>

          <div className="bg-surface-container p-4 rounded-lg border border-outline-variant/30 flex justify-between items-center">
            <div>
              <div className="text-xs text-on-surface-variant font-bold uppercase">Target Yield</div>
              <div className="text-lg font-bold text-on-surface">₹2,50,000 / mo</div>
            </div>
            <button 
              onClick={() => navigateTo('analytics')}
              className="bg-primary text-on-primary text-xs font-bold px-3 py-2 rounded-lg hover:bg-surface-tint"
            >
              Report
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
