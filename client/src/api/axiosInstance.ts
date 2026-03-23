import { API_TOKEN, API_URL } from '../utils/constants'
import axios from 'axios'

export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
  },
})
