import React from 'react';

function SearchControls({ searchTerm, selectedType, types, onSearch, onTypeFilter }) {
  return (
    <div className="pokedex-controls">
      <div className="search-box">
        <label htmlFor="search">🔍 Search by Name</label>
        <input
          id="search"
          type="text"
          placeholder="e.g., Pikachu, Charizard..."
          value={searchTerm}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>

      <div className="filter-box">
        <label htmlFor="type-filter">🏷️ Filter by Type</label>
        <select
          id="type-filter"
          value={selectedType}
          onChange={(e) => onTypeFilter(e.target.value)}
        >
          <option value="all">All Types</option>
          {types.map(type => (
            <option key={type} value={type}>
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default SearchControls;
