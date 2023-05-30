import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import AppNavigator from './src/navigation'

const App = (): JSX.Element => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider>
        <AppNavigator />
      </NativeBaseProvider>
    </SafeAreaProvider>
  )
}

export default App
