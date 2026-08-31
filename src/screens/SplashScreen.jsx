import React, { useEffect } from 'react';

export default function SplashScreen({ navigateTo }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      navigateTo('onboarding');
    }, 3000);
    return () => clearTimeout(timer);
  }, [navigateTo]);

  return (
    <div className="relative z-10 flex flex-col items-center justify-center px-margin-mobile md:px-margin-desktop w-full max-w-7xl mx-auto min-h-screen bg-surface text-on-surface overflow-hidden">
      {/* Decorative Structural Grid (Background) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-10">
        <div 
          className="w-full h-full" 
          style={{
            backgroundImage: "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }}
        />
      </div>
      <div className="absolute inset-0 z-0 pointer-events-none bg-gradient-to-b from-transparent to-surface-variant/30 mix-blend-multiply" />

      {/* Main Content */}
      <div 
        onClick={() => navigateTo('onboarding')}
        className="relative z-10 flex flex-col items-center justify-center cursor-pointer select-none"
      >
        {/* Logo Section */}
        <div className="flex flex-col items-center animate-fade-in mb-stack-lg">
          <div className="bg-primary-container text-on-primary-container rounded-xl p- stack-sm md:p-stack-md flex items-center justify-center p-4 md:p-6 mb-stack-md shadow-lg border border-outline-variant/30 transform transition-transform hover:scale-105">
            <span className="material-symbols-outlined text-[64px] md:text-[96px]" data-weight="fill">
              construction
            </span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface tracking-tight text-center md:text-[64px] md:leading-[72px]">
            EquipHub
          </h1>
        </div>

        {/* Tagline Section */}
        <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
          <p className="font-headline-md text-headline-md text-on-surface-variant md:text-[32px] md:leading-[40px] text-center font-bold uppercase tracking-widest opacity-90 border-t-2 border-outline/20 pt-stack-sm mt-stack-sm px-stack-lg">
            Rent. Build. Grow.
          </p>
        </div>

        {/* Loading Indicator */}
        <div className="mt-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="flex space-x-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-3 h-3 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
