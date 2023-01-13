import React, { useEffect, useState } from 'react';
import './App.css';
import { FaMoon } from 'react-icons/fa';
import Todo from './components/Country';

function App() {
  const [countries, setCountries] = useState([]);

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
        {countries.map((country) => (
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
    </div>
  );
}

export default App;
