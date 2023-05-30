import React from 'react'
import { Button } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'

import styles from './index.styled'

const LoginScreen = (): JSX.Element => {
  return (
    <SafeAreaView style={styles.container}>
      <Button
        // isLoading
        // isLoadingText="Loading"
        borderRadius={10}
        width={200}
        height={50}
        shadow={4}
        onPress={() => console.log('hello world')}>
        Login
      </Button>
    </SafeAreaView>
  )
}

export default LoginScreen
