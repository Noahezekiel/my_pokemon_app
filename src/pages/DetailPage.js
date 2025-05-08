// DetailPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
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

  const mainType = pokemon.types[0].type.name;
  const colorClass = `${mainType}-bg`;

  return (
    <div className={`detail-page ${colorClass}`}>
      <div className="detail-header">
        <Link to="/" className="back-button">←</Link>
        <h1 className="pokemon-name">
          {pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}
        </h1>
        <span className="pokemon-id">#{String(pokemon.id).padStart(3, '0')}</span>
        <img
          className="detail-image"
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`}
          alt={pokemon.name}
        />
        <div className="types">
          {pokemon.types.map((type, i) => (
            <span key={i} className={`type ${type.type.name}`}>
              {type.type.name}
            </span>
          ))}
        </div>
      </div>

      <div className="detail-info">
        <h2>Base Stats</h2>
        <ul className="stats-list">
          {pokemon.stats.map((stat, i) => (
            <li key={i} className="stat-item">
              <span className="stat-name">{stat.stat.name}</span>
              <div className="stat-bar">
                <div
                  className="stat-fill"
                  style={{ width: `${stat.base_stat / 2}%` }}
                ></div>
              </div>
              <span className="stat-value">{stat.base_stat}</span>
            </li>
          ))}
        </ul>

        <div className="extra-info">
          <p><strong>Height:</strong> {pokemon.height / 10} m</p>
          <p><strong>Weight:</strong> {pokemon.weight / 10} kg</p>
          <p><strong>Base Experience:</strong> {pokemon.base_experience}</p>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
