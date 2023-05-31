import React, { useState } from 'react'

import AuthNavigator from './AuthNavigator'
import MainTabNavigator from './MainTabNavigator'

const AppNavigator = () => {
  const [isAuthenticated, _] = useState<boolean>(false)

  return <>{isAuthenticated ? <MainTabNavigator /> : <AuthNavigator />}</>
}

export default AppNavigator
