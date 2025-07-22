import React from "react";
import "./App.css";

function App() {
  return (
    <div className="App">
      {/* Navigation */}
      <nav className="navbar">
        <a href="#hero">Home</a>
        <a href="#about">About</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </nav>

      {/* Sections */}
      <section id="hero" className="section section-hero">
        <h1>3D Animation Test</h1>
      </section>

      <section id="about" className="section section-alt">
        <h2>About Us</h2>
        <p>This is the about section.</p>
      </section>

      <section id="services" className="section section-hero">
        <h2>Our Services</h2>
        <p>We offer great services.</p>
      </section>

      <section id="contact" className="section section-alt">
        <h2>Contact</h2>
        <p>Get in touch with us.</p>
      </section>
    </div>
  );
}

export default App;

