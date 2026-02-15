import { useEffect, useRef, useState } from 'react';
import './Hero.css';

const Hero = () => {
  const textRef = useRef(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    });

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero">
      <div className="hero-background">
        <div className="gradient-orb orb-1"></div>
        <div className="gradient-orb orb-2"></div>
        <div className="gradient-orb orb-3"></div>
      </div>
      
      <div className="hero-content" ref={textRef}>
        <div className={`hero-badge ${scrolled ? 'scrolled' : ''}`}>
          <span className="badge-dot"></span>
          Available for Freelance
        </div>
        
        <h1 className="hero-title">
          <span className="title-line">Crafting</span>
          <span className="title-line highlight">Cinematic</span>
          <span className="title-line">Stories</span>
        </h1>
        
        <p className="hero-subtitle">
          Video editing that transforms raw footage into compelling narratives.
          <br />
          Where every frame tells a story and every cut creates emotion.
        </p>
        
        <div className="hero-cta">
          <a href="#work" className="btn btn-primary">
            View My Work
          </a>
          <a href="#contact" className="btn btn-secondary">
            Let's Collaborate
          </a>
        </div>
        
        <div className="hero-stats">
          <div className="stat">
            <h3>500+</h3>
            <p>Projects Delivered</p>
          </div>
          <div className="stat">
            <h3>5+ Years</h3>
            <p>Experience</p>
          </div>
          <div className="stat">
            <h3>100+</h3>
            <p>Happy Clients</p>
          </div>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <p>Scroll to explore</p>
      </div>
    </section>
  );
};

export default Hero;
