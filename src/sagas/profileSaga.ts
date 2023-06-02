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
import { selectAuthUser } from '../features/auth/selectors'

function* updateUser(): any {
  try {
    const user = yield select(selectAuthUser)
    const username = yield select(selectProfileUsername)
    const nickname = yield select(selectProfileNickname)

    const currentUsername = get(user, 'username', null)
    const currentNickname = get(user, 'nickname', null)

    const canBeUpdated = false

    if(){}

    if(canBeUpdated){
    const result = yield call(profileService.updateUserApi, {
      username: username.value,
      password: password.value,
    })

    yield put(updateUserSuccess(result))

    Toast.show({
      type: 'success',
      text1: 'Welcome!',
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
