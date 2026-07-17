'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getCarouselSlides } from '../../services/carouselService';
import { CarouselSlide } from '../../types/carousel';

export const Carousel: React.FC = () => {
  const [slides, setSlides] = useState<CarouselSlide[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function loadSlides() {
      try {
        const res = await getCarouselSlides();
        setSlides(res.filter((s) => s.active));
      } catch (e) {
        console.error('Error loading slides', e);
      }
    }
    loadSlides();
  }, []);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return (
      <div className="w-full h-80 rounded-2xl bg-teal-800 animate-pulse flex items-center justify-center text-teal-200">
        Carregando banners...
      </div>
    );
  }

  const currentSlide = slides[currentIndex];

  return (
    <div className="w-full relative h-[360px] md:h-[420px] rounded-2xl overflow-hidden shadow-lg border border-slate-100 group">
      
      {/* Background slide wrapper */}
      <div 
        className="w-full h-full flex items-center transition-all duration-700 ease-in-out px-8 md:px-16"
        style={{ 
          backgroundColor: currentSlide.backgroundColor || '#0f766e',
          backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.05)), url(${currentSlide.imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundBlendMode: 'multiply'
        }}
      >
        <div className="max-w-xl text-white flex flex-col gap-3">
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md animate-in fade-in slide-in-from-left-8 duration-500">
            {currentSlide.title}
          </h2>
          {currentSlide.subtitle && (
            <p className="text-sm md:text-base text-teal-100/90 leading-relaxed font-medium drop-shadow-xs animate-in fade-in slide-in-from-left-8 duration-500 delay-100">
              {currentSlide.subtitle}
            </p>
          )}
          {currentSlide.linkUrl && (
            <a 
              href={currentSlide.linkUrl}
              className="mt-3 inline-flex items-center justify-center px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-900 text-sm font-bold rounded-lg transition-all shadow-md w-fit cursor-pointer hover:scale-102"
            >
              Aproveitar Oferta
            </a>
          )}
        </div>
      </div>

      {/* Nav Buttons */}
      {slides.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
            {slides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`w-2 h-2 rounded-full transition-all cursor-pointer ${
                  i === currentIndex ? 'bg-amber-500 w-5' : 'bg-white/60'
                }`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
};

export default Carousel;
