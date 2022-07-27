import { fireEvent, render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Search from '../components/Search';
import store from '../store';

describe('Main', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Search />
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
});
