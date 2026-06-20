"use client";

import { useMemo } from "react";
import * as THREE from "three";

export default function Starfield() {
  const positions = useMemo(() => {
    const count = 2000;
    const arr = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      // Random position on a large sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const radius = 20 + Math.random() * 30;

      arr[i * 3] = Math.sin(phi) * Math.cos(theta) * radius;
      arr[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * radius;
      arr[i * 3 + 2] = Math.cos(phi) * radius;
    }

    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffffff"
        size={0.03}
        sizeAttenuation
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
