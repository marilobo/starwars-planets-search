import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import getAPIData from '../services/FetchAPI';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [columnOptions, setColumnOptions] = useState(['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water']);
  const [filters, setFilters] = useState({
    name: '',
    column: columnOptions[0],
    comparison: 'maior que',
    value: 0,
  });
  const [search, setSearch] = useState([]);
  const [keepFilter, setKeepFilter] = useState([]);

  const getPlanets = async () => {
    const sWPlanets = await getAPIData();
    setPlanets(sWPlanets);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const value = useMemo(() => ({
    planets,
    filters,
    search,
    keepFilter,
    columnOptions,
    setFilters,
    setSearch,
    setKeepFilter,
    setColumnOptions,
  }), [planets, filters, search, keepFilter, columnOptions,
    setFilters, setSearch, setKeepFilter]);

  return (
    <StarWarsContext.Provider value={ value }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = ({
  children: PropTypes.shape(),
}).isRequired;

export default StarWarsProvider;
