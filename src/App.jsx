import { Login } from './components/Login'
import { InnerApp } from './components/InnerApp'
import { ModalProvider } from './context/modal'
import { UserProvider } from './context/userInfo'
import { useLoginContext } from './hooks/useLoginContext'
import { HashRouter } from 'react-router-dom'

function App () {
  const { isLogin } = useLoginContext()
  return (
    <HashRouter>
      <UserProvider>
        <ModalProvider>{isLogin ? <InnerApp /> : <Login />}</ModalProvider>
      </UserProvider>
    </HashRouter>
  )
}

export default App
