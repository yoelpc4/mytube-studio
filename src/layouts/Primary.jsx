import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import AppBar from '@/components/Primary/AppBar.jsx'
import Drawer from '@/components/Drawer.jsx'
import DialogEditContent from '@/components/DialogEditContent.jsx'

export default function Primary() {
  const [ open, setOpen ] = useState(true)

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline/>

      <AppBar open={open} setOpen={setOpen} />

      <Drawer open={open} />

      <Container component="main" maxWidth="xl" sx={{ flexGrow: 1, height: '90vh', overflow: 'auto', mt: 8, px: 4 }}>
        <Outlet />

        <DialogEditContent />
      </Container>
    </Box>
  )
}
