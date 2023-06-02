import { StyleSheet } from 'react-native'

import { colors } from '../../theme'

const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.sand,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 50,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.gray,
  },
})

export default styles
