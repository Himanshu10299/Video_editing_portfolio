import { useState, useEffect } from 'react';
import './Navbar.css';
import logo from '../assets/mylogotr.png';

const Navbar = ({ videoOpen = false }) => {
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
    <nav className={`navbar ${scrolled ? 'scrolled' : ''} ${videoOpen ? 'hidden' : ''}`}>
      <div className="navbar-container">
        <a href="#" className="logo">
          <img src={logo} alt="Logo" className="logo-image" />
          <div className="logo-text-stack">
            <span className={`logo-name ${scrolled ? 'hidden' : ''}`}>Himanshu Tomar</span>
            <div className={`freelance-badge ${scrolled ? 'visible' : ''}`}>
              <span className="badge-dot"></span>
              Available for Freelance
            </div>
          </div>
        </a>

        <div className={`nav-links ${mobileMenuOpen ? 'active' : ''}`}>
          <a href="#work" onClick={closeMobileMenu}>Work</a>
          <a href="#services" onClick={closeMobileMenu}>Services</a>
          {/* <a href="#testimonials" onClick={closeMobileMenu}>Testimonials</a> */}
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
