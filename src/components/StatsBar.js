import React from 'react';

function StatsBar({ displayedCount, filteredCount, searchTerm, selectedType }) {
  return (
    <div className="pokemon-stats">
      Showing {displayedCount} of {filteredCount} Pokémon
      {searchTerm && ` (Search: "${searchTerm}")`}
      {selectedType !== 'all' && ` • Type: ${selectedType}`}
    </div>
  );
}

export default StatsBar;
