import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Login from '../pages/Login';
import store from '../store';

const MockLogin = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Login />
      </Provider>
    </BrowserRouter>
  );
};

describe('<Login />', () => {
  it('render Login page text', () => {
    render(<MockLogin />);

    const loginButton = screen.getByText('Sign in with GitHub');
    expect(loginButton).toHaveTextContent('Sign in with GitHub');
  });
});
