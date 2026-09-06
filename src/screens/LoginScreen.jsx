import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigateTo }) {
  const { login, signup, googleSignIn, switchRole } = useAuth();
  
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [selectedRole, setSelectedRole] = useState('contractor'); // 'contractor' | 'owner'
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    if (!email || !password) {
      setErrorMsg('Please enter email address and password.');
      return;
    }

    if (authMode === 'signup' && !name) {
      setErrorMsg('Please enter your full name or company name.');
      return;
    }

    setLoading(true);

    try {
      if (authMode === 'signup') {
        await signup(email, password, name, selectedRole, phone);
      } else {
        await login(email, password, selectedRole);
      }
      switchRole(selectedRole);
      navigateTo('dashboard');
    } catch (err) {
      console.error("Authentication error:", err);
      setErrorMsg(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setErrorMsg('');
    setLoading(true);
    try {
      await googleSignIn(selectedRole);
      switchRole(selectedRole);
      navigateTo('dashboard');
    } catch (err) {
      console.error("Google Auth error:", err);
      setErrorMsg(err.message || 'Google sign-in failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col items-center justify-center p-4 md:p-12 w-full">
      <main className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-8 md:items-stretch">
        {/* Authentication Form (Left) */}
        <section className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-xl p-6 md:p-8 shadow-sm flex flex-col justify-center">
          <div className="mb-6 text-center md:text-left">
            <h1 
              onClick={() => navigateTo('dashboard')}
              className="font-headline-lg-mobile md:font-headline-lg font-extrabold tracking-tighter mb-1 text-3xl md:text-4xl text-primary cursor-pointer"
            >
              EquipHub
            </h1>
            <p className="font-body-md text-on-surface-variant text-sm">
              {authMode === 'signin' ? 'Access your heavy equipment rental portal.' : 'Create your verified EquipHub account.'}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className="flex border-b border-outline-variant mb-6">
            <button
              type="button"
              onClick={() => { setAuthMode('signin'); setErrorMsg(''); }}
              className={`flex-1 py-2.5 font-label-caps text-xs font-bold text-center border-b-2 transition-colors ${
                authMode === 'signin' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Sign In
            </button>
            <button
              type="button"
              onClick={() => { setAuthMode('signup'); setErrorMsg(''); }}
              className={`flex-1 py-2.5 font-label-caps text-xs font-bold text-center border-b-2 transition-colors ${
                authMode === 'signup' ? 'border-primary text-primary' : 'border-transparent text-on-surface-variant hover:text-on-surface'
              }`}
            >
              Create Account
            </button>
          </div>

          {errorMsg && (
            <div className="mb-4 p-3 bg-error-container text-on-error-container text-xs rounded border border-error/30 font-medium">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {authMode === 'signup' && (
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs font-bold uppercase text-on-surface">Full Name / Company Name</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Apex Heavy Operations Ltd."
                  className="recessed-field border-2 border-transparent focus:border-secondary rounded px-3.5 py-3 text-sm text-on-surface w-full outline-none"
                  required
                />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-xs font-bold uppercase text-on-surface">Email Address</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="partner@equiphub.com"
                className="recessed-field border-2 border-transparent focus:border-secondary rounded px-3.5 py-3 text-sm text-on-surface w-full outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="font-label-caps text-xs font-bold uppercase text-on-surface">Password</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="recessed-field border-2 border-transparent focus:border-secondary rounded px-3.5 py-3 text-sm text-on-surface w-full outline-none"
                required
              />
            </div>

            {authMode === 'signup' && (
              <div className="flex flex-col gap-1">
                <label className="font-label-caps text-xs font-bold uppercase text-on-surface">Mobile Contact Number</label>
                <input 
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 9876543210"
                  className="recessed-field border-2 border-transparent focus:border-secondary rounded px-3.5 py-3 text-sm text-on-surface w-full outline-none"
                />
              </div>
            )}

            {/* Profile Role Selector */}
            <div className="flex flex-col gap-1 mt-1">
              <label className="font-label-caps text-xs font-bold uppercase text-on-surface">Account Profile Profile</label>
              <div className="grid grid-cols-2 gap-2 mt-1">
                <button
                  type="button"
                  onClick={() => setSelectedRole('contractor')}
                  className={`p-2.5 rounded border text-xs font-bold font-label-caps text-center transition-all ${
                    selectedRole === 'contractor' 
                      ? 'bg-primary-container text-on-primary-container border-primary shadow-sm' 
                      : 'bg-surface border-outline-variant text-on-surface-variant'
                  }`}
                >
                  Contractor (Renter)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedRole('owner')}
                  className={`p-2.5 rounded border text-xs font-bold font-label-caps text-center transition-all ${
                    selectedRole === 'owner' 
                      ? 'bg-primary-container text-on-primary-container border-primary shadow-sm' 
                      : 'bg-surface border-outline-variant text-on-surface-variant'
                  }`}
                >
                  Equipment Owner
                </button>
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="industrial-button rounded-lg py-3 px-6 font-bold text-on-primary-fixed text-center w-full shadow-sm hover:shadow-md transition-all mt-2 flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <div className="loader" />
              ) : (
                authMode === 'signin' ? 'Sign In' : 'Create Account'
              )}
            </button>
          </form>

          <div className="my-4 flex items-center gap-2">
            <div className="h-px bg-outline-variant flex-1" />
            <span className="font-label-caps text-xs text-on-surface-variant uppercase">OR</span>
            <div className="h-px bg-outline-variant flex-1" />
          </div>

          <button 
            type="button"
            onClick={handleGoogleAuth}
            disabled={loading}
            className="bg-surface border-2 border-outline-variant rounded-lg py-3 px-4 font-semibold text-on-surface flex items-center justify-center gap-2 hover:bg-surface-container-low transition-colors w-full text-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-on-surface">login</span>
            Continue with Google
          </button>
        </section>

        {/* Profile Info Cards (Right) */}
        <section className="flex-1 flex flex-col gap-4">
          <div className="text-center md:text-left">
            <h2 className="font-headline-md text-xl font-bold text-on-surface mb-1">
              Operational Profiles
            </h2>
            <p className="font-body-sm text-on-surface-variant text-xs">
              Select your role during sign-up to unlock your tailored workspace:
            </p>
          </div>

          <div className="flex flex-col gap-4 h-full justify-center">
            {/* Contractor Card */}
            <div 
              onClick={() => setSelectedRole('contractor')}
              className={`industrial-card rounded-xl p-5 border-2 transition-all text-left flex flex-col gap-2 group cursor-pointer shadow-md ${
                selectedRole === 'contractor' ? 'border-primary-container ring-2 ring-primary-container/40' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-surface-tint/20 p-2.5 rounded-full text-primary-container">
                  <span className="material-symbols-outlined text-2xl">construction</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Contractor Profile</h3>
                  <span className="text-[11px] text-primary-container font-label-caps font-bold uppercase">RENT &amp; MANAGE MACHINERY</span>
                </div>
              </div>
              <p className="text-xs text-secondary-fixed-dim leading-relaxed">
                Find available equipment near site, compare daily rates in ₹, add certified operators, checkout securely, and track GPS delivery live.
              </p>
            </div>

            {/* Owner Card */}
            <div 
              onClick={() => setSelectedRole('owner')}
              className={`industrial-card rounded-xl p-5 border-2 transition-all text-left flex flex-col gap-2 group cursor-pointer shadow-md ${
                selectedRole === 'owner' ? 'border-primary-container ring-2 ring-primary-container/40' : 'border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="bg-surface-tint/20 p-2.5 rounded-full text-primary-container">
                  <span className="material-symbols-outlined text-2xl">precision_manufacturing</span>
                </div>
                <div>
                  <h3 className="font-bold text-base text-white">Equipment Owner Profile</h3>
                  <span className="text-[11px] text-primary-container font-label-caps font-bold uppercase">FLEET &amp; REVENUE STUDIO</span>
                </div>
              </div>
              <p className="text-xs text-secondary-fixed-dim leading-relaxed">
                List machinery assets in Firestore, review contractor booking applications, approve or dispatch machines, and view revenue analytics.
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
