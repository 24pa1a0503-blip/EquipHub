import React, { useState } from 'react';

export default function DashboardScreen({ navigateTo, equipmentList, bookingsList, setSelectedEquipment }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Excavators', 'JCB', 'Cranes', 'Loaders', 'Generators'];

  const filteredEquipment = equipmentList.filter(item => {
    const matchesCategory = selectedCategory === 'All' || item.category?.toLowerCase() === selectedCategory.toLowerCase();
    const matchesSearch = searchQuery === '' || item.title?.toLowerCase().includes(searchQuery.toLowerCase()) || item.category?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeBooking = bookingsList.find(b => b.status === 'Confirmed' || b.status === 'confirmed' || b.status === 'Active' || b.status === 'dispatched' || b.status === 'delivered') || bookingsList[0];

  const handleBookNow = (item) => {
    setSelectedEquipment(item);
    navigateTo('details');
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    navigateTo('search');
  };

  return (
    <main className="flex-grow px-margin-mobile md:px-margin-desktop py-stack-md md:py-stack-lg flex flex-col gap-stack-lg gap-6 pb-32 max-w-6xl mx-auto w-full p-4 md:p-6">
      {/* Search Section */}
      <section className="w-full max-w-3xl mx-auto">
        <h1 className="font-headline-md text-headline-md mb-stack-sm text-2xl md:text-3xl font-bold mb-3">
          What heavy machinery do you need?
        </h1>
        <form onSubmit={handleSearchSubmit} className="relative">
          <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant">
            search
          </span>
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by machinery name, model, or category (e.g., Excavator)..."
            className="w-full bg-[#F1F5F9] border-2 border-transparent focus:border-secondary focus:ring-0 rounded-lg py-4 pl-12 pr-4 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant shadow-inner transition-colors outline-none"
          />
        </form>
      </section>

      {/* Categories */}
      <section>
        <div className="flex overflow-x-auto hide-scrollbar gap-stack-sm gap-2 pb-base no-scrollbar">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                if (cat !== 'All') navigateTo('search');
              }}
              className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-label-caps transition-colors border ${
                selectedCategory === cat
                  ? 'bg-primary-container text-on-primary-container font-bold border-primary'
                  : 'bg-surface border-outline-variant text-on-surface hover:bg-surface-container-low'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Current Active Bookings Mini-Card */}
      {activeBooking && (
        <section>
          <h2 className="font-headline-md text-headline-md mb-stack-sm text-xl font-bold mb-3">
            Active Job Site Bookings
          </h2>
          <div className="bg-surface border border-outline-variant rounded-xl p-4 flex items-center justify-between shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-secondary-container rounded-lg flex items-center justify-center text-on-secondary-container shrink-0">
                <span className="material-symbols-outlined">construction</span>
              </div>
              <div>
                <h3 className="font-body-md text-body-md font-bold text-on-surface">
                  {activeBooking.equipmentName}
                </h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant text-xs">
                  Status: <strong className="uppercase text-primary">{activeBooking.status}</strong> • {activeBooking.startDate} to {activeBooking.endDate}
                </p>
              </div>
            </div>
            <button 
              onClick={() => navigateTo('bookings')}
              className="px-4 py-2 bg-surface border border-outline-variant rounded-lg text-primary font-label-caps text-xs font-bold hover:bg-surface-container-low transition-colors shrink-0"
            >
              Manage
            </button>
          </div>
        </section>
      )}

      {/* Heavy Machinery Catalog */}
      <section>
        <div className="flex justify-between items-end mb-stack-sm mb-4">
          <h2 className="font-headline-md text-headline-md text-xl font-bold">Available Machinery</h2>
          {filteredEquipment.length > 0 && (
            <button 
              onClick={() => navigateTo('search')} 
              className="font-label-caps text-label-caps text-primary hover:underline text-xs font-bold"
            >
              View All ({filteredEquipment.length})
            </button>
          )}
        </div>

        {filteredEquipment.length === 0 ? (
          /* Production Empty State */
          <div className="bg-surface-container-lowest border border-outline-variant rounded-2xl p-8 md:p-12 text-center flex flex-col items-center justify-center shadow-sm">
            <div className="w-16 h-16 bg-primary-container/20 text-primary-container rounded-full flex items-center justify-center mb-4">
              <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
            </div>
            <h3 className="font-bold text-xl text-on-surface mb-2">No Machinery Listed in Marketplace Yet</h3>
            <p className="text-sm text-on-surface-variant max-w-md mb-6">
              Equipment owners are setting up their live inventory. If you own machinery, switch to your Owner Studio to list your assets!
            </p>
            <button 
              onClick={() => navigateTo('fleet')}
              className="bg-primary-container text-on-primary-container font-bold px-6 py-3 rounded-lg text-sm hover:bg-inverse-primary transition-colors shadow-sm"
            >
              Go to Fleet Studio (+ Add Machine)
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter gap-6">
            {filteredEquipment.map(item => (
              <div 
                key={item.id}
                className="bg-[#ffffff] border border-[#E2E8F0] rounded-xl overflow-hidden flex flex-col hover:shadow-md transition-shadow"
              >
                <div className="h-48 w-full relative bg-surface-container">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover"
                  />
                  <div className={`absolute top-2 left-2 px-2 py-1 rounded font-label-caps text-xs text-white font-bold ${
                    item.statusText === 'Available' || item.available ? 'bg-[#16a34a]' : 'bg-[#d97706]'
                  }`}>
                    {item.available ? 'Available' : 'Rented'}
                  </div>
                </div>

                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="font-body-lg text-body-lg font-bold text-on-surface mb-2">
                    {item.title}
                  </h3>
                  <div className="grid grid-cols-2 gap-stack-sm gap-2 mb-4">
                    <div className="bg-[#F1F5F9] p-2 rounded flex flex-col">
                      <span className="font-label-caps text-label-caps text-on-surface-variant text-[11px] uppercase">
                        Operating Weight
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold text-xs">
                        {item.specs?.weight || 'Heavy Duty'}
                      </span>
                    </div>
                    <div className="bg-[#F1F5F9] p-2 rounded flex flex-col">
                      <span className="font-label-caps text-label-caps text-on-surface-variant text-[11px] uppercase">
                        Location
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface font-semibold text-xs truncate">
                        {item.location || 'Yard Location'}
                      </span>
                    </div>
                  </div>

                  <div className="mt-auto pt-4 border-t border-outline-variant flex justify-between items-center bg-[#0f172a] -mx-4 -mb-4 p-4">
                    <div className="flex flex-col">
                      <span className="font-price-display text-price-display text-white font-bold text-lg">
                        ₹{item.dailyRate}
                      </span>
                      <span className="font-label-caps text-label-caps text-outline-variant text-[11px]">
                        per day
                      </span>
                    </div>
                    <button 
                      onClick={() => handleBookNow(item)}
                      className="bg-[#ea580c] hover:bg-[#c2410c] text-white px-6 py-2 rounded-lg font-label-caps text-xs font-bold transition-colors shadow-sm"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
