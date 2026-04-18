// Streaming service for movies and TV shows
// Uses vidsrc.xyz, vidsrc.vip, and superembed

export const getStreamingLinks = async (movieId, isTVShow = false, seasonNum = 1, episodeNum = 1) => {
  const tmdbId = movieId;
  
  let servers = [];
  
  if (isTVShow) {
    // TV Show streaming - use tv/ path with season and episode
    servers = [
      {
        server: "vidsrc TV",
        url: `https://vidsrc.xyz/embed/tv/${tmdbId}?season=${seasonNum}&episode=${episodeNum}`,
        quality: "720p"
      },
      {
        server: "vidsrc VIP TV",
        url: `https://vidsrc.vip/embed/tv/${tmdbId}.html?season=${seasonNum}&episode=${episodeNum}`,
        quality: "720p"
      },
      {
        server: "superembed TV", 
        url: `https://superembed.cc/embed/tv/${tmdbId}.html?season=${seasonNum}&episode=${episodeNum}`,
        quality: "720p"
      }
    ];
  } else {
    // Movie streaming
    servers = [
      {
        server: "vidsrc",
        url: `https://vidsrc.xyz/embed/movie/${tmdbId}`,
        quality: "1080p"
      },
      {
        server: "vidsrc VIP",
        url: `https://vidsrc.vip/embed/${tmdbId}`,
        quality: "1080p"
      },
      {
        server: "superembed", 
        url: `https://superembed.cc/embed/${tmdbId}.html`,
        quality: "720p"
      }
    ];
  }
  
  return servers;
};

export const getDownloadLinks = async () => {
  return [];
};

export default { getStreamingLinks, getDownloadLinks };