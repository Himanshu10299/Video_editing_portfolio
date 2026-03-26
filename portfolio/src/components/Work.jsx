import { useState, useEffect } from 'react';
import { processYouTubeVideos, videoCategories } from '../data/workData';
import './Work.css';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch YouTube videos on mount
  useEffect(() => {
    const loadVideos = async () => {
      setLoading(true);
      const videos = await processYouTubeVideos();
      setProjects(videos);
      
      if (videos.length > 0) {
        const firstCategory = videoCategories.find(cat => 
          cat.enabled !== false && videos.some(v => v.category === cat.id)
        );
        if (firstCategory) {
          setActiveFilter(firstCategory.id);
        }
      }
      
      setLoading(false);
    };
    loadVideos();
  }, []);

  // Stop inline playback on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedVideo]);

  const handleFilterChange = (filterId) => {
    setSelectedVideo(null);
    setActiveFilter(filterId);

    // Gently align the view to the top of the categories when switching
    // so the user doesn't get lost in the middle of a newly expanded grid, especially on mobile.
    setTimeout(() => {
      const categoryBar = document.querySelector('.work-categories-top');
      if (categoryBar) {
        const y = categoryBar.getBoundingClientRect().top + window.scrollY - 100; // 100px buffer for navbar
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };
  
  const categories = videoCategories
    .filter(cat => cat.enabled !== false)
    .filter(cat => projects.some(p => p.category === cat.id));

  const filteredProjects = projects.filter(p => p.category === activeFilter);

  const handlePlay = (project) => {
    setSelectedVideo(project);
  };

  const closeInlinePlayer = () => {
    setSelectedVideo(null);
  };

  return (
    <section id="work" className="work">
      <div className="section-header">
        <span className="section-tag">Resources</span>
        <h2 className="section-title">Project Sources</h2>
        <p className="section-subtitle">
          Select a category to view grounded work samples.
        </p>
      </div>

      <div className="work-container">
        <div className="work-sidebar nlm-panel">
          <div className="sidebar-group">
            <h3 className="sidebar-title">Categories</h3>
            <div className="filter-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`filter-item ${activeFilter === category.id ? 'active' : ''}`}
                  onClick={() => handleFilterChange(category.id)}
                >
                  <span className="filter-dot"></span>
                  <span className="filter-label">{category.label}</span>
                  <span className="filter-count">
                    {projects.filter(p => p.category === category.id).length}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="work-grid">
          {filteredProjects.map((project) => (
            <div key={project.id} className="work-card nlm-panel">
              <div className="card-source-info">
                <span className="source-icon">📄</span>
                <span className="source-name">{project.title}</span>
              </div>
              
              <div className="card-video-container">
                {selectedVideo?.id === project.id ? (
                  <iframe
                    className="inline-video-frame"
                    src={`https://www.youtube.com/embed/${project.videoId}?autoplay=1&rel=0`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ) : (
                  <div className="video-thumbnail-wrapper" onClick={() => handlePlay(project)}>
                    <img 
                      src={project.thumbnail} 
                      alt={project.title} 
                      className="video-thumbnail"
                    />
                    <div className="play-overlay">
                      <div className="play-button-nlm">
                        <svg viewBox="0 0 24 24" width="24" height="24">
                          <path fill="currentColor" d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="card-metadata">
                <div className="meta-row">
                  <span className="meta-label">ID:</span>
                  <span className="meta-value">{project.videoId}</span>
                </div>
                {project.date && (
                  <div className="meta-row">
                    <span className="meta-label">Updated:</span>
                    <span className="meta-value">{project.date}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Work;


