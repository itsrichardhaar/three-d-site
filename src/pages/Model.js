// src/ModelPage.js
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function Model({ scrollY }) {
  const { scene } = useGLTF("/models/500px-z_test.glb");
  const ref = useRef();
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame(() => {
    if (ref.current) {
      // Update target rotation based on "scroll"
      targetRotation.current.y = scrollY.current * 0.005;
      targetRotation.current.x = scrollY.current * 0.002;

      // Smoothly interpolate to target
      ref.current.rotation.y += (targetRotation.current.y - ref.current.rotation.y) * 0.1;
      ref.current.rotation.x += (targetRotation.current.x - ref.current.rotation.x) * 0.1;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
}


export default function ModelPage() {
  const scrollY = useRef(0);

  useEffect(() => {
    const handleWheel = (e) => {
      // Increase or decrease the scrollY value with wheel delta
      scrollY.current += e.deltaY * 0.1; // adjust 0.1 for sensitivity
    };
    window.addEventListener("wheel", handleWheel);
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
      <div style={{ height: "100vh", background: "#111", overflow: "hidden" }}>
      {/* Return Home Link */}
      <div
        onClick={() => navigate("/")}
        style={{
          position: "absolute",
          top: "20px",
          left: "20px",
          color: "white",
          cursor: "pointer",
          fontSize: "18px",
          display: "flex",
          alignItems: "center",
          gap: "6px",
          zIndex: 10
        }}
      >
        <span style={{ fontSize: "20px" }}>←</span> Return Home
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

