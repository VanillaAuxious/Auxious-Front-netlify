import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';

import Main from '../pages/Main';
// import SearchPlace from '../pages/SearchPlace';
// import MyFavoriteRegion from '../components/FavoriteRegions';
import store from '../store';

describe('Main', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Main />} />
            {/* <Route path='/search/:place' element={<SearchPlace />} /> */}
            {/* <Route path='/favoriteregion' element={<MyFavoriteRegion />} /> */}
          </Routes>
        </Router>
      </Provider>,
    );
  });

  it('render Main page text', () => {
    const apartmentFilter = screen.getByText('아파트');
    const housingFilter = screen.getByText('주택');
    const roomFilter = screen.getByText('오피스텔/원룸');
    const aMultiFilter = screen.getByText('다세대/다가구');
    const mainDescription = screen.getByText('Please select an auction area.');
    const mainDescriptions = screen.getByText(
      'Enter the administrative district of Seoul.',
    );

    expect(apartmentFilter).toHaveTextContent('아파트');
    expect(housingFilter).toHaveTextContent('주택');
    expect(roomFilter).toHaveTextContent('오피스텔/원룸');
    expect(aMultiFilter).toHaveTextContent('다세대/다가구');
    expect(mainDescription).toHaveTextContent('Please select an auction area.');
    expect(mainDescriptions).toHaveTextContent(
      'Enter the administrative district of Seoul.',
    );
  });

  it('Once entered, the button is activated.', async () => {
    const user = userEvent.setup();
    const inputText = screen.getByRole('textbox');
    const button = screen.getByText('검색');

    expect(button).toBeDisabled();
    await user.type(inputText, '삼성동');

    expect(button).toBeEnabled();
    await user.click(button);

    // const apartmentFilter = screen.getByRole('textbox');
    // expect(apartmentFilter).toHaveTextContent('지역을 입력하세요');
  });
});
