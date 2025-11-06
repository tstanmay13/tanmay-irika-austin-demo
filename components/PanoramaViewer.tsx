'use client';

import { useRef, useState, useEffect } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber';
import { useTexture } from '@react-three/drei';
import * as THREE from 'three';

function PanoramaSphere() {
  const texture = useTexture('/austin-panorama.jpg');
  const { gl } = useThree();

  useEffect(() => {
    // Configure texture with HIGH QUALITY settings for equirectangular panorama
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);

    // Use mipmaps for better quality at all zoom levels
    texture.minFilter = THREE.LinearMipmapLinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.generateMipmaps = true;

    // Maximum anisotropic filtering for sharpness
    texture.anisotropy = gl.capabilities.getMaxAnisotropy();

    // Ensure texture updates with new settings
    texture.needsUpdate = true;
  }, [texture, gl]);

  return (
    <mesh rotation={[0, Math.PI, 0]}>
      <sphereGeometry args={[500, 120, 60]} />
      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
        toneMapped={false}
        color={new THREE.Color(1.5, 1.5, 1.5)}
      />
    </mesh>
  );
}

function PanoramaCamera() {
  const { camera, gl } = useThree();
  const [isUserInteracting, setIsUserInteracting] = useState(false);
  const [lon, setLon] = useState(0);
  const [lat, setLat] = useState(0);

  const onPointerDownRef = useRef({ x: 0, y: 0, lon: 0, lat: 0 });

  useEffect(() => {
    const onPointerDown = (event: PointerEvent) => {
      setIsUserInteracting(true);
      onPointerDownRef.current = {
        x: event.clientX,
        y: event.clientY,
        lon: lon,
        lat: lat
      };
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isUserInteracting) {
        const newLon = (onPointerDownRef.current.x - event.clientX) * 0.1 + onPointerDownRef.current.lon;
        const newLat = (event.clientY - onPointerDownRef.current.y) * 0.1 + onPointerDownRef.current.lat;
        setLon(newLon);
        setLat(Math.max(-85, Math.min(85, newLat)));
      }
    };

    const onPointerUp = () => {
      setIsUserInteracting(false);
    };

    const onWheel = (event: WheelEvent) => {
      if ('fov' in camera) {
        const fov = (camera.fov as number) + event.deltaY * 0.05;
        (camera as THREE.PerspectiveCamera).fov = Math.max(10, Math.min(75, fov));
        camera.updateProjectionMatrix();
      }
    };

    gl.domElement.addEventListener('pointerdown', onPointerDown);
    gl.domElement.addEventListener('pointermove', onPointerMove);
    gl.domElement.addEventListener('pointerup', onPointerUp);
    gl.domElement.addEventListener('wheel', onWheel);

    return () => {
      gl.domElement.removeEventListener('pointerdown', onPointerDown);
      gl.domElement.removeEventListener('pointermove', onPointerMove);
      gl.domElement.removeEventListener('pointerup', onPointerUp);
      gl.domElement.removeEventListener('wheel', onWheel);
    };
  }, [isUserInteracting, lon, lat, camera, gl]);

  useFrame(() => {
    // Convert spherical coordinates to cartesian
    const phi = THREE.MathUtils.degToRad(90 - lat);
    const theta = THREE.MathUtils.degToRad(lon);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
  });

  return null;
}

export default function PanoramaViewer() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative w-screen h-screen">
      {/* Info Overlay */}
      <div className="absolute top-5 left-5 z-10 bg-black bg-opacity-80 text-white p-4 rounded-lg max-w-sm backdrop-blur-sm">
        <h1 className="text-xl font-bold mb-2">🌃 Austin Skyline at Night</h1>
        <p className="text-xs text-gray-300 mb-2">Auditorium Shores • 360° Panorama</p>
        <p className="text-sm mb-1">🖱️ Drag to look around</p>
        <p className="text-sm">🔍 Scroll to zoom</p>
      </div>

      {/* Loading Indicator */}
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 bg-black bg-opacity-80 text-white px-8 py-4 rounded-lg">
          <div className="text-xl">Loading panorama...</div>
        </div>
      )}

      {/* 3D Canvas */}
      <Canvas
        camera={{
          fov: 75,
          near: 1,
          far: 1100,
          position: [0, 0, 0],
        }}
        onCreated={({ gl }) => {
          gl.setPixelRatio(window.devicePixelRatio);
          setIsLoading(false);
        }}
      >
        <PanoramaSphere />
        <PanoramaCamera />
      </Canvas>

      {/* Credits */}
      <div className="absolute bottom-5 right-5 z-10 bg-black bg-opacity-70 text-white text-xs p-3 rounded-lg">
        <p>Tanmay & Irika Austin Demo</p>
      </div>
    </div>
  );
}
