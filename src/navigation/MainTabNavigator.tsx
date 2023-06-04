import React, { useEffect } from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useDispatch } from 'react-redux'

import HomeNavigator from './HomeNavigator'

import { getProfileRequest } from '../features/auth/authSlice'
import { searchCategoryRequest } from '../features/category/categorySlice'
import ProfileScreen from '../screens/ProfileScreen'

type TabParamList = {
  Home: undefined
  Profile: undefined
}

const Tab = createBottomTabNavigator<TabParamList>()

const HomeIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="home" color={color} size={size} />
)

const ProfileIcon = ({ color, size }: { color: string; size: number }) => (
  <Icon name="user" color={color} size={size} />
)

const MainTabNavigator = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProfileRequest())

    dispatch(searchCategoryRequest())
  }, [dispatch])

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Home">
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: HomeIcon,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ProfileIcon,
        }}
      />
    </Tab.Navigator>
  )
}

export default MainTabNavigator
