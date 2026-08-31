import React, { useState } from 'react';

export default function SearchScreen({ navigateTo, equipmentList, setSelectedEquipment }) {
  const [searchQuery, setSearchQuery] = useState('Excavator');
  const [activeCategoryFilter, setActiveCategoryFilter] = useState('Excavators');
  const [selectedSort, setSelectedSort] = useState('Recommended');
  const [priceFilter, setPriceFilter] = useState('All');

  const filteredEquipment = equipmentList.filter(item => {
    const matchesCategory = !activeCategoryFilter || activeCategoryFilter === 'All' || item.category.toLowerCase() === activeCategoryFilter.toLowerCase();
    const matchesSearch = !searchQuery || item.title.toLowerCase().includes(searchQuery.toLowerCase()) || item.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (selectedSort === 'Price: Low to High') return a.dailyRate - b.dailyRate;
    if (selectedSort === 'Distance') return a.distanceKm - b.distanceKm;
    return b.rating - a.rating;
  });

  const handleSelectSpecs = (item) => {
    setSelectedEquipment(item);
    navigateTo('details');
  };

  const handleRequestBooking = (item) => {
    setSelectedEquipment(item);
    navigateTo('config');
  };

  return (
    <main className="flex-1 w-full pb-24 md:pb-8 p-4 md:p-6 max-w-6xl mx-auto">
      {/* Search and Filter Header Area */}
      <div className="bg-surface border-b border-outline-variant px-margin-mobile md:px-margin-desktop py-stack-lg py-4 mb-6 shadow-sm rounded-lg">
        <div className="max-w-6xl mx-auto flex flex-col gap-stack-md gap-3">
          {/* Search Bar */}
          <div className="relative flex items-center w-full">
            <span className="material-symbols-outlined absolute left-4 text-secondary">
              search
            </span>
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search equipment (e.g. Excavators, Loaders)..."
              className="w-full pl-12 pr-12 py-3 rounded-lg border border-outline-variant bg-surface-container-lowest font-body-md text-body-md input-heavy shadow-sm transition-all duration-300 outline-none"
            />
            <span className="material-symbols-outlined absolute right-4 text-on-surface-variant cursor-pointer">
              my_location
            </span>
          </div>

          {/* Location Context */}
          <div className="flex items-center gap-2 text-on-surface-variant font-body-sm text-sm">
            <span className="material-symbols-outlined text-[18px]">near_me</span>
            <span>Searching near <strong className="text-on-surface">Dallas, TX (80km)</strong></span>
          </div>

          {/* Filters Carousel */}
          <div className="flex overflow-x-auto pb-2 gap-3 no-scrollbar items-center mt-2">
            <button className="flex-shrink-0 flex items-center gap-2 px-3 py-1.5 border border-outline-variant rounded-md bg-surface text-on-surface hover:bg-surface-container-low text-xs font-label-caps">
              <span className="material-symbols-outlined text-[18px]">tune</span>
              <span>Filters</span>
            </button>

            {activeCategoryFilter && (
              <button 
                onClick={() => setActiveCategoryFilter('All')}
                className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 bg-primary-container text-on-primary-container font-bold border-2 border-primary rounded-full text-xs font-label-caps"
              >
                <span>Type: {activeCategoryFilter}</span>
                <span className="material-symbols-outlined text-[16px]">close</span>
              </button>
            )}

            <button 
              onClick={() => setSelectedSort(selectedSort === 'Price: Low to High' ? 'Recommended' : 'Price: Low to High')}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-1.5 border rounded-full text-xs font-label-caps ${
                selectedSort === 'Price: Low to High' ? 'bg-secondary-container text-on-secondary-container font-bold border-secondary' : 'border-outline-variant text-on-surface-variant'
              }`}
            >
              <span>Price Sort</span>
              <span className="material-symbols-outlined text-[16px]">arrow_drop_down</span>
            </button>

            <button 
              onClick={() => setActiveCategoryFilter('Loaders')}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 border border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-low text-xs font-label-caps"
            >
              <span>Loaders</span>
            </button>

            <button 
              onClick={() => setActiveCategoryFilter('Cranes')}
              className="flex-shrink-0 flex items-center gap-2 px-4 py-1.5 border border-outline-variant rounded-full text-on-surface-variant hover:bg-surface-container-low text-xs font-label-caps"
            >
              <span>Cranes</span>
            </button>
          </div>
        </div>
      </div>

      {/* Results Canvas */}
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-stack-md mb-4">
          <h2 className="font-headline-md text-headline-md text-on-surface font-bold text-xl">
            {filteredEquipment.length} Results Found
          </h2>
          <div className="flex items-center gap-2">
            <span className="font-body-sm text-body-sm text-on-surface-variant text-xs">Sort by:</span>
            <select 
              value={selectedSort}
              onChange={(e) => setSelectedSort(e.target.value)}
              className="border-none bg-transparent font-label-caps text-xs font-bold text-on-surface focus:ring-0 cursor-pointer outline-none"
            >
              <option value="Recommended">Recommended</option>
              <option value="Price: Low to High">Price: Low to High</option>
              <option value="Distance">Distance</option>
            </select>
          </div>
        </div>

        {/* Bento / List Hybrid Results */}
        <div className="flex flex-col gap-gutter gap-6">
          {filteredEquipment.map(item => (
            <article 
              key={item.id}
              className="spec-card rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col md:flex-row bg-white border border-outline-variant"
            >
              {/* Image Area */}
              <div className="md:w-1/3 relative h-48 md:h-auto border-b md:border-b-0 md:border-r border-outline-variant p-4 flex items-center justify-center bg-surface-container-lowest">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain max-h-48"
                />
                <div className="absolute top-4 left-4 bg-tertiary text-on-tertiary px-2 py-1 font-label-caps text-[11px] rounded flex items-center gap-1 font-bold">
                  <span className="material-symbols-outlined text-[14px]">check_circle</span>
                  {item.statusText}
                </div>
              </div>

              {/* Details Area */}
              <div className="p-6 md:w-2/3 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="font-headline-lg-mobile font-bold text-on-surface tracking-tight text-xl">
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 text-on-surface-variant mt-1 text-xs">
                        <span className="material-symbols-outlined text-[16px]">storefront</span>
                        <span>{item.owner}</span>
                        <span className="text-secondary-fixed-dim mx-1">•</span>
                        <span className="material-symbols-outlined text-[16px] text-primary-container" data-weight="fill">star</span>
                        <span className="font-bold text-on-surface">{item.rating}</span>
                        <span>({item.reviewsCount} reviews)</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="font-price-display text-2xl font-bold text-on-surface">₹{item.dailyRate}</div>
                      <div className="font-label-caps text-xs text-on-surface-variant">/ day</div>
                    </div>
                  </div>

                  {/* Specs Grid (Recessed) */}
                  <div className="spec-recess rounded mt-4 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 border border-outline-variant/30 text-xs">
                    <div>
                      <div className="font-label-caps text-on-surface-variant mb-1 uppercase">Weight</div>
                      <div className="font-bold text-on-surface">{item.specs.weight}</div>
                    </div>
                    <div>
                      <div className="font-label-caps text-on-surface-variant mb-1 uppercase">Dig Depth</div>
                      <div className="font-bold text-on-surface">{item.specs.digDepth || 'N/A'}</div>
                    </div>
                    <div>
                      <div className="font-label-caps text-on-surface-variant mb-1 uppercase">Engine</div>
                      <div className="font-bold text-on-surface">{item.specs.power}</div>
                    </div>
                    <div>
                      <div className="font-label-caps text-on-surface-variant mb-1 uppercase">Distance</div>
                      <div className="font-bold text-on-surface flex items-center gap-1">
                        <span className="material-symbols-outlined text-[16px]">location_on</span>
                        {item.distance}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-end gap-3">
                  <button 
                    onClick={() => handleSelectSpecs(item)}
                    className="px-6 py-2 border border-outline-variant rounded font-label-caps text-xs font-bold text-on-surface hover:bg-surface-container-low transition-colors"
                  >
                    View Specs
                  </button>
                  <button 
                    onClick={() => handleRequestBooking(item)}
                    className="btn-primary px-6 py-2 font-label-caps text-xs font-bold hover:bg-primary-fixed-dim transition-colors shadow-sm hover:shadow-md"
                  >
                    Request Booking
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
