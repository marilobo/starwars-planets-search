import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';

function Filters() {
  const { keepFilter, setKeepFilter,
    setColumnOptions, setFilters } = useContext(StarWarsContext);

  const deleteBtn = ({ target }) => {
    setKeepFilter(keepFilter.filter((f) => f.column !== target.name));
  };

  useEffect(() => {
    const arr = ['population', 'orbital_period', 'diameter',
      'rotation_period', 'surface_water'];
    const filterArr = arr.filter((f) => !keepFilter
      .some((e) => e.column === f));
    setColumnOptions(filterArr);
    setFilters((prev) => ({
      ...prev,
      column: filterArr[0],
    }));
  }, [keepFilter, setColumnOptions, setFilters]);

  return (
    <div>
      { keepFilter.map((f) => (
        <span data-testid="filter" key={ f.column }>
          <span>{ `${f.column} ` }</span>
          <span>{ `${f.comparison} ` }</span>
          <span>{ `${f.value} ` }</span>
          <button
            type="button"
            onClick={ deleteBtn }
            name={ f.column }
          >
            apagar

          </button>
        </span>)) }
    </div>
  );
}

export default Filters;
