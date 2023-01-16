import React from 'react';
import PropTypes from 'prop-types';

function RegionFilter({ regions, regionValue, setRegionValue }) {
  return (
    <form>
      <select
        value={regionValue}
        onChange={(e) => setRegionValue(e.target.value)}
      >
        <option value="">Filter by region</option>
        {regions.map((region) => (
          <option key={region} value={region}>
            {region}
          </option>
        ))}
      </select>
    </form>
  );
}

RegionFilter.propTypes = {
  regions: PropTypes.array,
  regionValue: PropTypes.string,
  setRegionValue: PropTypes.func,
};

export default RegionFilter;
