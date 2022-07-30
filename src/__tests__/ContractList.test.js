import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import ContractList from '../components/ContractList';
import store from '../store';

describe('ContractList', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <ContractList />
        </Router>
      </Provider>,
    );
  });

  it('render ContractList component text', () => {
    const button = screen.getByText('계약서');

    expect(button).toHaveTextContent('계약서');
  });
});
