import React, { FC } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Divider } from 'native-base'
import get from 'lodash/get'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import styles from './index.styled'

import { Post, setPostId } from '../../../features/post/postSlice'
import CustomAvatar from '../../../components/CustomAvatar'
import { HomeStackParamList } from '../../../navigation/HomeNavigator'

type PostProps = {
  item: Post
}

const PostItem: FC<PostProps> = ({ item }) => {
  const dispatch = useDispatch()

  const { navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const username = get(item, 'user.username', null)
  const nickname = get(item, 'user.nickname', null)
  const name = nickname ?? username
  const firstLetter = get(name, '[0]', 'U')

  const onPress = () => {
    dispatch(setPostId(item.id))

    navigate('PostDetailsScreen')
  }

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={onPress}>
        <Text style={styles.title}>{item.title}</Text>

        <Divider orientation="vertical" size={4} bg="transparent" />

        <View style={styles.nameContainer}>
          <CustomAvatar letter={firstLetter} size={40} />

          <Divider size={4} bg="transparent" />

          <Text style={styles.name}>{name}</Text>
        </View>
      </TouchableOpacity>

      <Divider orientation="vertical" size={8} bg="transparent" />
    </>
  )
}

export default PostItem
