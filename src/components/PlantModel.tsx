"use client";

import { useRef, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Object3D, Quaternion, Vector3 } from "three";
import { latLngToPosition } from "@/utils/coordinates";
import { PlantData } from "@/data/plants";

const up = new Vector3(0, 1, 0);
const _quat = new Quaternion();
const _normal = new Vector3();

interface PlantModelProps {
  plant: PlantData;
}

function PlantInstance({ plant }: PlantModelProps) {
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
  const clonedScene = useMemo(() => scene.clone(), [scene]);

  return (
    <group ref={groupRef} position={position} quaternion={rotation}>
      <primitive object={clonedScene} scale={0.015} />
    </group>
  );
}

// Preload all models
useGLTF.preload("/models/妗傝姳.glb");
useGLTF.preload("/models/妗夋爲.glb");
useGLTF.preload("/models/姣涚.glb");
useGLTF.preload("/models/楂樺北闆幉.glb");
useGLTF.preload("/models/鍖楃編绾㈡潐.glb");
useGLTF.preload("/models/鐚撮潰鍖呮爲.glb");
useGLTF.preload("/models/鐧惧悎.glb");

export default function PlantModel({ plant }: PlantModelProps) {
  return <PlantInstance plant={plant} />;
}
