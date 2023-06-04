import React, { FC } from 'react'
import { View, Text } from 'react-native'

import styles from './index.styled'

type CustomAvatarProps = {
  letter: string
  size?: number
}

const CustomAvatar: FC<CustomAvatarProps> = ({ letter, size = 100 }) => {
  return (
    <View style={styles.circle(size)}>
      <Text style={styles.letter(size)}>{letter}</Text>
    </View>
  )
}

export default CustomAvatar
