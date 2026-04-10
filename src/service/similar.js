const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo";

const BASE_URL = "https://api.themoviedb.org/3";

// Fetch similar movies for a given movie ID
export const fetchSimilarMovies = async (movieId, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch similar movies");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch similar movies", error);
    return [];
  }
};

// Fetch recommendations for a given movie ID
export const fetchMovieRecommendations = async (movieId, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/movie/${movieId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch movie recommendations");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch movie recommendations", error);
    return [];
  }
};

// Fetch similar TV shows for a given TV show ID
export const fetchSimilarTVShows = async (tvId, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/similar?api_key=${API_KEY}&language=en-US&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch similar TV shows");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch similar TV shows", error);
    return [];
  }
};

// Fetch TV show recommendations
export const fetchTVShowRecommendations = async (tvId, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/recommendations?api_key=${API_KEY}&language=en-US&page=${page}`,
      options
    );
    if (!response.ok) {
      throw new Error("Failed to fetch TV show recommendations");
    }
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error("Failed to fetch TV show recommendations", error);
    return [];
  }
};

export default { fetchSimilarMovies, fetchMovieRecommendations, fetchSimilarTVShows, fetchTVShowRecommendations };