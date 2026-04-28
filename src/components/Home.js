import React, { useState } from 'react';
import './Home.css';
import { usePokemonData } from '../hooks/usePokemonData';
import { useSearch } from '../hooks/useSearch';
import { useFavorites } from '../hooks/useFavorites';
import Header from './Header';
import SearchControls from './SearchControls';
import StatsBar from './StatsBar';
import PokemonGrid from './PokemonGrid';
import Pagination from './Pagination';
import PokemonDetails from './PokemonDetails';
import LoadingScreen from './LoadingScreen';
import ErrorMessage from './ErrorMessage';

function Home() {
  const { allPokemon, loading, error, types, fetchPokemonSpecies } = usePokemonData();
  const {
    searchTerm,
    selectedType,
    currentPage,
    displayedPokemon,
    filteredPokemon,
    totalPages,
    handleSearch,
    handleTypeFilter,
    handlePageChange
  } = useSearch(allPokemon);
  const { favorites, handleFavoriteToggle, isFavorite } = useFavorites();

  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [detailsModal, setDetailsModal] = useState(false);

  const handleViewDetails = async (pokemon) => {
    setSelectedPokemon(pokemon);
    setDetailsModal(true);
    
    const description = await fetchPokemonSpecies(pokemon.id);
    setSelectedPokemon(prev => ({
      ...prev,
      description: description.replace(/\f/g, ' ')
    }));
  };

  const handleCloseModal = () => {
    setDetailsModal(false);
    setSelectedPokemon(null);
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="pokedex-container">
      <Header />
      <ErrorMessage error={error} />
      <SearchControls
        searchTerm={searchTerm}
        selectedType={selectedType}
        types={types}
        onSearch={handleSearch}
        onTypeFilter={handleTypeFilter}
      />

      <div className="pokedex-content">
        <StatsBar
          displayedCount={displayedPokemon.length}
          filteredCount={filteredPokemon.length}
          searchTerm={searchTerm}
          selectedType={selectedType}
        />

        <PokemonGrid
          displayedPokemon={displayedPokemon}
          favorites={favorites}
          onFavoriteToggle={handleFavoriteToggle}
          onViewDetails={handleViewDetails}
        />

        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>

      <PokemonDetails
        pokemon={selectedPokemon}
        isOpen={detailsModal}
        onClose={handleCloseModal}
        onFavoriteToggle={handleFavoriteToggle}
        isFavorite={isFavorite(selectedPokemon?.name)}
      />
    </div>
  );
}

export default Home;