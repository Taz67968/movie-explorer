// Free streaming API integration for actual movie streaming
// Uses Vidsrc and similar free movie streaming services

// Vidsrc - Free movie streaming (uses TMDB ID)
export const getStreamingLinks = async (movieId, movieTitle) => {
  // Clean movie title for URL
  const cleanTitle = (movieTitle || '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .substring(0, 50);

  // Multiple free streaming servers
  // These services scrape/aggregate movie streams
  const servers = [
    {
      name: "Vidsrc",
      baseUrl: "https://vidsrc.xyz/embed/movie",
      embedUrl: (id) => `https://vidsrc.xyz/embed/movie/${id}`,
      quality: "1080p"
    },
    {
      name: "Vidsrc VIP",
      baseUrl: "https://vidsrc.vip/embed",
      embedUrl: (id) => `https://vidsrc.vip/embed/${id}`,
      quality: "1080p"
    },
    {
      name: "SuperEmbed",
      baseUrl: "https://superembed.cc/embed",
      embedUrl: (id) => `https://superembed.cc/embed/${id}.html`,
      quality: "720p"
    },
    {
      name: "StreamWish",
      baseUrl: "https://streamwish.to/e",
      embedUrl: (title) => `https://streamwish.to/e/${cleanTitle}`,
      quality: "720p"
    },
    {
      name: "Vidplay",
      baseUrl: "https://playtubes.com/embed",
      embedUrl: (title) => `https://playtubes.com/embed/${cleanTitle}`,
      quality: "720p"
    },
    {
      name: "Filemoon",
      baseUrl: "https://filemoon.online/e",
      embedUrl: (title) => `https://filemoon.online/e/${cleanTitle}`,
      quality: "1080p"
    },
    {
      name: "Streamtape",
      baseUrl: "https://streamtape.com/e",
      embedUrl: (title) => `https://streamtape.com/e/${cleanTitle}`,
      quality: "720p"
    },
    {
      name: "Doodstream",
      baseUrl: "https://doodstream.com/e",
      embedUrl: (title) => `https://doodstream.com/e/${cleanTitle}`,
      quality: "720p"
    }
  ];

  // Create streaming links with movie ID and title
  return servers.map((server, index) => ({
    server: server.name,
    url: movieId ? server.embedUrl(movieId) : server.embedUrl(cleanTitle),
    quality: server.quality,
    isActive: index === 0
  }));
};

// For TV Shows
export const getTVStreamingLinks = async (tvId, season, episode) => {
  const cleanId = tvId || '';
  
  const servers = [
    {
      name: "Vidsrc TV",
      embedUrl: (id, s, e) => `https://vidsrc.xyz/embed/tv/${id}?season=${s}&episode=${e}`,
      quality: "720p"
    },
    {
      name: "SuperEmbed TV",
      embedUrl: (id, s, e) => `https://superembed.cc/embed/tv/${id}-${s}-${e}.html`,
      quality: "720p"
    }
  ];

  return servers.map((server, index) => ({
    server: server.name,
    url: server.embedUrl(cleanId, season, episode),
    quality: server.quality,
    isActive: index === 0
  }));
};

// Download links (placeholder - would need actual download sources)
export const getDownloadLinks = async (movieTitle) => {
  return [
    {
      server: "Server 1",
      url: "#",
      quality: "1080p",
      size: "2.4 GB"
    },
    {
      server: "Server 2",
      url: "#",
      quality: "720p",
      size: "1.8 GB"
    },
    {
      server: "Server 3", 
      url: "#",
      quality: "480p",
      size: "900 MB"
    }
  ];
};

export default { getStreamingLinks, getTVStreamingLinks, getDownloadLinks };