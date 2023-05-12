import { useEffect, useState } from 'react'
export function useFetch (fetchFunction, argument) {
  const [response, setResponse] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    const fetch = async () => {
      try {
        const data = await fetchFunction(argument)
        setResponse(data)
      } catch (err) {
        setError(err)
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [fetchFunction, argument])

  return [response, error, loading]
}
