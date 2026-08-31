import React, { useState } from 'react';

export default function LoginScreen({ navigateTo, setUserRole }) {
  const [loginInput, setLoginInput] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = (e) => {
    e.preventDefault();
    setUserRole('contractor');
    navigateTo('dashboard');
  };

  const handleSelectRole = (role) => {
    setUserRole(role);
    navigateTo('dashboard');
  };

  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col items-center justify-center p-margin-mobile md:p-margin-desktop p-4 md:p-12">
      <main className="w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-gutter md:items-stretch gap-8">
        {/* Login Section (Left/Top) */}
        <section className="flex-1 bg-surface-container-lowest border border-outline-variant rounded-lg p-stack-lg p-6 md:p-8 shadow-sm flex flex-col justify-center">
          <div className="mb-stack-lg text-center md:text-left mb-6">
            <h1 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg font-extrabold text-primary tracking-tighter mb-base text-3xl md:text-4xl text-primary">
              EquipHub
            </h1>
            <p className="font-body-md text-body-md text-on-surface-variant">
              Access your industrial dashboard.
            </p>
          </div>

          <form onSubmit={handleSignIn} className="flex flex-col gap-stack-md gap-4">
            <div className="flex flex-col gap-base gap-1">
              <label className="font-label-caps text-label-caps text-on-surface uppercase text-xs font-bold" htmlFor="login-input">
                Mobile Number or Email
              </label>
              <input 
                id="login-input"
                type="text" 
                value={loginInput}
                onChange={(e) => setLoginInput(e.target.value)}
                placeholder="Enter contact info (e.g. +91 9876543210)"
                className="recessed-field border-2 border-transparent focus:border-secondary rounded px-4 py-3 font-body-md text-body-md text-on-surface w-full transition-colors outline-none"
              />
            </div>

            <div className="flex flex-col gap-base gap-1">
              <label className="font-label-caps text-label-caps text-on-surface uppercase text-xs font-bold" htmlFor="password-input">
                Password
              </label>
              <input 
                id="password-input"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="recessed-field border-2 border-transparent focus:border-secondary rounded px-4 py-3 font-body-md text-body-md text-on-surface w-full transition-colors outline-none"
              />
            </div>

            <button 
              type="submit"
              className="mt-stack-sm industrial-button rounded-lg py-3 px-6 font-headline-md text-headline-md font-bold text-on-primary-fixed text-center w-full shadow-sm hover:shadow-md transition-all mt-2"
            >
              Sign In
            </button>
          </form>

          <div className="my-stack-md my-4 flex items-center gap-stack-sm gap-2">
            <div className="h-px bg-outline-variant flex-1" />
            <span className="font-label-caps text-label-caps text-on-surface-variant uppercase text-xs">OR</span>
            <div className="h-px bg-outline-variant flex-1" />
          </div>

          <button 
            type="button"
            onClick={() => handleSelectRole('contractor')}
            className="bg-surface border-2 border-outline-variant rounded-lg py-3 px-6 font-headline-md font-semibold text-on-surface flex items-center justify-center gap-stack-sm gap-2 hover:bg-surface-container-low transition-colors w-full"
          >
            <span className="material-symbols-outlined text-on-surface">login</span>
            Continue with Google
          </button>
        </section>

        {/* User Selection Section (Right/Bottom) */}
        <section className="flex-1 flex flex-col gap-stack-lg gap-6">
          <div className="text-center md:text-left mt-stack-md md:mt-0">
            <h2 className="font-headline-md text-headline-md text-on-surface mb-base text-2xl font-bold">
              How will you use EquipHub?
            </h2>
            <p className="font-body-sm text-body-sm text-on-surface-variant">
              Select your primary operational profile.
            </p>
          </div>

          <div className="flex flex-col gap-stack-md gap-4 h-full justify-center">
            {/* Contractor Card */}
            <button 
              type="button"
              onClick={() => handleSelectRole('contractor')}
              className="industrial-card rounded-lg p-stack-lg p-6 border border-transparent hover:border-primary-container transition-all text-left flex flex-col gap-stack-sm group h-full cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-stack-md gap-4 mb-stack-sm mb-2">
                <div className="bg-surface-tint/20 p-3 rounded-full text-primary-container">
                  <span className="material-symbols-outlined text-4xl">construction</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-xl">I need equipment</h3>
              </div>
              <p className="font-body-md text-body-md text-secondary-fixed-dim text-sm">
                Find, rent, and manage machinery for your job sites. Access the fleet.
              </p>
              <div className="mt-auto pt-stack-md pt-4 flex items-center text-primary-container font-label-caps text-label-caps uppercase text-xs font-bold group-hover:translate-x-2 transition-transform">
                Select Contractor Profile <span class="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </div>
            </button>

            {/* Owner Card */}
            <button 
              type="button"
              onClick={() => handleSelectRole('owner')}
              className="industrial-card rounded-lg p-stack-lg p-6 border border-transparent hover:border-primary-container transition-all text-left flex flex-col gap-stack-sm group h-full cursor-pointer shadow-md"
            >
              <div className="flex items-center gap-stack-md gap-4 mb-stack-sm mb-2">
                <div className="bg-surface-tint/20 p-3 rounded-full text-primary-container">
                  <span className="material-symbols-outlined text-4xl">precision_manufacturing</span>
                </div>
                <h3 className="font-headline-md text-headline-md font-bold text-xl">I own equipment</h3>
              </div>
              <p className="font-body-md text-body-md text-secondary-fixed-dim text-sm">
                List your assets, manage rentals, and track earnings across the network.
              </p>
              <div className="mt-auto pt-stack-md pt-4 flex items-center text-primary-container font-label-caps text-label-caps uppercase text-xs font-bold group-hover:translate-x-2 transition-transform">
                Select Owner Profile <span class="material-symbols-outlined ml-1 text-sm">arrow_forward</span>
              </div>
            </button>
          </div>
        </section>
      </main>
    </div>
  );
}
