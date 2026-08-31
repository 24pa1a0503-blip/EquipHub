import React, { useState } from 'react';

export default function FleetManagerScreen({ navigateTo, equipmentList, setEquipmentList }) {
  const [activeTab, setActiveTab] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Asset Form State
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Excavators');
  const [newDailyRate, setNewDailyRate] = useState('400');
  const [newLocation, setNewLocation] = useState('Dallas, TX Yard');

  const filteredAssets = equipmentList.filter(asset => {
    if (activeTab === 'Available') return asset.available;
    if (activeTab === 'Rented') return !asset.available || asset.statusText === 'Idle';
    return true;
  });

  const toggleAvailability = (id) => {
    setEquipmentList(prev => prev.map(item => {
      if (item.id === id) {
        const nextAvail = !item.available;
        return {
          ...item,
          available: nextAvail,
          statusText: nextAvail ? 'Available' : 'Rented'
        };
      }
      return item;
    }));
  };

  const handleAddAsset = (e) => {
    e.preventDefault();
    if (!newTitle) return;

    const newMachine = {
      id: `custom-${Date.now()}`,
      title: newTitle,
      shortName: newTitle,
      category: newCategory,
      brand: newTitle.split(' ')[0] || 'Custom',
      owner: 'Industrial Ops Ltd.',
      ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCund9hJwy5iaWLy-Hn6_dHTcPrepUlEfVZI2Fp6IIF1oj4Bh97rhmlgO35VfiGoyH9G0uB8tZ_mno3eny2sF4ALJ7QnFVashxl4wHVeaAVSmGcQesEcC1N7KlpbIcr-mLHCjqGv-tZmR74G5ewP6x12FIciFx7h25gQV0NEXXSdcYYDDg8KSh6bxMw9bBj6d75CFEBbVSSNRNUh8dH8ccwhglY5dIVYfRNE_u5EkGRLTEWfORP4BLI',
      location: newLocation,
      distance: '10 km away',
      distanceKm: 10,
      dailyRate: Number(newDailyRate),
      rating: 5.0,
      reviewsCount: 1,
      available: true,
      statusText: 'Available',
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC',
      photosCount: 3,
      specs: {
        weight: '18,000 kg',
        power: '140 HP',
        digDepth: '5.5 m',
        engineHours: '450 hrs',
        attachments: 'Standard Bucket'
      },
      description: 'Newly added machinery asset to fleet.'
    };

    setEquipmentList(prev => [newMachine, ...prev]);
    setShowAddModal(false);
    setNewTitle('');
  };

  return (
    <main className="flex-1 px-4 md:px-margin-desktop py-6 pb-32 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">Fleet Manager</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            Manage your listed machinery assets, maintenance status, and active rentals.
          </p>
        </div>
        <button 
          onClick={() => setShowAddModal(true)}
          className="bg-primary-container text-on-primary-container font-bold px-4 py-2.5 rounded-lg flex items-center gap-2 hover:bg-inverse-primary transition-colors text-sm shadow-sm self-start sm:self-auto"
        >
          <span className="material-symbols-outlined text-lg">add_circle</span>
          Add New Machine
        </button>
      </header>

      {/* Fleet Stats Banner */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Total Fleet Assets</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface mt-2">{equipmentList.length}</span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Active On Rent</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-tertiary mt-2">
            {equipmentList.filter(e => !e.available || e.statusText === 'Idle').length}
          </span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Available in Yard</span>
          <span className="font-display-lg text-2xl md:text-3xl font-extrabold text-primary mt-2">
            {equipmentList.filter(e => e.available && e.statusText !== 'Idle').length}
          </span>
        </div>
        <div className="bg-surface-container-lowest border border-outline-variant p-4 rounded-lg flex flex-col justify-between shadow-sm">
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Est. Monthly Revenue</span>
          <span className="font-display-lg text-xl md:text-2xl font-extrabold text-on-surface mt-2">₹3,45,000</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-6 overflow-x-auto no-scrollbar">
        {['All', 'Available', 'Rented'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-label-caps text-xs pb-2 px-1 font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            {tab} Assets
          </button>
        ))}
      </div>

      {/* Asset List */}
      <div className="flex flex-col gap-4">
        {filteredAssets.map(item => (
          <div 
            key={item.id}
            className="bg-surface-container-lowest border border-outline-variant rounded-lg p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-surface-container rounded-lg overflow-hidden border border-outline-variant shrink-0">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h3 className="font-bold text-on-surface text-base">{item.title}</h3>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-label-caps font-bold uppercase ${
                    item.available ? 'bg-tertiary/10 text-tertiary border border-tertiary/20' : 'bg-primary-container/20 text-on-primary-container border border-primary/20'
                  }`}>
                    {item.available ? 'Yard Listed' : 'On Site'}
                  </span>
                </div>
                <span className="font-body-sm text-xs text-on-surface-variant mt-1">
                  Category: {item.category} • Rating: ⭐ {item.rating} ({item.reviewsCount} reviews)
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Location: {item.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-6 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-outline-variant/30 pt-3 md:pt-0">
              <div className="text-right">
                <div className="font-price-display font-bold text-lg text-on-surface">₹{item.dailyRate}</div>
                <div className="font-label-caps text-xs text-on-surface-variant">per day</div>
              </div>
              
              <button 
                onClick={() => toggleAvailability(item.id)}
                className={`px-4 py-2 rounded-lg font-label-caps text-xs font-bold transition-colors ${
                  item.available 
                    ? 'bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high' 
                    : 'bg-primary text-on-primary hover:bg-surface-tint'
                }`}
              >
                {item.available ? 'Mark Occupied' : 'Mark Available'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Machinery Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-md w-full p-6 shadow-2xl animate-fade-in">
            <div className="flex justify-between items-center mb-4 border-b border-outline-variant pb-3">
              <h3 className="font-bold text-lg text-on-surface">Add Machine to Fleet</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="flex flex-col gap-4">
              <div>
                <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Equipment Name &amp; Model</label>
                <input 
                  type="text" 
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g. Komatsu PC200 Excavator"
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                  required
                />
              </div>

              <div>
                <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Category</label>
                <select 
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                >
                  <option value="Excavators">Excavators</option>
                  <option value="JCB">JCB</option>
                  <option value="Cranes">Cranes</option>
                  <option value="Loaders">Loaders</option>
                  <option value="Generators">Generators</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Daily Rate (₹)</label>
                  <input 
                    type="number" 
                    value={newDailyRate}
                    onChange={(e) => setNewDailyRate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Location Yard</label>
                  <input 
                    type="text" 
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div className="flex gap-3 mt-4">
                <button 
                  type="button" 
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 border border-outline-variant rounded text-sm font-bold text-on-surface-variant hover:bg-surface-container"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-2.5 bg-primary-container text-on-primary-container rounded text-sm font-bold hover:bg-inverse-primary"
                >
                  Save Asset
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
