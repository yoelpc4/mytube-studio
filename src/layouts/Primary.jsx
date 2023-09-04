import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useMediaQuery } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { ContentEventProvider } from '@/contexts/contentEvent.jsx';
import AppBar from '@/components/AppBar.jsx'
import Drawer from '@/components/Drawer.jsx'
import DialogUpdateContent from '@/components/DialogUpdateContent.jsx'
import DialogCreateContent from '@/components/DialogCreateContent.jsx';

export default function Primary() {
  const isMobile = useMediaQuery(theme => theme.breakpoints.down('sm'))

  const [isOpen, setIsOpen] = useState(!isMobile)

  const toggleIsOpen = () => setIsOpen(isOpen => !isOpen)

  return (
    <ContentEventProvider>
      <Box sx={{display: 'flex'}}>
        <CssBaseline/>

        <AppBar isOpen={isOpen} isMobile={isMobile} toggleIsOpen={toggleIsOpen}/>

        <Drawer isOpen={isOpen} isMobile={isMobile} toggleIsOpen={toggleIsOpen} />

        <Box component="main" sx={{flexGrow: 1, p: isMobile ? 2 : 3, mt: 8}}>
          <Outlet/>
        </Box>

        <DialogCreateContent/>

        <DialogUpdateContent/>
      </Box>
    </ContentEventProvider>
  )
}
