"use client";

import { Suspense, useState, useCallback, useRef, useMemo } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import Earth from "./Earth";
import Starfield from "./Starfield";
import PlantModel from "./PlantModel";
import plants, { PlantData } from "@/data/plants";
import { latLngToPosition } from "@/utils/coordinates";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useAppContext } from "@/store/AppContext";

function PlantsLayer({
  hoveredId,
  onHover,
  onSelect,
}: {
  hoveredId: string | null;
  onHover: (id: string | null) => void;
  onSelect: (plant: PlantData | null) => void;
}) {
  const { filteredPlants, selectedSpeciesName } = useAppContext();

  const visibleSet = useMemo(
    () => new Set(filteredPlants.map((p) => p.id)),
    [filteredPlants]
  );

  return (
    <>
      {plants.map((plant) => (
        <Suspense key={plant.id} fallback={null}>
          <PlantModel
            plant={plant}
            isHovered={hoveredId === plant.id}
            isSelected={selectedSpeciesName === plant.name}
            dimmed={!visibleSet.has(plant.id)}
            onHoverStart={() => onHover(plant.id)}
            onHoverEnd={() => onHover(null)}
            onClick={() => onSelect(plant)}
          />
        </Suspense>
      ))}
    </>
  );
}

function flyBackToDefault(
  camera: THREE.Camera,
  controls: OrbitControlsImpl | null,
  animatingRef: React.MutableRefObject<boolean>
) {
  if (animatingRef.current) return;
  animatingRef.current = true;
  if (controls) controls.enabled = false;

  const startPos = camera.position.clone();
  const startTarget = controls
    ? controls.target.clone()
    : new THREE.Vector3(0, 0, 0);
  const endPos = new THREE.Vector3(0, 1.5, 5);
  const endTarget = new THREE.Vector3(0, 0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      animatingRef.current = false;
      if (controls) {
        controls.target.copy(endTarget);
        controls.update();
        controls.enabled = true;
      }
    },
  });

  tl.to(
    startPos,
    {
      x: endPos.x, y: endPos.y, z: endPos.z,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => camera.position.copy(startPos),
    },
    0
  );
  tl.to(
    startTarget,
    {
      x: endTarget.x, y: endTarget.y, z: endTarget.z,
      duration: 1,
      ease: "power2.inOut",
      onUpdate: () => {
        if (controls) {
          controls.target.copy(startTarget);
          controls.update();
        }
      },
    },
    0
  );
}

function flyToSpecies(
  speciesName: string,
  camera: THREE.Camera,
  controls: OrbitControlsImpl | null,
  animatingRef: React.MutableRefObject<boolean>
) {
  if (animatingRef.current) return;

  const group = plants.filter((p) => p.name === speciesName);
  if (group.length === 0) return;

  // Compute centroid of all plants in this species
  const centroid = new THREE.Vector3(0, 0, 0);
  group.forEach((p) => {
    const pos = latLngToPosition(p.latitude, p.longitude, 1.22);
    centroid.add(new THREE.Vector3(...pos));
  });
  centroid.divideScalar(group.length);

  const normal = centroid.clone().normalize();
  // Offset camera outward based on group spread
  const cameraOffset = 0.7 + group.length * 0.04;
  const cameraTarget = centroid.clone().add(normal.multiplyScalar(cameraOffset));

  animatingRef.current = true;
  if (controls) controls.enabled = false;

  const startPos = camera.position.clone();
  const startTarget = controls
    ? controls.target.clone()
    : new THREE.Vector3(0, 0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      animatingRef.current = false;
      if (controls) {
        controls.target.copy(centroid);
        controls.update();
        controls.enabled = true;
      }
    },
  });

  tl.to(
    startPos,
    {
      x: cameraTarget.x, y: cameraTarget.y, z: cameraTarget.z,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => camera.position.copy(startPos),
    },
    0
  );
  tl.to(
    startTarget,
    {
      x: centroid.x, y: centroid.y, z: centroid.z,
      duration: 1.2,
      ease: "power2.inOut",
      onUpdate: () => {
        if (controls) {
          controls.target.copy(startTarget);
          controls.update();
        }
      },
    },
    0
  );
}

function SceneContent() {
  const { camera } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const isAnimating = useRef(false);
  const { selectedSpeciesName, setSelectedSpecies } = useAppContext();

  const handleHover = useCallback((id: string | null) => {
    setHoveredId(id);
    const canvas = document.querySelector("canvas");
    if (canvas) canvas.classList.toggle("hovering", !!id);
  }, []);

  const handleSelect = useCallback(
    (plant: PlantData | null) => {
      if (!plant || selectedSpeciesName === plant.name) {
        setSelectedSpecies(null);
        flyBackToDefault(camera, controlsRef.current, isAnimating);
      } else {
        setSelectedSpecies(plant.name);
        flyToSpecies(plant.name, camera, controlsRef.current, isAnimating);
      }
    },
    [camera, selectedSpeciesName, setSelectedSpecies]
  );

  const handleEarthClick = useCallback(() => {
    if (selectedSpeciesName) {
      setSelectedSpecies(null);
      flyBackToDefault(camera, controlsRef.current, isAnimating);
    }
  }, [camera, selectedSpeciesName, setSelectedSpecies]);

  return (
    <>
      <color attach="background" args={["#020210"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <directionalLight position={[-5, -1, -3]} intensity={0.3} />

      <Starfield />
      <Earth onClick={handleEarthClick} />
      <PlantsLayer
        hoveredId={hoveredId}
        onHover={handleHover}
        onSelect={handleSelect}
      />
      <OrbitControls
        ref={controlsRef}
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={12}
        target={[0, 0, 0]}
      />
    </>
  );
}

export default function EarthScene() {
  return (
    <Canvas
      className="absolute inset-0 h-full w-full"
      camera={{ position: [0, 1.5, 5], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <SceneContent />
    </Canvas>
  );
}
