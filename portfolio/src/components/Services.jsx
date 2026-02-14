import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '🎬',
      title: 'Video Editing',
      description: 'Professional video editing with seamless transitions, color grading, and sound design that brings your vision to life.',
      features: ['Color Grading', 'Sound Design', 'Transitions', 'Visual Effects']
    },
    {
      icon: '✨',
      title: 'Motion Graphics',
      description: 'Eye-catching animated graphics, titles, and visual effects that enhance your storytelling.',
      features: ['2D/3D Animation', 'Logo Animation', 'Typography', 'Infographics']
    },
    {
      icon: '🎵',
      title: 'Music Videos',
      description: 'Dynamic music video editing synchronized to the beat with creative visual effects and transitions.',
      features: ['Beat Sync', 'Creative Effects', 'Color Grading', 'Performance Editing']
    },
    {
      icon: '🎯',
      title: 'Social Media Content',
      description: 'Short-form content optimized for social platforms with captions, graphics, and engaging edits.',
      features: ['Fast-paced Editing', 'Captions', 'Format Optimization', 'Engagement Hooks']
    },
    {
      icon: '🎪',
      title: 'Commercial & Brand',
      description: 'High-end commercial editing that showcases your products and services with cinematic quality.',
      features: ['Product Showcase', 'Brand Storytelling', 'High-end Finishing', 'Professional Quality']
    },
    {
      icon: '📹',
      title: 'Documentary',
      description: 'Compelling documentary editing with narrative structure, interviews, and emotional storytelling.',
      features: ['Interview Editing', 'Narrative Structure', 'Archival Integration', 'Sound Mixing']
    }
  ];

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

        <div className="services-grid">
          {services.map((service, index) => (
            <div 
              key={index} 
              className="service-card"
              style={{ animationDelay: `${index * 0.1}s` }}
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
