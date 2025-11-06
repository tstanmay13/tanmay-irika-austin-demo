'use client';

import dynamic from 'next/dynamic';

const PanoramaViewer = dynamic(() => import('@/components/PanoramaViewer'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="text-white text-2xl">Loading Austin Skyline...</div>
    </div>
  ),
});

export default function Home() {
  return <PanoramaViewer />;
}
