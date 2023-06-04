import React, { FC } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Divider } from 'native-base'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'

import styles from './index.styled'

import { Category } from '../../../features/category/categorySlice'
import { HomeStackParamList } from '../../../navigation/HomeNavigator'

type CategoryProps = {
  item: Category
}

const CategoryItem: FC<CategoryProps> = ({ item }) => {
  const { navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const onPress = () => navigate('PostScreen')

  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>

        <Text style={styles.countText}>Posts: {item.post_count}</Text>
      </TouchableOpacity>

      <Divider orientation="vertical" size={8} bg="transparent" />
    </>
  )
}

export default CategoryItem
