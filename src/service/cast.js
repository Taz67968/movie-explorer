const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMovieCast = async (movieId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(`${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`, options);
    if (!response.ok) {
      throw new Error('Failed to fetch cast');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch cast', error);
    return null;
  }
};

export default fetchMovieCast;
