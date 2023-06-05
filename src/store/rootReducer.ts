import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import categoryReducer from '../features/category/categorySlice'
import postReducer from '../features/post/postSlice'
import commentReducer from '../features/comment/commentSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  category: categoryReducer,
  post: postReducer,
  comment: commentReducer,
})

export default rootReducer
