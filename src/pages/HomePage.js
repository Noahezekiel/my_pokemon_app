// HomePage.js
import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [isSearching, setIsSearching] = useState(false);
  const observer = useRef();

  // Lazy load 20 Pokémon at a time
  const loadPokemons = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      setPokemons(prev => [...prev, ...res.data.results]);
      setHasMore(res.data.next !== null);
    } catch (err) {
      console.error('Fetch error:', err);
    }
  };

  useEffect(() => {
    if (!isSearching) loadPokemons();
  }, [offset, isSearching]);

  // Intersection observer for lazy loading
  const lastPokemonRef = useCallback(
    node => {
      if (isSearching || !hasMore) return;
      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          setTimeout(() => setOffset(prev => prev + 20), 1500);
        }
      });

      if (node) observer.current.observe(node);
    },
    [hasMore, isSearching]
  );

  // Search Pokémon by name
  const handleSearch = async (query) => {
    if (query.trim() === '') {
      // Reset to lazy loaded state
      setPokemons([]);
      setOffset(0);
      setHasMore(true);
      setIsSearching(false);
      return;
    }

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemons([
        {
          name: res.data.name,
          url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/`,
        },
      ]);
      setHasMore(false);
      setIsSearching(true);
    } catch (err) {
      setPokemons([]);
      setHasMore(false);
      setIsSearching(true);
      console.error('Not found:', err);
    }
  };

  return (
    <div className="home-page">
      <SearchBar setSearchQuery={handleSearch} />
      <PokemonList
        pokemons={pokemons}
        lastPokemonRef={!isSearching ? lastPokemonRef : null}
      />
      {!isSearching && hasMore && (
        <p style={{ textAlign: 'center', marginTop: '1rem' }}>Loading more Pokémon...</p>
      )}
    </div>
  );
};

export default HomePage;
