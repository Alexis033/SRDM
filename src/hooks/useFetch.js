import { useEffect, useState } from 'react'
export function useFetch (fetchFunction, argument) {
  const [response, setResponse] = useState([])
  const [error, setError] = useState('')
  useEffect(() => {
    const fetch = async () => {
      try {
        const data = await fetchFunction(argument)
        setResponse(data)
      } catch (err) {
        setError(err)
      }
    }
    fetch()
  }, [])

  return [response, error]
}
