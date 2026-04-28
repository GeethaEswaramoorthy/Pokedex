import React from 'react';

function PokemonCard({ pokemon, isFavorite, onFavoriteToggle, onViewDetails }) {
  return (
    <div className="pokemon-card">
      <button
        className="favorite-btn"
        onClick={() => onFavoriteToggle(pokemon)}
        title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
      >
        {isFavorite ? '❤️' : '🤍'}
      </button>

      {pokemon.sprites && (
        <div style={{ 
          textAlign: 'center', 
          marginBottom: '12px', 
          minHeight: '100px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <img 
            src={pokemon.sprites} 
            alt={pokemon.name}
            style={{ maxWidth: '100%', maxHeight: '100px', objectFit: 'contain' }}
            onError={(e) => { e.target.style.display = 'none'; }}
          />
        </div>
      )}

      <div className="pokemon-card-number">#{pokemon.id}</div>
      <div className="pokemon-card-name">{pokemon.name}</div>

      {pokemon.types && pokemon.types.length > 0 && (
        <div className="pokemon-card-types">
          {pokemon.types.map((type, idx) => (
            <div key={idx} className="type-badge">{type}</div>
          ))}
        </div>
      )}

      <small style={{ color: '#999', display: 'block', marginBottom: '12px' }}>
        <strong>Height:</strong> {pokemon.height}m | <strong>Weight:</strong> {pokemon.weight}kg
      </small>

      <button
        className="view-details-btn"
        onClick={() => onViewDetails(pokemon)}
      >
        👁️ View Details
      </button>
    </div>
  );
}

export default PokemonCard;
