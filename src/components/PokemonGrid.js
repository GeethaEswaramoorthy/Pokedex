import React from 'react';
import PokemonCard from './PokemonCard';

function PokemonGrid({ displayedPokemon, favorites, onFavoriteToggle, onViewDetails }) {
  if (displayedPokemon.length === 0) {
    return (
      <div className="no-results">
        😕 No Pokémon found. Try adjusting your search or filters!
      </div>
    );
  }

  return (
    <div className="pokemon-grid">
      {displayedPokemon.map((pokemon) => {
        const isFav = favorites.some(fav => fav.name === pokemon.name);
        return (
          <PokemonCard
            key={pokemon.name}
            pokemon={pokemon}
            isFavorite={isFav}
            onFavoriteToggle={onFavoriteToggle}
            onViewDetails={onViewDetails}
          />
        );
      })}
    </div>
  );
}

export default PokemonGrid;
