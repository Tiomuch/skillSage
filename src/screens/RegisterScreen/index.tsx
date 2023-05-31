import React, { useState, useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Input, Divider, FormControl, Icon, Pressable } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import styles from './index.styled'

import CustomButton from '../../components/CustomButton'
import { AuthStackParamList } from '../../navigation/AuthNavigator'
import {
  selectUsername,
  selectPassword,
  selectSecretWord,
} from '../../features/auth/selectors'
import {
  setUsername,
  setPassword,
  setSecretWord,
  clearAuthFields,
} from '../../features/auth/authSlice'

const RegisterScreen = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [showError, setShowError] = useState<boolean>(false)

  const dispatch = useDispatch()

  const { navigate } =
    useNavigation<NativeStackNavigationProp<AuthStackParamList>>()

  const username = useSelector(selectUsername)
  const password = useSelector(selectPassword)
  const secretWord = useSelector(selectSecretWord)

  const onLoginPress = () => {
    navigate('Login')
  }

  const onUsernameChange = (text: string) => dispatch(setUsername(text))

  const onPasswordChange = (text: string) => dispatch(setPassword(text))

  const onSecretWordChange = (text: string) => dispatch(setSecretWord(text))

  const onRegisterPress = () => {
    if (!showError) {
      setShowError(true)
    }
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

      <FormControl isInvalid={showError && !secretWord.isValid}>
        <Input
          variant="rounded"
          placeholder="Secret Word"
          value={secretWord.value ?? ''}
          onChangeText={onSecretWordChange}
        />

        <FormControl.ErrorMessage>
          Secret Word is invalid. It must contain at least 5 characters
        </FormControl.ErrorMessage>
      </FormControl>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <CustomButton title="Register" onPress={onRegisterPress} />

      <Divider orientation="vertical" size={4} bg="transparent" />

      <CustomButton title="Login" onPress={onLoginPress} variant="subtle" />
    </SafeAreaView>
  )
}

export default RegisterScreen
