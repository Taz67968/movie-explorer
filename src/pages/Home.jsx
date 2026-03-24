import NavBar from "../components/nav";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import Movieslists from "../components/movies1";
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

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [release, setrelease] = useState([]);
  const [action, setAction] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [top, setTop] = useState([]);

  const navigate = useNavigate();

 const handleMovieClick = (movie) => {
    navigate(`/Details/${movie.id}`, { state: { movie } });
  };

  useEffect(() => {
    getMovie();
  }, []);
  async function getMovie() {
    const movies = await fetchMovie();
    console.log(movies);
    setMovies(movies);
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
  return (
    <>
      <div className="mealz">
        <NavBar />
        <HeroCarousel />

        <div className="to ">
          <h1>Latest and Trending</h1>
          <div className="bm">
            {movies.map((movie, index) => (
              <div key={movie.id} onClick={() => handleMovieClick(movie)}>
                <Movieslists movie={movie} index={index + 1} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bmma">
        <h1>Top Searches</h1>
        <div className="pt">
          {top.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieClick(movie)}>
              <MoviesTop movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="bmm">
        <h1>Action</h1>
        <div className="re">
          {release.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieClick(movie)}>
              <MovieslistsTwo movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="bbmm">
        <h1>Romance & Drama</h1>
        <div className="re">
          {action.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieClick(movie)}>
              <MovieslistsThree movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <div className="bbmn">
        <h1>Comedy</h1>
        <div className="re">
          {comedy.map((movie) => (
            <div key={movie.id} onClick={() => handleMovieClick(movie)}>
              <MovieslistsFour movie={movie} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
