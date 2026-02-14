import { useState, useEffect } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: 'Sarah Mitchell',
      role: 'Music Artist',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
      rating: 5,
      text: 'Absolutely incredible work! The editing transformed my music video into something beyond my imagination. The attention to detail and creative vision is outstanding.',
      projects: 12
    },
    {
      name: 'James Chen',
      role: 'YouTuber',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
      rating: 5,
      text: 'Best editor I\'ve worked with! Fast turnaround, amazing communication, and the final product always exceeds expectations. My audience loves the content.',
      projects: 24
    },
    {
      name: 'Emily Rodriguez',
      role: 'Brand Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&q=80',
      rating: 5,
      text: 'Professional, creative, and reliable. Delivered our commercial campaign on time with stunning quality. Will definitely work together again!',
      projects: 8
    },
    {
      name: 'Michael Thompson',
      role: 'Wedding Filmmaker',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
      rating: 5,
      text: 'The emotional storytelling and cinematic editing brought tears to the couple\'s eyes. This editor truly understands how to capture special moments.',
      projects: 15
    },
    {
      name: 'Lisa Anderson',
      role: 'Tech Startup CEO',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&q=80',
      rating: 5,
      text: 'Our product launch video was a game-changer! The sleek editing and motion graphics perfectly showcased our innovation. Highly recommended!',
      projects: 6
    }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [testimonials.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="testimonials">
      <div className="testimonials-container">
        <div className="section-header">
          <span className="section-tag">Client Reviews</span>
          <h2 className="section-title">What Clients Say</h2>
          <p className="section-subtitle">
            Trusted by creators, brands, and businesses worldwide
          </p>
        </div>

        <div className="testimonials-slider">
          <div 
            className="testimonials-track"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card">
                <div className="rating">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <svg key={i} width="20" height="20" viewBox="0 0 20 20" fill="#fbbf24">
                      <path d="M10 1l2.5 6.5L19 8l-5.5 4.5L15 19l-5-3.5L5 19l1.5-6.5L1 8l6.5-.5L10 1z"/>
                    </svg>
                  ))}
                </div>
                
                <p className="testimonial-text">"{testimonial.text}"</p>
                
                <div className="testimonial-author">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="author-image"
                  />
                  <div className="author-info">
                    <h4 className="author-name">{testimonial.name}</h4>
                    <p className="author-role">{testimonial.role}</p>
                    <p className="projects-count">{testimonial.projects} projects completed</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="slider-dots">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="stats-banner">
          <div className="stat-item">
            <h3>500+</h3>
            <p>Projects Completed</p>
          </div>
          <div className="stat-item">
            <h3>200+</h3>
            <p>Happy Clients</p>
          </div>
          <div className="stat-item">
            <h3>5.0</h3>
            <p>Average Rating</p>
          </div>
          <div className="stat-item">
            <h3>5+ Years</h3>
            <p>Experience</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
