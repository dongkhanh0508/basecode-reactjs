/* eslint-disable @typescript-eslint/dot-notation */
import { PayloadAction } from '@reduxjs/toolkit';
import authApi from 'api/authApi';
import { AuthRequest, AuthResponse, User } from 'models';
import { call, fork, put, take } from 'redux-saga/effects';
import jwtDecode, { JwtPayload } from 'jwt-decode';
import { authAction } from './authSlice';

function* handleLogin(payload: AuthRequest) {
  try {
    const rs: AuthResponse = yield call(authApi.authUsernamePass, payload);
    const decoded = jwtDecode<JwtPayload>(rs.token);
    const key = process.env.REACT_APP_NAME_IDENTIFIER;
    const user: User = {
      username: decoded['nameid'],
      role: decoded['role'],
    } as User;
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('access_token', rs.token);
    localStorage.setItem('time_expire', decoded.exp?.toString() || '');
    yield put(authAction.loginSuccess(user));
  } catch (error) {
    yield put(authAction.loginFailed(''));
  }
}
function* handleLogout(isError: boolean) {
  localStorage.removeItem('access_token');
  localStorage.removeItem('user');
  localStorage.removeItem('time_expire');
  if (!isError) {
    // eslint-disable-next-line no-restricted-globals
    location.href = '/login';
  }

  yield null;
}
function* watchLoginFlow() {
  while (true) {
    const isLoggedIn = Boolean(localStorage.getItem('access_token'));
    if (!isLoggedIn) {
      const action: PayloadAction<AuthRequest> = yield take(authAction.login.type);
      yield fork(handleLogin, action.payload);
    }

    const action = yield take([authAction.logout.type, authAction.loginFailed.type]);
    console.log(action);
    yield call(handleLogout, action.type === authAction.loginFailed.type);
  }
}
export default function* authSaga() {
  yield fork(watchLoginFlow);
}
