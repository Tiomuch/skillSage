import { combineReducers } from 'redux'
import authReducer from '../features/auth/authSlice'
import profileReducer from '../features/profile/profileSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
})

export default rootReducer
