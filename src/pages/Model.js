// src/ModelPage.js
import React, { useRef, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import anime from "animejs/lib/anime.es.js";

function Model({ scrollY }) {
  const { scene } = useGLTF("/models/500px-z_test-2.glb");
  const groupRef = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  // Recenter the model
  useEffect(() => {
    const box = new THREE.Box3().setFromObject(scene);
    const center = box.getCenter(new THREE.Vector3());
    scene.position.sub(center);
  }, [scene]);

  useFrame(() => {
    if (groupRef.current) {
      targetRotation.current.y = scrollY.current * 0.001;
      targetRotation.current.x = scrollY.current * 0.001;

      groupRef.current.rotation.y +=
        (targetRotation.current.y - groupRef.current.rotation.y) * 0.1;
      groupRef.current.rotation.x +=
        (targetRotation.current.x - groupRef.current.rotation.x) * 0.1;
    }
  });

  return (
    <group ref={groupRef} scale={4.5}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelPage() {
  const scrollY = useRef(0);
  const [textStyle, setTextStyle] = useState({ transform: "translateY(0px)", opacity: 1 });

  useEffect(() => {
    const handleWheel = (e) => {
      scrollY.current += e.deltaY * 0.1;
    };
    window.addEventListener("wheel", handleWheel);

    const updateText = () => {
      const y = scrollY.current;
      setTextStyle({
        transform: `translateY(${y * 0.2}px)`, // parallax-like effect
        opacity: Math.max(1 - y / 500, 0), // fade out when scrolling
      });
      requestAnimationFrame(updateText);
    };
    requestAnimationFrame(updateText);

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div style={{ height: "100vh", background: "#474747", overflow: "hidden", position: "relative" }}>
      {/* Text Overlay */}
      <div
        style={{
          position: "absolute",
          top: "90%",
          width: "100%",
          textAlign: "left",
          fontSize: "4rem",
          fontWeight: "700",
          textTransform: "uppercase",
          left: "5%",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          transition: "transform 0.1s linear, opacity 0.2s ease-out",
          ...textStyle,
        }}
      >
        Scroll to Rotate the Model
      </div>

      {/* 3D Canvas */}
      <Canvas style={{ height: "100vh" }} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} />
        <Model scrollY={scrollY} />
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}





