const API_KEY = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZWYzNjNmOWY5YTNjNTUzNTE0OWM5MDk3MGZhMjMxMSIsIm5iZiI6MTczMzUxMDAxOS40MTYsInN1YiI6IjY3NTM0MzgzODcxYTQyYzljMjQ1NDFhNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.FgU6EplfTnUB-e6GZZfUI7lO0Ad71oYwG54qzjXpozo";

const BASE_URL = "https://api.themoviedb.org/3";

// Fetch TV show details including all seasons
export const fetchTVShowDetails = async (tvId) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}?api_key=${API_KEY}&language=en-US`,
      options
    );
    if (!response.ok) {
      throw new Error('Failed to fetch TV show details');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch TV show details', error);
    return null;
  }
};

// Fetch episodes for a specific season
export const fetchSeasonEpisodes = async (tvId, seasonNumber) => {
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: API_KEY,
    },
  };

  try {
    const response = await fetch(
      `${BASE_URL}/tv/${tvId}/season/${seasonNumber}?api_key=${API_KEY}&language=en-US`,
      options
    );
    if (!response.ok) {
      throw new Error('Failed to fetch season episodes');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch season episodes', error);
    return null;
  }
};

// Fetch all seasons with their episode counts
export const fetchTVShowSeasons = async (tvId) => {
  const tvDetails = await fetchTVShowDetails(tvId);
  if (!tvDetails) return [];
  
  // Filter out season 0 (specials) and return valid seasons
  return tvDetails.seasons?.filter(s => s.season_number > 0) || [];
};

export default {
  fetchTVShowDetails,
  fetchSeasonEpisodes,
  fetchTVShowSeasons
};