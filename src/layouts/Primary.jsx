import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ContentEventProvider } from '@/contexts/contentEvent.jsx';
import AppBar from '@/components/AppBar.jsx'
import Drawer from '@/components/Drawer.jsx'
import DialogUpdateContent from '@/components/DialogUpdateContent.jsx'
import DialogCreateContent from '@/components/DialogCreateContent.jsx';

export default function Primary() {
  const [isOpen, setIsOpen] = useState(true)

  return (
    <Box sx={{display: 'flex'}}>
      <ContentEventProvider>
        <CssBaseline/>

        <AppBar isOpen={isOpen} setIsOpen={setIsOpen}/>

        <Drawer isOpen={isOpen}/>

        <Container component="main" maxWidth="xl" sx={{flexGrow: 1, height: '90vh', overflow: 'auto', mt: 8, px: 4}}>
          <Outlet/>
        </Container>

        <DialogCreateContent/>

        <DialogUpdateContent/>
      </ContentEventProvider>
    </Box>
  )
}
