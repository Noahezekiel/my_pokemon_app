// PokemonList.js
import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list-title">Pokemon</h1>
      {pokemons.map((pokemon, index) => (
        <PokemonCard key={pokemon.name} pokemon={pokemon} index={index} />
      ))}
    </div>
  );
};

export default PokemonList;
