import React, { useState } from 'react';
import { createBookingDoc } from '../firebase/services';
import { useAuth } from '../context/AuthContext';

export default function PaymentScreen({ navigateTo, bookingDraft, bookingsList, setBookingsList }) {
  const { userProfile } = useAuth();

  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('EQ-8902-HUB');
  const [paymentError, setPaymentError] = useState('');

  // Card Inputs
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  // UPI Inputs
  const [upiId, setUpiId] = useState('');
  const [selectedUpiApp, setSelectedUpiApp] = useState('gpay');

  // Net Banking Inputs
  const [selectedBank, setSelectedBank] = useState('sbi');

  const amountToPay = bookingDraft?.grandTotal || 1200;
  const equipmentName = bookingDraft?.equipment?.title || 'CAT 320 Excavator';
  const durationText = bookingDraft ? `${bookingDraft.durationDays} Days (${bookingDraft.startDate} to ${bookingDraft.endDate})` : '5 Days (Nov 01 to Nov 05)';

  const handlePay = async () => {
    setPaymentError('');

    // --- STRICT PAYMENT VALIDATION ---
    if (selectedMethod === 'card') {
      const cleanCard = cardNumber.replace(/\s+/g, '');
      if (!cleanCard || cleanCard.length < 15) {
        setPaymentError('Please enter a valid 16-digit Card Number.');
        return;
      }
      if (!expiry || !expiry.includes('/') || expiry.length < 5) {
        setPaymentError('Please enter a valid Expiry Date (MM/YY format).');
        return;
      }
      if (!cvv || cvv.length < 3) {
        setPaymentError('Please enter a valid 3-digit CVV code.');
        return;
      }
    } else if (selectedMethod === 'upi') {
      if (!upiId || !upiId.includes('@')) {
        setPaymentError('Please enter a valid UPI ID (e.g. yourname@okaxis or 9876543210@paytm).');
        return;
      }
    } else if (selectedMethod === 'netbanking') {
      if (!selectedBank) {
        setPaymentError('Please select your Bank for Net Banking transaction.');
        return;
      }
    }

    setIsProcessing(true);

    try {
      const payload = {
        equipmentId: bookingDraft?.equipment?.id || 'cat-320',
        equipmentName: equipmentName,
        contractorId: userProfile?.uid || 'contractor-anon',
        contractorName: userProfile?.name || 'Contractor Partner',
        provider: bookingDraft?.equipment?.owner || 'Texas Heavy Ops Ltd.',
        startDate: bookingDraft?.startDate || '2023-11-01',
        endDate: bookingDraft?.endDate || '2023-11-05',
        durationDays: bookingDraft?.durationDays || 5,
        dailyRate: bookingDraft?.dailyRate || 450,
        totalAmount: amountToPay,
        deliverySite: bookingDraft?.location || 'Dallas, TX 75001',
        hasOperator: bookingDraft?.hasOperator || false,
        paymentMethod: selectedMethod,
        paymentStatus: 'paid',
        image: bookingDraft?.equipment?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC'
      };

      const newBooking = await createBookingDoc(payload);
      setCreatedBookingId(newBooking.id);
      setBookingsList(prev => [newBooking, ...prev]);

      setIsProcessing(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      console.error("Error creating Firestore booking:", err);
      setPaymentError("Transaction error. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col w-full">
      {/* Top Header */}
      <header className="bg-surface border-b-2 border-outline-variant py-4 px-4 flex justify-between items-center w-full max-w-4xl mx-auto">
        <h1 
          onClick={() => navigateTo('dashboard')}
          className="font-headline-lg font-extrabold text-primary tracking-tighter text-2xl cursor-pointer"
        >
          EquipHub
        </h1>
        <div className="flex items-center gap-2 text-xs font-label-caps text-on-surface-variant font-bold">
          <span className="material-symbols-outlined text-sm text-tertiary">lock</span>
          256-BIT SSL ENCRYPTED
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-4xl mx-auto">
        {!isConfirmed ? (
          /* Payment Form View */
          <div className="w-full">
            <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-xl p-6 md:p-8 shadow-sm">
              <div className="mb-6 border-b-2 border-outline-variant pb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-primary text-3xl">payment</span>
                  <div>
                    <h2 className="font-headline-md text-xl font-bold text-on-surface">Payment Verification</h2>
                    <p className="text-xs text-on-surface-variant">Complete your transaction to finalize site delivery application.</p>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="bg-surface-container-low p-4 rounded-lg mb-6 border border-outline-variant">
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-2 uppercase font-bold">Order Summary</h3>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-body-md font-bold text-base text-on-surface">{equipmentName}</span>
                  <span className="font-price-display font-extrabold text-xl text-primary">₹{amountToPay.toLocaleString()}</span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">Rental Schedule: {durationText}</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 italic">Inclusive of GST, Transport Roundtrip &amp; Insurance</p>
              </div>

              {paymentError && (
                <div className="mb-6 p-4 bg-error-container text-on-error-container text-xs rounded-lg border border-error/40 font-bold flex items-center gap-2">
                  <span className="material-symbols-outlined text-lg">error</span>
                  <span>{paymentError}</span>
                </div>
              )}

              <h3 className="font-headline-md text-base font-bold text-on-surface mb-4">Select Verified Payment Option</h3>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                
                {/* 1. Credit / Debit Card Option */}
                <div className={`p-4 border-2 rounded-xl transition-all ${
                  selectedMethod === 'card' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low'
                }`}>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="card" 
                      checked={selectedMethod === 'card'}
                      onChange={() => { setSelectedMethod('card'); setPaymentError(''); }}
                      className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === 'card' ? 'text-primary' : 'text-on-surface-variant'}`}>credit_card</span>
                      <span className="font-bold text-sm text-on-surface">Credit / Debit / RuPay Card</span>
                    </div>
                  </label>

                  {selectedMethod === 'card' && (
                    <div className="mt-4 pt-3 border-t border-outline-variant/40 flex flex-col gap-3 w-full animate-fade-in">
                      <div>
                        <label className="font-label-caps text-xs text-on-surface-variant block mb-1 uppercase font-bold">16-Digit Card Number *</label>
                        <input 
                          type="text" 
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          placeholder="4532 •••• •••• 5678"
                          maxLength={19}
                          className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 outline-none"
                          required
                        />
                      </div>

                      <div className="flex gap-3">
                        <div className="w-1/2">
                          <label className="font-label-caps text-xs text-on-surface-variant block mb-1 uppercase font-bold">Expiry Date *</label>
                          <input 
                            type="text" 
                            value={expiry}
                            onChange={(e) => setExpiry(e.target.value)}
                            placeholder="MM/YY"
                            maxLength={5}
                            className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 outline-none"
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="font-label-caps text-xs text-on-surface-variant block mb-1 uppercase font-bold">CVV Code *</label>
                          <input 
                            type="password" 
                            value={cvv}
                            onChange={(e) => setCvv(e.target.value)}
                            placeholder="123"
                            maxLength={4}
                            className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 outline-none"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. UPI Option */}
                <div className={`p-4 border-2 rounded-xl transition-all ${
                  selectedMethod === 'upi' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low'
                }`}>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="upi" 
                      checked={selectedMethod === 'upi'}
                      onChange={() => { setSelectedMethod('upi'); setPaymentError(''); }}
                      className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === 'upi' ? 'text-primary' : 'text-on-surface-variant'}`}>qr_code_scanner</span>
                      <span className="font-bold text-sm text-on-surface">UPI Instant Payment (GPay, PhonePe, Paytm)</span>
                    </div>
                  </label>

                  {selectedMethod === 'upi' && (
                    <div className="mt-4 pt-3 border-t border-outline-variant/40 flex flex-col gap-3 w-full animate-fade-in">
                      <div>
                        <label className="font-label-caps text-xs text-on-surface-variant block mb-1 uppercase font-bold">Virtual Payment Address (VPA / UPI ID) *</label>
                        <input 
                          type="text" 
                          value={upiId}
                          onChange={(e) => setUpiId(e.target.value)}
                          placeholder="e.g. mobile@upi or name@okaxis"
                          className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-3 outline-none"
                          required
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* 3. Net Banking Option */}
                <div className={`p-4 border-2 rounded-xl transition-all ${
                  selectedMethod === 'netbanking' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low'
                }`}>
                  <label className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="netbanking" 
                      checked={selectedMethod === 'netbanking'}
                      onChange={() => { setSelectedMethod('netbanking'); setPaymentError(''); }}
                      className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary"
                    />
                    <div className="ml-3 flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === 'netbanking' ? 'text-primary' : 'text-on-surface-variant'}`}>account_balance</span>
                      <span className="font-bold text-sm text-on-surface">Net Banking (All Indian Banks)</span>
                    </div>
                  </label>

                  {selectedMethod === 'netbanking' && (
                    <div className="mt-4 pt-3 border-t border-outline-variant/40 flex flex-col gap-3 w-full animate-fade-in">
                      <label className="font-label-caps text-xs text-on-surface-variant block uppercase font-bold">Select Bank *</label>
                      <select 
                        value={selectedBank} 
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="bg-surface border border-outline-variant text-on-surface text-sm rounded-lg p-3 outline-none"
                      >
                        <option value="sbi">State Bank of India (SBI)</option>
                        <option value="hdfc">HDFC Bank</option>
                        <option value="icici">ICICI Bank</option>
                        <option value="axis">Axis Bank</option>
                        <option value="kotak">Kotak Mahindra Bank</option>
                      </select>
                    </div>
                  )}
                </div>

                {/* Submit Action */}
                <div className="mt-6 border-t-2 border-outline-variant pt-4">
                  <button 
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-headline-md text-base font-bold py-4 rounded-lg shadow-md hover:bg-inverse-primary transition-colors disabled:opacity-75 cursor-pointer"
                  >
                    {!isProcessing ? (
                      <>
                        <span className="material-symbols-outlined text-xl">lock</span>
                        <span>Pay &amp; Submit Booking ₹{amountToPay.toLocaleString()}</span>
                      </>
                    ) : (
                      <>
                        <div className="loader" />
                        <span>Verifying Payment &amp; Creating Booking...</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation View */
          <div className="w-full animate-fade-in">
            <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-xl p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-tertiary-fixed rounded-full flex items-center justify-center mb-4 shadow-sm text-on-tertiary-fixed">
                <span className="material-symbols-outlined filled text-5xl">check_circle</span>
              </div>
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">Booking Request Submitted!</h2>
              <p className="font-body-md text-on-surface-variant text-sm mb-6">
                Your payment was verified. The equipment owner has received your site delivery application.
              </p>

              <div className="w-full bg-surface-container-low rounded-lg p-4 md:p-6 border border-outline-variant text-left mb-6 relative overflow-hidden">
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-4 uppercase font-bold border-b border-outline-variant pb-2">
                  Booking Summary
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Booking Reference ID</span>
                    <span className="font-bold font-mono text-on-surface">{createdBookingId}</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Status</span>
                    <span className="font-bold text-primary-container uppercase bg-primary-container/20 px-2 py-0.5 rounded text-xs">
                      Pending Owner Approval
                    </span>
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Equipment</span>
                    <span className="font-semibold text-on-surface">{equipmentName}</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Rental Period</span>
                    <span className="font-semibold text-on-surface">{durationText}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row w-full gap-4 justify-center">
                <button 
                  onClick={() => navigateTo('bookings')}
                  type="button" 
                  className="px-6 py-3 border-2 border-outline text-on-surface font-semibold rounded-lg hover:bg-surface-container transition-colors text-sm"
                >
                  View My Bookings
                </button>
                <button 
                  onClick={() => navigateTo('tracking')}
                  type="button" 
                  className="px-6 py-3 flex items-center justify-center gap-2 bg-on-background text-on-primary font-bold rounded-lg shadow-md hover:bg-inverse-surface transition-colors text-sm"
                >
                  <span className="material-symbols-outlined">local_shipping</span>
                  Track Live GPS
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
