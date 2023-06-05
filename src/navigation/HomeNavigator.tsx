import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CategoryScreen from '../screens/CategoryScreen'
import PostScreen from '../screens/PostScreen'
import PostCreateScreen from '../screens/PostCreateScreen'
import PostDetailsScreen from '../screens/PostDetailsScreen'
import CommentScreen from '../screens/CommentScreen'
import CommentCreateScreen from '../screens/CommentCreateScreen'

export type HomeStackParamList = {
  CategoryScreen: undefined
  PostScreen: undefined
  PostCreateScreen: undefined
  PostDetailsScreen: undefined
  CommentScreen: undefined
  CommentCreateScreen: undefined
}

const HomeStack = createNativeStackNavigator<HomeStackParamList>()

const HomeNavigator = () => (
  <HomeStack.Navigator screenOptions={{ headerShown: false }}>
    <HomeStack.Screen name="CategoryScreen" component={CategoryScreen} />
    <HomeStack.Screen name="PostScreen" component={PostScreen} />
    <HomeStack.Screen name="PostCreateScreen" component={PostCreateScreen} />
    <HomeStack.Screen name="PostDetailsScreen" component={PostDetailsScreen} />
    <HomeStack.Screen name="CommentScreen" component={CommentScreen} />
    <HomeStack.Screen
      name="CommentCreateScreen"
      component={CommentCreateScreen}
    />
  </HomeStack.Navigator>
)

export default HomeNavigator
