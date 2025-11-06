'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';

function PanoramaSphere() {
  const texture = useTexture('/austin-panorama.jpg');

  useEffect(() => {
    // Configure texture for equirectangular panorama
    texture.colorSpace = THREE.SRGBColorSpace;
  }, [texture]);

  return (
    <mesh scale={[-1, 1, 1]}>
      <sphereGeometry args={[500, 60, 40]} />
      <meshBasicMaterial map={texture} side={THREE.BackSide} />
    </mesh>
  );
}

function CameraController() {
  const { camera } = useThree();

  useEffect(() => {
    // Set initial camera position to face the most interesting part (roughly center-front)
    camera.position.set(0, 0, 0.1);
    camera.rotation.set(0, 0, 0);
  }, [camera]);

  return null;
}

export default function PanoramaViewer() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const controlsRef = useRef<any>(null);

  return (
    <div className="relative w-screen h-screen">
      {/* Info Overlay */}
      <div className="absolute top-5 left-5 z-10 bg-black bg-opacity-70 text-white p-4 rounded-lg max-w-sm">
        <h1 className="text-xl font-bold mb-2">Austin Skyline from Auditorium Shores</h1>
        <p className="text-sm mb-1">🖱️ Drag to pan around</p>
        <p className="text-sm">🔍 Scroll to zoom</p>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-80 text-white px-8 py-4 rounded-lg">
          <div className="text-xl">Loading panorama...</div>
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-red-900 bg-opacity-90 text-white px-8 py-4 rounded-lg max-w-md">
          <div className="text-lg font-bold mb-2">Error Loading Panorama</div>
          <div className="text-sm">{error}</div>
          <div className="text-xs mt-2">Please ensure austin-panorama.jpg is in the public folder</div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{
          fov: 75,
          near: 0.1,
          far: 1000,
          position: [0, 0, 0.1],
        }}
        onCreated={() => setIsLoading(false)}
      >
        <CameraController />

        {/* OrbitControls for smooth drag-to-pan and zoom */}
        <OrbitControls
          ref={controlsRef}
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.05}
          rotateSpeed={-0.5}
          zoomSpeed={0.8}
          minDistance={1}
          maxDistance={400}
          // Limit vertical rotation to prevent flipping
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={(3 * Math.PI) / 4}
        />

        <PanoramaSphere />
      </Canvas>

      {/* Credits */}
      <div className="absolute bottom-5 right-5 z-10 bg-black bg-opacity-70 text-white text-xs p-3 rounded-lg">
        <p>Tanmay & Irika Austin Demo</p>
      </div>
    </div>
  );
}
