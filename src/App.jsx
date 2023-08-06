import { Outlet, useLocation } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { createTheme, ThemeProvider } from '@mui/material/styles'
import AlertContainer from '@/components/AlertContainer.jsx'
import { selectUser } from '@/store/auth.js';

const theme = createTheme({
  palette: {
    primary: {
      main: '#CC0904',
    },
    secondary: {
      main: '#095FD4',
    },
  },
})

export default function App() {
  const {pathname} = useLocation()

  const user = useSelector(selectUser)

  if (!user) {
    window.location.replace(`http://mytube.test/login?redirect=http://studio.mytube.test${pathname}`)

    return
  }

  return (
    <ThemeProvider theme={theme}>
      <AlertContainer />

      <Outlet />
    </ThemeProvider>
  )
}
