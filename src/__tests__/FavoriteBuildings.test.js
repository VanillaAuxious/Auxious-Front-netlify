import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import FavoriteBuildings from '../components/FavoriteBuildings';
import store from '../store';

describe('FavoriteBuildings', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <FavoriteBuildings />
        </Router>
      </Provider>,
    );
  });

  it('render FavoriteBuildings component text', () => {
    const button = screen.getByText('찜한 매물');

    expect(button).toHaveTextContent('찜한 매물');
  });
});
