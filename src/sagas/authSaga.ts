import { call, put, takeLatest } from 'redux-saga/effects'
import axios from 'axios'

import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  restorePasswordSuccess,
  restorePasswordFailure,
} from '../features/auth/authSlice'

async function apiRequest(url: string, data: any) {
  const response = await axios.post(url, data)
  return response.data
}

function* login(action: { payload: { username: string; password: string } }) {
  try {
    const result = yield call(apiRequest, '/api/login', action.payload)

    yield put(loginSuccess(result))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* register(action: {
  payload: { username: string; password: string; secretWord: string }
}) {
  try {
    const result = yield call(apiRequest, '/api/register', action.payload)

    yield put(registerSuccess(result))
  } catch (error) {
    yield put(registerFailure(error))
  }
}

function* restorePassword(action: {
  payload: { username: string; password: string; secretWord: string }
}) {
  try {
    const result = yield call(apiRequest, '/api/register', action.payload)

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
