import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider, FormControl, Input } from 'native-base'
import { Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'

import styles from './index.styled'

import { colors } from '../../theme'
import CustomButton from '../../components/CustomButton'

const PostCreateScreen = () => {
  const [showError, setShowError] = useState<boolean>(false)

  const { goBack } = useNavigation()

  return (
    <SafeAreaView style={styles.container}>
      <Divider orientation="vertical" size={4} bg="transparent" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} hitSlop={20}>
          <Icon name="arrow-left" size={30} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Create Post</Text>

        <Icon name="plus" size={30} color={colors.white} />
      </View>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FormControl isInvalid={showError && !username.isValid}>
        <Input
          variant="rounded"
          placeholder="Title"
          value={username.value ?? ''}
          onChangeText={onUsernameChange}
        />

        <FormControl.ErrorMessage>
          Username is invalid. It must contain at least 5 characters
        </FormControl.ErrorMessage>
      </FormControl>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FormControl isInvalid={showError && !username.isValid}>
        <Input
          variant="rounded"
          placeholder="Description"
          value={username.value ?? ''}
          onChangeText={onUsernameChange}
        />

        <FormControl.ErrorMessage>
          Username is invalid. It must contain at least 5 characters
        </FormControl.ErrorMessage>
      </FormControl>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <CustomButton title="Login" onPress={onLoginPress} isLoading={loading} />

      <Divider orientation="vertical" size={4} bg="transparent" />
    </SafeAreaView>
  )
}

export default PostCreateScreen
