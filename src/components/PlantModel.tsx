"use client";

import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { Object3D, Quaternion, Vector3, Mesh, RingGeometry, MeshBasicMaterial, DoubleSide, SphereGeometry, MeshStandardMaterial, Material } from "three";
import { latLngToPosition } from "@/utils/coordinates";
import { PlantData } from "@/data/plants";

const up = new Vector3(0, 1, 0);
const _quat = new Quaternion();
const _normal = new Vector3();

interface PlantModelProps {
  plant: PlantData;
  isHovered: boolean;
  isSelected: boolean;
  dimmed: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
  onClick: () => void;
}

const dotGeo = new SphereGeometry(0.025, 8, 8);
const ringGeo = new RingGeometry(0.08, 0.12, 32);

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

  const ringRotation = useMemo(() => {
    _normal.set(...position).normalize();
    const q = new Quaternion();
    q.setFromUnitVectors(new Vector3(0, 0, 1), _normal);
    return q;
  }, [position]);

  const ringMaterial = useMemo(
    () =>
      new MeshBasicMaterial({
        color: isSelected ? "#ffd700" : "#4ade80",
        side: DoubleSide,
        transparent: true,
        opacity: isHovered ? 1 : 0.7,
        depthWrite: false,
      }),
    [isSelected, isHovered]
  );

  const targetScale = isHovered ? 1.3 : 1;
  const currentScale = useRef(1);

  const dimmedOpacity = useRef(0.15);

  useFrame((_, delta) => {
    currentScale.current +=
      (targetScale - currentScale.current) * Math.min(delta * 8, 1);

    if (groupRef.current) {
      groupRef.current.scale.setScalar(currentScale.current);
    }

    // Smooth dimmed transition
    const targetDimmed = dimmed ? 0.15 : 1;
    dimmedOpacity.current +=
      (targetDimmed - dimmedOpacity.current) * Math.min(delta * 6, 1);

    // Apply opacity to all meshes in cloned scene
    clonedScene.traverse((child) => {
      if (child instanceof Mesh && child.material) {
        const materials = Array.isArray(child.material)
          ? child.material
          : [child.material];
        materials.forEach((mat: Material) => {
          if ("opacity" in mat && "transparent" in mat) {
            mat.opacity = dimmedOpacity.current;
            mat.transparent = true;
            mat.depthWrite = dimmedOpacity.current > 0.5;
          }
        });
      }
    });
  });

  const dotVisible = dimmedOpacity.current > 0.1; // Only show dot if not completely dimmed

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
      {/* Base dot marker */}
      <mesh geometry={dotGeo} position={[0, 0.02, 0]}>
        <meshStandardMaterial
          color={isSelected ? "#ffd700" : isHovered ? "#4ade80" : "#ffffff"}
          emissive={isSelected ? "#ffd700" : isHovered ? "#22c55e" : "#888888"}
          emissiveIntensity={0.6}
          roughness={0.3}
          transparent
          opacity={dimmed ? 0.15 : 1}
          depthWrite={!dimmed}
        />
      </mesh>

      {/* Hover/select glow ring */}
      {(isHovered || isSelected) && !dimmed && (
        <mesh
          geometry={ringGeo}
          material={ringMaterial}
          quaternion={ringRotation}
          renderOrder={1}
        />
      )}

      {/* Plant 3D model */}
      <primitive object={clonedScene} scale={0.06} />
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
