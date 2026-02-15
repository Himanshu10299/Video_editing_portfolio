import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { processYouTubeVideos, videoCategories } from '../data/workData';
import './Work.css';

const Work = () => {
  const [activeFilter, setActiveFilter] = useState('all');
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
      setLoading(false);
    };
    loadVideos();
  }, []);

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
  
  const categories = videoCategories;

  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  const handlePlay = (project) => {
    setSelectedVideo(project);
  };

  const closeModal = () => setSelectedVideo(null);

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
            {loading ? (
              <div className="loading-state">
                <div className="loading-spinner"></div>
                <p>Loading videos...</p>
              </div>
            ) : (
              <>
                <div className="projects-grid">
                  {filteredProjects.map((project) => (
                    <div 
                      key={project.id} 
                      className="project-card"
                    >
                      <div className="project-thumbnail">
                        <img src={project.thumbnail} alt={project.title} />
                        <div className="project-overlay">
                          <button className="play-button" onClick={() => handlePlay(project)}>
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
                {projects.length === 0 && !loading && (
                  <div className="empty-state">
                    <p>No videos yet. Add YouTube links in src/data/workData.js</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        {selectedVideo && (
          <div className="video-modal" onClick={closeModal}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="video-modal-close" onClick={closeModal} aria-label="Close video">×</button>
              <div className="video-responsive">
                <iframe
                  src={`${selectedVideo.embedUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="video-modal-meta">
                <h3>{selectedVideo.title}</h3>
                <p>{selectedVideo.description}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Work;
