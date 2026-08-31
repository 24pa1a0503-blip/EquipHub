import React, { useState } from 'react';

export default function PaymentScreen({ navigateTo, bookingDraft, bookingsList, setBookingsList }) {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [createdBookingId, setCreatedBookingId] = useState('EQ-8902-CAT');

  // Payment Form Data
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const amountToPay = bookingDraft?.grandTotal || 1200;
  const equipmentName = bookingDraft?.equipment?.title || 'CAT 320 Excavator';
  const durationText = bookingDraft ? `${bookingDraft.durationDays} Days (${bookingDraft.startDate} - ${bookingDraft.endDate})` : '3 Days (Oct 12 - Oct 15)';

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const newBookingId = `EQ-${Math.floor(1000 + Math.random() * 9000)}-CAT`;
      setCreatedBookingId(newBookingId);

      const newBooking = {
        id: newBookingId,
        equipmentId: bookingDraft?.equipment?.id || 'cat-320',
        equipmentName: equipmentName,
        provider: bookingDraft?.equipment?.owner || 'Industrial Ops LLC',
        startDate: bookingDraft?.startDate || '2023-11-01',
        endDate: bookingDraft?.endDate || '2023-11-05',
        durationDays: bookingDraft?.durationDays || 5,
        dailyRate: bookingDraft?.dailyRate || 450,
        totalAmount: amountToPay,
        status: 'Confirmed',
        image: bookingDraft?.equipment?.image || 'https://lh3.googleusercontent.com/aida-public/AB6AXuAf7C104YlflkPCQlIUmAQYgrtcqZl0xjrVpgfTnI5ol3d-MOYS97VLVFndHfXhanIWl48TWPjJ7IHB3MaYWFHl2W6VSZ--bYsuAaj5X1Prf_d0Z5JIUb8z-Qm1ZyjCz0DVrvpvH_26B4TXDN83EcwbdoasLZPZjdTC9XWeAzax-Tg7GmtyWHgypDzUBN3aMyJEm5hqn6oWd2lQZAjkOAb1X7mJbzOq4a7mO9oPQn9iwSNKI13R6SzC',
        deliverySite: bookingDraft?.location || 'Dallas, TX 75001'
      };

      setBookingsList(prev => [newBooking, ...prev]);
      setIsProcessing(false);
      setIsConfirmed(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 1500);
  };

  return (
    <div className="bg-background text-on-background font-body-md min-h-screen flex flex-col w-full">
      {/* Transactional Top App Bar */}
      <header className="bg-surface border-b-2 border-outline-variant py-4 px-4 flex justify-center md:justify-start items-center w-full max-w-4xl mx-auto">
        <h1 
          onClick={() => navigateTo('dashboard')}
          className="font-headline-lg font-extrabold text-primary tracking-tighter text-2xl cursor-pointer"
        >
          EquipHub
        </h1>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4 md:p-8 w-full max-w-4xl mx-auto">
        {!isConfirmed ? (
          /* Payment View */
          <div className="w-full">
            <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-lg p-6 shadow-sm">
              <div className="mb-6 border-b-2 border-outline-variant pb-4 flex items-center gap-3">
                <span className="material-symbols-outlined text-primary text-3xl">lock</span>
                <h2 className="font-headline-md text-xl font-bold text-on-surface">Secure Checkout</h2>
              </div>

              {/* Order Summary */}
              <div className="bg-surface-container-low p-4 rounded-lg mb-6 border border-outline-variant">
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-2 uppercase font-bold">Order Summary</h3>
                <div className="flex justify-between items-center mb-1">
                  <span className="font-body-md font-semibold text-sm">{equipmentName}</span>
                  <span className="font-price-display font-bold text-lg">₹{amountToPay.toLocaleString()}</span>
                </div>
                <p className="font-body-sm text-xs text-on-surface-variant">Rental Duration: {durationText}</p>
                <p className="font-body-sm text-[11px] text-on-surface-variant mt-1 italic">Inclusive of GST</p>
              </div>

              <h3 className="font-headline-md text-base font-bold text-on-surface mb-4">Select Payment Method</h3>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-4">
                {/* Card Option */}
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === 'card' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low'
                }`}>
                  <div className="flex items-center h-5 mt-1">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="card" 
                      checked={selectedMethod === 'card'}
                      onChange={() => setSelectedMethod('card')}
                      className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary"
                    />
                  </div>
                  <div className="ml-3 w-full flex flex-col">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === 'card' ? 'text-primary' : 'text-on-surface-variant'}`}>credit_card</span>
                      <span className="font-body-md text-sm font-semibold text-on-surface">Credit / Debit / RuPay Card</span>
                    </div>

                    {selectedMethod === 'card' && (
                      <div className="mt-4 flex flex-col gap-3 w-full animate-fade-in">
                        <div>
                          <label className="font-label-caps text-[11px] text-on-surface-variant block mb-1 uppercase font-bold">Card Number</label>
                          <div className="relative">
                            <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                              <span className="material-symbols-outlined text-on-surface-variant text-sm">credit_card</span>
                            </span>
                            <input 
                              type="text" 
                              value={cardNumber}
                              onChange={(e) => setCardNumber(e.target.value)}
                              placeholder="4532 8900 1234 5678"
                              className="bg-surface border-2 border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full pl-10 p-2.5 outline-none"
                            />
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-1/2">
                            <label className="font-label-caps text-[11px] text-on-surface-variant block mb-1 uppercase font-bold">Expiry Date</label>
                            <input 
                              type="text" 
                              value={expiry}
                              onChange={(e) => setExpiry(e.target.value)}
                              placeholder="MM/YY"
                              className="bg-surface border-2 border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 outline-none"
                            />
                          </div>
                          <div className="w-1/2">
                            <label className="font-label-caps text-[11px] text-on-surface-variant block mb-1 uppercase font-bold">CVV</label>
                            <input 
                              type="password" 
                              value={cvv}
                              onChange={(e) => setCvv(e.target.value)}
                              placeholder="123"
                              className="bg-surface border-2 border-outline-variant text-on-surface text-sm rounded-lg focus:ring-primary focus:border-primary block w-full p-2.5 outline-none"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </label>

                {/* UPI Option */}
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === 'upi' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low'
                }`}>
                  <div className="flex items-center h-5 mt-1">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="upi" 
                      checked={selectedMethod === 'upi'}
                      onChange={() => setSelectedMethod('upi')}
                      className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary"
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === 'upi' ? 'text-primary' : 'text-on-surface-variant'}`}>qr_code_scanner</span>
                      <span className="font-body-md text-sm font-semibold text-on-surface">UPI / Instant Pay</span>
                    </div>
                    <p className="text-body-sm text-xs text-on-surface-variant mt-0.5">GPay, PhonePe, Paytm &amp; QR Code</p>
                  </div>
                </label>

                {/* Net Banking */}
                <label className={`flex items-start p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                  selectedMethod === 'netbanking' ? 'border-primary bg-surface-container-low' : 'border-outline-variant hover:bg-surface-container-low'
                }`}>
                  <div className="flex items-center h-5 mt-1">
                    <input 
                      type="radio" 
                      name="payment_method" 
                      value="netbanking" 
                      checked={selectedMethod === 'netbanking'}
                      onChange={() => setSelectedMethod('netbanking')}
                      className="w-4 h-4 text-primary bg-surface border-outline-variant focus:ring-primary"
                    />
                  </div>
                  <div className="ml-3 w-full">
                    <div className="flex items-center gap-2">
                      <span className={`material-symbols-outlined ${selectedMethod === 'netbanking' ? 'text-primary' : 'text-on-surface-variant'}`}>account_balance</span>
                      <span className="font-body-md text-sm font-semibold text-on-surface">Net Banking (All Indian Banks)</span>
                    </div>
                  </div>
                </label>

                {/* Submit Action */}
                <div className="mt-6 border-t-2 border-outline-variant pt-4">
                  <button 
                    type="button"
                    onClick={handlePay}
                    disabled={isProcessing}
                    className="w-full flex items-center justify-center gap-2 bg-primary-container text-on-primary-container font-headline-md text-base font-bold py-4 rounded-lg shadow-md hover:bg-inverse-primary transition-colors disabled:opacity-75"
                  >
                    {!isProcessing ? (
                      <>
                        <span className="material-symbols-outlined text-xl">lock</span>
                        <span>Pay Securely ₹{amountToPay.toLocaleString()}</span>
                      </>
                    ) : (
                      <>
                        <div className="loader" />
                        <span>Processing Payment...</span>
                      </>
                    )}
                  </button>
                  <p className="font-body-sm text-xs text-center text-on-surface-variant mt-2 flex items-center justify-center gap-1">
                    <span className="material-symbols-outlined text-sm">verified_user</span> 256-bit SSL encryption
                  </p>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Confirmation View */
          <div className="w-full animate-fade-in">
            <div className="bg-surface-container-lowest border-2 border-outline-variant rounded-lg p-6 md:p-8 shadow-sm flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-tertiary-fixed rounded-full flex items-center justify-center mb-4 shadow-sm text-on-tertiary-fixed">
                <span className="material-symbols-outlined filled text-5xl" data-weight="fill">check_circle</span>
              </div>
              <h2 className="font-headline-lg text-2xl font-bold text-on-surface mb-2">Booking Confirmed!</h2>
              <p className="font-body-md text-on-surface-variant text-sm mb-6">
                Your payment was successful and your heavy machinery is secured.
              </p>

              <div className="w-full bg-surface-container-low rounded-lg p-4 md:p-6 border border-outline-variant text-left mb-6 relative overflow-hidden">
                <h3 className="font-label-caps text-xs text-on-surface-variant mb-4 uppercase font-bold border-b border-outline-variant pb-2">
                  Booking Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Booking ID</span>
                    <span className="font-bold font-mono text-on-surface">{createdBookingId}</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Equipment</span>
                    <span className="font-semibold text-on-surface">{equipmentName}</span>
                  </div>
                  <div>
                    <span className="font-label-caps text-xs text-on-surface-variant block mb-1">Provider / Owner</span>
                    <span className="font-semibold text-on-surface">Industrial Ops LLC</span>
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
                  View Receipt &amp; Bookings
                </button>
                <button 
                  onClick={() => navigateTo('tracking')}
                  type="button" 
                  className="px-6 py-3 flex items-center justify-center gap-2 bg-on-background text-on-primary font-bold rounded-lg shadow-md hover:bg-inverse-surface transition-colors text-sm"
                >
                  <span className="material-symbols-outlined">local_shipping</span>
                  Track Delivery Live
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
