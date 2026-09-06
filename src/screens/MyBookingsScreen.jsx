import React, { useState } from 'react';

export default function MyBookingsScreen({ navigateTo, bookingsList = [], setSelectedEquipment, equipmentList = [] }) {
  const [activeTab, setActiveTab] = useState('All');

  const filteredBookings = bookingsList.filter(b => {
    if (activeTab === 'Upcoming') return b.status === 'Confirmed' || b.status === 'confirmed' || b.status === 'pending';
    if (activeTab === 'Active') return b.status === 'Active' || b.status === 'dispatched' || b.status === 'delivered';
    if (activeTab === 'Completed') return b.status === 'Completed' || b.status === 'completed';
    return true;
  });

  const handleViewDetails = (booking) => {
    const matchedEquip = equipmentList.find(e => e.id === booking.equipmentId) || equipmentList[0];
    if (matchedEquip) {
      setSelectedEquipment(matchedEquip);
      navigateTo('details');
    } else {
      navigateTo('search');
    }
  };

  return (
    <main className="flex-1 px-margin-mobile md:px-margin-desktop py-stack-lg pb-32 md:pb-stack-lg max-w-5xl mx-auto w-full p-4 md:p-6">
      <header className="mb-stack-lg mb-6 flex flex-col md:flex-row md:items-end justify-between gap-stack-md gap-4">
        <div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">My Site Bookings</h1>
          <p className="font-body-lg text-on-surface-variant text-sm mt-1">Manage your heavy machinery rentals and delivery schedules.</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="flex gap-stack-md gap-4 border-b border-outline-variant mb-stack-lg mb-6 overflow-x-auto no-scrollbar">
        {['All', 'Upcoming', 'Active', 'Completed'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-label-caps text-xs pb-stack-sm pb-2 px-base font-bold whitespace-nowrap transition-colors border-b-2 ${
              activeTab === tab 
                ? 'text-primary border-primary' 
                : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            {tab} ({
              tab === 'All' ? bookingsList.length :
              tab === 'Upcoming' ? bookingsList.filter(b => b.status === 'pending' || b.status === 'confirmed').length :
              tab === 'Active' ? bookingsList.filter(b => b.status === 'dispatched' || b.status === 'delivered').length :
              bookingsList.filter(b => b.status === 'completed').length
            })
          </button>
        ))}
      </div>

      {/* Booking Cards Grid / Empty State */}
      {filteredBookings.length === 0 ? (
        <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-sm">
          <div className="w-16 h-16 bg-primary-container/20 text-primary-container rounded-full flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-4xl">event_busy</span>
          </div>
          <h3 className="font-bold text-xl text-on-surface mb-2">No Bookings Found</h3>
          <p className="text-sm text-on-surface-variant max-w-md mb-6">
            You haven't placed any machinery rental applications yet. Browse the catalog to book your first machine!
          </p>
          <button 
            onClick={() => navigateTo('search')}
            className="bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-lg text-sm hover:bg-inverse-primary transition-colors shadow-sm"
          >
            Explore Machinery Marketplace
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter gap-6">
          {filteredBookings.map(booking => {
            let badgeBg = 'bg-primary text-on-primary border-primary';
            if (booking.status === 'delivered' || booking.status === 'Delivered') badgeBg = 'bg-on-secondary-fixed-variant text-surface-container-lowest border-on-secondary-fixed-variant';
            if (booking.status === 'dispatched' || booking.status === 'Active') badgeBg = 'bg-tertiary text-on-tertiary border-tertiary';
            if (booking.status === 'pending') badgeBg = 'bg-primary-container text-on-primary-container border-primary-container';

            return (
              <div 
                key={booking.id}
                className="bg-surface-container-lowest border border-outline-variant rounded-lg overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-48 bg-surface-variant relative">
                  <img 
                    src={booking.image || "https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC"} 
                    alt={booking.equipmentName} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-3 right-3 px-2 py-1 font-label-caps text-xs rounded border flex items-center gap-1 font-bold ${badgeBg}`}>
                    <span className="w-2 h-2 rounded-full bg-current block" />
                    {booking.status?.toUpperCase()}
                  </div>
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <h3 className="font-headline-md text-base font-bold text-on-surface mb-1 line-clamp-1">
                    {booking.equipmentName}
                  </h3>
                  <div className="text-on-surface-variant font-body-sm text-xs mb-4 flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">calendar_today</span>
                    <span>{booking.startDate} to {booking.endDate}</span>
                  </div>

                  <div className="mt-auto pt-3 border-t border-surface-variant flex justify-between items-center">
                    <div className="font-price-display text-lg font-bold text-on-surface">₹{booking.totalAmount?.toLocaleString()}</div>
                    <button 
                      onClick={() => handleViewDetails(booking)}
                      className="bg-primary text-on-primary font-label-caps text-xs px-4 py-2 rounded-lg hover:bg-surface-tint transition-colors font-bold"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
