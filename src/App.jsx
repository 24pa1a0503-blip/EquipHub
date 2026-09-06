import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navigation from './components/Navigation';
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import OwnerDashboardScreen from './screens/OwnerDashboardScreen';
import OwnerBookingRequestsScreen from './screens/OwnerBookingRequestsScreen';
import SearchScreen from './screens/SearchScreen';
import DetailsScreen from './screens/DetailsScreen';
import BookingConfigScreen from './screens/BookingConfigScreen';
import PaymentScreen from './screens/PaymentScreen';
import MyBookingsScreen from './screens/MyBookingsScreen';
import TrackingScreen from './screens/TrackingScreen';
import FleetManagerScreen from './screens/FleetManagerScreen';
import AnalyticsScreen from './screens/AnalyticsScreen';

import { subscribeToEquipment, subscribeToBookings } from './firebase/services';
import { INITIAL_EQUIPMENT, INITIAL_BOOKINGS } from './data/equipmentData';

function MainApp() {
  const { userProfile, userRole } = useAuth();

  const [activeScreen, setActiveScreen] = useState(() => {
    const saved = localStorage.getItem('equiphub_active_screen');
    const savedUser = localStorage.getItem('equiphub_user');
    if (saved && saved !== 'splash' && saved !== 'onboarding') {
      return saved;
    }
    return savedUser ? 'dashboard' : 'splash';
  });

  const [equipmentList, setEquipmentList] = useState(INITIAL_EQUIPMENT);
  const [bookingsList, setBookingsList] = useState(INITIAL_BOOKINGS);
  const [selectedEquipment, setSelectedEquipment] = useState(INITIAL_EQUIPMENT[0]);
  const [bookingDraft, setBookingDraft] = useState(null);

  // Subscribe to real-time Firestore equipment catalog
  useEffect(() => {
    const unsub = subscribeToEquipment((items) => {
      if (items && items.length > 0) {
        setEquipmentList(items);
      }
    });
    return () => unsub();
  }, []);

  // Subscribe to real-time Firestore bookings
  useEffect(() => {
    const unsub = subscribeToBookings(userRole, userProfile?.uid, (items) => {
      if (items && items.length > 0) {
        setBookingsList(items);
      }
    });
    return () => unsub();
  }, [userRole, userProfile]);

  const navigateTo = (screenName) => {
    setActiveScreen(screenName);
    localStorage.setItem('equiphub_active_screen', screenName);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background text-on-background flex flex-col md:flex-row font-body-md w-full selection:bg-primary-container selection:text-on-primary-container">
      {/* Navigation Layout */}
      <Navigation 
        activeScreen={activeScreen} 
        navigateTo={navigateTo} 
        bookingsList={bookingsList}
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
          <LoginScreen navigateTo={navigateTo} />
        )}

        {/* Dashboard Router based on Role */}
        {activeScreen === 'dashboard' && (
          userRole === 'owner' ? (
            <OwnerDashboardScreen 
              navigateTo={navigateTo}
              equipmentList={equipmentList}
              bookingsList={bookingsList}
            />
          ) : (
            <DashboardScreen 
              navigateTo={navigateTo} 
              equipmentList={equipmentList} 
              bookingsList={bookingsList}
              setSelectedEquipment={setSelectedEquipment}
            />
          )
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

        {activeScreen === 'requests' && (
          <OwnerBookingRequestsScreen 
            navigateTo={navigateTo}
            bookingsList={bookingsList}
            setBookingsList={setBookingsList}
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

export default function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}
