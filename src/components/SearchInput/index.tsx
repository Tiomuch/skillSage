import React, { FC } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Input, Divider } from 'native-base'
import Icon from 'react-native-vector-icons/FontAwesome'

import styles from './index.styled'

type SearchInputProps = {
  value: string
  onChangeText: (text: string) => void
  onPress: () => void
  placeholder: string
}

const SearchInput: FC<SearchInputProps> = ({
  value,
  onChangeText,
  onPress,
  placeholder,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <Input
          variant="rounded"
          placeholder={placeholder}
          value={value ?? ''}
          onChangeText={onChangeText}
        />
      </View>

      <Divider size={4} bg="transparent" />

      <TouchableOpacity
        style={styles.search}
        activeOpacity={0.2}
        onPress={onPress}>
        <Icon name="search" onPress={onPress} size={20} color="white" />
      </TouchableOpacity>
    </View>
  )
}

export default SearchInput
