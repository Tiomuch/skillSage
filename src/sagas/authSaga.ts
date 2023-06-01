import { call, put, takeLatest } from 'redux-saga/effects'
import { PayloadAction } from '@reduxjs/toolkit'

import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  restorePasswordSuccess,
  restorePasswordFailure,
} from '../features/auth/authSlice'

function* login({
  payload,
}: PayloadAction<{ username: string; password: string }>) {
  try {
    const result = yield call(apiRequest, '/api/login', payload)

    yield put(loginSuccess(result))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* register({
  payload,
}: PayloadAction<{ username: string; password: string; secretWord: string }>) {
  try {
    const result = yield call(apiRequest, '/api/register', payload)

    yield put(registerSuccess(result))
  } catch (error) {
    yield put(registerFailure(error))
  }
}

function* restorePassword({
  payload,
}: PayloadAction<{ username: string; password: string; secretWord: string }>) {
  try {
    const result = yield call(apiRequest, '/api/register', payload)

    yield put(restorePasswordSuccess(result))
  } catch (error) {
    yield put(restorePasswordFailure(error))
  }
}

export function* authSaga() {
  yield takeLatest('auth/loginRequest', login)
  yield takeLatest('auth/registerRequest', register)
  yield takeLatest('auth/restorePasswordRequest', restorePassword)
}
