import React, { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';
import BookingConfigScreen from './screens/BookingConfigScreen';
import PaymentScreen from './screens/PaymentScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import TrackingScreen from './screens/TrackingScreen';
import FleetManagerScreen from './screens/FleetManagerScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';
import { INITIAL_EQUIPMENT, INITIAL_BOOKINGS } from './data/equipmentData';

export default function App() {
  const [activeScreen, setActiveScreen] = useState('splash');
  const [equipmentList, setEquipmentList] = useState(INITIAL_EQUIPMENT);
  const [bookingsList, setBookingsList] = useState(() => {
    const saved = localStorage.getItem('equiphub_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });
  const [selectedEquipment, setSelectedEquipment] = useState(INITIAL_EQUIPMENT[0]);
  const [bookingDraft, setBookingDraft] = useState(null);
  const [userRole, setUserRole] = useState('contractor');

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('equiphub_bookings', JSON.stringify(bookingsList));
  }, [bookingsList]);

  const navigateTo = (screenName) => {
    setActiveScreen(screenName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col md:flex-row font-body-md w-full selection:bg-primary-container selection:text-on-primary-container">
      {/* Navigation Layout (Drawer on desktop, bottom bar on mobile) */}
      <Navigation 
        activeScreen={activeScreen} 
        navigateTo={navigateTo} 
        userRole={userRole}
        setUserRole={setUserRole}
      />

      {/* Screen Router */}
      <div className="flex-1 w-full min-h-screen flex flex-col">
        {activeScreen === 'splash' && (
          <SplashScreen navigateTo={navigateTo} />
        )}

        {activeScreen === 'onboarding' && (
          <OnboardingScreen navigateTo={navigateTo} />
        )}

        {activeScreen === 'login' && (
          <LoginScreen navigateTo={navigateTo} setUserRole={setUserRole} />
        )}

        {activeScreen === 'dashboard' && (
          <DashboardScreen 
            navigateTo={navigateTo} 
            equipmentList={equipmentList} 
            bookingsList={bookingsList}
            setSelectedEquipment={setSelectedEquipment}
          />
        )}

        {activeScreen === 'search' && (
          <SearchScreen 
            navigateTo={navigateTo} 
            equipmentList={equipmentList}
            setSelectedEquipment={setSelectedEquipment}
          />
        )}

        {activeScreen === 'details' && (
          <DetailsScreen 
            navigateTo={navigateTo} 
            equipment={selectedEquipment}
            setSelectedEquipment={setSelectedEquipment}
            setBookingDraft={setBookingDraft}
          />
        )}

        {activeScreen === 'config' && (
          <BookingConfigScreen 
            navigateTo={navigateTo}
            bookingDraft={bookingDraft}
            setBookingDraft={setBookingDraft}
          />
        )}

        {activeScreen === 'payment' && (
          <PaymentScreen 
            navigateTo={navigateTo}
            bookingDraft={bookingDraft}
            bookingsList={bookingsList}
            setBookingsList={setBookingsList}
          />
        )}

        {activeScreen === 'bookings' && (
          <MyBookingsScreen 
            navigateTo={navigateTo}
            bookingsList={bookingsList}
            setSelectedEquipment={setSelectedEquipment}
            equipmentList={equipmentList}
          />
        )}

        {activeScreen === 'fleet' && (
          <FleetManagerScreen 
            navigateTo={navigateTo}
            equipmentList={equipmentList}
            setEquipmentList={setEquipmentList}
          />
        )}

        {activeScreen === 'analytics' && (
          <AnalyticsScreen 
            navigateTo={navigateTo}
            bookingsList={bookingsList}
            equipmentList={equipmentList}
          />
        )}

        {activeScreen === 'tracking' && (
          <TrackingScreen 
            navigateTo={navigateTo}
            activeBooking={bookingsList[0]}
          />
        )}
      </div>
    </div>
  );
}
