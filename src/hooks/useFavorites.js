import { useState, useEffect } from 'react';
import { favoritesService } from '../services/favoritesService';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    setFavorites(favoritesService.getFavorites());
  }, []);

  const handleFavoriteToggle = (pokemon) => {
    const newFavStatus = favoritesService.toggleFavorite(pokemon);
    setFavorites(favoritesService.getFavorites());
    return newFavStatus;
  };

  const isFavorite = (pokemonName) => {
    return favorites.some(fav => fav.name === pokemonName);
  };

  return { favorites, handleFavoriteToggle, isFavorite };
};
