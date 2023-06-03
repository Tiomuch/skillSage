import { call, put, takeLatest, select } from 'redux-saga/effects'

import categoryService from '../services/categoryService'
import {
  searchCategorySuccess,
  searchCategoryFailure,
} from '../features/category/categorySlice'
import {
  selectCategorySearch,
  selectCategoryCategories,
  selectCategoryTotal,
} from '../features/category/selectors'
import { selectAuthAccessToken } from '../features/auth/selectors'

function* searchCategory({
  payload: { loadMore = false } = {},
}: {
  payload?: {
    loadMore?: boolean
  }
}): any {
  try {
    const total = yield select(selectCategoryTotal)
    const search = yield select(selectCategorySearch)
    const categories = yield select(selectCategoryCategories)

    const accessToken = yield select(selectAuthAccessToken)

    let limit = 10

    console.log(loadMore && categories.length < total)

    if (loadMore && categories.length < total) {
      limit = categories.length + 10
    }

    const result = yield call(
      categoryService.searchCategoryApi,
      accessToken,
      search,
      limit,
    )

    yield put(searchCategorySuccess(result))
  } catch (error) {
    yield put(searchCategoryFailure(error))
  }
}

export function* categorySaga() {
  yield takeLatest('category/searchCategoryRequest' as any, searchCategory)
}
