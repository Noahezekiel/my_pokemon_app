// PokemonCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, index }) => {
  const cardColors = [
    'grass-card', 'fire-card', 'water-card', 'electric-card',
    'bug-card', 'normal-card', 'poison-card', 'ground-card',
    'fairy-card', 'psychic-card'
  ];

  const groupIndex = Math.floor(index / 3); // group every 3 cards
  const cardColor = cardColors[groupIndex % cardColors.length];

  return (
    <div className={`pokemon-card ${cardColor}`}>
      <Link to={`/pokemon/${pokemon.name}`}>
        <h3>{pokemon.name}</h3>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.url.split('/')[6]}.png`}
          alt={pokemon.name}
        />
      </Link>
    </div>
  );
};

export default PokemonCard;
