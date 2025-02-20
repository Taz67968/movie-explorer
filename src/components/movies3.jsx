import PropTypes from "prop-types";
// import fooddetails from "./pages/fooddetails"
function MovieslistsThree({movie}  ) {
  return (
    <div className="three" >

        {/* <h2>{movie.original_title}</h2> */}
      <img src= {
        movie.poster_path
        ?`https://image.tmdb.org/t/p/w500${movie.poster_path}`: 'fallback_image_url'} alt={movie.original_title} />
    </div>
  );
}

MovieslistsThree.propTypes = {
  movie: PropTypes.object.isRequired,
  index: PropTypes.number
};

export default MovieslistsThree;
