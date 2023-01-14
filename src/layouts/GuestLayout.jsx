import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '../components/Guest/AppBar.jsx'

export default function GuestLayout() {
  const user = useSelector(state => state.auth.user)

  if (user) {
    return <Navigate to="/" state={{ from: location }} />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>

      <AppBar />

      <Container component="main" maxWidth="xs" sx={{ pt: 10 }}>
        <Outlet />
      </Container>
    </Box>
  )
}
