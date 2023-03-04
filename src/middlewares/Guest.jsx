import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function Guest() {
  const user = useSelector(state => state.auth.user)

  return user ? <Navigate to="/" state={{ from: location }} /> : <Outlet />
}
