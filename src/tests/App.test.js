import React from 'react';
import { render, screen } from '@testing-library/react';
import mockPlanets from './mockStarWars';
import App from '../App';
import userEvent from '@testing-library/user-event';

beforeEach(() => {
  jest.spyOn(global, 'fetch').mockResolvedValue({
    json: jest.fn().mockResolvedValue(mockPlanets),
  });
})

describe('Bloco de testes de inputs e botões', () => {
  it('Testa presença dos inputs e botões e funcionalidade do filtro de nome', async () => {
    render(<App />)
    expect(global.fetch).toHaveBeenCalled();

    const nameInput = screen.getByTestId('name-filter');
    expect(nameInput).toBeInTheDocument();

    const columnInput = screen.getByTestId('column-filter');
    expect(columnInput).toBeInTheDocument();
    expect(columnInput).toHaveValue('population');
    expect(columnInput).toHaveLength(5);

    const comparisonInput = screen.getByTestId('comparison-filter');
    expect(comparisonInput).toBeInTheDocument();
    expect(comparisonInput).toHaveValue('maior que');
    expect(comparisonInput).toHaveLength(3);

    const valueInput = screen.getByTestId('value-filter');
    expect(valueInput).toBeInTheDocument();
    expect(valueInput).toHaveValue(0);

    const filterBtn = screen.getByRole('button', {name: /filtrar/i});
    expect(filterBtn).toBeInTheDocument();

    const removeBtn = screen.getByRole('button', {name: /remover/i});
    expect(removeBtn).toBeInTheDocument();

    const alderaan = await screen.findByRole('cell', {name: /alderaan/i});
    expect(alderaan).toBeInTheDocument();
    userEvent.type(nameInput, 'ta');
    const tatooine = await screen.findByRole('cell', {name: /tatooine/i});
    expect(tatooine).toBeInTheDocument();
    userEvent.clear(nameInput);
  });

  it('Testa condicionais do input coparison', async () => {
    render(<App />)
    const columnInput = screen.getByTestId('column-filter');
    const valueInput = screen.getByTestId('value-filter');
    const filterBtn = screen.getByRole('button', {name: /filtrar/i});

    userEvent.type(valueInput, '10000');
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: 'maior que' })
      );
    userEvent.click(filterBtn);
    expect(columnInput).toHaveLength(4);

    const tatooine = await screen.findByRole('cell', {name: /tatooine/i});
    expect(tatooine).toBeInTheDocument();

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '364');
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: 'menor que' })
      );
    userEvent.click(filterBtn);

    userEvent.clear(valueInput);
    userEvent.type(valueInput, '12120');
    userEvent.selectOptions(
      screen.getByTestId('comparison-filter'),
      screen.getByRole('option', { name: 'igual a' })
      );
    userEvent.click(filterBtn);

    expect(tatooine).not.toBeInTheDocument();

    const naboo = await screen.findByRole('cell', {name: /naboo/i});
    expect(naboo).toBeInTheDocument();

    const clearBtn = await screen.findAllByRole('button', {name: /apagar/i});
    expect(clearBtn[0]).toBeInTheDocument();
    userEvent.click(clearBtn[0]);
    expect(clearBtn[0]).not.toBeInTheDocument();
  });
});
