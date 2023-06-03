import { StyleSheet } from 'react-native'

import { colors } from '../../theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    flex: 1,
  },
  search: {
    backgroundColor: colors.lime,
    padding: 15,
    borderRadius: 30,
  },
})

export default styles
