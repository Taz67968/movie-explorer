const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieCast = async (movieId) => {
  // Use basic auth header, not query param
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    // Try movie endpoint first
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?language=en-US`, options);
    if (!response.ok) {
      // Try TV endpoint for TV shows
      const tvResponse = await fetch(`${BASE_URL}/tv/${movieId}/credits?language=en-US`, options);
      if (!tvResponse.ok) {
        return null;
      }
      return await tvResponse.json();
    }
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch cast", error);
    return null;
  }
};

export default fetchMovieCast;
