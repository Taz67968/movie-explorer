import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const SetResultList = ({ results }) => {
  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    navigate(`/Details/${movie.id}`, { state: { movie } });
  };

  if (!results || results.length === 0) {
    return null;
  }

  return (
    <div className="result-list">
      {results.map((result, id) => {
        const title = result.title || result.name || "Unknown Title";
        const year = result.release_date?.split("-")[0] || result.first_air_date?.split("-")[0] || "";
        const posterUrl = result.poster_path 
          ? `https://image.tmdb.org/t/p/w92${result.poster_path}`
          : null;

        return (
          <div key={id} onClick={() => handleMovieClick(result)}>
            {posterUrl && (
              <img 
                src={posterUrl} 
                alt={title}
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
            )}
            <div className="result-info">
              <div className="result-title">{title}</div>
              {year && <div className="result-year">{year}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

SetResultList.propTypes = {
  results: PropTypes.array.isRequired,
};
