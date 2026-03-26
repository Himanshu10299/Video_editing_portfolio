import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-container">
        <div className="hero-panel nlm-panel">
          <div className="hero-content">
            <div className="section-tag">
              <span className="badge-dot"></span>
              Available for Freelance
            </div>
            
            <h1 className="hero-title">
              Attention isn't given,<br />
              <span className="highlight">It's Edited.</span>
            </h1>
            
            <p className="hero-subtitle">
              Professional video editing that transforms raw footage into compelling narratives. 
              Grounded in storytelling, elevated by precision.
            </p>
            
            <div className="hero-cta">
              <a href="#work" className="btn-primary-nlm">
                View Projects
              </a>
              <a href="#contact" className="btn-secondary-nlm">
                Let's Chat
              </a>
            </div>
          </div>
          
          <div className="hero-visual">
            <div className="visual-card card-1">
              <div className="card-header"><div className="dot"></div><div className="line"></div></div>
              <div className="card-body"></div>
            </div>
            <div className="visual-card card-2">
              <div className="card-header"><div className="dot"></div><div className="line"></div></div>
              <div className="card-body"></div>
            </div>
            <div className="visual-card card-3">
              <div className="card-header"><div className="dot"></div><div className="line"></div></div>
              <div className="card-body"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
