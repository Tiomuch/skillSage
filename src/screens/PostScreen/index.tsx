import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, FlatList, View, TouchableOpacity } from 'react-native'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import styles from './index.styled'
import PostItem from './components/PostItem'

import SearchInput from '../../components/SearchInput'
import {
  selectPostSearch,
  selectPostPosts,
  selectPostTotal,
  selectPostCategoryId,
} from '../../features/post/selectors'
import { colors } from '../../theme'
import {
  Post,
  clearPostFields,
  searchPostRequest,
  setPostSearch,
} from '../../features/post/postSlice'
import { HomeStackParamList } from '../../navigation/HomeNavigator'

const PostScreen = () => {
  const dispatch = useDispatch()

  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const total = useSelector(selectPostTotal)
  const posts = useSelector(selectPostPosts)
  const search = useSelector(selectPostSearch)
  const categoryId = useSelector(selectPostCategoryId)

  const onSearchChange = (text: string) => dispatch(setPostSearch(text))

  const onSearchPress = () => dispatch(searchPostRequest())

  const keyExtractor = (item: Post) => item.id.toString()

  const onEndReached = () => {
    if (posts.length >= total) return

    dispatch(searchPostRequest({ loadMore: true } as any))
  }

  const renderItem = ({ item }: { item: Post }) => <PostItem item={item} />

  const onPlusPress = () => navigate('PostCreateScreen')

  useEffect(() => {
    if (categoryId !== null) {
      dispatch(searchPostRequest())
    }
  }, [categoryId, dispatch])

  useEffect(() => {
    return () => {
      dispatch(clearPostFields())
    }
  }, [dispatch])

  return (
    <SafeAreaView style={styles.container}>
      <Divider orientation="vertical" size={4} bg="transparent" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} hitSlop={20}>
          <Icon name="arrow-left" size={30} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Posts</Text>

        <TouchableOpacity onPress={onPlusPress} hitSlop={20}>
          <Icon name="plus" size={30} color={colors.lime} />
        </TouchableOpacity>
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
