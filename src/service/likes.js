// Favorites service using localStorage

const FAVORITES_KEY = 'movie_favorites';

export const getFavorites = () => {
  try {
    const favorites = localStorage.getItem(FAVORITES_KEY);
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

export const addToFavorites = (movie) => {
  try {
    const favorites = getFavorites();
    // Check if already in favorites
    if (!favorites.some(f => f.id === movie.id)) {
      const updatedFavorites = [...favorites, movie];
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error adding to favorites:', error);
    return false;
  }
};

export const removeFromFavorites = (movieId) => {
  try {
    const favorites = getFavorites();
    const updatedFavorites = favorites.filter(f => f.id !== movieId);
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    return true;
  } catch (error) {
    console.error('Error removing from favorites:', error);
    return false;
  }
};

export const isFavorite = (movieId) => {
  try {
    const favorites = getFavorites();
    return favorites.some(f => f.id === movieId);
  } catch (error) {
    console.error('Error checking favorite:', error);
    return false;
  }
};

export const clearFavorites = () => {
  try {
    localStorage.removeItem(FAVORITES_KEY);
    return true;
  } catch (error) {
    console.error('Error clearing favorites:', error);
    return false;
  }
};