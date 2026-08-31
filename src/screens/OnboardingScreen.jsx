import React, { useState } from 'react';

export default function OnboardingScreen({ navigateTo }) {
  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = 3;

  const nextSlide = () => {
    if (currentSlide < totalSlides) {
      setCurrentSlide(prev => prev + 1);
    } else {
      navigateTo('login');
    }
  };

  const completeOnboarding = () => {
    navigateTo('login');
  };

  return (
    <div className="bg-surface text-on-surface h-screen w-full flex flex-col font-body-md overflow-hidden antialiased">
      <main className="flex-grow relative w-full max-w-[1280px] mx-auto flex flex-col">
        {/* Slide 1 */}
        {currentSlide === 1 && (
          <div className="flex flex-col h-full items-center justify-center px-margin-mobile md:px-margin-desktop animate-fade-in">
            <div className="w-full max-w-lg flex flex-col items-center text-center">
              <div className="w-full aspect-square md:aspect-[4/3] bg-surface-container rounded-xl overflow-hidden mb-stack-lg shadow-sm relative flex items-center justify-center">
                <img 
                  className="object-cover w-full h-full" 
                  alt="Find equipment nearby"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmWRf6VDM9eRxbK44RcxDDGOgx5GHGAifHK8I9OfUJ359pFuYSjz3Rr0o_CkKkznqj2lWz9axga2wyqDW2qv4_-m_52qPUK-RPBThod7qlsWU9wwKrU3jgUPWq-TdftYbjGWfj8JV0BJdGLBgabob1NOxQ-tqU501gX-DlvrKKnAN6wWxithtAgXDgPpwJfAJd4fKNnxEM7evWNFaFhNByE3Hj24JwUo91WCB9jg9UvuMORKi_74Hm" 
                />
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-stack-sm">
                Find equipment nearby
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Instantly locate available heavy machinery in your area, reducing transport time and costs.
              </p>
            </div>
          </div>
        )}

        {/* Slide 2 */}
        {currentSlide === 2 && (
          <div className="flex flex-col h-full items-center justify-center px-margin-mobile md:px-margin-desktop animate-fade-in">
            <div className="w-full max-w-lg flex flex-col items-center text-center">
              <div className="w-full aspect-square md:aspect-[4/3] bg-surface-container rounded-xl overflow-hidden mb-stack-lg shadow-sm relative flex items-center justify-center p-stack-md">
                <div className="w-full flex flex-col gap-stack-sm p-4">
                  {/* Mock Comparison UI */}
                  <div className="bg-surface rounded-lg p-stack-md flex justify-between items-center shadow-sm border border-outline-variant p-3">
                    <div className="flex items-center gap-stack-md gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl" data-weight="fill">construction</span>
                      <div className="text-left">
                        <div className="font-headline-md text-on-surface text-sm font-bold">CAT 320</div>
                        <div className="font-body-sm text-on-surface-variant text-xs">Excavator</div>
                      </div>
                    </div>
                    <div className="font-price-display text-primary font-bold">
                      ₹450<span className="text-xs font-normal text-on-surface-variant">/day</span>
                    </div>
                  </div>

                  <div className="bg-surface rounded-lg p-stack-md flex justify-between items-center shadow-sm border border-outline-variant opacity-70 p-3">
                    <div className="flex items-center gap-stack-md gap-3">
                      <span className="material-symbols-outlined text-primary text-3xl" data-weight="fill">construction</span>
                      <div className="text-left">
                        <div className="font-headline-md text-on-surface text-sm font-bold">Deere 210G</div>
                        <div className="font-body-sm text-on-surface-variant text-xs">Excavator</div>
                      </div>
                    </div>
                    <div className="font-price-display text-primary font-bold">
                      ₹420<span className="text-xs font-normal text-on-surface-variant">/day</span>
                    </div>
                  </div>
                </div>
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-stack-sm">
                Compare &amp; book easily
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Review specs, pricing, and availability side-by-side to make the best choice for your site.
              </p>
            </div>
          </div>
        )}

        {/* Slide 3 */}
        {currentSlide === 3 && (
          <div className="flex flex-col h-full items-center justify-center px-margin-mobile md:px-margin-desktop animate-fade-in">
            <div className="w-full max-w-lg flex flex-col items-center text-center">
              <div className="w-full aspect-square md:aspect-[4/3] bg-surface-container rounded-xl overflow-hidden mb-stack-lg shadow-sm relative flex items-center justify-center">
                <img 
                  className="object-cover w-full h-full" 
                  alt="Get equipment delivered"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCt83XET9HW4VbQYHkG9KMITzK6MRwTz-0g14T9F9fsakf3NjpKlngmFbnWyj_xMXwXvui4pMYuRUZYzDzf-rv_3Y414QITrjfyik_qHx7WddLA19wOcG_30QL3FjMKgkJQyltRQtg9gdKAS8oakMfMO0m6idTYsRBXB3Tf-UHrmPJnTSlfTrzV9xafsmMG35Py9nGZgvt1bK0bwRV5SSPULKF5zMw_sKrWLUAZDjQmQnQLEFyC0-k8" 
                />
              </div>
              <h2 className="font-headline-lg-mobile text-headline-lg-mobile md:font-headline-lg md:text-headline-lg text-on-surface mb-stack-sm">
                Get equipment delivered
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
                Seamless logistics. We handle the transport so you can focus on getting the job done.
              </p>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Controls */}
      <div className="w-full px-margin-mobile md:px-margin-desktop pb-margin-desktop pt-stack-md flex flex-col items-center gap-stack-lg bg-surface">
        <div className="flex gap-2 mb-4">
          {[1, 2, 3].map(slideIndex => (
            <div 
              key={slideIndex}
              onClick={() => setCurrentSlide(slideIndex)}
              className={`w-2.5 h-2.5 rounded-full cursor-pointer transition-colors duration-300 ${
                currentSlide === slideIndex ? 'bg-primary-container' : 'bg-outline-variant'
              }`}
            />
          ))}
        </div>
        <div className="w-full max-w-md flex flex-col sm:flex-row gap-stack-md gap-3">
          <button 
            onClick={completeOnboarding}
            className="w-full sm:w-1/3 py-3 px-4 rounded-lg font-label-caps text-label-caps text-on-surface-variant hover:bg-surface-container-low transition-colors text-center"
          >
            Skip
          </button>
          <button 
            onClick={nextSlide}
            className="w-full sm:w-2/3 py-3 px-4 rounded-lg bg-primary text-on-primary font-headline-md text-headline-md text-[16px] shadow-sm hover:opacity-90 transition-opacity font-bold"
          >
            {currentSlide === totalSlides ? 'Get Started' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
}
