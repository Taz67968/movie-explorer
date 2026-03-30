import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import fetchMovieCast from "../service/cast";
import fetchMovieVideos from "../service/videos";

export default function MovieModal({ movie, onClose, onWatchNow }) {
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movie) {
      setLoading(true);
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

  if (!movie) return null;

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : movie.poster_path
    ? `https://image.tmdb.org/t/p/original${movie.poster_path}`
    : "https://via.placeholder.com/500x300";

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/200x300";

  const mainCast = cast.slice(0, 6);
  const trailer = videos.find(video => video.type === "Trailer" && video.site === "YouTube");

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
          </svg>
        </button>

        <div className="modal-background" style={{ backgroundImage: `url(${backdropUrl})` }}>
          <div className="modal-gradient">
            <div className="modal-body">
              <div className="modal-poster">
                <img src={posterUrl} alt={movie.title || movie.original_title} />
              </div>
              
              <div className="modal-info">
                <div className="modal-rating">
                  <span className="rating-badge">CBFC:U/A</span>
                  <span>{movie.release_date?.split("-")[0] || movie.first_air_date?.split("-")[0] || "2024"}</span>
                  <span>{movie.vote_average?.toFixed(1) || "N/A"} ★</span>
                </div>
                
                <h1 className="modal-title">{movie.title || movie.original_title || movie.name}</h1>
                
                <div className="modal-genres">
                  {movie.genres ? (
                    movie.genres.slice(0, 3).map((genre) => (
                      <span key={genre.id}>{genre.name}</span>
                    ))
                  ) : (
                    <>
                      <span>Action</span>
                      <span>Adventure</span>
                      <span>Drama</span>
                    </>
                  )}
                </div>
                
                <p className="modal-overview">
                  {movie.overview || "No description available."}
                </p>

                <div className="modal-actions">
                  <button className="modal-watch-btn" onClick={() => onWatchNow(movie)}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                    Watch Now
                  </button>
                  
                  {trailer && (
                    <button 
                      className="modal-trailer-btn"
                      onClick={() => window.open(`https://www.youtube.com/watch?v=${trailer.key}`, '_blank')}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                        <path d="M18 4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4h-4z"/>
                      </svg>
                      Watch Trailer
                    </button>
                  )}
                </div>

                {!loading && mainCast.length > 0 && (
                  <div className="modal-cast-section">
                    <h3>Cast</h3>
                    <div className="modal-cast-list">
                      {mainCast.map((actor) => (
                        <div key={actor.id} className="modal-cast-item">
                          <img
                            src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : "https://via.placeholder.com/45"}
                            alt={actor.name}
                          />
                          <div>
                            <p className="cast-name">{actor.name}</p>
                            <p className="cast-character">{actor.character}</p>
                          </div>
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
      </div>
    </div>
  );
}

MovieModal.propTypes = {
  movie: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onWatchNow: PropTypes.func.isRequired,
};
