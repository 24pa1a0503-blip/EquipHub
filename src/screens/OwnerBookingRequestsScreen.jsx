import React, { useState } from 'react';
import { updateBookingStatusDoc } from '../firebase/services';

export default function OwnerBookingRequestsScreen({ navigateTo, bookingsList, setBookingsList }) {
  const [activeTab, setActiveTab] = useState('pending');

  const filteredRequests = bookingsList.filter(b => {
    if (activeTab === 'pending') return b.status === 'pending';
    if (activeTab === 'active') return b.status === 'confirmed' || b.status === 'dispatched' || b.status === 'delivered';
    if (activeTab === 'completed') return b.status === 'completed' || b.status === 'Completed';
    return true;
  });

  const handleUpdateStatus = async (bookingId, newStatus) => {
    await updateBookingStatusDoc(bookingId, newStatus);
    setBookingsList(prev => prev.map(b => b.id === bookingId ? { ...b, status: newStatus } : b));
  };

  return (
    <main className="flex-1 px-4 md:px-margin-desktop py-6 pb-32 max-w-5xl mx-auto w-full">
      <header className="mb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">Booking Requests Manager</h1>
          <p className="font-body-lg text-on-surface-variant text-sm mt-1">Review contractor rental applications, approve dispatch, and manage job site delivery status.</p>
        </div>
      </header>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-6 overflow-x-auto no-scrollbar">
        {[
          { key: 'pending', label: `Pending Requests (${bookingsList.filter(b => b.status === 'pending').length})` },
          { key: 'active', label: 'Active Rentals' },
          { key: 'completed', label: 'Completed' },
          { key: 'all', label: 'All Requests' }
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`font-label-caps text-xs pb-2 px-1 font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab.key ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Requests List */}
      <div className="flex flex-col gap-4">
        {filteredRequests.length === 0 ? (
          <div className="p-8 text-center bg-surface-container-lowest border border-outline-variant rounded-lg">
            <span className="material-symbols-outlined text-4xl text-on-surface-variant mb-2">event_busy</span>
            <p className="text-sm text-on-surface-variant">No requests found in this tab category.</p>
          </div>
        ) : (
          filteredRequests.map(item => (
            <div 
              key={item.id}
              className="bg-surface-container-lowest border border-outline-variant rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow flex flex-col md:flex-row justify-between gap-4"
            >
              <div className="flex gap-4 items-start">
                <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden border border-outline-variant shrink-0">
                  <img src={item.image} alt={item.equipmentName} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-on-surface-variant font-bold">{item.id}</span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-label-caps font-bold uppercase ${
                      item.status === 'pending' ? 'bg-primary-container/20 text-on-primary-container border border-primary/20' :
                      item.status === 'confirmed' ? 'bg-tertiary/10 text-tertiary border border-tertiary/20' :
                      'bg-secondary-container text-on-secondary-container'
                    }`}>
                      {item.status}
                    </span>
                  </div>
                  <h3 className="font-bold text-base text-on-surface">{item.equipmentName}</h3>
                  <div className="text-xs text-on-surface-variant">
                    Rental Dates: <strong className="text-on-surface">{item.startDate} to {item.endDate} ({item.durationDays} Days)</strong>
                  </div>
                  <div className="text-xs text-on-surface-variant flex items-center gap-1">
                    <span className="material-symbols-outlined text-sm">location_on</span>
                    <span>Site: {item.deliverySite || 'Dallas, TX'}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col justify-between items-end border-t md:border-t-0 border-outline-variant/30 pt-3 md:pt-0">
                <div className="text-right">
                  <div className="font-price-display font-bold text-xl text-on-surface">₹{item.totalAmount?.toLocaleString()}</div>
                  <div className="text-[11px] text-on-surface-variant">Total Rental Value</div>
                </div>

                {/* Status Action Buttons */}
                <div className="flex gap-2 mt-3 flex-wrap justify-end">
                  {item.status === 'pending' && (
                    <>
                      <button 
                        onClick={() => handleUpdateStatus(item.id, 'cancelled')}
                        className="px-3 py-1.5 border border-error text-error rounded font-label-caps text-xs font-bold hover:bg-error-container/20"
                      >
                        Reject
                      </button>
                      <button 
                        onClick={() => handleUpdateStatus(item.id, 'confirmed')}
                        className="px-4 py-1.5 bg-primary-container text-on-primary-container rounded font-label-caps text-xs font-bold hover:bg-inverse-primary shadow-sm"
                      >
                        Approve Booking
                      </button>
                    </>
                  )}

                  {item.status === 'confirmed' && (
                    <button 
                      onClick={() => handleUpdateStatus(item.id, 'dispatched')}
                      className="px-4 py-1.5 bg-tertiary text-on-tertiary rounded font-label-caps text-xs font-bold hover:bg-tertiary-fixed-dim"
                    >
                      Dispatch Machine
                    </button>
                  )}

                  {item.status === 'dispatched' && (
                    <button 
                      onClick={() => handleUpdateStatus(item.id, 'delivered')}
                      className="px-4 py-1.5 bg-secondary text-on-secondary rounded font-label-caps text-xs font-bold hover:bg-secondary-container"
                    >
                      Mark Delivered
                    </button>
                  )}

                  {item.status === 'delivered' && (
                    <button 
                      onClick={() => handleUpdateStatus(item.id, 'completed')}
                      className="px-4 py-1.5 bg-on-background text-on-primary rounded font-label-caps text-xs font-bold"
                    >
                      Mark Completed
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
