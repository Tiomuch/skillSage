import { call, put, takeLatest, select } from 'redux-saga/effects'

import categoryService from '../services/categoryService'
import {
  searchCategorySuccess,
  searchCategoryFailure,
} from '../features/category/categorySlice'
import { selectCategorySearch } from '../features/category/selectors'
import { selectAuthAccessToken } from '../features/auth/selectors'

function* searchCategory(): any {
  try {
    const search = yield select(selectCategorySearch)

    const accessToken = yield select(selectAuthAccessToken)

    const result = yield call(
      categoryService.searchCategoryApi,
      accessToken,
      search,
    )

    yield put(searchCategorySuccess(result))
  } catch (error) {
    yield put(searchCategoryFailure(error))
  }
}

export function* categorySaga() {
  yield takeLatest('category/searchCategoryRequest', searchCategory)
}
