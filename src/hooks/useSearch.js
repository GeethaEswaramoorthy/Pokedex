import { useState, useEffect, useMemo } from 'react';

const ITEMS_PER_PAGE = 20;

export const useSearch = (allPokemon) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [displayedPokemon, setDisplayedPokemon] = useState([]);

  // Filter and search logic
  const filteredPokemon = useMemo(() => {
    return allPokemon.filter(pokemon => {
      const matchesSearch = pokemon.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesType = selectedType === 'all' || 
                         (pokemon.types && pokemon.types.includes(selectedType));
      return matchesSearch && matchesType;
    });
  }, [allPokemon, searchTerm, selectedType]);

  // Pagination logic
  useEffect(() => {
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const endIndex = startIndex + ITEMS_PER_PAGE;
    setDisplayedPokemon(filteredPokemon.slice(startIndex, endIndex));
  }, [filteredPokemon, currentPage]);

  const totalPages = Math.ceil(filteredPokemon.length / ITEMS_PER_PAGE);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  // Handle type filter
  const handleTypeFilter = (type) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // Handle pagination
  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return {
    searchTerm,
    selectedType,
    currentPage,
    displayedPokemon,
    filteredPokemon,
    totalPages,
    handleSearch,
    handleTypeFilter,
    handlePageChange,
    ITEMS_PER_PAGE
  };
};
