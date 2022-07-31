import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Login from '../pages/Login';
import store from '../store';

describe('Login', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>,
    );
  });

  it('render Login page text', () => {
    const loginButton = screen.getByText('Sign in with GitHub');
    const loginFooter = screen.getByText(
      '© 2022 Reserved by D.Bugger Brothers',
    );

    expect(loginButton).toHaveTextContent('Sign in with GitHub');
    expect(loginFooter).toHaveTextContent(
      '© 2022 Reserved by D.Bugger Brothers',
    );
  });

  it('renders logo-image', () => {
    const logoImag = screen.getByAltText('logo-imag');

    expect(logoImag).toHaveAttribute('src', '/img/logo.png');
  });
});
