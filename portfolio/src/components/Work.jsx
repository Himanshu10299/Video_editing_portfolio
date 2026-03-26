import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { processYouTubeVideos, videoCategories } from '../data/workData';
import './Work.css';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const preservedScrollRef = useRef(0);

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
      <div className="work-container">
        <div className="section-header">
          <span className="section-tag">Portfolio</span>
          <h2 className="section-title">Explore My Work</h2>
          <p className="section-subtitle">
            A selection of projects showcasing various styles and techniques
          </p>
        </div>
        
        {/* Categories Bar (Top) */}
        <div className="work-categories-top">
          <div className="filter-list-horizontal">
            {categories.map(category => (
              <button
                key={category.id}
                className={`filter-item ${activeFilter === category.id ? 'active' : ''}`}
                onClick={() => handleFilterChange(category.id)}
              >
                <span className="filter-label">{category.label}</span>
                <span className="filter-count">
                  {projects.filter(p => p.category === category.id).length}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="work-content-grid">
          {loading ? (
            <div className="loading-state">
              <div className="loading-spinner"></div>
              <p>Loading videos...</p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <div className="empty-state">
              <p>No videos yet. Add YouTube links in src/data/workData.js</p>
            </div>
          ) : (
            <div className="projects-grid">
              {filteredProjects.map((project, index) => {
                const isPlaying = selectedVideo?.id === project.id;
                return (
                  <div 
                    key={project.id} 
                    className="grid-card"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="card-thumbnail">
                      {isPlaying ? (
                        <div className="video-responsive inline-video-player">
                          <iframe
                            src={`${project.embedUrl}?autoplay=1&rel=0`}
                            title={project.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                          />
                          <button
                            className="inline-video-close close-player-btn"
                            onClick={closeInlinePlayer}
                            aria-label="Close video"
                            style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 10 }}
                          >
                            ×
                          </button>
                        </div>
                      ) : (
                        <>
                          <img src={project.thumbnail} alt={project.title} />
                          <div className="card-overlay" onClick={(e) => { e.stopPropagation(); handlePlay(project); }}>
                            <button className="play-btn" aria-label={`Play ${project.title}`}>
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M8 5v14l11-7z"/>
                              </svg>
                            </button>
                            <div className="card-info">
                              <h3 className="card-title">{project.title}</h3>
                              <div className="card-tags">
                                {project.tags.map((tag, i) => (
                                  <span key={i} className="tag">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Work;
