import PropTypes from "prop-types";
// import fooddetails from "./pages/fooddetails"
function Movieslists({movie ,index}  ) {
  return (
    <div className="one" key={index}>
      <img src= {
        movie.poster_path
        ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'fallback_image_url'} alt={movie.original_title} />
      <div className="movie-title">{movie.title || movie.original_title}</div>
    </div>
  );
}

Movieslists.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default Movieslists;
