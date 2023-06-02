import React from 'react'
import { NativeBaseProvider } from 'native-base'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import ErrorBoundary from 'react-native-error-boundary'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native'
import Toast from 'react-native-toast-message'

import AppNavigator from './src/navigation'
import { store } from './src/store'

const App = (): JSX.Element => {
  return (
    <ErrorBoundary>
      <NavigationContainer>
        <SafeAreaProvider>
          <NativeBaseProvider>
            <Provider store={store}>
              <AppNavigator />
            </Provider>
          </NativeBaseProvider>
        </SafeAreaProvider>
      </NavigationContainer>

      <Toast />
    </ErrorBoundary>
  )
}

export default App
