import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useDispatch, useSelector } from 'react-redux'
import { ScrollView } from 'react-native'
import get from 'lodash/get'
import { Divider, FormControl, Input } from 'native-base'

import styles from './index.styled'

import CustomButton from '../../components/CustomButton'
import CustomAvatar from '../../components/CustomAvatar'
import { logout } from '../../features/auth/authSlice'
import { selectAuthUser } from '../../features/auth/selectors'
import {
  selectProfileUsername,
  selectProfileNickname,
  selectProfileLoading,
} from '../../features/profile/selectors'
import {
  setProfileUsername,
  setProfileNickname,
  updateUserRequest,
} from '../../features/profile/profileSlice'

const ProfileScreen = () => {
  const [showError, setShowError] = useState<boolean>(false)

  const dispatch = useDispatch()

  const user = useSelector(selectAuthUser)
  const profileLoading = useSelector(selectProfileLoading)
  const profileUsername = useSelector(selectProfileUsername)
  const profileNickname = useSelector(selectProfileNickname)

  const username = get(user, 'username', null)
  const nickname = get(user, 'nickname', null)
  const name = nickname ?? username
  const firstLetter = get(name, '[0]', 'U')

  const onLogoutPress = () => {
    dispatch(logout())
  }

  const onUsernameChange = (text: string) => dispatch(setProfileUsername(text))

  const onNicknameChange = (text: string) => dispatch(setProfileNickname(text))

  const onSavePress = () => {
    if (!showError) {
      setShowError(true)
    }

    if (!profileUsername.isValid || !profileNickname.isValid) {
      return
    }

    dispatch(updateUserRequest())
  }

  useEffect(() => {
    dispatch(setProfileUsername(username))

    dispatch(setProfileNickname(nickname))
  }, [dispatch, username, nickname])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <CustomAvatar letter={firstLetter} />

        <Divider orientation="vertical" size={8} bg="transparent" />

        <FormControl isInvalid={showError && !profileUsername.isValid}>
          <Input
            variant="rounded"
            placeholder="Username"
            value={profileUsername?.value ?? ''}
            onChangeText={onUsernameChange}
          />

          <FormControl.ErrorMessage>
            Username is invalid. It must contain at least 5 characters
          </FormControl.ErrorMessage>
        </FormControl>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <FormControl isInvalid={showError && !profileNickname.isValid}>
          <Input
            variant="rounded"
            placeholder="Nickname"
            value={profileNickname?.value ?? ''}
            onChangeText={onNicknameChange}
          />

          <FormControl.ErrorMessage>
            Nickname is invalid. It must contain at least 5 characters
          </FormControl.ErrorMessage>
        </FormControl>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <CustomButton
          title="Save"
          onPress={onSavePress}
          isLoading={profileLoading}
        />

        <Divider orientation="vertical" size={8} bg="transparent" />

        <CustomButton title="Logout" onPress={onLogoutPress} variant="subtle" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default ProfileScreen
