import PropTypes from "prop-types";
import { useState } from "react";

function MovieCard({ movie, onClick, variant = "default" }) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;

  const title = movie.title || movie.original_title || movie.name || "Unknown Title";
  const year = movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || "";
  const rating = movie.vote_average?.toFixed(1) || "N/A";

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoaded(true);
  };

  return (
    <div 
      className={`movie-card movie-card-${variant}`}
      onClick={() => onClick && onClick(movie)}
    >
      <div className="movie-card-poster">
        {!imageLoaded && (
          <div className="movie-card-skeleton">
            <div className="skeleton-shimmer"></div>
          </div>
        )}
        {posterUrl && !imageError ? (
          <img
            src={posterUrl}
            alt={title}
            onLoad={handleImageLoad}
            onError={handleImageError}
            style={{ opacity: imageLoaded ? 1 : 0 }}
          />
        ) : (
          <div className="movie-card-no-image">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
            <span>No Image</span>
          </div>
        )}
        <div className="movie-card-overlay">
          <div className="movie-card-rating">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
            </svg>
            <span>{rating}</span>
          </div>
          <button className="movie-card-play-btn">
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </button>
        </div>
      </div>
      <div className="movie-card-info">
        <h3 className="movie-card-title">{title}</h3>
        {year && <span className="movie-card-year">{year}</span>}
      </div>
    </div>
  );
}

MovieCard.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
  variant: PropTypes.oneOf(["default", "large", "small", "top"]),
};

export default MovieCard;
