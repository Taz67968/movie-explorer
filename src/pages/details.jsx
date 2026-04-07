import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchMovieDetails from "../service/movieDetails";
import fetchMovieCast from "../service/cast";
import fetchMovieVideos from "../service/videos";
import { getStreamingLinks, getDownloadLinks } from "../service/streaming";

export default function Details() {
  const location = useLocation();
  const { movie } = location.state || {};
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);
  const [streamingLinks, setStreamingLinks] = useState([]);
  const [downloadLinks, setDownloadLinks] = useState([]);
  const [activeServer, setActiveServer] = useState(0);
  const [showServers, setShowServers] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [activeSeason, setActiveSeason] = useState(0);
  const [activeEpisode, setActiveEpisode] = useState(0);

  // Check if it's a TV show
  const isTVShow = !movie?.title && movie?.name;

  // Sample seasons data (would come from API in production)
  const seasons = [
    { season_number: 1, name: "Season 1", episode_count: 10, overview: "The first season introduces the main characters and sets up the story." },
    { season_number: 2, name: "Season 2", episode_count: 10, overview: "The story continues with new challenges and revelations." },
    { season_number: 3, name: "Season 3", episode_count: 10, overview: "The action heats up as the plot thickens." },
    { season_number: 4, name: "Season 4", episode_count: 10, overview: "The final season brings closure to the story." },
  ];

  // Sample episodes for the active season
  const episodes = [
    { episode_number: 1, name: "Episode 1", overview: "The series premiere introduces the main characters.", still_path: "/ggFHVNu6YYI5n9EzX1nN2P9DzlWq.jpg" },
    { episode_number: 2, name: "Episode 2", overview: "Tensions rise as secrets are revealed.", still_path: "/w21lgYIi9GeUH5dO8gj2A9olN2R.jpg" },
    { episode_number: 3, name: "Episode 3", overview: "A shocking event changes everything.", still_path: "/7WUHnWGx5s1455xBr3Ohq3F32MR.jpg" },
    { episode_number: 4, name: "Episode 4", overview: "Alliances are tested.", still_path: "/49WJfeN0moxb9IP39Gn8Pu2wPCo.jpg" },
    { episode_number: 5, name: "Episode 5", overview: "A tragic loss affects everyone.", still_path: "/reEMJA1uzscCbkpeRLeTTgXOVo2.jpg" },
    { episode_number: 6, name: "Episode 6", overview: "New information comes to light.", still_path: "/1E5baAaEse26fej7uHcjOgee2f2.jpg" },
    { episode_number: 7, name: "Episode 7", overview: "Relationships are strained.", still_path: "/tsRy63Mu5cu8etL1X7ZLyfESUP8.jpg" },
    { episode_number: 8, name: "Episode 8", overview: "The season finale brings a major revelation.", still_path: "/xKteX054U3r3NT2QPPc9HBLpUlG.jpg" },
    { episode_number: 9, name: "Episode 9", overview: "Setbacks occur.", still_path: "/suopoAIqW9r8T6765tz6czuV7tnD.jpg" },
    { episode_number: 10, name: "Episode 10", overview: "Things finally come to a head.", still_path: "/56v2KjBlU4XaOv9rVYEQypROD7P.jpg" },
  ];

  useEffect(() => {
    if (movie) {
      fetchMovieDetails(movie.id).then((data) => setMovieDetails(data));
      fetchMovieCast(movie.id).then((data) => {
        if (data) {
          setCast(data.cast || []);
        }
      });
      fetchMovieVideos(movie.id).then((data) => {
        if (data) {
          setVideos(data.results || []);
        }
      });
      
      const title = movie.title || movie.original_title || movie.name || "";
      getStreamingLinks(movie.id)
        .then(links => setStreamingLinks(links));
      
      getDownloadLinks(title)
        .then(links => setDownloadLinks(links));
    }
    setLoading(false);
  }, [movie]);

  if (!movie) {
    return <div className="streaming-page">No movie data available</div>;
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

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  const mainCast = cast.slice(0, 6);
  const stars = cast.slice(0, 3);

  const handleServerChange = (index) => {
    setActiveServer(index);
    setShowServers(false);
    setIsStreaming(true);
  };

  const handleStreamMovie = () => {
    setIsStreaming(true);
  };

  const handleDownloadMovie = (link) => {
    window.open(link.url, '_blank');
  };

  const handleSeasonChange = (index) => {
    setActiveSeason(index);
    setActiveEpisode(0);
  };

  const currentSeason = seasons[activeSeason];
  const currentEpisode = episodes[activeEpisode];

  return (
    <div className="streaming-page">
      {/* Back Button */}
      <button className="back-button" onClick={() => window.history.back()}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"/>
        </svg>
        Back
      </button>
      
      {/* Streaming Video Player */}
      <div className="video-player-container">
        <div className="video-player" id="movie-player">
          {isStreaming && streamingLinks.length > 0 ? (
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
                  <p className="server-hint">Click on a server below, then press Stream Movie</p>
                </>
              )}
            </div>
          )}
        </div>
        
        {/* Server Selection */}
        {streamingLinks.length > 0 && (
          <div className="server-selector">
            <div className="server-tabs">
              <button 
                className={`server-tab ${!showServers ? 'active' : ''}`}
                onClick={() => setShowServers(false)}
              >
                Stream
              </button>
              <button 
                className={`server-tab ${showServers ? 'active' : ''}`}
                onClick={() => setShowServers(true)}
              >
                Download
              </button>
            </div>
            
            {!showServers ? (
              <div className="server-list">
                {streamingLinks.map((link, index) => (
                  <button
                    key={index}
                    className={`server-item ${activeServer === index ? 'active' : ''}`}
                    onClick={() => handleServerChange(index)}
                  >
                    <span className="server-name">{link.server}</span>
                    <span className="server-quality">{link.quality}</span>
                  </button>
                ))}
                <button className="stream-btn" onClick={handleStreamMovie}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Stream {isTVShow ? 'Episode' : 'Movie'}
                </button>
              </div>
            ) : (
              <div className="server-list">
                {downloadLinks.map((link, index) => (
                  <button
                    key={index}
                    className="server-item download-item"
                    onClick={() => handleDownloadMovie(link)}
                  >
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

      {/* Details Content */}
      <div className="details-content">
        <div className="details-header">
          <div className="details-rating">
            <button className="btn">CBFC:U/A</button>
            <span>{movie.release_date?.split('-')[0] || movie.first_air_date?.split('-')[0] || '2024'}</span>
            {isTVShow && <span>{seasons.length} Seasons</span>}
            <span>{movieDetails?.runtime ? `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m` : '2h 28m'}</span>
          </div>
          
          <h1 
            className="movie-title-toggle" 
            onClick={toggleDetails}
          >
            {movie.title || movie.original_title || movie.name}
            <svg 
              className={`dropdown-arrow ${showDetails ? 'open' : ''}`} 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="white"
            >
              <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6z"/>
            </svg>
          </h1>

          {/* Seasons and Episodes for TV Shows */}
          {isTVShow && (
            <div className="seasons-episodes">
              <div className="seasons-tabs">
                {seasons.map((season, index) => (
                  <button 
                    key={index}
                    className={`season-tab ${activeSeason === index ? 'active' : ''}`}
                    onClick={() => handleSeasonChange(index)}
                  >
                    {season.name}
                  </button>
                ))}
              </div>
              
              <div className="episodes-grid">
                {episodes.map((episode, index) => (
                  <button 
                    key={index}
                    className={`episode-card ${activeEpisode === index ? 'active' : ''}`}
                    onClick={() => {
                      setActiveEpisode(index);
                      setIsStreaming(true);
                    }}
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
          
          {/* Dropdown with Description, Cast and Stars */}
          <div className={`details-dropdown ${showDetails ? 'open' : ''}`}>
            <div className="details-section">
              <h3>Description</h3>
              <p>{movie.overview || "A thrilling cinematic experience awaits."}</p>
            </div>
            
            <div className="details-section">
              <h3>Cast</h3>
              <div className="cast-list">
                {mainCast.length > 0 ? mainCast.map(actor => (
                  <div key={actor.id} className="cast-item">
                    <img 
                      className="cast-avatar" 
                      src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/45"} 
                      alt={actor.name}
                    />
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
                    <img 
                      className="star-avatar" 
                      src={star.profile_path ? `https://image.tmdb.org/t/p/w185${star.profile_path}` : "https://via.placeholder.com/45"} 
                      alt={star.name}
                    />
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
