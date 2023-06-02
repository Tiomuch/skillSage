import { call, put, takeLatest, select } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import get from 'lodash/get'

import {
  loginSuccess,
  loginFailure,
  registerSuccess,
  registerFailure,
  restorePasswordSuccess,
  restorePasswordFailure,
  refreshTokenSuccess,
  refreshTokenFailure,
  logout,
  getProfileSuccess,
  getProfileFailure,
} from '../features/auth/authSlice'
import authService from '../services/authService'
import {
  selectAuthPassword,
  selectAuthUsername,
  selectAuthSecretWord,
  selectAuthUser,
  selectAuthAccessToken,
} from '../features/auth/selectors'

function* login(): any {
  try {
    const username = yield select(selectAuthUsername)
    const password = yield select(selectAuthPassword)

    const result = yield call(authService.loginApi, {
      username: username.value,
      password: password.value,
    })

    yield put(loginSuccess(result))

    Toast.show({
      type: 'success',
      text1: 'Welcome!',
      position: 'bottom',
    })
  } catch (error) {
    yield put(loginFailure(error))

    const errorMessage = get(
      error,
      'response.data.message',
      'Something went wrong',
    )

    Toast.show({
      type: 'error',
      text1: errorMessage,
      position: 'bottom',
    })
  }
}

function* register(): any {
  try {
    const username = yield select(selectAuthUsername)
    const password = yield select(selectAuthPassword)
    const secretWord = yield select(selectAuthSecretWord)

    const result = yield call(authService.registerApi, {
      username: username.value,
      password: password.value,
      secret_word: secretWord.value,
    })

    yield put(registerSuccess(result))

    Toast.show({
      type: 'success',
      text1: 'Welcome!',
      position: 'bottom',
    })
  } catch (error) {
    yield put(registerFailure(error))

    const errorMessage = get(
      error,
      'response.data.message',
      'Something went wrong',
    )

    Toast.show({
      type: 'error',
      text1: errorMessage,
      position: 'bottom',
    })
  }
}

function* restorePassword(): any {
  try {
    const username = yield select(selectAuthUsername)
    const password = yield select(selectAuthPassword)
    const secretWord = yield select(selectAuthSecretWord)

    const result = yield call(authService.restorePasswordApi, {
      username: username.value,
      password: password.value,
      secret_word: secretWord.value,
    })

    yield put(restorePasswordSuccess(result))

    const successMessage = get(
      result,
      'message',
      'Password changed successfully',
    )

    Toast.show({
      type: 'success',
      text1: successMessage,
      position: 'bottom',
    })
  } catch (error) {
    yield put(restorePasswordFailure(error))

    const errorMessage = get(
      error,
      'response.data.message',
      'Something went wrong',
    )

    Toast.show({
      type: 'error',
      text1: errorMessage,
      position: 'bottom',
    })
  }
}

function* refreshToken(): any {
  try {
    const user = yield select(selectAuthUser)

    const currentRefreshToken = get(user, 'refresh_token', null)

    const result = yield call(authService.refreshTokenApi, {
      token: currentRefreshToken,
    })

    yield put(refreshTokenSuccess(result))
  } catch (error) {
    yield put(refreshTokenFailure(error))

    yield put(logout())
  }
}

function* getProfile(): any {
  try {
    const accessToken = yield select(selectAuthAccessToken)

    const result = yield call(authService.getProfileApi, accessToken)

    yield put(getProfileSuccess(result))
  } catch (error) {
    yield put(getProfileFailure(error))
  }
}

export function* authSaga() {
  yield takeLatest('auth/loginRequest', login)
  yield takeLatest('auth/registerRequest', register)
  yield takeLatest('auth/restorePasswordRequest', restorePassword)
  yield takeLatest('auth/refreshTokenRequest', refreshToken)
  yield takeLatest('auth/getProfileRequest', getProfile)
}
