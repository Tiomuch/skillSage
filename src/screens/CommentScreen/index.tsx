import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Text, FlatList, View, TouchableOpacity } from 'react-native'
import { Divider } from 'native-base'
import { useDispatch, useSelector } from 'react-redux'
import Icon from 'react-native-vector-icons/FontAwesome'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'

import styles from './index.styled'
import {
  Comment,
  getCommentsRequest,
} from '../../features/comment/commentSlice'
import {
  selectComments,
  selectCommentTotal,
} from '../../features/comment/selectors'
import CommentItem from './components/CommentItem'
import { colors } from '../../theme'
import { HomeStackParamList } from '../../navigation/HomeNavigator'

const CommentScreen = () => {
  const dispatch = useDispatch()

  const { goBack, navigate } =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>()

  const comments = useSelector(selectComments)
  const total = useSelector(selectCommentTotal)

  const keyExtractor = (item: Comment) => item.id.toString()

  const onEndReached = () => {
    if (comments.length >= total) return

    dispatch(getCommentsRequest({ loadMore: true } as any))
  }

  const renderItem = ({ item }: { item: Comment }) => (
    <CommentItem item={item} />
  )

  const onPlusPress = () => navigate('CommentCreateScreen')

  return (
    <SafeAreaView style={styles.container}>
      <Divider orientation="vertical" size={4} bg="transparent" />

      <View style={styles.header}>
        <TouchableOpacity onPress={goBack} hitSlop={20}>
          <Icon name="arrow-left" size={30} color={colors.black} />
        </TouchableOpacity>

        <Text style={styles.title}>Comments</Text>

        <TouchableOpacity onPress={onPlusPress} hitSlop={20}>
          <Icon name="plus" size={30} color={colors.lime} />
        </TouchableOpacity>
      </View>

      <Divider orientation="vertical" size={8} bg="transparent" />

      <FlatList
        data={comments}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        onEndReached={onEndReached}
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
      />
    </SafeAreaView>
  )
}

export default CommentScreen
