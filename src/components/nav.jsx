import { useState } from "react";
import { SearchBar } from "./searchBar";
import { SetResultList } from "./SearchResultsList";
import ellipse14 from "../assets/Ellipse 14.png";

export default function NavBar() {
  const [results, setResults] = useState([]);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo">
            <a href="/">
              STREAM<span>X</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-links">
            <a href="/" className="nav-link active">Home</a>
            <a href="/" className="nav-link">Movies</a>
            <a href="/Series" className="nav-link">Series</a>
            <a href="/" className="nav-link">Trending</a>
            <a href="/" className="nav-link">Categories</a>
          </div>

          {/* Search and Profile */}
          <div className="navbar-actions">
            <div className="search-container">
              <SearchBar setResults={setResults} />
              <SetResultList results={results} />
            </div>
            <div className="profile-avatar">
              <img src={ellipse14} alt="Profile" />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="mobile-menu-btn"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`}></span>
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
          <div className="mobile-search">
            <SearchBar setResults={setResults} />
            <SetResultList results={results} />
          </div>
          <div className="mobile-nav-links">
            <a href="/" className="mobile-nav-link">Home</a>
            <a href="/" className="mobile-nav-link">Movies</a>
            <a href="/Series" className="mobile-nav-link">Series</a>
            <a href="/" className="mobile-nav-link">Trending</a>
            <a href="/" className="mobile-nav-link">Categories</a>
          </div>
        </div>
      </nav>
    </>
  );
}
