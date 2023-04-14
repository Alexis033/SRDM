import { useEffect } from 'react'
import { useLoginContext } from './useLoginContext'
import { useUserContext } from './useUserContext'

export function useLoginState () {
  const { isLogin, setIsLogin } = useLoginContext()
  const { setUserInfo, setStudentInfo } = useUserContext()

  useEffect(() => {
    if (isLogin === true) {
      const timeoutLogin = setTimeout(() => {
        setIsLogin(false)
        window.localStorage.removeItem('token')
      }, 30 * 60 * 1000)
      return () => clearTimeout(timeoutLogin)
    }
  }, [isLogin])

  const loginState = (answer) => {
    if (answer === null) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
      setUserInfo({})
      setStudentInfo({})
      window.localStorage.removeItem('token')
    }
  }
  return { loginState }
}
