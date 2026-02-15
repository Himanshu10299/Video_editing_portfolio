// YouTube Video Data
// Add your videos with URL, category, and tags
// The system will automatically fetch the title from YouTube

export const youtubeVideos = [
  {
    url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    category: "music",
    tags: ["Music Video", "Classic", "interesting"]
  },
  {
    url: "https://www.youtube.com/watch?v=9bZkp7q19f0",
    category: "music",
    tags: ["Music Video", "Electronic"]
  },
  {
    url: "https://www.youtube.com/watch?v=ScMzIvxBSi4",
    category: "commercial",
    tags: ["Commercial", "Color Grading"]
  },
  {
    url: "https://youtu.be/drbuCll27ws?si=GBX0GB1WrZepJSoF",
    category: "corporate",
    tags: ["Corporate", "Product"]
  },
  // Add more videos here with format:
  // { url: "YOUR_YOUTUBE_URL", category: "category_id", tags: ["Tag1", "Tag2"] }
];

// Helper function to extract YouTube video ID from URL
export const extractVideoId = (url) => {
  const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
  const match = url.match(regex);
  return match ? match[1] : null;
};

// Helper function to get YouTube thumbnail URL
export const getYouTubeThumbnail = (videoId, quality = 'maxresdefault') => {
  return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
};

// Helper function to get YouTube embed URL
export const getYouTubeEmbedUrl = (videoId) => {
  return `https://www.youtube.com/embed/${videoId}`;
};

// Default categories for video classification
export const videoCategories = [
  { id: 'all', label: 'All Projects' },
  { id: 'commercial', label: 'Commercial' },
  { id: 'music', label: 'Music Videos' },
  { id: 'corporate', label: 'Corporate' },
  { id: 'wedding', label: 'Wedding' },
  { id: 'documentary', label: 'Documentary' },
  { id: 'social', label: 'Social Media' },
  { id: 'motion', label: 'Motion Graphics' }
];

// Fetch video title from YouTube oEmbed API
export const fetchYouTubeTitle = async (videoId) => {
  try {
    const response = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
    const data = await response.json();
    return data.title || `Video ${videoId}`;
  } catch (error) {
    console.error('Error fetching title:', error);
    return `Video ${videoId}`;
  }
};

// Process YouTube URLs into project data
export const processYouTubeVideos = async () => {
  const processedVideos = await Promise.all(
    youtubeVideos.map(async (video, index) => {
      // Handle both string URLs (legacy) and object format
      const url = typeof video === 'string' ? video : video.url;
      const category = typeof video === 'object' ? video.category : 'all';
      const tags = typeof video === 'object' && video.tags ? video.tags : ['Video Editing'];
      
      const videoId = extractVideoId(url);
      if (!videoId) return null;
      
      // Fetch the actual title from YouTube
      const title = await fetchYouTubeTitle(videoId);
      
      return {
        id: index + 1,
        title: title,
        category: category,
        description: `${category.charAt(0).toUpperCase() + category.slice(1)} video project`,
        thumbnail: getYouTubeThumbnail(videoId),
        embedUrl: getYouTubeEmbedUrl(videoId),
        youtubeUrl: url,
        videoId: videoId,
        tags: tags,
        duration: '' // Can be added manually if needed
      };
    })
  );
  
  return processedVideos.filter(Boolean);
};