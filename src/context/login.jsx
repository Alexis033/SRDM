import { createContext, useState } from 'react'
export const LoginContext = createContext()

/**
 Provides a LoginContext to its children components with a boolean state for whether the user is logged in or not.
 param {Object} props.children - The React component children to render within the LoginProvider.
 */

export function LoginProvider ({ children }) {
  const [isLogin, setIsLogin] = useState(false)

  return (
    <LoginContext.Provider
      value={{
        isLogin,
        setIsLogin
      }}
    >
      {children}
    </LoginContext.Provider>
  )
}
