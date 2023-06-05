import React, { FC } from 'react'
import { Text, View, TouchableOpacity } from 'react-native'
import { Divider } from 'native-base'
import get from 'lodash/get'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './index.styled'

import {
  Comment,
  deleteCommentRequest,
} from '../../../features/comment/commentSlice'
import CustomAvatar from '../../../components/CustomAvatar'
import { selectAuthUser } from '../../../features/auth/selectors'
import { colors } from '../../../theme'

type CommentProps = {
  item: Comment
}

const CommentItem: FC<CommentProps> = ({ item }) => {
  const dispatch = useDispatch()

  const user = useSelector(selectAuthUser)

  const username = get(item, 'user.username', null)
  const nickname = get(item, 'user.nickname', null)
  const name = nickname ?? username
  const firstLetter = get(name, '[0]', 'U')
  const authorId = get(item, 'user_id', null)
  const isAuthor = user?.id === authorId

  const onDeletePress = () => {
    dispatch(deleteCommentRequest({ commentId: item.id } as any))
  }

  return (
    <>
      <View style={styles.container}>
        <View style={styles.nameContainer}>
          <CustomAvatar letter={firstLetter} size={40} />

          <Divider size={4} bg="transparent" />

          <Text style={styles.name}>{name}</Text>
        </View>

        <Divider orientation="vertical" size={4} bg="transparent" />

        <Text style={styles.text}>{item.text}</Text>

        <Divider orientation="vertical" size={4} bg="transparent" />

        {isAuthor && (
          <TouchableOpacity
            onPress={onDeletePress}
            style={styles.nameContainer}
            hitSlop={20}>
            <Icon name="trash" size={30} color={colors.red} />

            <Divider size={4} bg="transparent" />

            <Text style={styles.delete}>Delete your comment</Text>
          </TouchableOpacity>
        )}
      </View>

      <Divider orientation="vertical" size={8} bg="transparent" />
    </>
  )
}

export default CommentItem
