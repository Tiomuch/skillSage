import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MyPostsScreen from '../screens/MyPostsScreen'
import PostDetailsScreen from '../screens/PostDetailsScreen'
import CommentScreen from '../screens/CommentScreen'
import CommentCreateScreen from '../screens/CommentCreateScreen'

export type MyPostsStackParamList = {
  MyPostsScreen: undefined
  PostDetailsScreen: undefined
  CommentScreen: undefined
  CommentCreateScreen: undefined
}

const MyPostsStack = createNativeStackNavigator<MyPostsStackParamList>()

const MyPostsNavigator = () => (
  <MyPostsStack.Navigator screenOptions={{ headerShown: false }}>
    <MyPostsStack.Screen name="MyPostsScreen" component={MyPostsScreen} />
    <MyPostsStack.Screen
      name="PostDetailsScreen"
      component={PostDetailsScreen}
    />
    <MyPostsStack.Screen name="CommentScreen" component={CommentScreen} />
    <MyPostsStack.Screen
      name="CommentCreateScreen"
      component={CommentCreateScreen}
    />
  </MyPostsStack.Navigator>
)

export default MyPostsNavigator
