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
    expect(homeButton).toHaveTextContent('Home');
    const myPageButton = screen.getByText('My Page');
    expect(myPageButton).toHaveTextContent('My Page');
    const backButton = screen.getByText('Back');
    expect(backButton).toHaveTextContent('Back');
    const logoutButton = screen.getByText('Logout');
    expect(logoutButton).toHaveTextContent('Logout');
  });
});
