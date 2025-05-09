// pages/HomePage.js

import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observer = useRef();
  const lastPokemonRef = useRef();

  const loadPokemons = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
      );
      setPokemons(prev => [...prev, ...data.results]);
      setHasMore(data.next !== null);
    } catch (error) {
      console.error('Failed to fetch Pokémon:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPokemons();
  }, [offset]);

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim() === '') {
      setOffset(0);
      setPokemons([]);
      setHasMore(true);
      loadPokemons();
      return;
    }

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${query.toLowerCase()}`);
      setPokemons([
        { name: res.data.name, url: `https://pokeapi.co/api/v2/pokemon/${res.data.id}/` }
      ]);
      setHasMore(false);
    } catch (err) {
      setPokemons([]);
      setHasMore(false);
      console.error('Not found:', err);
    }
  };

  // Lazy load more when scrolling to last card
  useEffect(() => {
    if (loading || searchQuery.trim() !== '') return;
    
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting && hasMore) {
          setOffset(prev => prev + 20);
        }
      },
      { threshold: 1.0 } // Wait until button is fully visible
    );
  
    if (lastPokemonRef.current) {
      observer.observe(lastPokemonRef.current);
    }
  
    return () => observer.disconnect();
  }, [loading, hasMore, searchQuery]);
  
  const showFiltered = searchQuery.trim() !== '';
  const displayedPokemons = showFiltered
    ? pokemons.filter(pokemon =>
        pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : pokemons;

  return (
    <div className="home-page">
      <SearchBar setSearchQuery={handleSearch} />
      <div className="pokemon-section">
        <PokemonList
          pokemons={displayedPokemons}
          lastPokemonRef={lastPokemonRef}
          onLoadMore={() => setOffset(prev => prev + 20)}
          loading={loading}
          hasMore={hasMore}
          showFiltered={showFiltered}
        />
      </div>
    </div>
  );
};

export default HomePage;
