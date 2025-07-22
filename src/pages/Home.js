// src/Home.js
import React, { useEffect, useRef } from "react";
import anime from "animejs";
import { useNavigate } from "react-router-dom";
import '../App.css';

function Home() {
    const navigate = useNavigate();
  const sectionsRef = useRef([]);
  const navLinksRef = useRef([]);

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
      >
        <div className="hero-content">
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
      >
        <h2>About Us</h2>
        <p>This is the about section.</p>
      </section>

      <section
        ref={(el) => (sectionsRef.current[2] = el)}
        id="services"
        className="section section-hero"
      >
        <h2>Our Services</h2>
        <p>We offer great services.</p>
      </section>

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

