import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import userSliceMock from '../mocks/userSliceMock';
import { saveUserInfo } from '../mocks/userSliceMock';
import UserProfile from '../components/UserProfile';
import sendAPI from '../utils/sendAPI';

const modalRoot = document.createElement('div');
modalRoot.setAttribute('id', 'backdrop-root');
document.body.appendChild(modalRoot);

describe('Profile', () => {
  beforeEach(async () => {
    const store = configureStore({
      reducer: { user: userSliceMock },
    });

    const dispatch = jest.spyOn(store, 'dispatch');
    const data = await sendAPI('/users/user');
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

  it('Register for self-introduction', async () => {
    const user = userEvent.setup();
    const setButton = screen.getByText('자기소개 변경하기');

    user.click(setButton);

    expect(
      await screen.findByText('변경할 정보를 입력해 주세요 (최대 15자)'),
    ).toBeInTheDocument();
  });
});
