import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import getAPIData from '../services/FetchAPI';
import StarWarsContext from './StarWarsContext';

function StarWarsProvider({ children }) {
  const [planets, setPlanets] = useState([]);

  const getPlanets = async () => {
    const sWPlanets = await getAPIData();
    setPlanets(sWPlanets);
    console.log(sWPlanets);
  };

  useEffect(() => {
    getPlanets();
  }, []);

  return (
    <StarWarsContext.Provider value={ { planets } }>
      { children }
    </StarWarsContext.Provider>
  );
}

StarWarsProvider.propTypes = ({
  children: PropTypes.shape(),
}).isRequired;

export default StarWarsProvider;
