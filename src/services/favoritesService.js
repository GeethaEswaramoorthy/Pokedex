// Utility functions for managing favorites with localStorage

const FAVORITES_KEY = 'pokemon_favorites';

export const favoritesService = {
  // Get all favorites
  getFavorites: () => {
    try {
      const favorites = localStorage.getItem(FAVORITES_KEY);
      return favorites ? JSON.parse(favorites) : [];
    } catch (error) {
      console.error('Error reading favorites:', error);
      return [];
    }
  },

  // Add a favorite
  addFavorite: (pokemon) => {
    try {
      const favorites = favoritesService.getFavorites();
      const exists = favorites.some(fav => fav.name === pokemon.name);
      
      if (!exists) {
        favorites.push(pokemon);
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
      }
      return !exists;
    } catch (error) {
      console.error('Error adding favorite:', error);
      return false;
    }
  },

  // Remove a favorite
  removeFavorite: (pokemonName) => {
    try {
      const favorites = favoritesService.getFavorites();
      const filtered = favorites.filter(fav => fav.name !== pokemonName);
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Error removing favorite:', error);
      return false;
    }
  },

  // Check if a pokemon is favorite
  isFavorite: (pokemonName) => {
    const favorites = favoritesService.getFavorites();
    return favorites.some(fav => fav.name === pokemonName);
  },

  // Toggle favorite status
  toggleFavorite: (pokemon) => {
    const isFav = favoritesService.isFavorite(pokemon.name);
    if (isFav) {
      favoritesService.removeFavorite(pokemon.name);
      return false;
    } else {
      favoritesService.addFavorite(pokemon);
      return true;
    }
  },

  // Clear all favorites
  clearAllFavorites: () => {
    try {
      localStorage.removeItem(FAVORITES_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing favorites:', error);
      return false;
    }
  }
};
