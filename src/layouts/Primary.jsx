import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { ContentEventProvider } from '@/contexts/contentEvent.jsx';
import AppBar from '@/components/AppBar.jsx'
import Drawer from '@/components/Drawer.jsx'
import DialogUpdateContent from '@/components/DialogUpdateContent.jsx'
import DialogCreateContent from '@/components/DialogCreateContent.jsx';

export default function Primary() {
  const isNotMobile = useMediaQuery(theme => theme.breakpoints.up('sm'))

  const [isOpen, setIsOpen] = useState(isNotMobile)

  const toggleIsOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <ContentEventProvider>
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>

        <AppBar isOpen={isOpen} toggleIsOpen={toggleIsOpen}/>

        <Drawer isOpen={isOpen}/>

        <Container component="main" maxWidth="xl" sx={{mt: 10}}>
          <Outlet/>
        </Container>

        <DialogCreateContent/>

        <DialogUpdateContent/>
      </Box>
    </ContentEventProvider>
  )
}
