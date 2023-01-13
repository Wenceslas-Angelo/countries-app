import React, { useEffect, useState } from 'react';
import './App.css';
import { FaMoon } from 'react-icons/fa';
import Todo from './components/Country';
import ReactPaginate from 'react-paginate';

function App() {
  const [countries, setCountries] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

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

  return (
    <div className="app">
      <header>
        <h1>Where in the world?</h1>
        <div className="switch-theme">
          <FaMoon /> Dark mode
        </div>
      </header>

      <div className="countries">
        {countries
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
        pageCount={Math.ceil(countries.length / countryPerPage)}
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
