import './Services.css';

const Services = () => {
  const services = [
    {
      icon: '🎬',
      title: 'Long-Form Editing',
      description: 'Narrative-driven feature edits with deliberate pacing and cohesive storytelling.'
    },
    {
      icon: '📽️',
      title: 'Documentaries',
      description: 'Interview-driven narratives with thoughtful structure and emotional resonance.'
    },
    {
      icon: '🎧',
      title: 'Podcast Editing',
      description: 'Clean, engaging audio with synced visuals and social-ready cutdowns.'
    },
    {
      icon: '🎮',
      title: 'Gaming Content',
      description: 'High-energy highlights with punchy motion graphics and beat-synced cuts.'
    }
  ];

  return (
    <section id="services" className="services">
      <div className="section-header">
        <span className="section-tag">Features</span>
        <h2 className="section-title">A new way to edit</h2>
        <p className="section-subtitle">
          Advanced storytelling tools grounded in your creative vision.
        </p>
      </div>

      <div className="services-container">
        <div className="services-grid">
          {services.map((service, index) => (
            <div key={index} className="service-panel nlm-panel">
              <div className="service-header">
                <span className="service-icon-bg">{service.icon}</span>
                <h3 className="service-title">{service.title}</h3>
              </div>
              <p className="service-description">{service.description}</p>
              <div className="service-footer">
                <span className="learn-more">Get started →</span>
              </div>
            </div>
          ))}
        </div>

        <div className="process-banner nlm-panel">
          <div className="process-content">
            <h3 className="process-title">Built for creators</h3>
            <p className="process-text">
              My workflow is designed to be seamless, collaborative, and entirely grounded in your original sources.
            </p>
          </div>
          <div className="process-steps-mini">
            <div className="mini-step">1. Consult</div>
            <div className="mini-step">2. Plan</div>
            <div className="mini-step">3. Edit</div>
            <div className="mini-step">4. Deliver</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;

