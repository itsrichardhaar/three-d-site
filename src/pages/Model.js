// src/ModelPage.js
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";

function Model({ scrollY }) {
  const { scene } = useGLTF("/models/500px-z_test.glb");
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Recenter the model by computing its bounding box
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());

    scene.position.sub(center); // Move model so that its center is at (0,0,0)
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      // Target rotation based on scroll
      targetRotation.current.y = scrollY.current * 0.001;
      targetRotation.current.x = scrollY.current * 0.001;

      // Smooth interpolation
      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={3.5}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelPage() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      scrollY.current += e.deltaY * 0.1; // scroll sensitivity
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div style={{ height: "100vh", background: "#111", overflow: "hidden" }}>
      <Canvas style={{ height: "100vh" }} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Model scrollY={scrollY} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}



