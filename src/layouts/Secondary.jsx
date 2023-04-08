import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Container from '@mui/material/Container'
import Box from '@mui/material/Box'
import AppBar from '../components/Secondary/AppBar.jsx'

export default function Secondary() {
  return (
    <Box sx={{display: 'flex'}}>
      <CssBaseline/>

      <AppBar/>

      <Container
        component="main"
        maxWidth="xs"
        sx={{
          display: 'flex',
          alignItems: 'center',
          flexGrow: 1,
          height: '90vh',
          overflow: 'auto',
          mt: 8
        }}
      >
        <Outlet/>
      </Container>
    </Box>
  )
}
