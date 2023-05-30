import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'

import AuthNavigator from './AuthNavigator'
import MainTabNavigator from './MainTabNavigator'

const AppNavigator = () => {
  const [isAuthenticated, _] = useState<boolean>(false)

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
