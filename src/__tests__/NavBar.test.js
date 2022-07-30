import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import NavBar from '../components/NavBar';
import store from '../store';

describe('NavBar', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <NavBar />
        </Router>
      </Provider>,
    );
  });

  it('render NavBar page text', () => {
    const homeButton = screen.getByText('Home');
    const myPageButton = screen.getByText('My Page');
    const backButton = screen.getByText('Back');
    const logoutButton = screen.getByText('Logout');

    expect(homeButton).toHaveTextContent('Home');
    expect(myPageButton).toHaveTextContent('My Page');
    expect(backButton).toHaveTextContent('Back');
    expect(logoutButton).toHaveTextContent('Logout');
  });
});
