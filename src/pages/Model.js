import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import { useNavigate } from "react-router-dom";

function Model({ scrollY }) {
  const { scene } = useGLTF("/models/500px-z_test.glb");
  const ref = useRef();

  useFrame(() => {
    if (ref.current) {
      ref.current.rotation.y = scrollY.current * 0.005;
      ref.current.rotation.x = scrollY.current * 0.002;
    }
  });

  return <primitive ref={ref} object={scene} scale={1.5} />;
}

export default function ModelPage() {
  const scrollY = useRef(0);
  const navigate = useNavigate();

  useEffect(() => {
    const handleWheel = (e) => {
      scrollY.current += e.deltaY * 0.1;
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


