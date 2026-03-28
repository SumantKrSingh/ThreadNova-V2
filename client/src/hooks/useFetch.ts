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
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchData(retries - 1), 2000)
        } else {
          setError(true)
          console.error('Fetch error:', err)
        }
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [url])

  return { data, loading, error }
}

export default useFetch
