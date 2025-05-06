import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import PokemonCard from '../components/PokemonCard';
import SearchBar from '../components/SearchBar';
import ErrorMessage from '../components/ErrorMessage';
import './HomePage.css';

const HomePage = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [nextUrl, setNextUrl] = useState('https://pokeapi.co/api/v2/pokemon?limit=20');
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const observerRef = useRef();

  const loadPokemon = useCallback(async () => {
    if (!nextUrl) return;
    try {
      const response = await axios.get(nextUrl);
      setNextUrl(response.data.next);

      const pokemonDetails = await Promise.all(
        response.data.results.map(p => axios.get(p.url).then(res => res.data))
      );

      setPokemonList(prev => {
        // Avoid duplicates
        const newPokemon = pokemonDetails.filter(
          newP => !prev.some(existing => existing.name === newP.name)
        );
        return [...prev, ...newPokemon];
      });
    } catch (err) {
      setError('Failed to fetch Pokémon. Check your connection.');
    }
  }, [nextUrl]);

  useEffect(() => {
    loadPokemon();
  }, [loadPokemon]);

  // Intersection Observer for lazy loading
  const loaderRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          loadPokemon();
        }
      });

      if (node) observerRef.current.observe(node);
    },
    [loadPokemon]
  );

  const filteredList = pokemonList.filter(p =>
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="home-container">
      <h1>Pokémon List</h1>
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {error && <ErrorMessage message={error} />}
      <div className="pokemon-grid">
        {filteredList.map(pokemon => (
          <PokemonCard key={pokemon.name} pokemon={pokemon} />
        ))}
      </div>
      <div ref={loaderRef} className="load-more-trigger" />
    </div>
  );
};

export default HomePage;
