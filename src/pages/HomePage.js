import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PokemonList from '../components/PokemonList';
import SearchBar from '../components/SearchBar';
import './HomePage.css';

const HomePage = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
        setPokemons(data.results);
      } catch (error) {
        console.error('Failed to fetch Pokémon data:', error);
      }
    };

    fetchPokemons();
  }, []);

  const filteredPokemons = pokemons.filter(pokemon =>
    pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <SearchBar setSearchQuery={setSearchQuery} />
      <PokemonList pokemons={filteredPokemons} />
    </div>
  );
};

export default HomePage;
