import { call, put, takeLatest, select } from 'redux-saga/effects'

import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  restorePasswordSuccess,
  restorePasswordFailure,
} from '../features/auth/authSlice'
import authService from '../services/authService'
import {
  selectPassword,
  selectUsername,
  selectSecretWord,
} from '../features/auth/selectors'

function* login(): any {
  try {
    const username = yield select(selectUsername)
    const password = yield select(selectPassword)

    const result = yield call(authService.loginApi, {
      username: username.value,
      password: password.value,
    })

    yield put(loginSuccess(result))
  } catch (error) {
    yield put(loginFailure(error))
  }
}

function* register(): any {
  try {
    const username = yield select(selectUsername)
    const password = yield select(selectPassword)
    const secretWord = yield select(selectSecretWord)

    const result = yield call(authService.registerApi, {
      username: username.value,
      password: password.value,
      secret_word: secretWord.value,
    })

    yield put(registerSuccess(result))
  } catch (error) {
    yield put(registerFailure(error))
  }
}

function* restorePassword(): any {
  try {
    const username = yield select(selectUsername)
    const password = yield select(selectPassword)
    const secretWord = yield select(selectSecretWord)

    const result = yield call(authService.restorePasswordApi, {
      username: username.value,
      password: password.value,
      secret_word: secretWord.value,
    })

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
