'use client';

import { useState, useEffect } from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Fade in on mount
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  useEffect(() => {
    // Track mouse movement for parallax effect
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize mouse position to -1 to 1 range
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = (e.clientY / window.innerHeight) * 2 - 1;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleEnter = () => {
    setIsExiting(true);
    // Wait for fade out animation before calling onEnter
    setTimeout(() => {
      onEnter();
    }, 1500);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      {/* Background Video with blur effect */}
      <div className="absolute inset-0 z-0">
        {/* Looping Austin skyline video at dusk */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            filter: 'blur(4px) brightness(0.7)',
            transform: `scale(1.1) translate(${mousePosition.x * 2}%, ${mousePosition.y * 2}%)`,
            transition: 'transform 0.3s ease-out',
          }}
          onLoadedMetadata={(e) => {
            // Speed up playback to 1.5x for faster, more dynamic feel
            const video = e.target as HTMLVideoElement;
            video.playbackRate = 1.5;
          }}
        >
          <source src="/austin-night-compressed.mp4" type="video/mp4" />
          {/* Fallback to image if video doesn't load */}
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{
              backgroundImage: "url('/austin-panorama.jpg')",
              filter: 'blur(8px) brightness(0.4)',
            }}
          />
        </video>

        {/* Vignette overlay for cinematic edges */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)',
          }}
        />

        {/* Dark translucent overlay for readability */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* Main Content */}
      <div
        className={`
          relative z-10 flex flex-col items-center justify-center h-full px-6 text-center
          transition-all duration-1000 ease-out
          ${isVisible && !isExiting ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          ${isExiting ? 'opacity-0 -translate-y-8' : ''}
        `}
      >
        {/* Headline */}
        <h1
          className="text-5xl md:text-7xl lg:text-8xl font-serif text-white mb-6 tracking-tight leading-tight"
          style={{
            textShadow: '0 4px 20px rgba(0,0,0,0.5)',
            fontFamily: 'Georgia, Garamond, serif',
          }}
        >
          First Date.<br />
          Irika & Tanmay.<br />
        </h1>

        {/* Decorative line */}
        <div className="w-24 h-px bg-white/40 mb-8" />

        {/* Subtext */}
        <p
          className="text-lg md:text-xl lg:text-2xl text-white/90 max-w-3xl mb-12 leading-relaxed font-light"
          style={{
            textShadow: '0 2px 10px rgba(0,0,0,0.5)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          Stars, lamb chops, city.
        </p>

        {/* CTA Button */}
        <button
          onClick={handleEnter}
          className="
            group relative px-10 py-4 text-lg font-light tracking-wider
            text-white border-2 border-white/60
            overflow-hidden
            transition-all duration-500 ease-out
            hover:border-white hover:scale-105
          "
          style={{
            fontFamily: 'system-ui, -apple-system, sans-serif',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255,255,255,0.05)',
          }}
        >
          {/* Button background animation */}
          <span
            className="
              absolute inset-0 w-0 bg-white transition-all duration-500 ease-out
              group-hover:w-full
            "
          />
          <span className="relative z-10 group-hover:text-black transition-colors duration-500">
            Relive the Night →
          </span>
        </button>

        {/* Scroll hint - subtle */}
        <div
          className={`
            absolute bottom-12 left-1/2 -translate-x-1/2
            flex flex-col items-center gap-2 text-white/40 text-sm
            transition-opacity duration-1000 delay-1000
            ${isVisible && !isExiting ? 'opacity-100' : 'opacity-0'}
          `}
        >
          <span className="font-light tracking-wider">ENTER</span>
          <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-pulse" />
        </div>

        {/* Personal note - bottom right */}
        <div
          className={`
            absolute bottom-8 right-8
            text-white/60 text-xs md:text-sm text-right max-w-md
            transition-opacity duration-1000 delay-1500
            ${isVisible && !isExiting ? 'opacity-100' : 'opacity-0'}
          `}
          style={{
            textShadow: '0 2px 8px rgba(0,0,0,0.8)',
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}
        >
          <p className="italic font-light leading-relaxed">
            PS: I know this wasn&apos;t like actually the for real for real first date<br />
            but I consider it to be
          </p>
        </div>
      </div>

      {/* Ambient grain texture overlay for film effect */}
      <div
        className="absolute inset-0 z-20 pointer-events-none opacity-20"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          mixBlendMode: 'overlay',
        }}
      />
    </div>
  );
}
