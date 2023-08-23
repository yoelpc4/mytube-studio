import { useSelector } from 'react-redux';
import { Outlet, useLocation } from 'react-router-dom'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { selectUser } from '@/store/auth.js';
import AlertContainer from '@/components/AlertContainer.jsx'

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
    window.location.replace(`${import.meta.env.VITE_APP_URL}/login?redirect=${import.meta.env.VITE_STUDIO_URL}${pathname}`)

    return
  }

  return (
    <ThemeProvider theme={theme}>
      <AlertContainer />

      <Outlet/>
    </ThemeProvider>
  )
}
