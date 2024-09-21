import React from 'react';

const SearchBar = ({ query, setQuery, handleSearch }) => {
  return (
    <div className="search-bar">
      <input 
        type="text" 
        value={query} 
        onChange={(e) => setQuery(e.target.value)} 
        placeholder="Search for books..." 
        className="search-input"
      />
      <button onClick={handleSearch} className="search-button">
        Go
      </button>
    </div>
  );
};

export default SearchBar;
