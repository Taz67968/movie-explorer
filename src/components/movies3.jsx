import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function MovieslistsThree({ movie, onClick }) {
  return <MovieCard movie={movie} onClick={onClick} variant="default" />;
}

MovieslistsThree.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default MovieslistsThree;
