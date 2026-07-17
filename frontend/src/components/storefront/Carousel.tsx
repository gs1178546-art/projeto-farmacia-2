'use client';

import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Truck, Activity, Gift, Zap } from 'lucide-react';
import { CarouselSlide } from '@/types/carousel';
import { cn } from '@/lib/utils';

const ICON_MAP: Record<string, React.ReactNode> = {
  truck: <Truck size={90} strokeWidth={0.8} className="opacity-15" />,
  activity: <Activity size={90} strokeWidth={0.8} className="opacity-15" />,
  gift: <Gift size={90} strokeWidth={0.8} className="opacity-15" />,
  zap: <Zap size={90} strokeWidth={0.8} className="opacity-15" />,
};

interface CarouselProps {
  slides: CarouselSlide[];
}

export function Carousel({ slides }: CarouselProps) {
  const [current, setCurrent] = useState(0);
  const activeSlides = slides.filter((s) => s.active);

  const next = useCallback(() => setCurrent((c) => (c + 1) % activeSlides.length), [activeSlides.length]);
  const prev = () => setCurrent((c) => (c - 1 + activeSlides.length) % activeSlides.length);

  useEffect(() => {
    const t = setInterval(next, 6000);
    return () => clearInterval(t);
  }, [next]);

  if (activeSlides.length === 0) return null;

  return (
    <div className="relative rounded-2xl overflow-hidden h-52 md:h-64 shadow-sm border border-white/20">
      {activeSlides.map((slide, i) => (
        <div
          key={slide.id}
          className={cn(
            'absolute inset-0 flex items-center justify-between px-8 md:px-12 text-white transition-opacity duration-700',
            i === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
          )}
          style={{ background: `linear-gradient(135deg, ${slide.gradientFrom} 0%, ${slide.gradientTo} 100%)` }}
        >
          <div className="max-w-xs md:max-w-sm flex flex-col gap-3">
            <span className="text-[11px] font-700 uppercase tracking-wider bg-white/20 backdrop-blur-sm rounded-full px-3 py-1 w-fit">
              {slide.subtitle.split(' ').slice(0, 3).join(' ')}
            </span>
            <h2 className="text-xl md:text-2xl font-800 leading-tight">{slide.title}</h2>
            <p className="text-sm opacity-90 font-500 line-clamp-2 hidden md:block">{slide.subtitle}</p>
            <a
              href={slide.buttonLink}
              className="mt-1 w-fit bg-white text-gray-900 text-sm font-700 px-5 py-2.5 rounded-2xl hover:-translate-y-0.5 hover:shadow-lg transition-all duration-150"
            >
              {slide.buttonText}
            </a>
          </div>
          <div className="hidden md:flex items-center justify-center shrink-0 text-white">
            {ICON_MAP[slide.icon ?? ''] ?? ICON_MAP['truck']}
          </div>
        </div>
      ))}

      {/* Controls */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-8 h-8 bg-black/20 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/40 transition-colors"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
            {activeSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrent(i)}
                className={cn(
                  'h-1.5 rounded-full transition-all duration-300 bg-white',
                  i === current ? 'w-5 opacity-100' : 'w-1.5 opacity-40'
                )}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
