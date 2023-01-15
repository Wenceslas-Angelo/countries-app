import React, { useEffect, useState } from 'react';
import './App.css';
import { FaMoon } from 'react-icons/fa';
import Todo from './components/Country';
import ReactPaginate from 'react-paginate';
import Search from './components/Search';

function App() {
  const [countries, setCountries] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState('');

  const countryPerPage = 8;
  const pageVisited = pageNumber * countryPerPage;

  const getAllCountries = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    setCountries(data);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  const filterCountries = () => {
    if (query) {
      const search = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      return search;
    } else {
      return countries;
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Where in the world?</h1>
        <div className="switch-theme">
          <FaMoon /> Dark mode
        </div>
      </header>

      <div className="actions">
        <Search query={query} setQuery={setQuery} />
      </div>

      <div className="countries">
        {filterCountries()
          .slice(pageVisited, pageVisited + countryPerPage)
          .map((country) => (
            <Todo
              key={country.name.common}
              image={country.flags.png}
              region={country.region}
              name={country.name.common}
              population={country.population}
              capital={country.capital}
            />
          ))}
      </div>
      <ReactPaginate
        previousLabel={'Previous'}
        nextLabel={'Next'}
        pageCount={Math.ceil(filterCountries().length / countryPerPage)}
        onPageChange={({ selected }) => setPageNumber(selected)}
        containerClassName={'pagination-btns'}
        previousLinkClassName={'previous-btn'}
        nextLinkClassName={'next-btn'}
        disabledClassName={'pagination-disabled'}
        activeClassName={'pagination-active'}
      />
    </div>
  );
}

export default App;
