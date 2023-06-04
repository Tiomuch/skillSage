import { all } from 'redux-saga/effects'
import { authSaga } from './authSaga'
import { profileSaga } from './profileSaga'
import { categorySaga } from './categorySaga'
import { postSaga } from './postSaga'

export default function* rootSaga() {
  yield all([authSaga(), profileSaga(), categorySaga(), postSaga()])
}
