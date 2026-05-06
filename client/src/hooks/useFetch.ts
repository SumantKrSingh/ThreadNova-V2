import { useEffect, useState } from 'react'
import { axiosInstance } from '../api/axiosInstance'

function useFetch<T>(url: string) {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async (retries = 3): Promise<void> => {
      try {
        setLoading(true)
        setError(false)
        const res = await axiosInstance.get<{ data: T }>(url)
        setData(res.data.data)
        setLoading(false)
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchData(retries - 1), 2000)
        } else {
          setError(true)
          setLoading(false)
          console.error('Fetch error:', err)
        }
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
