import React, { useCallback } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, FlatList, View } from 'react-native'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import { useFocusEffect } from '@react-navigation/native'

import styles from './index.styled'
import PostItem from './components/PostItem'

import SearchInput from '../../components/SearchInput'
import {
  selectPostSearch,
  selectPostPosts,
  selectPostTotal,
} from '../../features/post/selectors'
import {
  Post,
  clearMyPostsFields,
  searchPostRequest,
  setPostSearch,
} from '../../features/post/postSlice'

const PostScreen = () => {
  const dispatch = useDispatch()

  const total = useSelector(selectPostTotal)
  const posts = useSelector(selectPostPosts)
  const search = useSelector(selectPostSearch)

  const onSearchChange = (text: string) => dispatch(setPostSearch(text))

  const onSearchPress = () =>
    dispatch(searchPostRequest({ myPosts: true } as any))

  const keyExtractor = (item: Post) => item.id.toString()

  const onEndReached = () => {
    if (posts.length >= total) return

    dispatch(searchPostRequest({ loadMore: true, myPosts: true } as any))
  }

  const renderItem = ({ item }: { item: Post }) => <PostItem item={item} />

  useFocusEffect(
    useCallback(() => {
      dispatch(searchPostRequest({ myPosts: true } as any))

      return () => {
        dispatch(clearMyPostsFields())
      }
    }, [dispatch]),
  )

  return (
    <SafeAreaView style={styles.container}>
      <Divider orientation="vertical" size={4} bg="transparent" />

      <View style={styles.header}>
        <Text style={styles.title}>My Posts</Text>
      </View>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <SearchInput
        placeholder="Search Post"
        value={search}
        onChangeText={onSearchChange}
        onPress={onSearchPress}
      />

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FlatList
        data={posts}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default PostScreen
