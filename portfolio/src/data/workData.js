// ==============================================
// CATEGORIES CONFIGURATION
// ==============================================
// Control which categories appear in the filter sidebar
// Set enabled: false to hide a category from the UI
// Only categories with videos assigned will appear
// You can add new categories or remove existing ones

export const videoCategories = [
  { 
    id: 'Long form', 
    label: 'Long form',
    enabled: true,
    description: 'Long form videeo'
  },
  { 
    id: 'Short form', 
    label: 'Short form',
    enabled: true,
    description: 'Short form video'
  },
  { 
    id: '3D animation', 
    label: '3D Animation',
    enabled: true,
    description: '3D animated content'
  },
  { 
    id: '2D animation', 
    label: '2D Animation',
    enabled: true, 
    description: '2D animated content'
  },
  { 
    id: 'documentary', 
    label: 'Documentary',
    enabled: false, // Disabled - won't show in UI
    description: 'Documentary productions'
  },
  { 
    id: 'social', 
    label: 'Social Media',
    enabled: false, // Disabled - won't show in UI
    description: 'Content for social platforms'
  },
  { 
    id: 'motion', 
    label: 'Motion Graphics',
    enabled: false, // Disabled - won't show in UI
    description: 'Animated graphics and titles'
  }
  // Add more categories:
  // { id: 'new-category', label: 'New Category', enabled: true, description: 'Description' }
];

// ==============================================
// VIDEO CONFIGURATION
// ==============================================
// Add your YouTube videos here
// Available categories: commercial, music, corporate, wedding, documentary, social, motion
// (Only enabled categories from the configuration above will show in the UI)

export const youtubeVideos = [
    {
    url: "https://youtu.be/pPvP5rEGJPg",
    category: "Long form",
    tags: ["3D" ,"VFX" ]
  },
  // {
    //     url: "https://youtu.be/SrMWqhGbMQ0",
    //     category: "Long form",
    //     tags: ["faceless", "Documentary"]
    // },
    {
        url: "https://youtu.be/qS-VXEbQUoI",
        category: "Long form",
        tags: ["Podcast", "Intro"]
    },
    {
        url: "https://youtu.be/F6_lHN9fASM",
        category: "Long form",
        tags: ["faceless", "Documentary"]
    },
    {
        url: "https://youtu.be/dyUf5DqRNEY?si=iMPV0ecYZOb1Bghf",
        category: "Long form",
        tags: ["Game", "Memes"]
    },
    {
        url: "https://youtu.be/7fu_W8hDCzY",
        category: "Long form",
        tags: ["2D", "Animation "]
    },
    {
    url: "https://youtube.com/shorts/f7nxvhi1clU",
    category: "Short form",
    tags: ["Daily life"]
  },
  {
      url: "https://youtu.be/gXUDIr_vdqM",
      category: "Short form",
      tags: ["faceless", "Documentary"]
  },
  {
      url: "https://youtube.com/shorts/Xc4UUgsfvtg?feature=share",
      category: "Short form",
      tags: ["faceless", "Documentary"]
  },
  {
    url: "https://youtu.be/iI3fFBAG-b8",
    category: "3D animation",
    tags: ["Corporate", "Product"]
  },
  {
    url: "https://youtu.be/3JvZNcbtwos",
    category: "3D animation",
    tags: ["Corporate", "Product"]
  },
  {
    url: "https://youtu.be/Qg_2hUzbWV4",
    category: "3D animation",
    tags: ["Corporate", "Product"]
  },
   {
        url: "https://youtu.be/EAC2gQ3D-kc",
        category: "2D animation",
        tags: ["faceless", "Documentary"]
    },
     {
        url: "https://youtu.be/vlYJ5FiZ_Fs",
        category: "2D animation",
        tags: ["faceless", "Documentary"]
    },
  // Add more videos here with format:
  // { url: "YOUR_YOUTUBE_URL", category: "category_id", tags: ["Tag1", "Tag2"] }
];

// ==============================================
// HELPER FUNCTIONS (DO NOT EDIT BELOW)
// ==============================================

// Helper function to extract YouTube video ID from URL
export const extractVideoId = (url) => {
  // Handle YouTube Shorts URLs
  const shortsRegex = /youtube\.com\/shorts\/([^"&?\/\s]{11})/;
  const shortsMatch = url.match(shortsRegex);
  if (shortsMatch) return shortsMatch[1];
  
  // Handle regular YouTube URLs
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