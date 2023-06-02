import React from 'react'
import { useSelector } from 'react-redux'

import AuthNavigator from './AuthNavigator'
import MainTabNavigator from './MainTabNavigator'

import { selectUser } from '../features/auth/selectors'

const AppNavigator = () => {
  const user = useSelector(selectUser)

  return user ? <MainTabNavigator /> : <AuthNavigator />
}

export default AppNavigator
