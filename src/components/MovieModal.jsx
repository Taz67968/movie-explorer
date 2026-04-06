import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import fetchMovieCast from "../service/cast";
import fetchMovieVideos from "../service/videos";
import { addToFavorites, removeFromFavorites, isFavorite } from "../service/likes";

export default function MovieModal({ movie, onClose, onWatchNow, onFavoriteChange }) {
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFav, setIsFav] = useState(false);

  useEffect(() => {
    if (movie) {
      setLoading(true);
      setIsFav(isFavorite(movie.id));
      Promise.all([
        fetchMovieCast(movie.id),
        fetchMovieVideos(movie.id)
      ]).then(([castData, videosData]) => {
        if (castData) {
          setCast(castData.cast || []);
        }
        if (videosData) {
          setVideos(videosData.results || []);
        }
        setLoading(false);
      }).catch(() => {
        setLoading(false);
      });
    }
  }, [movie]);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    if (isFav) {
      removeFromFavorites(movie.id);
      setIsFav(false);
    } else {
      addToFavorites(movie);
      setIsFav(true);
    }
    if (onFavoriteChange) {
      onFavoriteChange();
    }
  };

  if (!movie) return null;

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  const mainCast = cast.slice(0, 6);
  const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <button className="modal-favorite-btn" onClick={handleFavoriteClick}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill={isFav ? "#ff4949" : "white"}>
            <path d={isFav ? "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" : "M16.5 3c-1.74 0-3.41.81-4.5 2.09C10.91 3.81 9.24 3 7.5 3 4.42 3 2 5.42 2 8.5c0 3.78 3.4 6.86 8.55 11.54L12 21.35l1.45-1.32C18.6 15.36 22 12.28 22 8.5 22 5.42 19.58 3 16.5 3zm-4.4 15.55l-.1.1-.1-.1C7.14 14.24 4 11.39 4 8.5 4 6.5 5.5 5 7.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5c2 0 3.5 1.5 3.5 3.5 0 2.89-3.14 5.74-7.9 10.05z"}/>
          </svg>
        </button>

        <div className="modal-body">
          <div className="modal-poster-section">
            <img 
              src={posterUrl} 
              alt={movie.title || movie.original_title || movie.name} 
              className="modal-poster-img"
            />
          </div>
          
          <div className="modal-details">
            <div className="modal-meta">
              <span className="rating-badge">CBFC:U/A</span>
              <span className="modal-year">
                {movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || "2024"}
              </span>
              <span className="modal-rating">
                {movie.vote_average?.toFixed(1) || "N/A"} ★
              </span>
            </div>
            
            <h1 className="modal-title">{movie.title || movie.original_title || movie.name}</h1>
            
            <div className="modal-genres">
              {movie.genres ? (
                movie.genres.slice(0, 3).map((genre) => (
                  <span key={genre.id} className="genre-tag">{genre.name}</span>
                ))
              ) : (
                <>
                  <span className="genre-tag">Action</span>
                  <span className="genre-tag">Adventure</span>
                  <span className="genre-tag">Drama</span>
                </>
              )}
            </div>
            
            <p className="modal-overview">
              {movie.overview || "No description available."}
            </p>

            <div className="modal-actions">
              <button className="modal-watch-btn" onClick={() => onWatchNow(movie)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Watch Now
              </button>
              
              {trailer && (
                <button 
                  className="modal-trailer-btn"
                  onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                  </svg>
                  Watch Trailer
                </button>
              )}
            </div>

            {!loading && mainCast.length > 0 && (
              <div className="modal-cast-section">
                <h3 className="cast-title">Cast</h3>
                <div className="modal-cast-list">
                  {mainCast.map((actor) => (
                    <div key={actor.id} className="modal-cast-item">
                      <img
                        src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/45"}
                        alt={actor.name}
                        className="cast-img"
                      />
                      <p className="cast-name">{actor.name}</p>
                      <p className="cast-character">{actor.character}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {loading && (
              <div className="modal-loading">
                <div className="loading-spinner"></div>
                <p>Loading cast information...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onWatchNow: PropTypes.func.isRequired,
  onFavoriteChange: PropTypes.func,
};
