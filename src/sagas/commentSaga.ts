import { call, put, takeLatest, select } from 'redux-saga/effects'
import Toast from 'react-native-toast-message'
import get from 'lodash/get'

import commentService from '../services/commentService'
import {
  deleteCommentSuccess,
  deleteCommentFailure,
  getCommentsRequest,
  createCommentSuccess,
  createCommentFailure,
  getCommentsSuccess,
  getCommentsFailure,
} from '../features/comment/commentSlice'
import {
  selectCommentText,
  selectCommentTotal,
  selectComments,
} from '../features/comment/selectors'
import { selectPostId } from '../features/post/selectors'
import { selectAuthAccessToken } from '../features/auth/selectors'

function* getComments({
  payload: { loadMore = false } = {},
}: {
  payload?: {
    loadMore?: boolean
  }
}): any {
  try {
    const total = yield select(selectCommentTotal)
    const comments = yield select(selectComments)
    const postId = yield select(selectPostId)

    const accessToken = yield select(selectAuthAccessToken)

    let limit = 10

    if (loadMore && comments.length < total) {
      limit = comments.length + 10
    }

    const result: any = yield call(
      commentService.getCommentsApi,
      accessToken,
      postId,
      limit,
    )

    yield put(getCommentsSuccess(result))
  } catch (error) {
    yield put(getCommentsFailure(error))
  }
}

function* createComment(): any {
  try {
    const text = yield select(selectCommentText)
    const postId = yield select(selectPostId)

    const accessToken = yield select(selectAuthAccessToken)

    const result = yield call(commentService.createCommentApi, accessToken, {
      text: text.value,
      post_id: postId,
    })

    yield put(createCommentSuccess(result))

    yield put(getCommentsRequest({ loadMore: true } as any))

    Toast.show({
      type: 'success',
      text1: 'Post successfully created',
      position: 'bottom',
    })
  } catch (error) {
    yield put(createCommentFailure(error))

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

function* deleteComment({
  payload: { commentId },
}: {
  payload: {
    commentId: number
  }
}): any {
  try {
    const accessToken = yield select(selectAuthAccessToken)

    const result = yield call(
      commentService.deleteCommentApi,
      accessToken,
      commentId,
    )

    yield put(deleteCommentSuccess(result))

    yield put(getCommentsRequest({ loadMore: true } as any))

    Toast.show({
      type: 'success',
      text1: 'Comment successfully deleted',
      position: 'bottom',
    })
  } catch (error) {
    yield put(deleteCommentFailure(error))

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

export function* commentSaga() {
  yield takeLatest('comment/getCommentsRequest' as any, getComments)
  yield takeLatest('comment/createCommentRequest', createComment)
  yield takeLatest('comment/deleteCommentRequest' as any, deleteComment)
}
