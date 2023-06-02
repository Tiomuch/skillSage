import React, { useCallback, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Divider, Pressable, Icon, FormControl } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './index.styled'

import CustomButton from '../../components/CustomButton'
import { AuthStackParamList } from '../../navigation/AuthNavigator'
import {
  selectAuthUsername,
  selectAuthPassword,
  selectAuthLoading,
} from '../../features/auth/selectors'
import {
  setAuthUsername,
  setAuthPassword,
  clearAuthFields,
  loginRequest,
} from '../../features/auth/authSlice'

const LoginScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  const dispatch = useDispatch()

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>()

  const loading = useSelector(selectAuthLoading)
  const username = useSelector(selectAuthUsername)
  const password = useSelector(selectAuthPassword)

  const onRegisterPress = () => {
    navigate('Register')
  }

  const onRestorePasswordPress = () => {
    navigate('RestorePassword')
  }

  const onUsernameChange = (text: string) => dispatch(setAuthUsername(text))

  const onPasswordChange = (text: string) => dispatch(setAuthPassword(text))

  const onLoginPress = () => {
    if (!showError) {
      setShowError(true)
    }

    if (!username.isValid || !password.isValid) {
      return
    }

    dispatch(loginRequest())
  }

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(clearAuthFields())

        setShowError(false)
      }
    }, [dispatch]),
  )

  return (
    <SafeAreaView style={styles.container}>
      <FormControl isInvalid={showError && !username.isValid}>
        <Input
          variant="rounded"
          placeholder="Username"
          value={username.value ?? ''}
          onChangeText={onUsernameChange}
        />

        <FormControl.ErrorMessage>
          Username is invalid. It must contain at least 5 characters
        </FormControl.ErrorMessage>
      </FormControl>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FormControl isInvalid={showError && !password.isValid}>
        <Input
          variant="rounded"
          placeholder="Password"
          value={password.value ?? ''}
          onChangeText={onPasswordChange}
          type={showPassword ? 'text' : 'password'}
          InputRightElement={
            <Pressable onPress={() => setShowPassword(prev => !prev)}>
              <Icon
                as={
                  <MaterialIcons
                    name={showPassword ? 'visibility' : 'visibility-off'}
                  />
                }
                size={5}
                mr="2"
                color="muted.400"
              />
            </Pressable>
          }
        />

        <FormControl.ErrorMessage>
          Password is invalid. It must contain at least 8 characters, one
          capital letter and one number
        </FormControl.ErrorMessage>
      </FormControl>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <CustomButton title="Login" onPress={onLoginPress} isLoading={loading} />

      <Divider orientation="vertical" size={4} bg="transparent" />

      <CustomButton
        title="Register"
        onPress={onRegisterPress}
        variant="subtle"
      />

      <Divider orientation="vertical" size={4} bg="transparent" />

      <CustomButton
        title="Restore Password"
        onPress={onRestorePasswordPress}
        variant="subtle"
      />
    </SafeAreaView>
  )
}

export default LoginScreen
