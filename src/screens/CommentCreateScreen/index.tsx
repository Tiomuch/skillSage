import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider, FormControl, TextArea } from 'native-base'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

import styles from './index.styled'

import { colors } from '../../theme'
import CustomButton from '../../components/CustomButton'
import {
  selectCommentText,
  selectCommentLoading,
} from '../../features/comment/selectors'
import {
  clearCommentCreateFields,
  createCommentRequest,
  setCommentText,
} from '../../features/comment/commentSlice'

const CommentCreateScreen = () => {
  const [showError, setShowError] = useState<boolean>(false)

  const dispatch = useDispatch()

  const { goBack } = useNavigation()

  const text = useSelector(selectCommentText)
  const loading = useSelector(selectCommentLoading)

  const onTextChange = (newText: string) => dispatch(setCommentText(newText))

  const onSavePress = () => {
    if (!showError) {
      setShowError(true)
    }

    if (!text.isValid) {
      return
    }

    dispatch(createCommentRequest())

    goBack()
  }

  useEffect(() => {
    return () => {
      dispatch(clearCommentCreateFields())
    }
  }, [dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <Divider orientation="vertical" size={4} bg="transparent" />

        <View style={styles.header}>
          <TouchableOpacity onPress={goBack} hitSlop={20}>
            <Icon name="arrow-left" size={30} color={colors.black} />
          </TouchableOpacity>

          <Text style={styles.title}>Create</Text>

          <Icon name="plus" size={30} color={colors.white} />
        </View>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <FormControl isInvalid={showError && !text.isValid}>
          <TextArea
            placeholder="Description"
            value={text?.value ?? ''}
            onChangeText={onTextChange}
            numberOfLines={8}
            autoCompleteType="off"
            h={200}
          />

          <FormControl.ErrorMessage>
            Text can't be empty.
          </FormControl.ErrorMessage>
        </FormControl>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <View style={styles.buttonContainer}>
          <CustomButton
            title="Save"
            onPress={onSavePress}
            isLoading={loading}
          />
        </View>

        <Divider orientation="vertical" size={4} bg="transparent" />
      </ScrollView>
    </SafeAreaView>
  )
}

export default CommentCreateScreen
