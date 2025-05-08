// SearchBar.js
import React from 'react';
import './SearchBar.css';

const SearchBar = ({ setSearchQuery }) => {
  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search Pokémon"
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
