// src/ModelPage.js
import React, { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import anime from "animejs/lib/anime.es.js";
import { Html, useProgress } from "@react-three/drei";
import { Suspense } from "react";

function Loader({ onComplete }) {
  const { progress } = useProgress(); // actual model loading progress
  const [displayProgress, setDisplayProgress] = React.useState(0);

  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 2; // speed of progress (2% increments)
      if (start >= 100) {
        start = 100;
        clearInterval(interval);
        onComplete(); // trigger when loading is done
      }
      setDisplayProgress(start);
    }, 30); // interval speed in ms (30ms ~ 3 seconds to reach 100%)
    
    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <Html center>
      <div style={{ color: "#fff", fontSize: "1.5rem", textAlign: "center" }}>
        Loading {displayProgress}%
      </div>
    </Html>
  );
}


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
  const textRef = useRef(null);
  const currentY = useRef(0); // track the current text position

  useEffect(() => {
    const handleWheel = (e) => {
      scrollY.current += e.deltaY * 0.1;
    };
    window.addEventListener("wheel", handleWheel);

    const updateText = () => {
      // Target value (based on scroll)
      const targetY = scrollY.current * 0.2;

      // Apply inertia (lerp)
      currentY.current += (targetY - currentY.current) * 0.1;

      // Update text position/opacity directly
      if (textRef.current) {
        textRef.current.style.transform = `translateY(${currentY.current}px)`;
        textRef.current.style.opacity = Math.max(1 - scrollY.current / 500, 0);
      }

      requestAnimationFrame(updateText);
    };
    requestAnimationFrame(updateText);

    // Anime.js fade-in on page load
    if (textRef.current) {
      anime({
        targets: textRef.current,
        translateY: [100, 0],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutExpo",
      });
    }

    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <div style={{ height: "100vh", background: "#474747", overflow: "hidden", position: "relative" }}>
      {/* Text Overlay */}
      <div
        ref={textRef}
        style={{
          position: "absolute",
          top: "90%",
          width: "100%",
          textAlign: "center",
          fontSize: "4rem",
          fontWeight: "700",
          textTransform: "uppercase",
          color: "#fff",
          fontFamily: "Arial, sans-serif",
          willChange: "transform, opacity",
          opacity: 0,
        }}
      >
        Scroll to Rotate the Model
      </div>

      {/* 3D Canvas */}
      <Canvas style={{ height: "100vh" }} camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.3} /> {/* soft overall light */}
        <directionalLight 
        position={[0, 0, 5]} 
        intensity={2} 
        color={"#ffffff"} 
        />
        <pointLight position={[0, 5, 10]} intensity={1} />
        <Suspense fallback={<Loader />}>
            <Model scrollY={scrollY} />
        </Suspense>
        <OrbitControls enableZoom={false} />
      </Canvas>
    </div>
  );
}






