const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo";

const BASE_URL = "https://api.themoviedb.org/3";

// Genre IDs: Horror=27, Sci-Fi=878, Documentary=99, Animation=16, Thriller=53
const GENRE_IDS = {
  horror: 27,
  scifi: 878,
  documentary: 99,
  animation: 16,
  thriller: 53
};

export const fetchMoviesByGenre = async (genre, page = 1) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const genreId = GENRE_IDS[genre];
    const response = await fetch(
      `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch ${genre} movies`);
    }
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error(`Failed to fetch ${genre} movies`, error);
    return [];
  }
};

export const fetchHorrorMovies = () => fetchMoviesByGenre('horror');
export const fetchSciFiMovies = () => fetchMoviesByGenre('scifi');
export const fetchDocumentaryMovies = () => fetchMoviesByGenre('documentary');
export const fetchAnimationMovies = () => fetchMoviesByGenre('animation');
export const fetchThrillerMovies = () => fetchMoviesByGenre('thriller');

export default fetchMoviesByGenre;
