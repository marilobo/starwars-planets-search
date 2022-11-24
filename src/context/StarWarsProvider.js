import React, { useState, useEffect, useMemo } from 'react';
import PropTypes from 'prop-types';
import getAPIData from '../services/FetchAPI';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [search, setSearch] = useState([]);
  const [keepFilter, setKeepFilter] = useState([]);

  const getPlanets = async () => {
    const sWPlanets = await getAPIData();
    setPlanets(sWPlanets);
    console.log(sWPlanets);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  const value = useMemo(() => ({
    planets,
    filters,
    search,
    keepFilter,
    setFilters,
    setSearch,
    setKeepFilter,
  }), [planets, filters, search, keepFilter, setFilters, setSearch, setKeepFilter]);

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
