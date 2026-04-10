import NavBar from "../components/nav";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieslistsTwo from "../components/movies2";
import MovieslistsThree from "../components/movies3";
import MovieslistsFour from "../components/movies4";
import MoviesTop from "../components/Moveis6";
import HeroCarousel from "../components/HeroCarousel";
import MovieModal from "../components/MovieModal";
import fetchTVShows from "../service/tvShows";
import { fetchHorrorMovies, fetchSciFiMovies, fetchDocumentaryMovies, fetchAnimationMovies } from "../service/genres";
import { getFavorites } from "../service/likes";

export default function Series() {
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [onAir, setOnAir] = useState([]);
  const [horror, setHorror] = useState([]);
  const [scifi, setScifi] = useState([]);
  const [comedy, setComedy] = useState([]);
  const [drama, setDrama] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [selectedShow, setSelectedShow] = useState(null);

  const navigate = useNavigate();

  const handleShowClick = (show) => {
    setSelectedShow(show);
  };

  const handleCloseModal = () => {
    setSelectedShow(null);
  };

  const handleWatchNow = (show) => {
    navigate(`/Details/${show.id}`, { state: { movie: show } });
  };

  const handleFavoriteChange = () => {
    setFavorites(getFavorites());
  };

  const handleSimilarShowClick = (show) => {
    setSelectedShow(show);
  };

  useEffect(() => {
    setFavorites(getFavorites());
  }, []);

  useEffect(() => {
    getTVShows();
  }, []);
  async function getTVShows() {
    const shows = await fetchTVShows();
    setPopular(shows.slice(0, 10));
    setTopRated([...shows].reverse().slice(0, 10));
    setOnAir(shows.slice(5, 15));
  }

  useEffect(() => {
    getHorrorSeries();
  }, []);
  async function getHorrorSeries() {
    const series = await fetchHorrorMovies();
    setHorror(series);
  }

  useEffect(() => {
    getSciFiSeries();
  }, []);
  async function getSciFiSeries() {
    const series = await fetchSciFiMovies();
    setScifi(series);
  }

  useEffect(() => {
    getComedySeries();
  }, []);
  async function getComedySeries() {
    const series = await fetchDocumentaryMovies();
    setComedy(series);
  }

  useEffect(() => {
    getDramaSeries();
  }, []);
  async function getDramaSeries() {
    const series = await fetchAnimationMovies();
    setDrama(series);
  }

  const favoriteShows = favorites.filter(f => f.name && (f.media_type === 'tv' || !f.title));

  return (
    <>
      <div className="mealz">
        <NavBar />
        <HeroCarousel />

        {/* Favorites Section */}
        {favoriteShows.length > 0 && (
          <div className="bmma">
            <h1>My Favorite Shows</h1>
            <div className="pt">
              {favoriteShows.slice(0, 6).map((show) => (
                <MoviesTop key={show.id} movie={show} onClick={handleShowClick} />
              ))}
            </div>
          </div>
        )}

        <div className="bmma">
          <h1>Popular TV Shows</h1>
          <div className="pt">
            {popular.map((show) => (
              <MoviesTop key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <div className="bmm">
          <h1>Top Rated Series</h1>
          <div className="re">
            {topRated.map((show) => (
              <MovieslistsTwo key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <div className="bbmm">
          <h1>Currently On Air</h1>
          <div className="re">
            {onAir.map((show) => (
              <MovieslistsThree key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <div className="bbmn">
          <h1>Comedy Series</h1>
          <div className="re">
            {comedy.map((show) => (
              <MovieslistsFour key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <div className="bbmn">
          <h1>Horror Series</h1>
          <div className="re">
            {horror.map((show) => (
              <MovieslistsTwo key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <div className="bbmn">
          <h1>Sci-Fi Series</h1>
          <div className="re">
            {scifi.map((show) => (
              <MovieslistsTwo key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <div className="bbmn">
          <h1>Drama Series</h1>
          <div className="re">
            {drama.map((show) => (
              <MovieslistsTwo key={show.id} movie={show} onClick={handleShowClick} />
            ))}
          </div>
        </div>

        <Footer />

        {/* Movie Modal */}
        {selectedShow && (
          <MovieModal 
            movie={selectedShow} 
            onClose={handleCloseModal}
            onWatchNow={handleWatchNow}
            onFavoriteChange={handleFavoriteChange}
            onMovieClick={handleSimilarShowClick}
          />
        )}
      </div>
    </>
  );
}