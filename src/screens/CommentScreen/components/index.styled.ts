import { StyleSheet } from 'react-native'

import { colors } from '../../../theme'

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.lime,
    padding: 16,
  },
  text: {
    fontSize: 20,
    color: colors.black,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: colors.black,
  },
  delete: {
    fontSize: 20,
    color: colors.red,
  },
})

export default styles
