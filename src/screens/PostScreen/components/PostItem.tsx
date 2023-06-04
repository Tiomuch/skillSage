import React, { FC } from 'react'
import { TouchableOpacity, Text } from 'react-native'
import { Divider } from 'native-base'

import styles from './index.styled'

import { Post } from '../../../features/post/postSlice'

type PostProps = {
  item: Post
}

const PostItem: FC<PostProps> = ({ item }) => {
  return (
    <>
      <TouchableOpacity style={styles.container}>
        <Text style={styles.title}>{item.title}</Text>

        {/* <Text style={styles.countText}>Posts: {item.post_count}</Text> */}
      </TouchableOpacity>

      <Divider orientation="vertical" size={8} bg="transparent" />
    </>
  )
}

export default PostItem
