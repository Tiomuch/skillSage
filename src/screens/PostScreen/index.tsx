import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, FlatList } from 'react-native'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.styled'
import PostItem from './components/PostItem'

import SearchInput from '../../components/SearchInput'
import {
  selectCategorySearch,
  selectCategoryCategories,
  selectCategoryTotal,
} from '../../features/category/selectors'
import {
  Category,
  searchCategoryRequest,
  setCategorySearch,
} from '../../features/category/categorySlice'

const PostScreen = () => {
  const dispatch = useDispatch()

  const total = useSelector(selectCategoryTotal)
  const search = useSelector(selectCategorySearch)
  const categories = useSelector(selectCategoryCategories)

  const onSearchChange = (text: string) => dispatch(setCategorySearch(text))

  const onSearchPress = () => dispatch(searchCategoryRequest())

  const keyExtractor = (item: Category) => item.id.toString()

  const onEndReached = () => {
    if (categories.length >= total) return

    dispatch(searchCategoryRequest({ loadMore: true } as any))
  }

  const renderItem = ({ item }: { item: Category }) => <PostItem item={item} />

  return (
    <SafeAreaView style={styles.container}>
      <Divider orientation="vertical" size={4} bg="transparent" />

      <Text style={styles.title}>Posts</Text>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <SearchInput
        placeholder="Search Post"
        value={search}
        onChangeText={onSearchChange}
        onPress={onSearchPress}
      />

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FlatList
        data={categories}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  )
}

export default PostScreen
