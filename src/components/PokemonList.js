// components/PokemonList.js

import React from 'react';
import PokemonCard from './PokemonCard';
import './PokemonList.css';

const PokemonList = ({ pokemons, lastPokemonRef, onLoadMore, loading, hasMore, showFiltered }) => {
  return (
    <div className="pokemon-list">
      <h1 className="pokemon-list-title">Pokémon</h1>
      {pokemons.map((pokemon, index) => {
        const isLast = index === pokemons.length - 1;
        const delay = `${index * 1000}ms`;

        return (
          <div key={pokemon.name}>
            <PokemonCard pokemon={pokemon} index={index} delay={delay} />
          </div>
        );
      })}

      {!showFiltered && pokemons.length > 0 && (
        <div 
          className="load-more-wrapper"
          ref={lastPokemonRef} // Only this element uses the ref now
        >
          <button
            onClick={onLoadMore}
            disabled={!hasMore || loading}
            className="load-more-button"
          >
            {loading ? 'Loading...' : 'Load More Pokémon'}
          </button>
        </div>
      )}
    </div>
  );
};

export default PokemonList;

