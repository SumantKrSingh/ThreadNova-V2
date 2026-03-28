import authReducer from './auth/authSlice'
import { configureStore } from '@reduxjs/toolkit'
import cartReducer from './cart/cartSlice'
import wishlistReducer from './wishlist/wishlistSlice'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'

const storage = {
  getItem: (key: string) => Promise.resolve(localStorage.getItem(key)),
  setItem: (key: string, value: string) => Promise.resolve(localStorage.setItem(key, value)),
  removeItem: (key: string) => Promise.resolve(localStorage.removeItem(key)),
}

const cartPersistConfig = {
  key: 'cart',
  version: 1,
  storage,
}

const wishlistPersistConfig = {
  key: 'wishlist',
  version: 1,
  storage,
}

const persistedReducer = persistReducer(cartPersistConfig, cartReducer)

const persistedWishlistReducer = persistReducer(wishlistPersistConfig, wishlistReducer)

export const store = configureStore({
  reducer: {
    cart: persistedReducer,
    auth: authReducer,
    wishlist: persistedWishlistReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const persistor = persistStore(store)
