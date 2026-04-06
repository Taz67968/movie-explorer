import NavBar from "../components/nav";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import fetchMovie from "../service/context";
import fetchMovieOne from "../service/contextone";
import MovieslistsTwo from "../components/movies2";
import MovieslistsThree from "../components/movies3";
import fetchMovieTwo from "../service/contexttwo";
import MovieslistsFour from "../components/movies4";
import fetchMovieThree from "../service/contextthree";
import { useNavigate } from "react-router-dom";
import fetchMovieTop from "../service/top";
import MoviesTop from "../components/Moveis6";
import HeroCarousel from "../components/HeroCarousel";
import MovieModal from "../components/MovieModal";
import fetchTVShows from "../service/tvShows";
import { fetchHorrorMovies, fetchSciFiMovies, fetchDocumentaryMovies, fetchAnimationMovies } from "../service/genres";
import { getFavorites } from "../service/likes";

export default function Home() {
  const [release, setrelease] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [top, setTop] = useState([]);
  const [tvShows, setTvShows] = useState([]);
  const [horror, setHorror] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [documentary, setDocumentary] = useState([]);
  const [animation, setAnimation] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const navigate = useNavigate();

  const handleMovieClick = (movie) => {
    setSelectedMovie(movie);
  };

  const handleCloseModal = () => {
    setSelectedMovie(null);
  };

  const handleWatchNow = (movie) => {
    navigate(`/Details/${movie.id}`, { state: { movie } });
  };

  const handleFavoriteChange = () => {
    setFavorites(getFavorites());
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    getMovie();
  }, []);
  async function getMovie() {
    const movies = await fetchMovie();
    console.log(movies);
  }

  useEffect(() => {
    getMovieOne();
  }, []);
  async function getMovieOne() {
    const release = await fetchMovieOne();
    console.log(release);
    setrelease(release);
  }

  useEffect(() => {
    getMovieTwo();
  }, []);
  async function getMovieTwo() {
    const action = await fetchMovieTwo();
    console.log(action);
    setAction(action);
  }

  useEffect(() => {
    getMovieThree();
  }, []);
  async function getMovieThree() {
    const comedy = await fetchMovieThree();
    console.log(comedy);
    setComedy(comedy);
  }

  useEffect(() => {
    getMovieFour();
  }, []);
  async function getMovieFour() {
    const top = await fetchMovieTop();
    console.log(top);
    setTop(top);
  }

  useEffect(() => {
    getTVShows();
  }, []);
  async function getTVShows() {
    const shows = await fetchTVShows();
    setTvShows(shows);
  }

  useEffect(() => {
    getHorrorMovies();
  }, []);
  async function getHorrorMovies() {
    const horrorMovies = await fetchHorrorMovies();
    setHorror(horrorMovies);
  }

  useEffect(() => {
    getSciFiMovies();
  }, []);
  async function getSciFiMovies() {
    const scifiMovies = await fetchSciFiMovies();
    setScifi(scifiMovies);
  }

  useEffect(() => {
    getDocumentaryMovies();
  }, []);
  async function getDocumentaryMovies() {
    const docMovies = await fetchDocumentaryMovies();
    setDocumentary(docMovies);
  }

  useEffect(() => {
    getAnimationMovies();
  }, []);
  async function getAnimationMovies() {
    const animMovies = await fetchAnimationMovies();
    setAnimation(animMovies);
  }

  return (
    <>
      <div className="mealz">
        <NavBar />
        <HeroCarousel />

        {/* Favorites Section */}
        {favorites.length > 0 && (
          <div className="bmma">
            <h1>My Favorites</h1>
            <div className="pt">
              {favorites.slice(0, 6).map((movie) => (
                <MoviesTop key={movie.id} movie={movie} onClick={handleMovieClick} />
              ))}
            </div>
          </div>
        )}

      <div className="bmma">
        <h1>Top Searches</h1>
        <div className="pt">
          {top.map((movie) => (
            <MoviesTop key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      <div className="bmm">
        <h1>Action</h1>
        <div className="re">
          {release.map((movie) => (
            <MovieslistsTwo key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      <div className="bbmm">
        <h1>Romance & Drama</h1>
        <div className="re">
          {action.map((movie) => (
            <MovieslistsThree key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      <div className="bbmn">
        <h1>Comedy</h1>
        <div className="re">
          {comedy.map((movie) => (
            <MovieslistsFour key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      {/* TV Shows Section */}
      <div className="bbmn">
        <h1>TV Shows</h1>
        <div className="re">
          {tvShows.map((show) => (
            <MovieslistsTwo key={show.id} movie={show} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      {/* Horror Section */}
      <div className="bbmn">
        <h1>Horror</h1>
        <div className="re">
          {horror.map((movie) => (
            <MovieslistsTwo key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      {/* Sci-Fi Section */}
      <div className="bbmn">
        <h1>Sci-Fi</h1>
        <div className="re">
          {scifi.map((movie) => (
            <MovieslistsTwo key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      {/* Documentary Section */}
      <div className="bbmn">
        <h1>Documentary</h1>
        <div className="re">
          {documentary.map((movie) => (
            <MovieslistsTwo key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      {/* Animation Section */}
      <div className="bbmn">
        <h1>Animation</h1>
        <div className="re">
          {animation.map((movie) => (
            <MovieslistsTwo key={movie.id} movie={movie} onClick={handleMovieClick} />
          ))}
        </div>
      </div>

      <Footer />

      {/* Movie Modal */}
      {selectedMovie && (
        <MovieModal 
          movie={selectedMovie} 
          onClose={handleCloseModal}
          onWatchNow={handleWatchNow}
          onFavoriteChange={handleFavoriteChange}
        />
      )}
      </div>
    </>
  );
}
