import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Table() {
  const { planets, filters, search, setSearch, keepFilter } = useContext(StarWarsContext);

  useEffect(() => {
    function filterPlanets() {
      let filterByName = planets
        .filter((e) => e.name.toUpperCase().includes(filters.name?.toUpperCase()));

      keepFilter.forEach((filter) => {
        const { value, column } = filter;
        if (filter.comparison === 'maior que') {
          filterByName = filterByName
            .filter((movie) => Number(movie[column]) > Number(value));
        }
        if (filter.comparison === 'menor que') {
          filterByName = filterByName
            .filter((movie) => Number(movie[column]) < Number(value));
        }
        if (filter.comparison === 'igual a') {
          filterByName = filterByName
            .filter((movie) => Number(movie[column]) === Number(value));
        }
      });

      setSearch(filterByName);
    }

    filterPlanets();
  }, [planets, filters, setSearch, keepFilter]);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        { search.map((planet) => (
          <tr key={ planet.name }>
            <td data-testid="planet-name">{ planet.name }</td>
            <td>{ planet.rotation_period }</td>
            <td>{ planet.orbital_period }</td>
            <td>{ planet.diameter }</td>
            <td>{ planet.climate }</td>
            <td>{ planet.gravity }</td>
            <td>{ planet.terrain }</td>
            <td>{ planet.surface_water }</td>
            <td>{ planet.population }</td>
            <td>{ planet.films.map((film, i) => <p key={ i }>{film}</p>) }</td>
            <td>{ planet.created }</td>
            <td>{ planet.edited }</td>
            <td>{ planet.url }</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
