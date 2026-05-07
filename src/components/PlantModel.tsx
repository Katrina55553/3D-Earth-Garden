"use client";

import { useRef, useMemo, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Object3D, Quaternion, Vector3, Mesh, RingGeometry, MeshBasicMaterial, DoubleSide } from "three";
import { latLngToPosition } from "@/utils/coordinates";
import { PlantData } from "@/data/plants";

const up = new Vector3(0, 1, 0);
const _quat = new Quaternion();
const _normal = new Vector3();

interface PlantModelProps {
  plant: PlantData;
  isHovered: boolean;
  isSelected: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

export default function PlantModel({
  plant,
  isHovered,
  isSelected,
  onHoverStart,
  onHoverEnd,
  onClick,
}: PlantModelProps) {
  const groupRef = useRef<Object3D>(null);
  const ringRef = useRef<Mesh>(null);

  const position = useMemo(
    () => latLngToPosition(plant.latitude, plant.longitude, 1.22),
    [plant.latitude, plant.longitude]
  );

  const rotation = useMemo(() => {
    _normal.set(...position).normalize();
    _quat.setFromUnitVectors(up, _normal);
    return _quat;
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

  const ringGeometry = useMemo(
    () => new RingGeometry(0.06, 0.09, 32),
    []
  );

  const ringMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: isSelected ? "#ffd700" : "#4ade80",
        side: DoubleSide,
        transparent: true,
        opacity: 0.9,
        depthWrite: false,
      }),
    [isSelected]
  );

  const targetScale = isHovered ? 1.4 : 1;
  const currentScale = useRef(1);

  useFrame((_, delta) => {
    // Smooth scale transition
    currentScale.current +=
      (targetScale - currentScale.current) * Math.min(delta * 8, 1);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }
  });

  // Rotate ring to face outward from sphere
  const ringRotation = useMemo(() => {
    _normal.set(...position).normalize();
    const q = new Quaternion();
    q.setFromUnitVectors(new Vector3(0, 0, 1), _normal);
    return q;
  }, [position]);

  return (
    <group
      ref={groupRef}
      position={position}
      quaternion={rotation}
      onPointerEnter={(e) => {
        e.stopPropagation();
        onHoverStart();
      }}
      onPointerLeave={(e) => {
        e.stopPropagation();
        onHoverEnd();
      }}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <primitive object={clonedScene} scale={0.015} />
      {(isHovered || isSelected) && (
        <mesh
          ref={ringRef}
          geometry={ringGeometry}
          material={ringMaterial}
          quaternion={ringRotation}
          renderOrder={1}
        />
      )}
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
