import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuestLayout() {
  const user = useSelector(state => state.auth.user)

  if (user) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return (
    <>
      <main>
        <Outlet />
      </main>
    </>
  )
}
