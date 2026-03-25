import { useState, useEffect } from "react";
import fetchMovieCast from "../service/cast";
import fetchMovieVideos from "../service/videos";

export default function MovieModal({ movie, onClose, onWatchNow }) {
  const [cast, setCast] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (movie) {
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
      setLoading(false);
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
  const stars = cast.slice(0, 3);

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
                <img src={posterUrl} alt={movie.title} />
              </div>
              
              <div className="modal-info">
                <div className="modal-rating">
                  <span className="rating-badge">CBFC:U/A</span>
                  <span>{movie.release_date?.split("-")[0] || "2024"}</span>
                  <span>{movie.vote_average?.toFixed(1) || "N/A"} ★</span>
                </div>
                
                <h1 className="modal-title">{movie.title || movie.original_title}</h1>
                
                <div className="modal-genres">
                  <span>Action</span>
                  <span>Adventure</span>
                  <span>Drama</span>
                </div>
                
                <p className="modal-overview">
                  {movie.overview || "No description available."}
                </p>

                <button className="modal-watch-btn" onClick={() => onWatchNow(movie)}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="black">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  Watch Now
                </button>

                {!loading && (
                  <>
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

                    <div className="modal-stars-section">
                      <h3>Stars</h3>
                      <div className="modal-stars-list">
                        {stars.map((star) => (
                          <div key={star.id} className="modal-star-item">
                            <img
                              src={star.profile_path ? `https://image.tmdb.org/t/p/w185${star.profile_path}` : "https://via.placeholder.com/45"}
                              alt={star.name}
                            />
                            <div>
                              <p className="star-name">{star.name}</p>
                              <p className="star-character">{star.character}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
