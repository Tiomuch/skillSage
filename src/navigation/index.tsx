import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'

import AuthNavigator from './AuthNavigator'
import MainTabNavigator from './MainTabNavigator'

import { selectAuthUser } from '../features/auth/selectors'

const AppNavigator = () => {
  const user = useSelector(selectAuthUser)

  return user ? <MainTabNavigator /> : <AuthNavigator />
}

export default AppNavigator
