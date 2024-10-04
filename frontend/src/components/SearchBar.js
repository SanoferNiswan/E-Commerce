import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault(); 

    // Check if the search input is empty
    if (!searchQuery.trim()) {
      // If input is empty, navigate to /products
      navigate('/products');
    } else {
      // Otherwise, navigate to the search results page
      navigate(`/search/${searchQuery}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="d-flex align-items-center">
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products..."
        className="form-control me-2"
        style={{ maxWidth: '400px' }} // Adjust width if needed
      />
      <button type="submit" className="btn btn-primary d-flex align-items-center">
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <i className="fas fa-search me-1"></i> {/* Font Awesome search icon */}
        Search
      </button>
    </form>

  );
};

export default SearchBar;
