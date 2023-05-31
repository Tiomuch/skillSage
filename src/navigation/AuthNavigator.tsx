import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/LoginScreen'
import RegisterScreen from '../screens/RegisterScreen'
import RestorePasswordScreen from '../screens/RestorePasswordScreen'

export type AuthStackParamList = {
  Login: undefined
  Register: undefined
  RestorePassword: undefined
}

const AuthStack = createNativeStackNavigator<AuthStackParamList>()

const AuthNavigator = () => (
  <AuthStack.Navigator screenOptions={{ headerShown: false }}>
    <AuthStack.Screen name="Login" component={LoginScreen} />
    <AuthStack.Screen name="Register" component={RegisterScreen} />
    <AuthStack.Screen
      name="RestorePassword"
      component={RestorePasswordScreen}
    />
  </AuthStack.Navigator>
)

export default AuthNavigator
