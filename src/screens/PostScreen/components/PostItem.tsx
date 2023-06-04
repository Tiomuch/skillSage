import React, { FC } from 'react'
import { TouchableOpacity, Text, View } from 'react-native'
import { Divider } from 'native-base'
import get from 'lodash/get'

import styles from './index.styled'

import { Post } from '../../../features/post/postSlice'
import CustomAvatar from '../../../components/CustomAvatar'

type PostProps = {
  item: Post
}

const PostItem: FC<PostProps> = ({ item }) => {
  const username = get(item, 'user.username', null)
  const nickname = get(item, 'user.nickname', null)
  const name = nickname ?? username
  const firstLetter = get(name, '[0]', 'U')

  return (
    <>
      <TouchableOpacity style={styles.container}>
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
