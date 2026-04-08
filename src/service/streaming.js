// Streaming service - try different embed sources
// Note: vidsrc sites are unreliable, try alternatives

export const getStreamingLinks = async (movieId, isTVShow = false, seasonNum = 1, episodeNum = 1) => {
  const tmdbId = movieId;
  console.log('Getting streams for ID:', tmdbId, 'TV:', isTVShow);
  
  let servers = [];
  
  if (isTVShow) {
    // TV Shows - try different embed sources
    servers = [
      { server: "TMTP 1", url: `https://tmtpflix.top/embed/tv/${tmdbId}`, quality: "720p" },
      { server: "MovieAPI", url: `https://moviesapi.cx/tv/${tmdbId}`, quality: "720p" },
      { server: "Super", url: `https://superembed.cc/embed/tv/${tmdbId}.html`, quality: "720p" }
    ];
  } else {
    // Movies - use different sources (avoid vidsrc which shows wrong movie)
    servers = [
      { server: "VoeRef", url: `https://voe.tv/e/${tmdbId}`, quality: "1080p" },
      { server: "SuperE", url: `https://superembed.cc/embed/${tmdbId}.html`, quality: "720p" },
      { server: "MTC1", url: `https://moviesapi.cx/embed/${tmdbId}`, quality: "720p" }
    ];
  }
  
  return servers;
};

export const getDownloadLinks = async () => [];

export default { getStreamingLinks, getDownloadLinks };