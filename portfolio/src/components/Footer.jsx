import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-content">
          <div className="footer-section">
            <div className="footer-logo">
              <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                <rect width="32" height="32" rx="8" fill="url(#gradient-footer)"/>
                <path d="M12 10l8 6-8 6V10z" fill="white"/>
                <defs>
                  <linearGradient id="gradient-footer" x1="0" y1="0" x2="32" y2="32">
                    <stop offset="0%" stopColor="#667eea"/>
                    <stop offset="100%" stopColor="#764ba2"/>
                  </linearGradient>
                </defs>
              </svg>
              <span>VideoEditor</span>
            </div>
            <p className="footer-description">
              Professional video editing services that transform your vision into cinematic reality.
            </p>
          </div>

          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="#work">Portfolio</a></li>
              <li><a href="#services">Services</a></li>
              <li><a href="#testimonials">Testimonials</a></li>
              <li><a href="#contact">Contact</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Services</h4>
            <ul>
              <li><a href="#services">Video Editing</a></li>
              <li><a href="#services">Motion Graphics</a></li>
              <li><a href="#services">Color Grading</a></li>
              <li><a href="#services">Sound Design</a></li>
            </ul>
          </div>

          <div className="footer-section">
            <h4>Connect</h4>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <rect x="2" y="2" width="16" height="16" rx="4" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="10" cy="10" r="3" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="15" cy="5" r="0.75" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M18 6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6z" stroke="currentColor" strokeWidth="1.5"/>
                  <path d="M8 13l4-3-4-3v6z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M19 3a8 8 0 0 1-2.5 1.2A4 4 0 0 0 9 7.2v.8A9.5 9.5 0 0 1 2 3s-4 9 5 13a11 11 0 0 1-7 2c9 5 20 0 20-11.5 0-.3 0-.5-.1-.8A7.7 7.7 0 0 0 19 3z" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
              <a href="#" aria-label="LinkedIn">
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M13 7a5 5 0 0 1 5 5v6h-3v-6a2 2 0 0 0-2-2 2 2 0 0 0-2 2v6h-3v-6a5 5 0 0 1 5-5zM2 8h3v10H2z" stroke="currentColor" strokeWidth="1.5"/>
                  <circle cx="3.5" cy="3.5" r="1.5" stroke="currentColor" strokeWidth="1.5"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {currentYear} VideoEditor. All rights reserved.</p>
          <div className="footer-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
