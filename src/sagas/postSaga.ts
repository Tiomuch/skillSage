import { call, put, takeLatest, select } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import get from 'lodash/get'

import postService from '../services/postService'
import {
  searchPostSuccess,
  searchPostFailure,
  createPostSuccess,
  createPostFailure,
} from '../features/post/postSlice'
import {
  selectPostSearch,
  selectPostPosts,
  selectPostTotal,
  selectPostCategoryId,
  selectPostTitle,
  selectPostDescription,
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

    const result: any = yield call(
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

function* createPost(): any {
  try {
    const title = yield select(selectPostTitle)
    const description = yield select(selectPostDescription)
    const categoryId = yield select(selectPostCategoryId)

    const accessToken = yield select(selectAuthAccessToken)

    const result = yield call(postService.createPostApi, accessToken, {
      title: title.value,
      description: description.value,
      category_id: categoryId,
    })

    yield put(createPostSuccess(result))

    Toast.show({
      type: 'success',
      text1: 'Post successfully created',
      position: 'bottom',
    })
  } catch (error) {
    yield put(createPostFailure(error))

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

export function* postSaga() {
  yield takeLatest('post/searchPostRequest' as any, searchPost)
  yield takeLatest('post/createPostRequest', createPost)
}
