import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ErrorMessage from '../components/ErrorMessage';
import './DetailPage.css';

const DetailPage = () => {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
      } catch {
        setError('Failed to fetch Pokémon details.');
      }
    };
    fetchPokemon();
  }, [name]);

  if (error) return <ErrorMessage message={error} />;
  if (!pokemon) return <p>Loading...</p>;

  return (
    <div className="detail-container">
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Base Experience: {pokemon.base_experience}</p>
    </div>
  );
};

export default DetailPage;
