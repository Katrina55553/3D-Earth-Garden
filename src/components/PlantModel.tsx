"use client";

import { useRef, useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import {
  Object3D,
  Quaternion,
  Vector3,
  Mesh,
  RingGeometry,
  MeshBasicMaterial,
  DoubleSide,
  Material,
} from "three";
import { latLngToPosition } from "@/utils/coordinates";
import { PlantData } from "@/data/plants";

interface PlantModelProps {
  plant: PlantData;
  isHovered: boolean;
  isSelected: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

// Shared grass-like ground glow disc (module-level singleton)
const glowGeo = new RingGeometry(0.04, 0.14, 32);

export default function PlantModel({
  plant,
  isHovered,
  isSelected,
  dimmed,
  onHoverStart,
  onHoverEnd,
  onClick,
}: PlantModelProps) {
  const groupRef = useRef<Object3D>(null);

  const position = useMemo(
    () => latLngToPosition(plant.latitude, plant.longitude, 1.22),
    [plant.latitude, plant.longitude]
  );

  const rotation = useMemo(() => {
    const normal = new Vector3(...position).normalize();
    const quat = new Quaternion();
    quat.setFromUnitVectors(new Vector3(0, 1, 0), normal);
    return quat;
  }, [position]);

  const { scene } = useGLTF(plant.modelPath);
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
    return cloned;
  }, [scene]);

  // Cache material references once to avoid per-frame scene traversal
  const meshMaterials = useMemo(() => {
    const mats: Material[] = [];
    clonedScene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const arr = Array.isArray(child.material) ? child.material : [child.material];
        for (const m of arr) mats.push(m);
      }
    });
    return mats;
  }, [clonedScene]);

  const glowRotation = useMemo(() => {
    const normal = new Vector3(...position).normalize();
    const q = new Quaternion();
    q.setFromUnitVectors(new Vector3(0, 0, 1), normal);
    return q;
  }, [position]);

  const glowMaterial = useMemo(() => {
    return new MeshBasicMaterial({
      color: "#4ade80",
      side: DoubleSide,
      transparent: true,
      opacity: 0.45,
      depthWrite: false,
    });
  }, []);

  // Update glow material reactively (no new allocation)
  useEffect(() => {
    glowMaterial.color.set(isSelected ? "#ffd700" : "#4ade80");
    glowMaterial.opacity = isSelected ? 0.7 : 0.45;
  }, [isSelected, glowMaterial]);

  // Cleanup glow material on unmount
  useEffect(() => {
    return () => { glowMaterial.dispose(); glowGeo.dispose(); };
  }, [glowMaterial]);

  const targetScale = isHovered ? 1.35 : 1;
  const currentScale = useRef(1);
  const dimmedOpacity = useRef(0.15);

  useFrame((_, delta) => {
    currentScale.current +=
      (targetScale - currentScale.current) * Math.min(delta * 8, 1);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Smooth dimmed transition
    const targetDimmed = dimmed ? 0.12 : 1;
    dimmedOpacity.current +=
      (targetDimmed - dimmedOpacity.current) * Math.min(delta * 6, 1);

    // Apply opacity to cached materials (no traverse)
    const opacity = dimmedOpacity.current;
    for (const mat of meshMaterials) {
      if ("opacity" in mat && "transparent" in mat) {
        mat.opacity = opacity;
        mat.transparent = true;
        mat.depthWrite = opacity > 0.5;
      }
    }
  });

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={rotation}
      onPointerEnter={(e) => {
        e.stopPropagation();
        if (!dimmed) onHoverStart();
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onHoverEnd();
      }}
      onClick={(e) => {
        e.stopPropagation();
        if (!dimmed) onClick();
      }}
    >
      {/* Ground glow disc — appears on hover/select */}
      {(isHovered || isSelected) && !dimmed && (
        <mesh
          geometry={glowGeo}
          material={glowMaterial}
          quaternion={glowRotation}
          position={[0, 0.01, 0]}
          renderOrder={1}
        />
      )}

      {/* Plant 3D model */}
      <primitive object={clonedScene} scale={0.08} />
    </group>
  );
}

// Preload models
useGLTF.preload("/models/妗傝姳.glb");
useGLTF.preload("/models/妗夋爲.glb");
useGLTF.preload("/models/姣涚.glb");
useGLTF.preload("/models/楂樺北闆幉.glb");
useGLTF.preload("/models/鍖楃編绾㈡潐.glb");
useGLTF.preload("/models/鐚撮潰鍖呮爲.glb");
useGLTF.preload("/models/鐧惧悎.glb");
