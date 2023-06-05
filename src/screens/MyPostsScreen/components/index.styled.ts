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
  title: {
    fontSize: 20,
    color: colors.lime,
  },
  countText: {
    fontSize: 15,
    color: colors.gray,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    fontSize: 20,
    color: colors.black,
  },
})

export default styles
