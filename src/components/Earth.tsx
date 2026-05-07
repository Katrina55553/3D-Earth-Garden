"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { Mesh } from "three";

interface EarthProps {
  onClick?: () => void;
}

export default function Earth({ onClick }: EarthProps) {
  const earthRef = useRef<Mesh>(null);
  const earthTexture = useTexture(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  );

  useFrame((_, delta) => {
    if (earthRef.current) {
      earthRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <mesh
      ref={earthRef}
      castShadow
      receiveShadow
      onClick={(e) => {
        e.stopPropagation();
        onClick?.();
      }}
    >
      <sphereGeometry args={[1.2, 64, 64]} />
      <meshStandardMaterial
        map={earthTexture}
        roughness={0.85}
        metalness={0.05}
      />
    </mesh>
  );
}
