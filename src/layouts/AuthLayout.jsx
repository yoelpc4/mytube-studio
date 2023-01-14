import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import AppBar from '../components/Auth/AppBar.jsx'
import Drawer from '../components/Drawer.jsx'

export default function AuthLayout() {
  const user = useSelector(state => state.auth.user)

  const location = useLocation()

  const [ open, setOpen ] = useState(true)

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>

      <AppBar open={open} setOpen={setOpen} />

      <Drawer open={open} />

      <Box
        component="main"
        sx={{
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[100]
              : theme.palette.grey[900],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
          pt: 10
        }}
      >
        <Outlet />
      </Box>
    </Box>
  )
}
