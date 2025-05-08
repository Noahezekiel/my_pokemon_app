import React from 'react';
import { Link } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ pokemon, index, delay }) => {
  const cardColors = [
    'grass-card', 'fire-card', 'water-card', 'electric-card',
    'bug-card', 'normal-card', 'poison-card', 'ground-card',
    'fairy-card', 'psychic-card'
  ];

  const groupIndex = Math.floor(index / 3);
  const cardColor = cardColors[groupIndex % cardColors.length];

  return (
    <div
      className={`pokemon-card ${cardColor}`}
      style={{ animationDelay: delay }}
    >
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
