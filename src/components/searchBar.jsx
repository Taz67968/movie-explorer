import PropTypes from "prop-types";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ setResults }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo",
      },
    };
    fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      options
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        const results = data.results?.filter((user) => {
          return (
            value && user && user.title && user.title.toLowerCase().includes(value) || ''
          );
        });
        console.log(results);
        setResults(results)
      })

      .catch((err) => console.error(err));
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div id="input">
      <input
        id="amount-input"
        placeholder="Search Movies, Series..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
      <FaSearch id="search-icon" />
    </div>
  );
};

SearchBar.propTypes = {
  setResults: PropTypes.object.isRequired,

};