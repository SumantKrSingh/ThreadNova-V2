import axios from 'axios'
import { API_TOKEN, API_URL } from '../utils/constants'
export const stripeInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
})
