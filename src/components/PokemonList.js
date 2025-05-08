// PokemonList
import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons, lastPokemonRef }) => {
  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list-title">Pokémon</h1>
      {pokemons.map((pokemon, index) => {
        const isLast = index === pokemons.length - 1;
        const delay = `${index * 1000}ms`; // stagger animation by 100ms per card

        return (
          <div key={pokemon.name} ref={isLast ? lastPokemonRef : null}>
            <PokemonCard pokemon={pokemon} index={index} delay={delay} />
          </div>
        );
      })}
    </div>
  );
};

export default PokemonList;
