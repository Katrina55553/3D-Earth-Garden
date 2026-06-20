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
import { assetPath } from "@/utils/assetPath";
import plants, { PlantData } from "@/data/plants";

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

  const { scene } = useGLTF(assetPath(plant.modelPath));
  const clonedScene = useMemo(() => {
    const cloned = scene.clone();
    cloned.traverse((child) => {
      if (child instanceof Mesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Clone materials per instance. scene.clone() only shallow-clones
        // the scene graph and shares material references, so without this
        // every plant using the same model would share one material object
        // and dimming one (via opacity in useFrame) would dim them all —
        // a real bug for species that span multiple filter groups
        // (e.g. 百合 appears in both 亚洲 and 欧洲).
        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material = child.material.map((m) => m.clone());
          } else {
            child.material = child.material.clone();
          }
        }
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

  // Cleanup per-instance resources on unmount.
  // NOTE: glowGeo is a shared module-level singleton — never dispose it here,
  // otherwise the first plant to unmount breaks the glow disc for every other.
  useEffect(() => {
    return () => {
      meshMaterials.forEach((m) => m.dispose());
      glowMaterial.dispose();
    };
  }, [meshMaterials, glowMaterial]);

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

// Preload all unique models used by the plant dataset (stays in sync with data)
[...new Set(plants.map((p) => p.modelPath))].forEach((path) =>
  useGLTF.preload(assetPath(path))
);
