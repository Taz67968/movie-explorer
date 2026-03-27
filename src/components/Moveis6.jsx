import PropTypes from "prop-types";
// import fooddetails from "./pages/fooddetails"
function MoviesTop({movie}  ) {

  return (
    <div className="on" key={movie.id}>
       
        {/* <h2>{movie.original_title}</h2> */}
      <img src= {
        movie.poster_path
        ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'fallback_image_url'} alt={movie.original_title} />
      <div className="movie-title">{movie.title || movie.original_title}</div>
    </div>
  );
}

MoviesTop.propTypes = {
  movie: PropTypes.object.isRequired,
};

export default MoviesTop;
