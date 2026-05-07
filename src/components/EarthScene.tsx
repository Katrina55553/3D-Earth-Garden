"use client";

import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "./Earth";
import Starfield from "./Starfield";
import PlantModel from "./PlantModel";
import plants from "@/data/plants";

function PlantsLayer() {
  return (
    <>
      {plants.map((plant) => (
        <Suspense key={plant.id} fallback={null}>
          <PlantModel plant={plant} />
        </Suspense>
      ))}
    </>
  );
}

export default function EarthScene() {
  return (
    <Canvas
      className="h-full w-full"
      camera={{ position: [0, 1.5, 5], fov: 45 }}
      gl={{ antialias: true, alpha: false }}
    >
      <color attach="background" args={["#020210"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <directionalLight position={[-5, -1, -3]} intensity={0.3} />

      <Starfield />
      <Earth />
      <PlantsLayer />
      <OrbitControls
        enableDamping
        dampingFactor={0.08}
        minDistance={2.5}
        maxDistance={12}
        target={[0, 0, 0]}
      />
    </Canvas>
  );
}
