"use client";

import { useRef } from "react";
import { ThreeEvent } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import { assetPath } from "@/utils/assetPath";
import { positionToLatLng } from "@/utils/coordinates";

interface EarthProps {
  onSurfaceSelect?: (latitude: number, longitude: number) => void;
}

// Pointer must move less than this many pixels between down and up to count
// as a real click. Anything larger means the user was dragging the globe
// (OrbitControls rotate) and we must NOT select a country on release.
const CLICK_DRAG_THRESHOLD_PX = 5;

export default function Earth({ onSurfaceSelect }: EarthProps) {
  const earthTexture = useTexture(assetPath("/textures/earth.jpg"));

  // Records where the pointer was at mousedown so we can tell a click apart
  // from a drag at mouseup.
  const downPos = useRef<{ x: number; y: number } | null>(null);

  const handlePointerDown = (event: ThreeEvent<PointerEvent>) => {
    downPos.current = { x: event.clientX, y: event.clientY };
  };

  const handleClick = (event: ThreeEvent<MouseEvent>) => {
    // Suppress click if the pointer moved beyond the drag threshold — that
    // means OrbitControls was rotating the globe, not the user tapping it.
    if (downPos.current) {
      const dx = event.clientX - downPos.current.x;
      const dy = event.clientY - downPos.current.y;
      downPos.current = null;
      if (dx * dx + dy * dy > CLICK_DRAG_THRESHOLD_PX * CLICK_DRAG_THRESHOLD_PX) {
        return;
      }
    }

    event.stopPropagation();
    const point = event.point.clone().normalize();
    const { latitude, longitude } = positionToLatLng(point.x, point.y, point.z);
    onSurfaceSelect?.(latitude, longitude);
  };

  return (
    <mesh
      castShadow
      receiveShadow
      onPointerDown={handlePointerDown}
      onClick={handleClick}
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
