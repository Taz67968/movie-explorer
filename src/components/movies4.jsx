import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function MovieslistsFour({ movie, onClick }) {
  return <MovieCard movie={movie} onClick={onClick} variant="default" />;
}

MovieslistsFour.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MovieslistsFour;
