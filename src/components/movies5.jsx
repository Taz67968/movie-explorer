import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function MovieslistsLike({ movie, onClick }) {
  return <MovieCard movie={movie} onClick={onClick} variant="default" />;
}

MovieslistsLike.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MovieslistsLike;
