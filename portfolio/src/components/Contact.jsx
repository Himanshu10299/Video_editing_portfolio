import { useState } from 'react';
import './Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: '',
    budget: '',
    message: ''
  });
  
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(import.meta.env.VITE_FORMSPREE_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setFormStatus({ type: 'success', message: 'Thank you! I will get back to you soon.' });
        setFormData({
          name: '',
          email: '',
          projectType: '',
          budget: '',
          message: ''
        });
        setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
      } else {
        setFormStatus({ type: 'error', message: 'Oops! There was a problem submitting your form.' });
        setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({ type: 'error', message: 'Oops! There was a problem submitting your form.' });
      setTimeout(() => setFormStatus({ type: '', message: '' }), 5000);
    }
  };

  return (
    <section id="contact" className="contact">
      <div className="section-header">
        <span className="section-tag">Collaboration</span>
        <h2 className="section-title">Ready to start?</h2>
        <p className="section-subtitle">
          Connect with me to discuss how we can ground your next project in cinematic excellence.
        </p>
      </div>

      <div className="contact-container nlm-panel">
        <div className="contact-info">
          <div className="info-card">
            <h3 className="info-title">Contact Information</h3>
            <p className="info-subtitle">I'm currently available for full-time and freelance projects.</p>
            
            <div className="contact-links-list">
              <a href="mailto:tomarhimanshuofficial@gmail.com" className="contact-link-item">
                <span className="link-icon">📧</span>
                <span className="link-text">tomarhimanshuofficial@gmail.com</span>
              </a>
              <div className="contact-link-item">
                <span className="link-icon">💬</span>
                <span className="link-text">Response within 24 hours</span>
              </div>
            </div>

            <div className="social-links-nlm">
              <a href="https://www.instagram.com/himanshu.editz" target="_blank" rel="noreferrer" className="social-icon">Instagram</a>
              <a href="#" className="social-icon">LinkedIn</a>
              <a href="#" className="social-icon">Twitter</a>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Full Name</label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleChange} 
                placeholder="Your name" 
                required 
              />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={handleChange} 
                placeholder="your@email.com" 
                required 
              />
            </div>
          </div>
          <div className="form-group">
            <label>Project Brief</label>
            <textarea 
              name="message" 
              value={formData.message} 
              onChange={handleChange} 
              placeholder="Tell me about your project..." 
              required 
            />
          </div>
          <button type="submit" className="btn-primary-nlm full-width">
            Send Inquiry
          </button>
          
          {formStatus.message && (
            <div className={`form-status ${formStatus.type}`}>
              {formStatus.message}
            </div>
          )}
        </form>
      </div>
    </section>
  );
};

export default Contact;
