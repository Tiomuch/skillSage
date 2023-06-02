import React, { FC } from 'react'
import { View } from 'react-native'
import { Input } from 'native-base'

import styles from './index.styled'

type SearchInputProps = {
  value: string
  onChangeText: () => void
}

const SearchInput: FC<SearchInputProps> = ({ value, onChangeText }) => {
  return (
    <View style={styles.container}>
      <Input
        variant="rounded"
        placeholder="Search Category"
        value={value ?? ''}
        onChangeText={onChangeText}
      />
    </View>
  )
}

export default SearchInput
