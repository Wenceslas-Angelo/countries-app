import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Country({ image, name, population, capital, region }) {
  return (
    <div className="country">
      <div className="image">
        <img src={image} alt={`${name}-flag`} />
      </div>
      <div className="info">
        <h2>{name}</h2>
        <p>
          Population: <span>{population}</span>
        </p>
        <p>
          Region: <span>{region}</span>
        </p>
        <p>
          Capital: <span>{capital}</span>
        </p>
      </div>
    </div>
  );
}

Country.propTypes = {
  image: PropTypes.string,
  name: PropTypes.string,
  population: PropTypes.number,
  capital: PropTypes.array,
  region: PropTypes.string,
};

export default Country;
