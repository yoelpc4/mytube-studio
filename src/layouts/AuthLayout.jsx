import { useDispatch, useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { unsetUser } from '../store/auth.js'

export default function AuthLayout() {
  const dispatch = useDispatch()

  const user = useSelector(state => state.auth.user)

  const location = useLocation()

  const navigate = useNavigate()

  function onLogout() {
    localStorage.removeItem('accessToken')

    dispatch(unsetUser())

    navigate('/login')
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return (
    <>
      <header>
        <button onClick={onLogout}>
          Logout
        </button>
      </header>

      <main>
        <Outlet />
      </main>
    </>
  )
}
