const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieVideos = async (movieId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/videos?language=en-US`, options);
    if (!response.ok) {
      // Try alternative endpoint for TV shows
      const tvResponse = await fetch(`${BASE_URL}/tv/${movieId}/videos?language=en-US`, options);
      if (!tvResponse.ok) {
        throw new Error('Failed to fetch videos');
      }
      const data = await tvResponse.json();
      return data;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch videos', error);
    return null;
  }
};

export default fetchMovieVideos;
