import React, { useContext, useEffect } from 'react';
import StarWarsContext from '../context/StarWarsContext';
import delBtn from '../images/delete-btn.svg';

function Filters() {
  const { keepFilter, setKeepFilter,
    setColumnOptions, setFilters } = useContext(StarWarsContext);

  const deleteBtn = ({ target }) => {
    setKeepFilter(keepFilter.filter((f) => f.column !== target.name));
  };

  // lógica do useEffect implementada graças à ajuda dos meus amigos André Fretta e Mariana Nascimento
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
        <span data-testid="filter" className="keep-filter" key={ f.column }>
          <span>{ `${f.column} ` }</span>
          <span>{ `${f.comparison} ` }</span>
          <span>{ `${f.value} ` }</span>
          <input
            src={ delBtn }
            alt="Deletar"
            className="clear-filter-btn"
            type="image"
            onClick={ deleteBtn }
            name={ f.column }
          />
        </span>)) }
    </div>
  );
}

export default Filters;
