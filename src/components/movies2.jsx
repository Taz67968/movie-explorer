import PropTypes from "prop-types";
// import fooddetails from "./pages/fooddetails"
function MovieslistsTwo({movie}  ) {
  return (
    <div className="two" >

        {/* <h2>{movie.original_title}</h2> */}
      <img src= {
        movie.poster_path
        ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'fallback_image_url'} alt={movie.original_title} />
    </div>
  );
}

MovieslistsTwo.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default MovieslistsTwo;
