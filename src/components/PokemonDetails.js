import React from 'react';
import './Home.css';

function PokemonDetails({ pokemon, isOpen, onClose, onFavoriteToggle, isFavorite }) {
  if (!isOpen || !pokemon) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          ✕
        </button>

        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          {pokemon.sprites && (
            <img 
              src={pokemon.sprites} 
              alt={pokemon.name}
              style={{ maxWidth: '200px', maxHeight: '200px', objectFit: 'contain' }}
            />
          )}
        </div>

        <div className="modal-header">
          <div className="modal-id">#{pokemon.id || 'N/A'}</div>
          <h2 className="modal-title">{pokemon.name}</h2>
          
          {pokemon.types && pokemon.types.length > 0 && (
            <div className="modal-types">
              {pokemon.types.map((type, idx) => (
                <div key={idx} className="modal-type-badge">
                  {type}
                </div>
              ))}
            </div>
          )}
        </div>

        {pokemon.description && (
          <div className="modal-description">
            {pokemon.description}
          </div>
        )}

        {(pokemon.height || pokemon.weight || pokemon.baseExperience) && (
          <div className="modal-details">
            {pokemon.height && (
              <div className="detail-item">
                <div className="detail-label">Height</div>
                <div className="detail-value">{pokemon.height} m</div>
              </div>
            )}
            {pokemon.weight && (
              <div className="detail-item">
                <div className="detail-label">Weight</div>
                <div className="detail-value">{pokemon.weight} kg</div>
              </div>
            )}
            {pokemon.baseExperience && (
              <div className="detail-item">
                <div className="detail-label">Base Exp</div>
                <div className="detail-value">{pokemon.baseExperience}</div>
              </div>
            )}
            {pokemon.abilities && pokemon.abilities.length > 0 && (
              <div className="detail-item">
                <div className="detail-label">Abilities</div>
                <div className="detail-value">
                  {pokemon.abilities.map(ability => ability.charAt(0).toUpperCase() + ability.slice(1)).join(', ')}
                </div>
              </div>
            )}
          </div> 
        )}


        <button
          className="modal-favorite-btn"
          onClick={() => onFavoriteToggle(pokemon)}
          style={{
            background: isFavorite ? 'linear-gradient(135deg, #ff6b6b 0%, #ee5a6f 100%)' : 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          }}
        >
          {isFavorite ? '❤️ Remove from Favorites' : '🤍 Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default PokemonDetails;
