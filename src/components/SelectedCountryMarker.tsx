"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { latLngToPosition } from "@/utils/coordinates";
import type { CountryData } from "@/data/countries";

interface SelectedCountryMarkerProps {
  country: CountryData;
}

const GLOBE_RADIUS = 1.2;

export default function SelectedCountryMarker({
  country,
}: SelectedCountryMarkerProps) {
  const groupRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  const beamRef = useRef<THREE.Mesh>(null);
  const pulseRef = useRef<THREE.Mesh>(null);

  // Surface position + orientation so the marker sits flush on the globe
  const { position, quaternion } = useMemo(() => {
    const pos = new THREE.Vector3(
      ...latLngToPosition(country.latitude, country.longitude, GLOBE_RADIUS)
    );
    const normal = pos.clone().normalize();
    // Orient the group so its +Y axis points outward along the surface normal
    const up = new THREE.Vector3(0, 1, 0);
    const quat = new THREE.Quaternion().setFromUnitVectors(up, normal);
    return { position: pos, quaternion: quat };
  }, [country.latitude, country.longitude]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    // Pulse the outer ring
    if (ringRef.current) {
      const s = 1 + Math.sin(t * 2.2) * 0.18;
      ringRef.current.scale.set(s, s, s);
      const mat = ringRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + Math.sin(t * 2.2) * 0.25;
    }
    // Beam subtle flicker
    if (beamRef.current) {
      const mat = beamRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = 0.55 + Math.sin(t * 3.0) * 0.15;
    }
    // Outer pulse halo expanding outward
    if (pulseRef.current) {
      const cycle = (t * 0.8) % 1;
      const s = 1 + cycle * 2.2;
      pulseRef.current.scale.set(s, s, s);
      const mat = pulseRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = (1 - cycle) * 0.5;
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={quaternion}
    >
      {/* Outer pulsing halo ring (lies flat on the surface) */}
      <mesh ref={pulseRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={2}>
        <ringGeometry args={[0.04, 0.06, 32]} />
        <meshBasicMaterial
          color="#5eead4"
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Inner sharp ring */}
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} renderOrder={3}>
        <ringGeometry args={[0.018, 0.03, 32]} />
        <meshBasicMaterial
          color="#67e8f9"
          transparent
          opacity={0.8}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>

      {/* Vertical beam pointing outward from the surface */}
      <mesh ref={beamRef} position={[0, 0.08, 0]} renderOrder={3}>
        <cylinderGeometry args={[0.004, 0.004, 0.16, 8]} />
        <meshBasicMaterial
          color="#a5f3fc"
          transparent
          opacity={0.7}
          depthWrite={false}
        />
      </mesh>

      {/* Bright tip sphere at the top of the beam */}
      <mesh position={[0, 0.16, 0]} renderOrder={4}>
        <sphereGeometry args={[0.012, 12, 12]} />
        <meshBasicMaterial color="#ecfeff" />
      </mesh>

      {/* HTML label floating above the marker */}
      <Html
        position={[0, 0.26, 0]}
        center
        distanceFactor={2.4}
        zIndexRange={[20, 0]}
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{
            whiteSpace: "nowrap",
            transform: "translateZ(0)",
          }}
          className="flex items-center gap-1.5 rounded-full border border-cyan-300/40 bg-slate-950/80 px-2.5 py-1 text-[11px] font-medium text-cyan-100 shadow-lg shadow-cyan-500/20 backdrop-blur-md"
        >
          <span className="text-sm leading-none">{country.flagEmoji}</span>
          <span>{country.name}</span>
        </div>
      </Html>
    </group>
  );
}
