import { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/mylogo.png';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <span>Portfolio</span>
        </a>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#work" onClick={closeMobileMenu}>Work</a>
          <a href="#services" onClick={closeMobileMenu}>Services</a>
          <a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a>
          <a href="#contact" onClick={closeMobileMenu}>Contact</a>
          <a href="#contact" className="nav-cta" onClick={closeMobileMenu}>
            Start a Project
          </a>
        </div>

        <button 
          className={`mobile-menu-button ${mobileMenuOpen ? 'active' : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
