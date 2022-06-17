import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import MyPage from '../components/FavoriteBuildings';
import store from '../store';

const MockMyPage = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <MyPage />
      </Provider>
    </BrowserRouter>
  );
};

describe('<MyPage />', () => {
  it('render MyPage page text', () => {
    render(<MockMyPage />);

    const preferenceSale = screen.getByText('찜한 매물');
    expect(preferenceSale).toHaveTextContent('찜한 매물');
  });
});
