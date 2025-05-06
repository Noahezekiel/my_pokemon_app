import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PokemonCard.css';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <div className="pokemon-card" onClick={() => navigate(`/pokemon/${pokemon.name}`)}>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h3>{pokemon.name}</h3>
    </div>
  );
};

export default PokemonCard;
