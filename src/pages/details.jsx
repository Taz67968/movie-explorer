import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import fetchMovieDetails from "../service/movieDetails";
import NavBar from "../components/nav";
import Footer from "../components/footer";
import fetchMovieLike from "../service/likes";
import MovieslistsLike from "../components/movies5";

export default function Details() {
  const location = useLocation();
  const { movie } = location.state || {};
  const [movieDetails, setMovieDetails] = useState(null);
  const [like, setLike] = useState([])
  useEffect(() => {
    // console.log(movie)
    if (movie) {
      fetchMovieDetails(movie.id).then((data) => setMovieDetails(data));
    }
  }, [movie]);

  if (!movie) {
    return <div>No movie data available</div>;
  }

  if (!movie) {
    return <div>No movie data available</div>;
  }

    useEffect(() => {
      getMovieLike();
    }, []);
    async function getMovieLike() {
      const like = await fetchMovieLike();
      console.log(like);
      setLike(like);
    }

  return (
    <>
      <div
        style={{
          backgroundImage: `linear-gradient(rgba(58, 64, 66, 0.5), rgba(47, 54, 56, 0.5)), url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
          width: "100%",
          height: "57vh",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          textAlign:'center',
        }}
      >
        <NavBar />
       <div className="h">
      <div className="m">
      <h1>{movie.title}</h1>
        {/* <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : "fallback_image_url"
          }
          alt={movie.original_title}
        /> */}
        <div className="sp">
          <button className="btn">CBFC:U/A</button>
          <p>Action . Adventure . 2h28m</p>
        </div>
        <p className="over">{movie.overview}</p>
        <div className="s">
          <button className="btnone">
            <img src="\src\assets\Group.png" alt="" />
            Watch Now
          </button>
          <button className="btntwo">Add Watchlist</button>
        </div>
      </div>
       </div>

        {movieDetails && <div></div>}
      </div>

  <div className="bamm">
        <h1>More Likes</h1>
          <div className="rep">
          {like.map((movie) => (
            <div key={movie.id}  >
              <MovieslistsLike movie={movie}  />
            </div>
          ))}
          </div>
          </div>
      <Footer />
    </>
  );
}
