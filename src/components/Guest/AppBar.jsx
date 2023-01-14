import { Link } from 'react-router-dom'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import YouTubeIcon from '@mui/icons-material/YouTube'

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create([ 'width', 'margin' ], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create([ 'width', 'margin' ], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

export default function AppBar() {
  return (
    <StyledAppBar color="default" position="fixed" open={open}>
      <Toolbar>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          color: 'inherit',
          marginLeft: '44px'
        }}>
          <YouTubeIcon fontSize="large" sx={{ mr: .5, color: 'red' }}/>

          <Typography
            component="h1"
            variant="h5"
            color="none"
            noWrap
            sx={{ fontWeight: 'bold' }}
          >
            Studio
          </Typography>
        </Link>

        <div style={{ flexGrow: 1 }}></div>
      </Toolbar>
    </StyledAppBar>
  )
}
