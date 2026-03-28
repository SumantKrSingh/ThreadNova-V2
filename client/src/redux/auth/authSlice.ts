import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type AuthState } from '../../types/user.types'

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<AuthState['user']>) => {
      state.user = action.payload
    },
    clearUser: (state) => {
      state.user = null
      state.error = null
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload
    },
  },
})

export const { setUser, clearUser, setLoading, setError } = authSlice.actions
export default authSlice.reducer
