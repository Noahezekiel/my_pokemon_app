import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './DetailPage.css';

const DetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);

  useEffect(() => {
    const fetchPokemonDetail = async () => {
      try {
        const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(data);
      } catch (error) {
        console.error('Failed to fetch Pokémon details:', error);
      }
    };

    fetchPokemonDetail();
  }, [name]);

  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <h1>{pokemon.name}</h1>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map(type => type.type.name).join(', ')}</p>
    </div>
  );
};

export default DetailPage;
