import React, { useContext, useEffect, useState } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Forms() {
  const { filters, setFilters, keepFilter, setKeepFilter, setSearch,
    columnOptions, setColumnOptions, planets,
    update, setUpdate } = useContext(StarWarsContext);

  const [howToOrder, setHowToOrder] = useState('');
  const [orderColumn, setOrderColumn] = useState('population');

  const handleInputValue = ({ target }) => {
    setFilters({ ...filters, [target.name]: target.value });
  };

  const arr = ['population', 'orbital_period', 'diameter',
    'rotation_period', 'surface_water'];

  const addFilter = () => {
    const { name, ...rest } = filters;
    setKeepFilter([...keepFilter, rest]);
    setColumnOptions(columnOptions.filter((e) => e !== filters.column));
  };

  const removeAllFilters = () => {
    setKeepFilter([]);
  };

  const orderFilter = () => {
    const menosUm = -1;
    setSearch(planets.sort((a, b) => {
      if (a[orderColumn] === 'unknown') return 1;
      if (b[orderColumn] === 'unknown') return menosUm;
      if (howToOrder === 'ASC') return a[orderColumn] - b[orderColumn];
      if (howToOrder === 'DESC') return b[orderColumn] - a[orderColumn];
      return 0;
    }));
    setUpdate(!update);
  };

  useEffect(() => {
    setFilters({
      name: '',
      column: columnOptions[0],
      comparison: 'maior que',
      value: 0,
    });
  }, [columnOptions, setFilters]);

  return (
    <form className="form-container">
      <label htmlFor="name" className="name-input">
        <input
          data-testid="name-filter"
          name="name"
          id="name"
          value={ filters.name }
          onChange={ handleInputValue }
          placeholder="Pesquisar planeta"
        />
      </label>
      <div className="inputs-container">
        <label htmlFor="column" className="order-sort">
          Coluna
          <select
            data-testid="column-filter"
            name="column"
            onChange={ handleInputValue }
            value={ filters.column }
          >
            {columnOptions.map((opt) => (
              <option
                key={ opt }
                value={ opt }
                className="options"
              >
                {opt}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="comparison" className="order-sort">
          Operador
          <select
            data-testid="comparison-filter"
            name="comparison"
            onChange={ handleInputValue }
            value={ filters.comparison }
          >
            <option className="options" value="maior que">maior que</option>
            <option className="options" value="menor que">menor que</option>
            <option className="options" value="igual a">igual a</option>
          </select>
        </label>
        <input
          className="number-input"
          data-testid="value-filter"
          type="number"
          name="value"
          value={ filters.value }
          onChange={ handleInputValue }
        />
        <button
          type="button"
          data-testid="button-filter"
          onClick={ addFilter }
        >
          Filtrar

        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ removeAllFilters }
        >
          Remover
        </button>
        <label htmlFor="order" className="order-sort">
          Ordenar
          <select
            name="order"
            data-testid="column-sort"
            value={ orderColumn }
            onChange={ ({ target }) => setOrderColumn(target.value) }
          >
            {arr.map((opt) => (
              <option className="options" key={ opt } value={ opt }>{opt}</option>
            ))}
          </select>
        </label>
        <span className="order-inputs">
          <label htmlFor="ASC">
            <input
              id="ASC"
              type="radio"
              name="order-radio"
              value="ASC"
              data-testid="column-sort-input-asc"
              onChange={ ({ target }) => setHowToOrder(target.value) }
            />
            Ascendente
          </label>
          <label htmlFor="DESC">
            <input
              id="DESC"
              type="radio"
              name="order-radio"
              value="DESC"
              data-testid="column-sort-input-desc"
              onChange={ ({ target }) => setHowToOrder(target.value) }
            />
            Descendente
          </label>
        </span>
        <button
          type="button"
          data-testid="column-sort-button"
          onClick={ orderFilter }
        >
          Ordenar

        </button>
      </div>
    </form>
  );
}

export default Forms;
