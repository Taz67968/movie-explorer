import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import fetchHeroMovies from "../service/heroMovies";

export default function HeroCarousel() {
  const [movies, setMovies] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getHeroMovies();
  }, []);

  async function getHeroMovies() {
    const heroMovies = await fetchHeroMovies();
    setMovies(heroMovies.slice(0, 5)); // Get top 5 trending movies
    setLoading(false);
  }

  const goToSlide = (index) => {
    if (index === currentIndex || isAnimating || movies.length === 0) return;
    setIsAnimating(true);
    setCurrentIndex(index);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const goToNext = () => {
    if (movies.length === 0) return;
    const nextIndex = (currentIndex + 1) % movies.length;
    goToSlide(nextIndex);
  };

  const goToPrev = () => {
    if (movies.length === 0) return;
    const prevIndex = (currentIndex - 1 + movies.length) % movies.length;
    goToSlide(prevIndex);
  };

  const handleMovieClick = (movie) => {
    navigate(`/Details/${movie.id}`, { state: { movie } });
  };

  useEffect(() => {
    const interval = setInterval(() => {
      goToNext();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, movies]);

  if (loading) {
    return (
      <div className="hero-carousel">
        <div className="hero-loading">
          <div className="loading-spinner"></div>
          <p>Loading movies...</p>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="hero-carousel">
        <div className="hero-error">
          <p>Unable to load movies</p>
        </div>
      </div>
    );
  }

  const currentMovie = movies[currentIndex];
  const backdropUrl = currentMovie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`
    : 'https://via.placeholder.com/1920x1080';

  return (
    <div className="hero-carousel">
      <div className="hero-background">
        <div 
          className="hero-image-wrapper"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(0,0,0,0.9), rgba(0,0,0,0.3)), url(${backdropUrl})`
          }}
        >
          <div className={`hero-content ${isAnimating ? 'fade-out' : 'fade-in'}`}>
            <div className="hero-info">
              <span className="hero-rating">CBFC:U/A</span>
              <span className="hero-genre">{currentMovie.vote_average?.toFixed(1) || 'N/A'} Rating</span>
              <span className="hero-duration">{currentMovie.release_date?.split('-')[0] || ''}</span>
            </div>
            
            <h1 className="hero-title">{currentMovie.title || currentMovie.original_title}</h1>
            
            <p className="hero-description">{currentMovie.overview}</p>
            
            <div className="hero-buttons">
              <button className="hero-stream-btn" onClick={() => handleMovieClick(currentMovie)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="black">
                  <path d="M8 5v14l11-7z"/>
                </svg>
                Stream Now
              </button>
              <button className="hero-download-btn" onClick={() => handleMovieClick(currentMovie)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                  <path d="M19 9h-4V3H9v6H5l7 7 7-7zM5 18v2h14v-2H5z"/>
                </svg>
                Download
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="hero-navigation">
        <button className="hero-nav-arrow hero-prev" onClick={goToPrev}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
          </svg>
        </button>
        
        <div className="hero-dots">
          {movies.map((_, index) => (
            <button
              key={index}
              className={`hero-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
        
        <button className="hero-nav-arrow hero-next" onClick={goToNext}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
            <path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
