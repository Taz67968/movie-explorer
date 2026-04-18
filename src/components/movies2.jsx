import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function MovieslistsTwo({ movie, onClick }) {
  return <MovieCard movie={movie} onClick={onClick} variant="default" />;
}

MovieslistsTwo.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MovieslistsTwo;
