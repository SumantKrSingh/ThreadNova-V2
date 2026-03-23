import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface CartProduct {
  id: number | string
  title: string
  price: number
  desc?: string
  img: string
  quantity: number
}

interface CartState {
  products: CartProduct[]
}

const initialState: CartState = {
  products: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartProduct>) => {
      const item = state.products.find((item) => item.id === action.payload.id)
      if (item) {
        item.quantity += action.payload.quantity
      } else {
        state.products.push(action.payload)
      }
    },
    removeItem: (state, action: PayloadAction<number | string>) => {
      state.products = state.products.filter((item) => item.id !== action.payload)
    },
    resetCart: (state) => {
      state.products = []
    },
  },
})

export const { addToCart, removeItem, resetCart } = cartSlice.actions

export default cartSlice.reducer
