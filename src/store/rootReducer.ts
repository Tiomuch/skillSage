import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'
import categoryReducer from '../features/category/categorySlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  category: categoryReducer,
})

export default rootReducer
