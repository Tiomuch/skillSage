import { call, put, takeLatest, select } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import get from 'lodash/get'

import {
  updateUserSuccess,
  updateUserFailure,
} from '../features/profile/profileSlice'
import profileService from '../services/profileService'
import {
  selectProfileUsername,
  selectProfileNickname,
} from '../features/profile/selectors'
import {
  selectAuthAccessToken,
  selectAuthUser,
} from '../features/auth/selectors'

function* updateUser(): any {
  try {
    const user = yield select(selectAuthUser)
    const username = yield select(selectProfileUsername)
    const nickname = yield select(selectProfileNickname)

    const newUsername = get(username, 'value', null)
    const newNickname = get(nickname, 'value', null)

    const currentUsername = get(user, 'username', null)
    const currentNickname = get(user, 'nickname', null)

    let canBeUpdated = false
    let newUserData = {}

    if (newUsername !== currentUsername) {
      canBeUpdated = true
      newUserData = { username: newUsername }
    }

    if (newNickname !== currentNickname) {
      canBeUpdated = true
      newUserData = { ...newUserData, nickname: newNickname }
    }

    if (canBeUpdated) {
      const accessToken = yield select(selectAuthAccessToken)

      const result = yield call(
        profileService.updateUserApi,
        newUserData,
        accessToken,
      )

      yield put(updateUserSuccess(result))

      Toast.show({
        type: 'success',
        text1: 'Data successfully changed',
        position: 'bottom',
      })
    }
  } catch (error) {
    yield put(updateUserFailure(error))

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

export function* profileSaga() {
  yield takeLatest('profile/updateUserRequest', updateUser)
}
