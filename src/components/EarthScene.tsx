"use client";

import {
  useCallback,
  useRef,
  useEffect,
  Component,
  type ReactNode,
} from "react";
import { Canvas, useThree } from "@react-three/fiber";
import { OrbitControls, useProgress } from "@react-three/drei";
import gsap from "gsap";
import * as THREE from "three";
import Earth from "./Earth";
import Starfield from "./Starfield";
import SelectedCountryMarker from "./SelectedCountryMarker";
import countries, { CountryData } from "@/data/countries";
import {
  haversineDistanceKm,
  latLngToPosition,
} from "@/utils/coordinates";
import { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { useAppContext } from "@/store/AppContext";

// Globe radius must match Earth.tsx sphereGeometry
const GLOBE_RADIUS = 1.2;
// How far the camera sits above the target point on the surface
const CAMERA_OFFSET = 0.92;

function flyBackToDefault(
  camera: THREE.Camera,
  controls: OrbitControlsImpl | null,
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>
) {
  // Kill any in-flight animation so the new one starts immediately
  if (timelineRef.current) {
    timelineRef.current.kill();
    timelineRef.current = null;
  }
  if (controls) controls.enabled = false;

  const startPos = camera.position.clone();
  const startTarget = controls
    ? controls.target.clone()
    : new THREE.Vector3(0, 0, 0);
  const endPos = new THREE.Vector3(0, 1.5, 5);
  const endTarget = new THREE.Vector3(0, 0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      timelineRef.current = null;
      if (controls) {
        controls.target.copy(endTarget);
        controls.update();
        controls.enabled = true;
      }
    },
  });
  timelineRef.current = tl;

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

function flyToCountry(
  country: CountryData,
  camera: THREE.Camera,
  controls: OrbitControlsImpl | null,
  timelineRef: React.MutableRefObject<gsap.core.Timeline | null>
) {
  // Kill any in-flight animation so the new one starts immediately
  if (timelineRef.current) {
    timelineRef.current.kill();
    timelineRef.current = null;
  }

  const centroid = new THREE.Vector3(
    ...latLngToPosition(country.latitude, country.longitude, GLOBE_RADIUS)
  );

  const normal = centroid.clone().normalize();
  const cameraTarget = centroid.clone().add(normal.multiplyScalar(CAMERA_OFFSET));

  if (controls) controls.enabled = false;

  const startPos = camera.position.clone();
  const startTarget = controls
    ? controls.target.clone()
    : new THREE.Vector3(0, 0, 0);

  const tl = gsap.timeline({
    onComplete: () => {
      timelineRef.current = null;
      if (controls) {
        controls.target.copy(centroid);
        controls.update();
        controls.enabled = true;
      }
    },
  });
  timelineRef.current = tl;

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
  const { camera, gl } = useThree();
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);
  const previousSelectionRef = useRef<string | null>(null);
  const { filteredCountries, selectedCountry, setSelectedCountry } =
    useAppContext();

  useEffect(() => {
    gl.domElement.style.cursor = "grab";
    return () => {
      gl.domElement.style.cursor = "auto";
    };
  }, [gl]);

  // Kill any in-flight GSAP timeline on unmount so it can't mutate a
  // disposed camera.
  useEffect(() => {
    return () => {
      if (timelineRef.current) {
        timelineRef.current.kill();
        timelineRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (previousSelectionRef.current === selectedCountry?.id) return;

    if (!selectedCountry) {
      if (previousSelectionRef.current) {
        flyBackToDefault(camera, controlsRef.current, timelineRef);
      }
    } else {
      flyToCountry(selectedCountry, camera, controlsRef.current, timelineRef);
    }

    previousSelectionRef.current = selectedCountry?.id ?? null;
  }, [camera, selectedCountry]);

  const handleSurfaceSelect = useCallback(
    (latitude: number, longitude: number) => {
      const scope = filteredCountries.length > 0 ? filteredCountries : countries;
      // Single-pass minimum: cache the best distance instead of recomputing
      // it for the incumbent on every iteration.
      let nearest = scope[0];
      let nearestDist = haversineDistanceKm(
        latitude,
        longitude,
        nearest.latitude,
        nearest.longitude
      );
      for (let i = 1; i < scope.length; i++) {
        const c = scope[i];
        const d = haversineDistanceKm(
          latitude,
          longitude,
          c.latitude,
          c.longitude
        );
        if (d < nearestDist) {
          nearest = c;
          nearestDist = d;
        }
      }

      if (nearest) {
        setSelectedCountry(nearest.id);
      }
    },
    [filteredCountries, setSelectedCountry]
  );

  return (
    <>
      <color attach="background" args={["#020210"]} />

      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 3, 5]} intensity={1.2} />
      <directionalLight position={[-5, -1, -3]} intensity={0.3} />

      <Starfield />
      <Earth onSurfaceSelect={handleSurfaceSelect} />
      {selectedCountry && <SelectedCountryMarker country={selectedCountry} />}
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

// DOM overlay shown while GLB models / textures are streaming in.
// useProgress subscribes to THREE.DefaultLoadingManager, so it works
// outside the R3F Canvas.
function LoadingOverlay() {
  const { progress, active } = useProgress();
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-20 flex items-center justify-center bg-[#020210] transition-opacity duration-700 ${
        active ? "opacity-100" : "opacity-0"
      }`}
    >
      <div className="flex flex-col items-center gap-3">
        <div className="text-sm tracking-widest text-white/70">加载地理场景</div>
        <div className="h-1 w-48 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-emerald-400 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="text-xs text-white/40">{Math.round(progress)}%</div>
      </div>
    </div>
  );
}

// Catches model/texture load failures so a single bad asset doesn't blank
// the whole page. Must live outside the Canvas (R3F children aren't DOM).
class SceneErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="absolute inset-0 flex items-center justify-center bg-[#020210]">
          <div className="space-y-2 text-center">
            <p className="text-lg text-white/80">地理场景加载失败</p>
            <p className="text-sm text-white/40">请刷新页面重试</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function EarthScene() {
  return (
    <SceneErrorBoundary>
      <LoadingOverlay />
      <Canvas
        className="absolute inset-0 h-full w-full"
        camera={{ position: [0, 1.5, 5], fov: 45 }}
        gl={{ antialias: true, alpha: false }}
      >
        <SceneContent />
      </Canvas>
    </SceneErrorBoundary>
  );
}
