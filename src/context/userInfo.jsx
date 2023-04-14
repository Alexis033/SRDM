import { createContext, useState } from 'react'

export const UserContext = createContext()

/**
 Provides a context for user information, modification status, and student information.
 param {ReactNode} props.children - The child components to render.
 returns {JSX.Element} The UserContext.Provider component.
 */
export function UserProvider ({ children }) {
  const [userInfo, setUserInfo] = useState({})
  const [modificationInfo, setModificationInfo] = useState(false)
  const [studentInfo, setStudentInfo] = useState({})

  return (
    <UserContext.Provider
      value={{
        userInfo,
        setUserInfo,
        modificationInfo,
        setModificationInfo,
        studentInfo,
        setStudentInfo
      }}
    >
      {children}
    </UserContext.Provider>
  )
}
