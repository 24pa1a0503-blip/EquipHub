import React from 'react';
import { useAuth } from '../context/AuthContext';

export default function Navigation({ activeScreen, navigateTo, bookingsList = [] }) {
  const { userProfile, userRole, switchRole, logout } = useAuth();

  if (activeScreen === 'splash' || activeScreen === 'onboarding' || activeScreen === 'login') {
    return null;
  }

  const pendingCount = bookingsList.filter(b => b.status === 'pending').length;

  return (
    <>
      {/* Mobile Top Header */}
      <header className="md:hidden flex justify-between items-center w-full px-margin-mobile py-4 bg-surface sticky top-0 z-40 border-b border-outline-variant/30 shadow-sm">
        <div 
          onClick={() => navigateTo('dashboard')}
          className="flex items-center gap-2 cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary" data-weight="fill">location_on</span>
          <span className="font-headline-lg-mobile font-extrabold text-primary tracking-tighter">EquipHub</span>
        </div>
        <div className="flex items-center gap-2">
          {userRole && (
            <button
              onClick={() => switchRole(userRole === 'contractor' ? 'owner' : 'contractor')}
              className="text-[11px] font-label-caps px-2 py-1 bg-surface-container-high rounded text-on-surface-variant uppercase border border-outline-variant/40 font-bold"
              title="Click to switch mode"
            >
              Mode: {userRole.toUpperCase()}
            </button>
          )}
          <div 
            onClick={() => navigateTo('login')}
            className="w-8 h-8 rounded-full overflow-hidden border border-outline-variant cursor-pointer"
          >
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAwQpqUkCQpw8lr_H_KHyiQ_qK2sHA5oPSK-RpKvrMsOHR1ZltyS8d1tXtgI7smTCZykOkZpvScTgr3uA8fqgU6xgx9G7XkzBFTbPLhnbJM0b2mbSqNkyEoRVU2oX1GL1okR96rMxiVICMCfQ9tY5W-VOwGRZXhwIjTXkWrW1YFhTUinJhHkI1c59iKvlz0fLrtut0RIe-hBlU6-XB16KVcnLuNNx37mU1Rx69CUfHIUCLNFmKyNg8N" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </header>

      {/* Desktop Sidebar Navigation Drawer */}
      <aside className="hidden md:flex flex-col h-screen py-8 gap-stack-md bg-surface border-r border-outline-variant shadow-lg w-80 shrink-0 sticky top-0 left-0 z-40 overflow-y-auto">
        <div 
          onClick={() => navigateTo('dashboard')}
          className="px-6 mb-4 flex items-center gap-3 cursor-pointer"
        >
          <span className="material-symbols-outlined text-primary text-3xl" data-weight="fill">construction</span>
          <span className="font-headline-lg font-black text-primary tracking-tighter">EquipHub</span>
        </div>

        <div className="px-6 mb-6 flex items-center gap-4 border-b border-outline-variant/30 pb-6">
          <div className="w-12 h-12 rounded-full overflow-hidden border border-outline-variant shrink-0">
            <img 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuBd2UqBHLUwoi85k_Z7IceDtjs-b_adV2kXJdkY16N5e2bunZ9k8W_f8Af8KhUZM5LnsvV7apLWvQdgh1DML2cr2_S5nuLY7fSnWO2gb2oJ7D9flQy740tT6LOxcQAgMYopJxxZYkUcLGsGQyjicURa_xbW2oCEZ1OCqCvC0gfS1cTInp5m14y0ZhB6fMhB19yz-EUKAeYsEoyQD4tRGnxchtd5OV7XunKlxccvN5iJj9-WMn022keZ" 
              alt="Avatar" 
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-headline-md text-on-surface text-base font-bold">
              {userProfile?.name || 'Industrial Partner'}
            </div>
            <div className="font-body-sm text-on-surface-variant text-xs">
              {userRole === 'owner' ? 'Fleet Equipment Owner' : 'Contractor / PM'}
            </div>
            <button 
              onClick={() => switchRole(userRole === 'contractor' ? 'owner' : 'contractor')}
              className="font-label-caps text-primary text-[11px] mt-1 text-left hover:underline flex items-center gap-1 font-bold"
            >
              Switch Role ({userRole.toUpperCase()})
            </button>
          </div>
        </div>

        {/* Dynamic Role-Based Menu */}
        <nav className="flex-1 px-4 flex flex-col gap-1">
          {userRole === 'owner' ? (
            /* OWNER MENU */
            <>
              <button 
                onClick={() => navigateTo('dashboard')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'dashboard' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">dashboard</span>
                <span className="font-label-caps">Executive Dashboard</span>
              </button>

              <button 
                onClick={() => navigateTo('fleet')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'fleet' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">inventory</span>
                <span className="font-label-caps">Fleet Studio (CRUD)</span>
              </button>

              <button 
                onClick={() => navigateTo('requests')} 
                className={`flex items-center justify-between px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'requests' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <div className="flex items-center gap-4">
                  <span className="material-symbols-outlined">pending_actions</span>
                  <span className="font-label-caps">Booking Requests</span>
                </div>
                {pendingCount > 0 && (
                  <span className="bg-error text-white text-xs px-2 py-0.5 rounded-full font-bold">
                    {pendingCount}
                  </span>
                )}
              </button>

              <button 
                onClick={() => navigateTo('analytics')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'analytics' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">analytics</span>
                <span className="font-label-caps">Analytics &amp; Revenue</span>
              </button>
            </>
          ) : (
            /* CONTRACTOR MENU */
            <>
              <button 
                onClick={() => navigateTo('dashboard')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'dashboard' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">storefront</span>
                <span className="font-label-caps">Marketplace</span>
              </button>

              <button 
                onClick={() => navigateTo('search')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'search' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">tune</span>
                <span className="font-label-caps">Search &amp; Filters</span>
              </button>

              <button 
                onClick={() => navigateTo('bookings')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'bookings' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">event_available</span>
                <span className="font-label-caps">My Bookings</span>
              </button>

              <button 
                onClick={() => navigateTo('tracking')} 
                className={`flex items-center gap-4 px-4 py-3 rounded-r-full transition-all duration-200 text-left ${
                  activeScreen === 'tracking' 
                    ? 'bg-primary-container text-on-primary-container font-bold shadow-sm' 
                    : 'text-on-surface-variant hover:bg-surface-container-high'
                }`}
              >
                <span className="material-symbols-outlined">near_me</span>
                <span className="font-label-caps">Live Tracking</span>
              </button>
            </>
          )}

          <button 
            onClick={() => {
              logout();
              navigateTo('login');
            }} 
            className="flex items-center gap-4 px-4 py-3 text-on-surface-variant hover:bg-surface-container-high rounded-r-full transition-all duration-200 text-left mt-auto"
          >
            <span className="material-symbols-outlined">logout</span>
            <span className="font-label-caps">Sign Out</span>
          </button>
        </nav>
      </aside>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 bg-surface px-4 pb-safe border-t-2 border-outline-variant shadow-lg">
        {userRole === 'owner' ? (
          <>
            <button 
              onClick={() => navigateTo('dashboard')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'dashboard' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">dashboard</span>
              <span className="font-label-caps text-[11px] mt-0.5">Overview</span>
            </button>

            <button 
              onClick={() => navigateTo('fleet')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'fleet' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">inventory</span>
              <span className="font-label-caps text-[11px] mt-0.5">Fleet</span>
            </button>

            <button 
              onClick={() => navigateTo('requests')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg relative transition-transform ${
                activeScreen === 'requests' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">pending_actions</span>
              <span className="font-label-caps text-[11px] mt-0.5">Requests</span>
              {pendingCount > 0 && (
                <span className="absolute top-0 right-2 w-2 h-2 rounded-full bg-error" />
              )}
            </button>

            <button 
              onClick={() => navigateTo('analytics')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'analytics' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">analytics</span>
              <span className="font-label-caps text-[11px] mt-0.5">Earnings</span>
            </button>
          </>
        ) : (
          <>
            <button 
              onClick={() => navigateTo('dashboard')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'dashboard' || activeScreen === 'search' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">search</span>
              <span className="font-label-caps text-[11px] mt-0.5">Explore</span>
            </button>

            <button 
              onClick={() => navigateTo('search')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'search' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">construction</span>
              <span className="font-label-caps text-[11px] mt-0.5">Fleet</span>
            </button>

            <button 
              onClick={() => navigateTo('bookings')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'bookings' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">event_available</span>
              <span className="font-label-caps text-[11px] mt-0.5">Bookings</span>
            </button>

            <button 
              onClick={() => navigateTo('tracking')}
              className={`flex flex-col items-center justify-center px-3 py-1 rounded-lg transition-transform ${
                activeScreen === 'tracking' ? 'bg-primary-container text-on-primary-container font-bold scale-95' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined">near_me</span>
              <span className="font-label-caps text-[11px] mt-0.5">Track</span>
            </button>
          </>
        )}
      </nav>
    </>
  );
}
