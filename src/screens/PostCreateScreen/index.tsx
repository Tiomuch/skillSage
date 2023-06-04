import React, { useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider, FormControl, Input, TextArea } from 'native-base'
import { Text, View, TouchableOpacity, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'

import styles from './index.styled'

import { colors } from '../../theme'
import CustomButton from '../../components/CustomButton'
import {
  selectPostLoading,
  selectPostTitle,
  selectPostDescription,
} from '../../features/post/selectors'
import {
  clearPostCreateFields,
  setPostDescription,
  setPostTitle,
  searchPostRequest,
  createPostRequest,
} from '../../features/post/postSlice'

const PostCreateScreen = () => {
  const [showError, setShowError] = useState<boolean>(false)

  const dispatch = useDispatch()

  const { goBack } = useNavigation()

  const loading = useSelector(selectPostLoading)
  const title = useSelector(selectPostTitle)
  const description = useSelector(selectPostDescription)

  const onTitleChange = (text: string) => dispatch(setPostTitle(text))

  const onDescriptionChange = (text: string) =>
    dispatch(setPostDescription(text))

  const onSavePress = () => {
    if (!showError) {
      setShowError(true)
    }

    if (!title.isValid || !description.isValid) {
      return
    }

    dispatch(createPostRequest())

    goBack()

    dispatch(searchPostRequest({ loadMore: true } as any))
  }

  useEffect(() => {
    return () => {
      dispatch(clearPostCreateFields())
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

          <Text style={styles.title}>Create Post</Text>

          <Icon name="plus" size={30} color={colors.white} />
        </View>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <FormControl isInvalid={showError && !title.isValid}>
          <Input
            variant="rounded"
            placeholder="Title"
            value={title?.value ?? ''}
            onChangeText={onTitleChange}
          />

          <FormControl.ErrorMessage>
            Title can't be empty.
          </FormControl.ErrorMessage>
        </FormControl>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <FormControl isInvalid={showError && !description.isValid}>
          <TextArea
            placeholder="Description"
            value={description?.value ?? ''}
            onChangeText={onDescriptionChange}
            numberOfLines={8}
            autoCompleteType="off"
            h={200}
          />

          <FormControl.ErrorMessage>
            Description can't be empty.
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

export default PostCreateScreen
