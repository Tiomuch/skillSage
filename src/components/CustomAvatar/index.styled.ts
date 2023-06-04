import { StyleSheet } from 'react-native'

import { colors } from '../../theme'

const styles = StyleSheet.create({
  circle: (size: number) => ({
    width: size,
    height: size,
    borderRadius: size / 2,
    backgroundColor: colors.sand,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  letter: (size: number) => ({
    fontSize: size / 2,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    color: colors.gray,
  }),
} as any)

export default styles
