import { useEffect, useRef } from 'react';
import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '🎬',
      title: 'Long-Form Video Editing',
      description: 'Feature-length and series edits with deliberate pacing, polished grading, and cohesive storytelling.',
      features: ['Narrative Pacing', 'Color Grading', 'Sound Design', 'B-roll Integration']
    },
    {
      icon: '📽️',
      title: 'Documentary Editing',
      description: 'Interview-driven narratives with thoughtful structure, archival integration, and emotional resonance.',
      features: ['Interview Editing', 'Story Structure', 'Archival Integration', 'Sound Mixing']
    },
    {
      icon: '🎧',
      title: 'Podcast Editing',
      description: 'Clean, engaging podcasts with crisp audio, synced visuals, and social-ready cutdowns.',
      features: ['Audio Cleanup', 'Multi-cam Sync', 'Dynamic Captions', 'Social Cutdowns']
    },
    {
      icon: '🧊',
      title: '3D Production',
      description: 'Stylized 3D assets, animation, and compositing that add depth and polish to your visuals.',
      features: ['Modeling & Texturing', 'Animation', 'Compositing', 'Render Optimization']
    },
    {
      icon: '🎮',
      title: 'Gaming Videos',
      description: 'High-energy edits for streams and highlights with punchy motion graphics and beat-synced cuts.',
      features: ['Highlight Reels', 'Callouts & Overlays', 'Beat-synced Cuts', 'Engagement Hooks']
    }
  ];

  const loopedServices = [...services, ...services];
  const scrollRef = useRef(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let frameId;
    let last = performance.now();
    let half = container.scrollWidth / 2;
    if (!half) return;

    const updateMetrics = () => {
      half = container.scrollWidth / 2;
      if (!half) return;
      // keep position within loop after resize
      container.scrollLeft = container.scrollLeft % half;
    };

    const pxPerSec = 18; // smoother pace

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;
      if (!half) {
        updateMetrics();
      }
      const wrapWidth = half || 1;
      const next = container.scrollLeft + pxPerSec * dt;
      const wrapped = next >= wrapWidth ? next - wrapWidth : next < 0 ? next + wrapWidth : next;
      container.scrollLeft = wrapped;
      frameId = requestAnimationFrame(tick);
    };

    updateMetrics();
    frameId = requestAnimationFrame(tick);
    window.addEventListener('resize', updateMetrics);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', updateMetrics);
    };
  }, []);

  return (
    <section id="services" className="services">
      <div className="services-container">
        <div className="section-header">
          <span className="section-tag">What I Do</span>
          <h2 className="section-title">Services</h2>
          <p className="section-subtitle">
            Comprehensive video editing solutions tailored to your needs
          </p>
        </div>

        <div className="services-grid" ref={scrollRef}>
          {loopedServices.map((service, index) => (
            <div
              key={`${service.title}-${index}`}
              className="service-card"
              style={{ animationDelay: `${(index % services.length) * 0.1}s` }}
            >
              <div className="service-icon">{service.icon}</div>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-description">{service.description}</p>
              <ul className="service-features">
                {service.features.map((feature, i) => (
                  <li key={i}>
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M13.5 4.5L6 12L2.5 8.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="process-section">
          <h3 className="process-title">My Process</h3>
          <div className="process-steps">
            <div className="process-step">
              <div className="step-number">01</div>
              <h4>Consultation</h4>
              <p>Understanding your vision, goals, and project requirements</p>
            </div>
            <div className="process-step">
              <div className="step-number">02</div>
              <h4>Planning</h4>
              <p>Creating a detailed timeline and creative direction</p>
            </div>
            <div className="process-step">
              <div className="step-number">03</div>
              <h4>Editing</h4>
              <p>Crafting your story with professional editing techniques</p>
            </div>
            <div className="process-step">
              <div className="step-number">04</div>
              <h4>Delivery</h4>
              <p>Final touches and delivering in your preferred format</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
