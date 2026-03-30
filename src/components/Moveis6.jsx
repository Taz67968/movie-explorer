import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function MoviesTop({ movie, onClick }) {
  return <MovieCard movie={movie} onClick={onClick} variant="top" />;
}

MoviesTop.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MoviesTop;
