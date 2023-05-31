import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Divider } from 'native-base'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import styles from './index.styled'

import CustomButton from '../../components/CustomButton'
import { AuthStackParamList } from '../../navigation/AuthNavigator'

const RegisterScreen = () => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>()

  const onLoginPress = () => {
    navigate('Login')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Input variant="rounded" placeholder="Username" />

      <Divider orientation="vertical" size={8} bg="transparent" />

      <Input variant="rounded" placeholder="Password" />

      <Divider orientation="vertical" size={8} bg="transparent" />

      <Input variant="rounded" placeholder="Secret Word" />

      <Divider orientation="vertical" size={8} bg="transparent" />

      <CustomButton title="Register" onPress={() => console.log('Register')} />

      <Divider orientation="vertical" size={4} bg="transparent" />

      <CustomButton title="Login" onPress={onLoginPress} variant="subtle" />
    </SafeAreaView>
  )
}

export default RegisterScreen
