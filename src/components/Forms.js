import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Forms() {
  const { filters, setFilters } = useContext(StarWarsContext);

  const handleInputValue = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  const columnOptions = ['population',
    'orbital_period', 'diameter', 'rotation_period', 'surface_water'];

  return (
    <form>
      <label htmlFor="name">
        Nome
        <input
          data-testid="name-filter"
          name="name"
          id="name"
          value={ filters.name }
          onChange={ handleInputValue }
        />
      </label>
      <select
        data-testid="column-filter"
        name="column"
        onChange={ handleInputValue }
        value={ filters.column }
      >
        {columnOptions.map((opt) => <option key={ opt } value={ opt }>{opt}</option>)}
      </select>
      <select
        data-testid="comparison-filter"
        name="comparison"
        onChange={ handleInputValue }
        value={ filters.comparison }
      >
        <option value="maior que">maior que</option>
        <option value="menor que">menor que</option>
        <option value="igual a">igual a</option>
      </select>
      <input
        data-testid="value-filter"
        type="number"
        name="value"
        value={ filters.value }
        onChange={ handleInputValue }
      />
      <button type="button" data-testid="button-filter">FILTRAR</button>
    </form>
  );
}

export default Forms;
