import React, { useState, useEffect } from 'react';
import Todo from '../components/Country';
import ReactPaginate from 'react-paginate';
import Search from '../components/Search';
import RegionFilter from '../components/RegionFilter';

function Home() {
  const [countries, setCountries] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [query, setQuery] = useState('');
  const [regionValue, setRegionValue] = useState('');
  const [regions, setRegions] = useState([]);

  const countryPerPage = 8;
  const pageVisited = pageNumber * countryPerPage;

  const getAllRegions = () => {
    countries.forEach((country) => {
      let regionExist = false;
      for (let region of regions) {
        if (country.region === region) {
          regionExist = true;
        }
      }
      if (!regionExist) {
        setRegions([...regions, country.region]);
      }
    });
  };

  const getAllCountries = async () => {
    const response = await fetch(`https://restcountries.com/v3.1/all`);
    const data = await response.json();
    setCountries(data);
  };

  useEffect(() => {
    getAllCountries();
  }, []);

  getAllRegions();

  const filterCountries = () => {
    // setPageNumber(0);
    if (regionValue) {
      const filter = countries.filter(
        (country) =>
          country.name.common.toLowerCase().includes(query.toLowerCase()) &&
          country.region === regionValue
      );
      return filter;
    } else {
      const filter = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      return filter;
    }
  };

  return (
    <div className="home">
      <div className="actions">
        <Search query={query} setQuery={setQuery} />
        <RegionFilter
          regions={regions}
          regionValue={regionValue}
          setRegionValue={setRegionValue}
        />
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

export default Home;
