import PropTypes from "prop-types";
import MovieCard from "./MovieCard";

function Movieslists({ movie, onClick }) {
  return <MovieCard movie={movie} onClick={onClick} variant="default" />;
}

Movieslists.propTypes = {
  movie: PropTypes.object.isRequired,
  onClick: PropTypes.func,
};

export default Movieslists;
