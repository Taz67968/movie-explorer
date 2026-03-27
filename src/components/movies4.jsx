import PropTypes from "prop-types";

function MovieslistsFour({movie}  ) {
  return (
    <div className="four" >

        {/* <h2>{movie.original_title}</h2> */}
      <img src= {
        movie.poster_path
        ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'fallback_image_url'} alt={movie.original_title} />
      <div className="movie-title">{movie.title || movie.original_title}</div>
    </div>
  );
}

MovieslistsFour.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default MovieslistsFour;
