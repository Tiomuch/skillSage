import { StyleSheet } from 'react-native'

import { colors } from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 16,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 40,
    color: colors.black,
    textAlign: 'center',
  },
  scrollViewContainer: {
    flex: 1,
  },
  title: {
    fontSize: 30,
    color: colors.lime,
  },
  description: {
    fontSize: 20,
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
