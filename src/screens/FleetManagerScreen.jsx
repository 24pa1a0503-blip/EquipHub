import React, { useState } from 'react';
import { addEquipmentDoc, updateEquipmentDoc, deleteEquipmentDoc } from '../firebase/services';

const TEMPLATE_IMAGES = [
  { label: 'Hydraulic Excavator (CAT Yellow)', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC' },
  { label: 'Deere Excavator (Green/Yellow)', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAHvmx6uiU-pZlhnkDFOxv5jfIoPurDo_isD53P20DR73XCTaNfwTckkOmfQN63t9bQ8BCu7RzqNzJaeh2aiWIw5kk6kngBwXnfcaFytEPvzW4yLa0aXUJoIZ6Og0MXp_FW-hPvM8Oq_h9VqJlr9EYCIBTbuwDxXcdPKbKVoWt2UGJ1RjKCWyrd_FcLG51vfd_4Wus_Ha2zwag7p0JYU7q3HBaKRwdwgPe06eic11HI_XSPwsQga_ez' },
  { label: 'Bobcat Skid Steer Loader', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBoxQHrPpfy6JWbIoIOxnlzXSNL0X--br1DtEnk5YZHdXAvThsQ6ECwaUpxDgTRgYpfpSIw7nsxkCEcp6KDVAPTtXNw4SxOwvOdCs4VAoUW9ewaRDK46GTzz5GrKKCDLsEZtrANkg-XXRI75-cq-ODe3wbi0eppUotC0MyaipmQHCZT9HizPM08lF0ODDOmTufmcpGbgcic80IEc1M02mF-RVyF4sTgdoVBNt5QXNVaRvIGJa4MBgXn' },
  { label: 'JLG Electric Scissor Lift', url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC7a2T9OMwMSBOhyiAWhZfSY6wzdz-GgklP4nw0Kgwmr-F0Ci159FyalgyT0uhxkCXQKovyoHXkOjuXSstObDGbfoD6Coxj7Z9peVoRljB7VdnwjIg0MMH6Jj0GBs40-oLKcxgVr_ibGU1l9geF2nfkBB_y6JD_wVc9deWHGuFKZpm895SVlDpwDD9gp8qOVJhu6pHHh8Vd5vc75jFPt8UAnEWZdJWC5BreF3ndMkQpBNhJnev1Jn_U' }
];

export default function FleetManagerScreen({ navigateTo, equipmentList, setEquipmentList }) {
  const [activeTab, setActiveTab] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Machine State
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Excavators');
  const [dailyRate, setDailyRate] = useState('450');
  const [location, setLocation] = useState('Dallas, TX Industrial Yard');
  const [weight, setWeight] = useState('22,500 kg');
  const [power, setPower] = useState('172 HP');
  const [digDepth, setDigDepth] = useState('6.7 m');
  const [selectedImageUrl, setSelectedImageUrl] = useState(TEMPLATE_IMAGES[0].url);
  const [customImageUrl, setCustomImageUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const filteredAssets = equipmentList.filter(asset => {
    if (activeTab === 'Available') return asset.available;
    if (activeTab === 'Rented') return !asset.available || asset.statusText === 'Idle';
    return true;
  });

  const toggleAvailability = async (item) => {
    const nextAvail = !item.available;
    const updatedStatus = nextAvail ? 'Available' : 'Rented';
    await updateEquipmentDoc(item.id, {
      available: nextAvail,
      statusText: updatedStatus
    });

    setEquipmentList(prev => prev.map(e => e.id === item.id ? { ...e, available: nextAvail, statusText: updatedStatus } : e));
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this machine from fleet listing?")) {
      await deleteEquipmentDoc(id);
      setEquipmentList(prev => prev.filter(e => e.id !== id));
    }
  };

  const handleAddAsset = async (e) => {
    e.preventDefault();
    if (!title) return;
    setSubmitting(true);

    const imageUrlToUse = customImageUrl || selectedImageUrl;

    const newMachineData = {
      title,
      shortName: title,
      category,
      brand: title.split(' ')[0] || 'Industrial',
      owner: 'Industrial Ops Ltd.',
      ownerAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCund9hJwy5iaWLy-Hn6_dHTcPrepUlEfVZI2Fp6IIF1oj4Bh97rhmlgO35VfiGoyH9G0uB8tZ_mno3eny2sF4ALJ7QnFVashxl4wHVeaAVSmGcQesEcC1N7KlpbIcr-mLHCjqGv-tZmR74G5ewP6x12FIciFx7h25gQV0NEXXSdcYYDDg8KSh6bxMw9bBj6d75CFEBbVSSNRNUh8dH8ccwhglY5dIVYfRNE_u5EkGRLTEWfORP4BLI',
      location,
      distance: '15 km away',
      distanceKm: 15,
      dailyRate: Number(dailyRate),
      rating: 5.0,
      reviewsCount: 1,
      available: true,
      statusText: 'Available',
      image: imageUrlToUse,
      photosCount: 4,
      specs: {
        weight,
        power,
        digDepth,
        engineHours: '350 hrs',
        attachments: 'Standard Heavy Duty Attachments'
      },
      description: `Heavy duty ${category} listed in fleet. Fully inspected and dealer serviced.`
    };

    const created = await addEquipmentDoc(newMachineData);
    setEquipmentList(prev => [created, ...prev]);
    setSubmitting(false);
    setShowAddModal(false);
    setTitle('');
  };

  return (
    <main className="flex-1 px-4 md:px-margin-desktop py-6 pb-32 max-w-6xl mx-auto w-full">
      {/* Page Header */}
      <header className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-display-lg text-2xl md:text-3xl font-extrabold text-on-surface">Fleet Manager Studio</h1>
          <p className="font-body-md text-on-surface-variant text-sm mt-1">
            Real-time Firestore CRUD management for your heavy equipment fleet.
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
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Occupied On Site</span>
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
          <span className="font-label-caps text-xs text-on-surface-variant uppercase font-bold">Monthly Yield</span>
          <span className="font-display-lg text-xl md:text-2xl font-extrabold text-on-surface mt-2">₹3,45,000</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-4 border-b border-outline-variant mb-6 overflow-x-auto no-scrollbar">
        {['All', 'Available', 'Rented'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`font-label-caps text-xs pb-2 px-1 font-bold whitespace-nowrap border-b-2 transition-colors ${
              activeTab === tab ? 'text-primary border-primary' : 'text-on-surface-variant border-transparent hover:text-on-surface'
            }`}
          >
            {tab} Assets ({
              tab === 'All' ? equipmentList.length :
              tab === 'Available' ? equipmentList.filter(e => e.available).length :
              equipmentList.filter(e => !e.available).length
            })
          </button>
        ))}
      </div>

      {/* Assets List */}
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
                    {item.available ? 'Listed Yard' : 'Rented'}
                  </span>
                </div>
                <span className="font-body-sm text-xs text-on-surface-variant mt-1">
                  Category: {item.category} • Weight: {item.specs?.weight || '22T'}
                </span>
                <span className="font-body-sm text-xs text-on-surface-variant">
                  Location: {item.location}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 border-outline-variant/30 pt-3 md:pt-0">
              <div className="text-right">
                <div className="font-price-display font-bold text-lg text-on-surface">₹{item.dailyRate}</div>
                <div className="font-label-caps text-xs text-on-surface-variant">/ day</div>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => toggleAvailability(item)}
                  className={`px-3 py-2 rounded font-label-caps text-xs font-bold transition-colors ${
                    item.available 
                      ? 'bg-surface-container border border-outline-variant text-on-surface hover:bg-surface-container-high' 
                      : 'bg-primary text-on-primary hover:bg-surface-tint'
                  }`}
                >
                  {item.available ? 'Mark Occupied' : 'Mark Available'}
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  className="p-2 text-error hover:bg-error-container/20 rounded transition-colors"
                  title="Delete machine"
                >
                  <span className="material-symbols-outlined text-lg">delete</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Machinery Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl max-w-lg w-full p-6 shadow-2xl animate-fade-in max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 border-b border-outline-variant pb-3">
              <h3 className="font-bold text-lg text-on-surface">Add Machine to Firestore Fleet</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-on-surface">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleAddAsset} className="flex flex-col gap-4">
              <div>
                <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Equipment Name &amp; Model</label>
                <input 
                  type="text" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Komatsu PC200 Hydraulic Excavator"
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Category</label>
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                  >
                    <option value="Excavators">Excavators</option>
                    <option value="JCB">JCB</option>
                    <option value="Cranes">Cranes</option>
                    <option value="Loaders">Loaders</option>
                    <option value="Generators">Generators</option>
                  </select>
                </div>
                <div>
                  <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Daily Rate (₹)</label>
                  <input 
                    type="number" 
                    value={dailyRate}
                    onChange={(e) => setDailyRate(e.target.value)}
                    className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Location Yard</label>
                <input 
                  type="text" 
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none"
                />
              </div>

              {/* Image Template Picker */}
              <div>
                <label className="font-label-caps text-xs text-on-surface font-bold uppercase block mb-1">Machine Photo Template</label>
                <select 
                  value={selectedImageUrl}
                  onChange={(e) => {
                    setSelectedImageUrl(e.target.value);
                    setCustomImageUrl('');
                  }}
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-sm outline-none mb-2"
                >
                  {TEMPLATE_IMAGES.map((img, idx) => (
                    <option key={idx} value={img.url}>{img.label}</option>
                  ))}
                </select>
                <input 
                  type="text" 
                  value={customImageUrl}
                  onChange={(e) => setCustomImageUrl(e.target.value)}
                  placeholder="Or paste custom image URL (https://...)"
                  className="w-full bg-surface-container-low border border-outline-variant rounded p-2.5 text-xs outline-none"
                />
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
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-primary-container text-on-primary-container rounded text-sm font-bold hover:bg-inverse-primary flex items-center justify-center gap-2"
                >
                  {submitting ? <div className="loader" /> : 'Save to Fleet'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
