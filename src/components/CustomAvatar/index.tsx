import React, { FC } from 'react'
import { View, Text } from 'react-native'

import styles from './index.styled'

type CustomAvatarProps = {
  letter: string
}

const CustomAvatar: FC<CustomAvatarProps> = ({ letter }) => {
  return (
    <View style={styles.circle}>
      <Text style={styles.letter}>{letter}</Text>
    </View>
  )
}

export default CustomAvatar
