import { useState, useEffect, useRef } from "react";
import { useLocation, useParams } from "react-router-dom";
import fetchMovieDetails from "../service/movieDetails";
import fetchMovieCast from "../service/cast";
import fetchMovieVideos from "../service/videos";
import { fetchTVShowDetails, fetchSeasonEpisodes } from "../service/tvShowDetails";
import { getStreamingLinks, getDownloadLinks } from "../service/streaming";

export default function Details() {
  const location = useLocation();
  const { id } = useParams(); // Get movie ID from URL
  const fetchAttempted = useRef(false); // Track if we've tried to fetch movie data
  
  // Initialize movie from location.state or sessionStorage or URL
  const getInitialMovie = () => {
    // First check location.state
    if (location.state?.movie) {
      // Save to sessionStorage for persistence
      sessionStorage.setItem('currentMovie', JSON.stringify(location.state.movie));
      return location.state.movie;
    }
    // Then check sessionStorage
    const stored = sessionStorage.getItem('currentMovie');
    if (stored) {
      try {
        return JSON.parse(stored);
      } catch (e) {
        return null;
      }
    }
    return null;
  };
  
  // Initialize streaming state from sessionStorage
  const getInitialStreamingState = () => {
    const isStreamingStored = sessionStorage.getItem('isStreaming');
    const activeServerStored = sessionStorage.getItem('activeServer');
    return {
      isStreaming: isStreamingStored === 'true',
      activeServer: activeServerStored ? parseInt(activeServerStored, 10) : 0
    };
  };
  
  const [movie, setMovie] = useState(getInitialMovie);
  const initialStreamState = getInitialStreamingState();
  const [isStreaming, setIsStreaming] = useState(initialStreamState.isStreaming);
  const [activeServer, setActiveServer] = useState(initialStreamState.activeServer);
  
  // Debug: log navigation
  useEffect(() => {
    console.log('Details mounted with movie:', location.state?.movie?.title, 'ID:', location.state?.movie?.id, 'URL ID:', id);
    return () => {
      console.log('Details unmounting');
      // Clear streaming state but keep movie data for potential returns
      sessionStorage.removeItem('isStreaming');
      sessionStorage.removeItem('activeServer');
    };
  }, []);
  
  // Redirect if no movie data
  // useEffect(() => {
  //   if (!movie) {
  //     console.log('No movie data - redirecting to home');
  //     navigate('/', { replace: true });
  //   }
  // }, [movie]);
  
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [streamingLinks, setStreamingLinks] = useState([]);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [showServers, setShowServers] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);
  
  // TV Show data
  const [tvShowDetails, setTvShowDetails] = useState(null);
  const [seasonEpisodes, setSeasonEpisodes] = useState(null);

  // Check if it's a TV show
  const isTVShow = !movie?.title && movie?.name;

  useEffect(() => {
    // If movie data is not in location.state but we have an ID from URL, fetch it
    const hasInitialMovie = location.state?.movie;
    if (!hasInitialMovie && id && !movie && !fetchAttempted.current) {
      fetchAttempted.current = true; // Mark as attempted
      console.log('No movie in state, fetching from ID:', id);
      fetchMovieDetails(id).then(details => {
        if (details) {
          setMovie({
            id: details.id,
            title: details.title,
            original_title: details.original_title,
            name: details.name,
            overview: details.overview,
            poster_path: details.poster_path,
            backdrop_path: details.backdrop_path,
            release_date: details.release_date,
            first_air_date: details.first_air_date,
            vote_average: details.vote_average,
            runtime: details.runtime
          });
        }
      }).catch(err => {
        console.error('Failed to fetch movie details:', err);
      });
    }
  }, [id, movie]);

  useEffect(() => {
    if (movie) {
      loadData();
    }
  }, [movie]);

  async function loadData() {
    setLoading(true);
    try {
      // Fetch basic movie/TV details
      const details = await fetchMovieDetails(movie.id);
      setMovieDetails(details);
      
      const castData = await fetchMovieCast(movie.id);
      if (castData) setCast(castData.cast || []);
      
      const videosData = await fetchMovieVideos(movie.id);
      if (videosData) setVideos(videosData.results || []);
      
      // If TV show, fetch seasons data
      if (isTVShow) {
        const tvDetails = await fetchTVShowDetails(movie.id);
        setTvShowDetails(tvDetails);
        
        // Get first season episodes
        if (tvDetails?.seasons?.length > 0) {
          const firstSeason = tvDetails.seasons.find(s => s.season_number === 1);
          if (firstSeason) {
            const episodes = await fetchSeasonEpisodes(movie.id, 1);
            setSeasonEpisodes(episodes);
          }
        }
      }
      
      // Get streaming links - pass isTVShow, season, episode info
      const streamLinks = await getStreamingLinks(movie.id, isTVShow, 1, 1);
      setStreamingLinks(streamLinks);
      
      const title = movie.title || movie.original_title || movie.name || "";
      const dlLinks = await getDownloadLinks(title);
      setDownloadLinks(dlLinks);
    } catch (error) {
      console.error("Error loading data:", error);
    }
    setLoading(false);
  }

  // Handle season change
  async function handleSeasonChange(seasonNum) {
    const seasonIndex = seasonNum - 1;
    setActiveSeason(seasonIndex);
    setActiveEpisode(0);
    setIsStreaming(false);
    
    // Fetch episodes for the selected season
    if (isTVShow) {
      const episodes = await fetchSeasonEpisodes(movie.id, seasonNum);
      setSeasonEpisodes(episodes);
      
      // Update streaming links with new season
      const streamLinks = await getStreamingLinks(movie.id, isTVShow, seasonNum, 1);
      setStreamingLinks(streamLinks);
    }
  }

  // Handle episode change
  async function handleEpisodeChange(index) {
    setActiveEpisode(index);
    setIsStreaming(true);
    
    // Update streaming links with new episode
    if (isTVShow) {
      const seasonNum = activeSeason + 1;
      const episodeNum = index + 1;
      const streamLinks = await getStreamingLinks(movie.id, isTVShow, seasonNum, episodeNum);
      setStreamingLinks(streamLinks);
    }
  }

  if (!movie) {
    return <div className="streaming-page">No data available</div>;
  }

  if (loading) {
    return (
      <div className="streaming-page">
        <div className="details-loading">
          <div className="loading-spinner"></div>
          <p>Loading details...</p>
        </div>
      </div>
    );
  }

  const toggleDetails = () => setShowDetails(!showDetails);

  const mainCast = cast.slice(0, 6);
  const stars = cast.slice(0, 3);

  const handleServerChange = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    console.log('Server clicked:', index, streamingLinks[index]);
    if (streamingLinks[index]) {
      // Open streaming site in a new tab
      window.open(streamingLinks[index].url, '_blank');
      
      // Save streaming state to sessionStorage for persistence
      setActiveServer(index);
      setShowServers(false);
      sessionStorage.setItem('isStreaming', 'true');
      sessionStorage.setItem('activeServer', index.toString());
      console.log('Streaming URL:', streamingLinks[index].url);
    } else {
      console.log('No server at index:', index);
    }
  };

  const handleStream = () => {
    // Open current streaming URL in new tab
    if (streamingLinks[activeServer]?.url) {
      window.open(streamingLinks[activeServer].url, '_blank');
    }
    setIsStreaming(true);
    sessionStorage.setItem('isStreaming', 'true');
  };

  const handleDownload = (link) => window.open(link.url, '_blank');

  // Get real seasons from API
  const seasons = tvShowDetails?.seasons?.filter(s => s.season_number > 0) || [];
  const episodes = seasonEpisodes?.episodes || [];

  return (
    <div className="streaming-page">
      <button className="back-button" onClick={() => window.history.back()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>
      
      <div className="video-player-container">
        <div className="video-player" id="movie-player">
          {isStreaming && streamingLinks.length > 0 && streamingLinks[activeServer]?.url ? (
            <iframe
              width="100%"
              height="100%"
              src={streamingLinks[activeServer].url}
              title="Streaming"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="video-placeholder streaming-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
              {isTVShow ? (
                <>
                  <p>Select a season and episode</p>
                  <p className="server-hint">Choose a server below to stream</p>
                </>
              ) : (
                <>
                  <p>Select a server to stream</p>
                  <p className="server-hint">Click on a server below, then press Stream</p>
                </>
              )}
            </div>
          )}
        </div>
        
        {streamingLinks.length > 0 && (
          <div className="server-selector">
            <div className="server-tabs">
              <button className={`server-tab ${!showServers ? 'active' : ''}`} onClick={() => setShowServers(false)}>
                Stream
              </button>
              <button className={`server-tab ${showServers ? 'active' : ''}`} onClick={() => setShowServers(true)}>
                Download
              </button>
            </div>
            
            {!showServers ? (
              <div className="server-list">
                {streamingLinks.map((link, index) => (
                  <button key={index} className={`server-item ${activeServer === index ? 'active' : ''}`} onClick={(e) => handleServerChange(e, index)}>
                    <span className="server-name">{link.server}</span>
                    <span className="server-quality">{link.quality}</span>
                  </button>
                ))}
                <button className="stream-btn" onClick={handleStream}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Stream {isTVShow ? 'Episode' : 'Movie'}
                </button>
              </div>
            ) : (
              <div className="server-list">
                {downloadLinks.map((link, index) => (
                  <button key={index} className="server-item download-item" onClick={() => handleDownload(link)}>
                    <span className="server-name">{link.server}</span>
                    <span className="server-quality">{link.quality}</span>
                    <span className="server-size">{link.size}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      <div className="details-content">
        <div className="details-header">
          <div className="details-rating">
            <button className="btn">CBFC:U/A</button>
            <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || '2024'}</span>
            {isTVShow && <span>{seasons.length} Seasons</span>}
            <span>{movieDetails?.runtime ? `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m` : '2h 28m'}</span>
          </div>
          
          <h1 className="movie-title-toggle" onClick={toggleDetails}>
            {movie.title || movie.original_title || movie.name}
            <svg className={`dropdown-arrow ${showDetails ? 'open' : ''}`} width="24" height="24" viewBox="0 0 24 24" fill="white">
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </h1>

          {/* Real Seasons and Episodes for TV Shows */}
          {isTVShow && seasons.length > 0 && (
            <div className="seasons-episodes">
              <div className="seasons-tabs">
                {seasons.map((season) => (
                  <button 
                    key={season.season_number}
                    className={`season-tab ${activeSeason === season.season_number - 1 ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleSeasonChange(season.season_number); }}
                  >
                    {season.name || `Season ${season.season_number}`}
                  </button>
                ))}
              </div>
              
              <div className="episodes-grid">
                {episodes.map((episode, index) => (
                  <button 
                    key={episode.id}
                    className={`episode-card ${activeEpisode === index ? 'active' : ''}`}
                    onClick={(e) => { e.preventDefault(); handleEpisodeChange(index); }}
                  >
                    <div className="episode-number">{episode.episode_number}</div>
                    <div className="episode-info">
                      <h4>{episode.name}</h4>
                      <p>{episode.overview}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
          
          <div className={`details-dropdown ${showDetails ? 'open' : ''}`}>
            <div className="details-section">
              <h3>Description</h3>
              <p>{movie.overview || "No description available."}</p>
            </div>
            
            <div className="details-section">
              <h3>Cast</h3>
              <div className="cast-list">
                {mainCast.length > 0 ? mainCast.map(actor => (
                  <div key={actor.id} className="cast-item">
                    <img className="cast-avatar" src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/45"} alt={actor.name}/>
                    <div className="cast-info">
                      <span className="cast-name">{actor.name}</span>
                      <span className="cast-character">{actor.character}</span>
                    </div>
                  </div>
                )) : (
                  <p className="no-data">No cast information available</p>
                )}
              </div>
            </div>
            
            <div className="details-section">
              <h3>Stars</h3>
              <div className="stars-list">
                {stars.length > 0 ? stars.map(star => (
                  <div key={star.id} className="star-item">
                    <img className="star-avatar" src={star.profile_path ? `https://image.tmdb.org/t/p/w185${star.profile_path}` : "https://via.placeholder.com/45"} alt={star.name}/>
                    <div className="star-info">
                      <span className="star-name">{star.name}</span>
                      <span className="star-role">{star.character}</span>
                    </div>
                  </div>
                )) : (
                  <p className="no-data">No stars information available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
