import { all } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { profileSaga } from './profileSaga'

export default function* rootSaga() {
  yield all([authSaga(), profileSaga()])
}
