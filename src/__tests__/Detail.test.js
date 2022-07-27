import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';

import Detail from '../components/DetailAccordion';
import store from '../store';

describe('Detail', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <Router>
          <Detail />
        </Router>
      </Provider>,
    );
  });

  it('render Detail page text', () => {
    const basicInformation = screen.getByText('기본정보');
    const auctionProperty = screen.getByText('경매 부동산 정보');
    const mattersRegistered = screen.getByText('등기현황');
    const precautions = screen.getByText('주의사항');
    const appraisalReport = screen.getByText('감정평가서');

    expect(basicInformation).toHaveTextContent('기본정보');
    expect(auctionProperty).toHaveTextContent('경매 부동산 정보');
    expect(mattersRegistered).toHaveTextContent('등기현황');
    expect(precautions).toHaveTextContent('주의사항');
    expect(appraisalReport).toHaveTextContent('감정평가서');
  });
});
