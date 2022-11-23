import React, { useContext } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Forms() {
  const { filters, setFilters } = useContext(StarWarsContext);

  const handleInputValue = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

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
    </form>
  );
}

export default Forms;
