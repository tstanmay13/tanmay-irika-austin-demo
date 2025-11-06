'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const LandingPage = dynamic(() => import('@/components/LandingPage'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-2xl">Loading...</div>
    </div>
  ),
});

const PanoramaViewer = dynamic(() => import('@/components/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-2xl">Loading Austin Skyline...</div>
    </div>
  ),
});

export default function Home() {
  const [showExperience, setShowExperience] = useState(false);

  if (!showExperience) {
    return <LandingPage onEnter={() => setShowExperience(true)} />;
  }

  return <PanoramaViewer />;
}
