import { call, put, takeLatest, select } from 'redux-saga/effects'

import postService from '../services/postService'
import {
  searchPostSuccess,
  searchPostFailure,
} from '../features/post/postSlice'
import {
  selectPostSearch,
  selectPostPosts,
  selectPostTotal,
  selectPostCategoryId,
} from '../features/post/selectors'
import { selectAuthAccessToken } from '../features/auth/selectors'

function* searchPost({
  payload: { loadMore = false } = {},
}: {
  payload?: {
    loadMore?: boolean
  }
}): any {
  try {
    const total = yield select(selectPostTotal)
    const posts = yield select(selectPostPosts)
    const search = yield select(selectPostSearch)
    const categoryId = yield select(selectPostCategoryId)

    const accessToken = yield select(selectAuthAccessToken)

    let limit = 10

    if (loadMore && posts.length < total) {
      limit = posts.length + 10
    }

    const result = yield call(
      postService.searchPostApi,
      accessToken,
      search,
      categoryId,
      limit,
    )

    yield put(searchPostSuccess(result))
  } catch (error) {
    yield put(searchPostFailure(error))
  }
}

export function* postSaga() {
  yield takeLatest('post/searchPostRequest' as any, searchPost)
}
