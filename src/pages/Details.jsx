import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { NavLink, useParams } from 'react-router-dom';

function Details() {
  const [country, setCountry] = useState({});
  const { name } = useParams();

  const getOneCountry = async () => {
    const country = await fetch(`https://restcountries.com/v3.1/name/${name}`);
    const countryData = await country.json();
    setCountry(countryData[0]);
  };

  useEffect(() => {
    getOneCountry();
  }, [name]);

  return (
    <div className="details">
      <div className="btn">
        <NavLink to={`/`}>
          <FaArrowLeft />
          Back
        </NavLink>
      </div>

      {country.flags && (
        <div className="country-details">
          <div className="flag">
            <img src={country.flags.png} alt={`${country.name}-flag`} />
          </div>

          <div className="info info-one">
            <h2>{country.name.official}</h2>
            <p>
              Population: <span>{country.population}</span>
            </p>
            <p>
              Region: <span>{country.region}</span>
            </p>
            <p>
              Subregion: <span>{country.subregion}</span>
            </p>
            {country.capital && (
              <p>
                Capital: <span>{country.capital}</span>
              </p>
            )}
          </div>

          <div className="info info-two">
            <p>
              Top level domain: <span>{country.tld[0]}</span>
            </p>
            <p>
              Currencies:{' '}
              <span>{Object.values(country.currencies)[0].name}</span>
            </p>
            <p>
              Languages:
              {Object.values(country.languages).map((language, index) => (
                <span key={index}>
                  {' '}
                  {language}
                  {index === Object.values(country.languages).length - 1
                    ? ' '
                    : ','}
                </span>
              ))}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Details;
