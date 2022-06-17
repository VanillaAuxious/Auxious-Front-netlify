import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import Search from '../components/Search';
import store from '../store';

const MockMain = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Search />
      </Provider>
    </BrowserRouter>
  );};

describe('<Main />', () => {
  it('render Main page text', () => {
    render(<MockMain />);

    const apartmentFilter = screen.getByText('아파트');
    const housingFilter = screen.getByText('주택');
    const roomFilter = screen.getByText('오피스텔/원룸');
    const aMultiFilter = screen.getByText('다세대/다가구');

    expect(apartmentFilter).toHaveTextContent('아파트');
    expect(housingFilter).toHaveTextContent('주택');
    expect(roomFilter).toHaveTextContent('오피스텔/원룸');
    expect(aMultiFilter).toHaveTextContent('다세대/다가구');
  });
});
