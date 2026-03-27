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
      
      // Get streaming links from our service
      getStreamingLinks(movie.id)
        .then(links => setStreamingLinks(links));
      
      getDownloadLinks(movie.title || movie.original_title)
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
          <p>Loading movie details...</p>
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
              title="Movie Streaming"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="video-placeholder streaming-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p>Select a server to stream</p>
              <p className="server-hint">Click on a server below, then press Stream Movie</p>
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
                  Stream Movie
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

      {/* Movie Title with Dropdown */}
      <div className="details-content">
        <div className="details-header">
          <div className="details-rating">
            <button className="btn">CBFC:U/A</button>
            <span>{movie.release_date?.split('-')[0] || '2024'}</span>
            <span>{movieDetails?.runtime ? `${Math.floor(movieDetails.runtime / 60)}h ${movieDetails.runtime % 60}m` : '2h 28m'}</span>
          </div>
          
          <h1 
            className="movie-title-toggle" 
            onClick={toggleDetails}
          >
            {movie.title}
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
          
          {/* Dropdown with Description, Cast and Stars */}
          <div className={`details-dropdown ${showDetails ? 'open' : ''}`}>
            <div className="details-section">
              <h3>Description</h3>
              <p>{movie.overview || "A thrilling cinematic experience awaits. Join the adventure as the story unfolds with unexpected twists and memorable characters."}</p>
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
