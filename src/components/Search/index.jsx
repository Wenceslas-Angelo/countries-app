import React from 'react';
import { FaSearch } from 'react-icons/fa';
import './index.css';
import PropTypes from 'prop-types';

function Search({ query, setQuery }) {
  return (
    <form>
      <div className="search-icon">
        <FaSearch fontSize={20} color="gray" />
      </div>
      <input
        type="text"
        placeholder="Search for a countries..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

Search.propTypes = {
  query: PropTypes.string,
  setQuery: PropTypes.func,
};

export default Search;
