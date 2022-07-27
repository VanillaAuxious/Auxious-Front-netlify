import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import MyPage from '../pages/MyPage';
import MyFavoriteRegion from '../pages/FavoriteRegion';
import store from '../store';

const mock = (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path='/mypage' element={<MyPage />} />
        <Route path='/favoriteregion' element={<MyFavoriteRegion />} />
      </Routes>
    </Router>
  </Provider>
);

describe('MyPage', () => {
  beforeEach(() => {
    //API

    render(
      <Provider store={store}>
        <Router>
          <MyPage />
        </Router>
      </Provider>,
    );
  });


  it('render MyPage page text', () => {
    const IntroduceYourself = screen.getByText('관심지역 설정');
    expect(IntroduceYourself).toHaveTextContent('관심지역 설정');
  });
});
