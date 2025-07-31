// src/Home.js
import React, { useEffect, useState, useRef } from "react";
import anime from "animejs";
import { useNavigate } from "react-router-dom";
import '../App.css';
import Particles from '../components/Particles';
import LightRays from '../components/LightRays';




function Home() {
    const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const navLinksRef = useRef([]);
  const [transitioning, setTransitioning] = useState(false);
  const [revealed, setRevealed] = useState(false);

  const handleReveal = () => {
    setTransitioning(true);
    setTimeout(() => {
      setRevealed(true);
    }, 1200); // Match with CSS animation duration
  };

  useEffect(() => {

    const heroTimeline = anime.timeline({ autoplay: true });
    heroTimeline
      .add({
        targets: ".hero-title",
        translateY: [-50, 0],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutExpo",
      })
      .add({
        targets: ".hero-subtext",
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutExpo",
      })
      .add({
        targets: ".hero-btn",
        scale: [0.8, 1],
        opacity: [0, 1],
        duration: 800,
        easing: "easeOutElastic(1, .8)",
      });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              translateY: [50, 0],
              opacity: [0, 1],
              duration: 800,
              easing: "easeOutExpo",
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section);
    });
  }, []);

  return (
    <div className="App">
      <nav className="navbar">
        {["hero", "about", "services", "contact"].map((id, index) => (
          <a
            key={id}
            ref={(el) => (navLinksRef.current[index] = el)}
            href={`#${id}`}
          >
            {id.charAt(0).toUpperCase() + id.slice(1)}
          </a>
        ))}
      </nav>

      <section
  ref={(el) => (sectionsRef.current[0] = el)}
  id="hero"
  className="section section-hero"
  style={{ position: 'relative', overflow: 'hidden' }} // Add this style
>
  <Particles
    particleColors={['#ffffff', '#ffffff']}
    particleCount={900}
    particleSpread={10}
    speed={0.1}
    particleBaseSize={100}
    moveParticlesOnHover={true}
    alphaParticles={false}
    disableRotation={false}
  />
  <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
    <h1 className="hero-title">3D Animation Test</h1>
    <p className="hero-subtext">Scroll down to see more content.</p>
    <button className="hero-btn" onClick={() => navigate("/3d-model")}>
      View 3D Model
    </button>
  </div>
</section>


      <section
        ref={(el) => (sectionsRef.current[1] = el)}
        id="about"
        className="section section-alt"
        style={{ position: 'relative', overflow: 'hidden' }}
      >
        <LightRays
          raysOrigin="top-center"
          raysColor="#fff"
          raysSpeed={0.5}
          saturation={1}
          lightSpread={0.5}
          rayLength={3}
          followMouse={true}
          mouseInfluence={0.2}
          noiseAmount={0}
          distortion={0}
          pulsating={false}
          className="custom-rays"
        />
        <div className="hero-content" style={{ position: 'relative', zIndex: 1 }}>
          <h1 className="hero-title">Move mouse to control lights</h1>
          <p className="hero-subtext">Keep scrolling for more.</p>
        </div>
      </section>
      
      <div className="reveal">
      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        id="services"
        className="section section-hero"
      >
        <h2>Click the button to reveal</h2>
        <p>Reveal and scroll to see the next section.</p>
        <button className="hero-btn" onClick={handleReveal}>
            Click Here
          </button>
      </section>

      {transitioning && <div className="circle-reveal" />}

      {revealed && (
        <section className="next-section">
          <h2>Scroll to view next section</h2>
          <p>This is the next section revealed with a circle.</p>
        </section>
      )}

      </div>

      <section
        ref={(el) => (sectionsRef.current[3] = el)}
        id="contact"
        className="section section-alt"
      >
        <h2>Contact</h2>
        <p>Get in touch with us.</p>
      </section>
    </div>
  );
}

export default Home;

