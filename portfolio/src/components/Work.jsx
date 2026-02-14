import { useState, useRef, useLayoutEffect } from 'react';
import './Work.css';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const preservedScrollRef = useRef(0);

  const handleFilterChange = (filterId) => {
    if (typeof window !== 'undefined') {
      preservedScrollRef.current = window.scrollY;
    }
    setActiveFilter(filterId);
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: preservedScrollRef.current });
  }, [activeFilter]);
  
  const projects = [
    {
      id: 1,
      title: 'Luxury Brand Commercial',
      category: 'commercial',
      description: 'High-end fashion commercial with cinematic color grading',
      thumbnail: 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800&q=80',
      tags: ['Color Grading', 'Motion Graphics', 'Sound Design'],
      duration: '2:30'
    },
    {
      id: 2,
      title: 'Music Video - Electronic',
      category: 'music',
      description: 'Dynamic editing with synchronized beat matching',
      thumbnail: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&q=80',
      tags: ['Beat Sync', 'VFX', 'Color Grading'],
      duration: '3:45'
    },
    {
      id: 3,
      title: 'Tech Product Launch',
      category: 'corporate',
      description: 'Sleek product showcase with animated infographics',
      thumbnail: 'https://images.unsplash.com/photo-1551817958-d9d86fb29431?w=800&q=80',
      tags: ['Motion Graphics', 'Typography', 'Sound Design'],
      duration: '1:20'
    },
    {
      id: 4,
      title: 'Destination Wedding Film',
      category: 'wedding',
      description: 'Emotional storytelling with cinematic cinematography',
      thumbnail: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
      tags: ['Color Grading', 'Sound Design', 'Storytelling'],
      duration: '8:15'
    },
    {
      id: 5,
      title: 'Documentary Short',
      category: 'documentary',
      description: 'Compelling narrative with interview editing',
      thumbnail: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80',
      tags: ['Interview Editing', 'Sound Design', 'Color Grading'],
      duration: '12:30'
    },
    {
      id: 6,
      title: 'Social Media Campaign',
      category: 'social',
      description: 'Fast-paced edits optimized for social platforms',
      thumbnail: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&q=80',
      tags: ['Quick Cuts', 'Captions', 'Format Optimization'],
      duration: '0:30'
    },
    {
      id: 7,
      title: 'YouTube Channel Intro',
      category: 'motion',
      description: 'Animated logo reveal with dynamic transitions',
      thumbnail: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80',
      tags: ['Motion Graphics', 'Animation', 'Logo Animation'],
      duration: '0:15'
    },
    {
      id: 8,
      title: 'Corporate Training Video',
      category: 'corporate',
      description: 'Professional editing with clear visual communication',
      thumbnail: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&q=80',
      tags: ['Captions', 'Graphics', 'Voice Over'],
      duration: '5:45'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'commercial', label: 'Commercial' },
    { id: 'music', label: 'Music Videos' },
    { id: 'corporate', label: 'Corporate' },
    { id: 'wedding', label: 'Wedding' },
    { id: 'documentary', label: 'Documentary' },
    { id: 'social', label: 'Social Media' },
    { id: 'motion', label: 'Motion Graphics' }
  ];

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <section id="work" className="work">
      <div className="work-container">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Explore My Work</h2>
          <p className="section-subtitle">
            A selection of projects showcasing various styles and techniques
          </p>
        </div>

        <div className="work-content">
          {/* Filter Sidebar */}
          <aside className="filter-sidebar">
            <div className="filter-sidebar-inner">
              <h3 className="filter-title">Categories</h3>
              <div className="filter-list">
                {categories.map(category => (
                  <button
                    key={category.id}
                    className={`filter-item ${activeFilter === category.id ? 'active' : ''}`}
                      onClick={() => handleFilterChange(category.id)}
                  >
                    <span className="filter-label">{category.label}</span>
                    <span className="filter-count">
                      {category.id === 'all' 
                        ? projects.length 
                        : projects.filter(p => p.category === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Projects Grid */}
          <div className="projects-wrapper">
            <div className="projects-grid">
              {filteredProjects.map((project) => (
                <div 
                  key={project.id} 
                  className="project-card"
                >
                  <div className="project-thumbnail">
                    <img src={project.thumbnail} alt={project.title} />
                    <div className="project-overlay">
                      <button className="play-button">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                          <path d="M8 5.14v14.72L19 12 8 5.14z" fill="currentColor"/>
                        </svg>
                        Play Video
                      </button>
                    </div>
                    <div className="duration-badge">{project.duration}</div>
                  </div>
                  
                  <div className="project-info">
                    <h3 className="project-title">{project.title}</h3>
                    <p className="project-description">{project.description}</p>
                    
                    <div className="project-tags">
                      {project.tags.map((tag, i) => (
                        <span key={i} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
