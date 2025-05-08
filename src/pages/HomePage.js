// HomePage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  // Load 20 Pokémon per batch
  const loadPokemons = async () => {
    try {
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      setPokemons(prev => [...prev, ...data.results]);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, [offset]);

  // Intersection observer to detect last card
  const lastPokemonRef = useCallback(
    node => {
      if (!hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setOffset(prev => prev + 20), 1500);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore]
  );

  // Filtered or full list
  const showFiltered = searchQuery.trim() !== '';
  const displayedPokemons = showFiltered
    ? pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pokemons;

  return (
    <div className="home-page">
      <SearchBar setSearchQuery={setSearchQuery} />
      <PokemonList
        pokemons={displayedPokemons}
        lastPokemonRef={showFiltered ? null : lastPokemonRef}
      />
      {!showFiltered && hasMore && (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading more Pokémon...</p>
      )}
    </div>
  );
};

export default HomePage;
