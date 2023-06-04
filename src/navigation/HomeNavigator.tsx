import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CategoryScreen from '../screens/CategoryScreen'
import PostScreen from '../screens/PostScreen'
import PostCreateScreen from '../screens/PostCreateScreen'

export type HomeStackParamList = {
  CategoryScreen: undefined
  PostScreen: undefined
  PostCreateScreen: undefined
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} />
    <HomeStack.Screen name="PostScreen" component={PostScreen} />
    <HomeStack.Screen name="PostCreateScreen" component={PostCreateScreen} />
  </HomeStack.Navigator>
)

export default HomeNavigator
