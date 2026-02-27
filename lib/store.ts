import { configureStore } from '@reduxjs/toolkit'
import authReducer from './features/signIn/signIn';
import playerFontSizeReducer from './features/playerFontSize/playerFontSize';
import searchReducer from './features/search/search';

export const makeStore = () => {
  return configureStore({
    reducer: {
        authReducer,
        playerFontSizeReducer,
        searchReducer,
    }
  })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']