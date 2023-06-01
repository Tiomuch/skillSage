import { persistStore, persistReducer } from 'redux-persist'
import createSagaMiddleware from 'redux-saga'
import { configureStore } from '@reduxjs/toolkit'
import AsyncStorage from '@react-native-async-storage/async-storage'

import rootReducer from './rootReducer'

import rootSaga from '../sagas'

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const sagaMiddleware = createSagaMiddleware()

const store = configureStore({
  reducer: persistedReducer,
  middleware: [sagaMiddleware],
})

sagaMiddleware.run(rootSaga)

const persistor = persistStore(store)

export { store, persistor }
