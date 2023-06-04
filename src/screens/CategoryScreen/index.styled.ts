import { StyleSheet } from 'react-native'

import { colors } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 40,
    color: colors.black,
    textAlign: 'center',
  },
})

export default styles
