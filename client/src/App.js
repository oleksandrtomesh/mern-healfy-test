import 'materialize-css'
import { BrowserRouter } from 'react-router-dom'
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth.hook';
import { AuthContext } from './context/auth.context';

function App() {
  //get data from useAuth hook
  const {login, logout, token, userId} = useAuth()
  const isAuth = !!token
  const routes = useRoutes(isAuth)

  return (
    <div className="container">
      <AuthContext.Provider value={{ login, logout, token, userId }}>
        <BrowserRouter>
          {routes}
        </BrowserRouter>
      </AuthContext.Provider>
    </div>
  )
}

export default App
