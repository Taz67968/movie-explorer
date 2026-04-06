import NavBar from "../components/nav";
import Footer from "../components/footer";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import MovieslistsTwo from "../components/movies2";
import MovieModal from "../components/MovieModal";
import fetchTVShows from "../service/tvShows";
import { getFavorites } from "../service/likes";

export default function Series() {
  const [tvShows, setTvShows] = useState([]);
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
    getTVShows();
  }, []);
  async function getTVShows() {
    const shows = await fetchTVShows();
    setTvShows(shows);
  }

  // Filter favorites to only show TV shows
  const favoriteShows = favorites.filter(f => f.media_type === 'tv' || f.name);

  return (
    <>
      <div className="series-page">
        <NavBar />

        <div className="series-container">
          {/* Favorites Section */}
          {favoriteShows.length > 0 && (
            <div className="bmma">
              <h1>My Favorite Shows</h1>
              <div className="pt">
                {favoriteShows.slice(0, 6).map((show) => (
                  <MovieslistsTwo key={show.id} movie={show} onClick={handleMovieClick} />
                ))}
              </div>
            </div>
          )}

          {/* Popular TV Shows */}
          <div className="bbmn">
            <h1>Popular TV Shows</h1>
            <div className="re">
              {tvShows.map((show) => (
                <MovieslistsTwo key={show.id} movie={show} onClick={handleMovieClick} />
              ))}
            </div>
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