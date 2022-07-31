import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userSliceMock from '../mocks/userSliceMock';
import { saveUserInfo } from '../mocks/userSliceMock';
import UserProfile from '../components/UserProfile';
import sendAPI from '../utils/sendAPI';

describe('Profile', () => {
  const store = configureStore({
    reducer: { user: userSliceMock },
  });

  beforeAll(() => {
    const rootMarkup = `
      <div id="backdrop-root"></div>
      <div id="overlay-root"></div>
    `;

    document.body.insertAdjacentHTML('afterbegin', rootMarkup);
  });

  beforeEach(async () => {
    const data = await sendAPI('/users/user');
    const dispatch = jest.spyOn(store, 'dispatch');
    dispatch(saveUserInfo(data.userInfo));

    render(
      <Provider store={store}>
        <Router>
          <UserProfile />
        </Router>
      </Provider>,
    );
  });

  it('render UserProfile component text', () => {
    const changeButton = screen.getByText('자기소개 변경하기');
    const setButton = screen.getByText('관심지역 설정');

    expect(changeButton).toHaveTextContent('자기소개 변경하기');
    expect(setButton).toHaveTextContent('관심지역 설정');
  });

  it('open modal for self-introduction', async () => {
    const user = userEvent.setup();
    const setButton = screen.getByText('자기소개 변경하기');

    await user.click(setButton);

    const selfIntroductionInput = screen.getByRole('textbox');
    const submitButton = screen.getByRole('button', { name: '제출하기' });
    const selfIntroductionForm = screen.getByRole('form');

    const inputModalTitle = screen.getByText(
      '변경할 정보를 입력해 주세요 (최대 15자)',
    );

    expect(inputModalTitle).toBeInTheDocument();
    expect(selfIntroductionInput).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(selfIntroductionForm).toBeInTheDocument();
  });
});
