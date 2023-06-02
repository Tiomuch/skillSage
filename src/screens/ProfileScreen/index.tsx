import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch } from 'react-redux'

import styles from './index.styled'

import CustomButton from '../../components/CustomButton'
import { logout } from '../../features/auth/authSlice'

const ProfileScreen = () => {
  const dispatch = useDispatch()

  const onLogoutPress = () => {
    dispatch(logout())
  }

  return (
    <SafeAreaView style={styles.container}>
      <CustomButton title="Logout" onPress={onLogoutPress} variant="subtle" />
    </SafeAreaView>
  )
}

export default ProfileScreen
