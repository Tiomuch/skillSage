import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, FlatList } from 'react-native'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'

import styles from './index.styled'

import SearchInput from '../../components/SearchInput'
import {
  selectCategorySearch,
  selectCategoryCategories,
} from '../../features/category/selectors'
import {
  Category,
  searchCategoryRequest,
  setCategorySearch,
} from '../../features/category/categorySlice'

const HomeScreen = () => {
  const dispatch = useDispatch()

  const search = useSelector(selectCategorySearch)
  const categories = useSelector(selectCategoryCategories)

  const onSearchChange = (text: string) => dispatch(setCategorySearch(text))

  const onSearchPress = () => dispatch(searchCategoryRequest())

  const keyExtractor = (item: Category) => item.id.toString()

  // const onEndReached = () => {}

  const renderItem = ({ item }: { item: Category }) => <Text>{item.title}</Text>

  return (
    <SafeAreaView style={styles.container}>
      <Divider orientation="vertical" size={4} bg="transparent" />

      <Text style={styles.title}>Categories</Text>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <SearchInput
        placeholder="Search Category"
        value={search}
        onChangeText={onSearchChange}
        onPress={onSearchPress}
      />

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FlatList
        data={categories}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        // onEndReached={onEndReached}
        // onEndReachedThreshold={0.5}
      />
    </SafeAreaView>
  )
}

export default HomeScreen
