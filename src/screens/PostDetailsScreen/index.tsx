import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Divider } from 'native-base'
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import get from 'lodash/get'

import styles from './index.styled'

import { colors } from '../../theme'
import {
  selectPostLoading,
  selectPost,
  selectPostId,
} from '../../features/post/selectors'
import {
  clearPostDetailsFields,
  deletePostRequest,
  getPostByIdRequest,
  searchPostRequest,
} from '../../features/post/postSlice'
import { selectAuthUser } from '../../features/auth/selectors'
import CustomAvatar from '../../components/CustomAvatar'

const PostDetailsScreen = () => {
  const dispatch = useDispatch()

  const { goBack } = useNavigation()

  const post = useSelector(selectPost)
  const user = useSelector(selectAuthUser)
  const postId = useSelector(selectPostId)
  const loading = useSelector(selectPostLoading)

  const title = get(post, 'title', '')
  const description = get(post, 'description', '')
  const authorId = get(post, 'user_id', null)
  const isAuthor = user?.id === authorId
  const username = get(post, 'user.username', null)
  const nickname = get(post, 'user.nickname', null)
  const name = nickname ?? username
  const firstLetter = get(name, '[0]', 'U')

  const onDeletePress = () => {
    dispatch(deletePostRequest())

    goBack()
  }

  const onPlusPress = () => {
    // navigate('CommentCreateScreen')
  }

  useEffect(() => {
    if (postId) {
      dispatch(getPostByIdRequest())
    }
  }, [dispatch, postId])

  useEffect(() => {
    return () => {
      dispatch(clearPostDetailsFields())
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

          <Text style={styles.headerTitle}>Post Details</Text>

          {isAuthor ? (
            <TouchableOpacity onPress={onDeletePress} hitSlop={20}>
              <Icon name="trash" size={30} color={colors.red} />
            </TouchableOpacity>
          ) : (
            <Icon name="plus" size={30} color={colors.white} />
          )}
        </View>

        <Divider orientation="vertical" size={8} bg="transparent" />

        <View style={styles.nameContainer}>
          <CustomAvatar letter={firstLetter} size={40} />

          <Divider size={4} bg="transparent" />

          <Text style={styles.name}>{name}</Text>
        </View>

        <Divider orientation="vertical" size={8} bg="transparent" />

        {loading ? (
          <ActivityIndicator size="large" />
        ) : (
          <>
            <Text style={styles.title}>{title}</Text>

            <Divider orientation="vertical" size={8} bg="transparent" />

            <Text style={styles.description}>{description}</Text>
          </>
        )}

        <Divider orientation="vertical" size={8} bg="transparent" />

        <View style={styles.commentsHeader}>
          <Text style={styles.text}>Comments:</Text>

          <TouchableOpacity onPress={onPlusPress} hitSlop={20}>
            <Icon name="plus" size={30} color={colors.lime} />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default PostDetailsScreen
