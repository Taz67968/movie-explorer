import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";

const API_KEY = "4ef363f9f9a3c5535149c90970fa2311"; // Plain API key for query params

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  // Debounce user input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedInput(input);
    }, 500); // 500ms delay

    return () => clearTimeout(timer);
  }, [input]);

  // Trigger fetch when debounced input changes
  useEffect(() => {
    if (debouncedInput) {
      fetchData(debouncedInput);
    } else {
      setResults([]);
      setError("");
    }
  }, [debouncedInput]);

  const fetchData = async (query) => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&query=${encodeURIComponent(query)}`
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.status_message || "Something went wrong!");
      }

      // Only include movies and TV shows, and ensure the title or name contains the query text
      const results = data.results?.filter((item) => 
        (item.media_type === "movie" || item.media_type === "tv") &&
        (item.title?.toLowerCase().includes(query.toLowerCase()) || 
         item.name?.toLowerCase().includes(query.toLowerCase()))
      ) || [];

      setResults(results);
      setError(results.length === 0 ? "No results found." : "");
    } catch (err) {
      setError(err.message || "Failed to fetch results.");
    }
  };

  return (
   <>
    <div id="input">
      <input
        id="amount-input"
        placeholder="Search Movies, Series..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <FaSearch id="search-icon" />
      
    </div>

    <div>
    {error && <div className="error-message">{error}</div>}
    </div>
    
   </>
  );
};

SearchBar.propTypes = {
  setResults: PropTypes.func.isRequired,
};
