import { useState, useRef, useLayoutEffect, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { processYouTubeVideos, videoCategories } from '../data/workData';
import './Work.css';

const VISIBLE_CARDS = 3; // How many stacked cards are visible behind the active one

const Work = ({ onVideoOpen = () => {}, onVideoClose = () => {} }) => {
  const [activeFilter, setActiveFilter] = useState('');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
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

  // Cleanup: restore scroll when component unmounts
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, []);

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedVideo) {
        setSelectedVideo(null);
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
        onVideoClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [selectedVideo, onVideoClose]);

  const handleFilterChange = (filterId) => {
    if (typeof window !== 'undefined') {
      preservedScrollRef.current = window.scrollY;
    }
    setActiveFilter(filterId);
    setCurrentIndex(0); // Reset to first card on filter change
  };

  useLayoutEffect(() => {
    if (typeof window === 'undefined') return;
    window.scrollTo({ top: preservedScrollRef.current });
  }, [activeFilter]);
  
  const categories = videoCategories
    .filter(cat => cat.enabled !== false)
    .filter(cat => projects.some(p => p.category === cat.id));

  const filteredProjects = projects.filter(p => p.category === activeFilter);

  const handlePlay = (project) => {
    setSelectedVideo(project);
    onVideoOpen();
    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedVideo(null);
    onVideoClose();
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'unset';
  };

  const goNext = useCallback(() => {
    if (isAnimating || currentIndex >= filteredProjects.length - 1) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev + 1);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex, filteredProjects.length]);

  const goPrev = useCallback(() => {
    if (isAnimating || currentIndex <= 0) return;
    setIsAnimating(true);
    setCurrentIndex(prev => prev - 1);
    setTimeout(() => setIsAnimating(false), 500);
  }, [isAnimating, currentIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e) => {
      if (selectedVideo) return;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
        e.preventDefault();
        goNext();
      }
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
        e.preventDefault();
        goPrev();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [selectedVideo, goNext, goPrev]);

  // Get card style based on position in stack
  const getCardStyle = (index) => {
    const offset = index - currentIndex;
    
    // Cards before current (already passed) — hide them
    if (offset < 0) {
      return {
        transform: 'translateY(-120%) scale(0.9)',
        opacity: 0,
        zIndex: 0,
        pointerEvents: 'none',
      };
    }
    
    // Current active card
    if (offset === 0) {
      return {
        transform: 'translateY(0) scale(1)',
        opacity: 1,
        zIndex: VISIBLE_CARDS + 2,
        pointerEvents: 'auto',
      };
    }
    
    // Cards stacked behind (visible peek)
    if (offset <= VISIBLE_CARDS) {
      const translateY = offset * 35; // Reduced offset for tighter stack
      const scale = 1 - offset * 0.05; 
      const opacity = 1 - offset * 0.2; 
      return {
        transform: `translateY(${translateY}px) scale(${scale})`,
        opacity,
        zIndex: VISIBLE_CARDS + 1 - offset,
        pointerEvents: 'none',
      };
    }
    
    // Cards further back — hidden
    return {
      transform: `translateY(${VISIBLE_CARDS * 35 + 10}px) scale(${1 - VISIBLE_CARDS * 0.05})`,
      opacity: 0,
      zIndex: 0,
      pointerEvents: 'none',
    };
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
                      {projects.filter(p => p.category === category.id).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Stacked Video Cards */}
          <div className="projects-wrapper">
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
              <>
                {/* Card counter */}
                <div className="stack-counter">
                  <span className="stack-counter-current">{String(currentIndex + 1).padStart(2, '0')}</span>
                  <span className="stack-counter-divider">/</span>
                  <span className="stack-counter-total">{String(filteredProjects.length).padStart(2, '0')}</span>
                </div>

                <div className="stack-container-wrapper">
                  {/* Desktop Prev Button */}
                  <button
                    className={`stack-nav-arrow stack-nav-prev-desktop ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous video"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Card Stack */}
                  <div className="card-stack" style={{ height: 'clamp(260px, 32vw, 400px)' }}>
                    {filteredProjects.map((project, index) => {
                      const style = getCardStyle(index);
                      return (
                        <div
                          key={project.id}
                          className={`stack-card ${index === currentIndex ? 'stack-card--active' : ''}`}
                          style={{
                            ...style,
                            transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                          }}
                        >
                          <div className="stack-card-thumbnail" onClick={() => handlePlay(project)}>
                            <img src={project.thumbnail} alt={project.title} />
                            <div className="stack-card-overlay">
                              <button className="play-button" onClick={(e) => { e.stopPropagation(); handlePlay(project); }}>
                                <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                                  <path d="M8 5.14v14.72L19 12 8 5.14z" fill="currentColor"/>
                                </svg>
                              </button>
                            </div>
                            {/* Bottom info bar on the thumbnail */}
                            <div className="stack-card-info">
                              <h3 className="stack-card-title">{project.title}</h3>
                              <div className="stack-card-tags">
                                {project.tags.map((tag, i) => (
                                  <span key={i} className="tag">{tag}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Desktop Next Button */}
                  <button
                    className={`stack-nav-arrow stack-nav-next-desktop ${currentIndex >= filteredProjects.length - 1 ? 'disabled' : ''}`}
                    onClick={goNext}
                    disabled={currentIndex >= filteredProjects.length - 1}
                    aria-label="Next video"
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>

                {/* Navigation Arrows (Mobile) & Dots */}
                <div className="stack-nav">
                  <button
                    className={`stack-nav-btn stack-nav-prev-mobile ${currentIndex === 0 ? 'disabled' : ''}`}
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    aria-label="Previous video"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="15 18 9 12 15 6" />
                    </svg>
                  </button>

                  {/* Progress dots */}
                  <div className="stack-dots">
                    {filteredProjects.map((_, i) => (
                      <button
                        key={i}
                        className={`stack-dot ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                          if (!isAnimating) {
                            setIsAnimating(true);
                            setCurrentIndex(i);
                            setTimeout(() => setIsAnimating(false), 500);
                          }
                        }}
                        aria-label={`Go to video ${i + 1}`}
                      />
                    ))}
                  </div>

                  <button
                    className={`stack-nav-btn stack-nav-next-mobile ${currentIndex >= filteredProjects.length - 1 ? 'disabled' : ''}`}
                    onClick={goNext}
                    disabled={currentIndex >= filteredProjects.length - 1}
                    aria-label="Next video"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="9 18 15 12 9 6" />
                    </svg>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
        {selectedVideo && createPortal(
          <div className="video-modal" onClick={closeModal}>
            <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="video-responsive">
                <iframe
                  src={`${selectedVideo.embedUrl}?autoplay=1`}
                  title={selectedVideo.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <button className="video-modal-close" onClick={closeModal} aria-label="Close video">Close</button>
            </div>
          </div>,
          document.body
        )}
      </div>
    </section>
  );
};

export default Work;
