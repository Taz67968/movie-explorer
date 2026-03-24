import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchMovieDetails from "../service/movieDetails";
import fetchMovieCast from "../service/cast";
import fetchMovieVideos from "../service/videos";

export default function Details() {
  const location = useLocation();
  const { movie } = location.state || {};
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [showDetails, setShowDetails] = useState(false);
  const [loading, setLoading] = useState(true);

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

  // Get top 6 cast members from API
  const mainCast = cast.slice(0, 6);
  // Get stars (typically the first few billed cast members)
  const stars = cast.slice(0, 3);

  // Get trailer video if available
  const trailer = videos.find(v => v.type === 'Trailer' && v.site === 'YouTube');
  const videoKey = trailer ? trailer.key : (videos[0] ? videos[0].key : null);

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
        {videoKey ? (
          <div className="video-player">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0`}
              title="Movie Trailer"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        ) : (
          <div className="video-player">
            <div className="video-placeholder">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="white">
                <path d="M8 5v14l11-7z"/>
              </svg>
              <p>No trailer available</p>
            </div>
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
