import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { useTheme } from '@mui/material';
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import { styled } from '@mui/material/styles'
import MuiAppBar from '@mui/material/AppBar'
import YouTubeIcon from '@mui/icons-material/YouTube'
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined.js'
import VideoCallOutlinedIcon from '@mui/icons-material/VideoCallOutlined.js';
import Button from '@mui/material/Button';
import AvatarButtonPopover from '@/components/AvatarButtonPopover.jsx';
import { useContentEvent } from '@/contexts/contentEvent.jsx';

const StyledAppBar = styled(MuiAppBar, {
  shouldForwardProp: prop => prop !== 'open',
})(({theme, open}) => ({
  background: '#fff',
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}))

function AppBar({isOpen, isMobile, toggleIsOpen}) {
  const {dispatchCreateContent} = useContentEvent()

  return (
    <StyledAppBar component="header" elevation={1} position="fixed" open={isOpen}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="toggle drawer"
          sx={{marginRight: '16px'}}
          onClick={toggleIsOpen}
        >
          <MenuOutlinedIcon sx={{color: '#000'}}/>
        </IconButton>

        <Link
          to="/"
          style={{
            display: 'flex',
            alignItems: 'center',
            flexGrow: 1,
            textDecoration: 'none',
            color: 'inherit',
          }}
        >
          <YouTubeIcon fontSize="large" sx={{mr: .5, color: 'red'}}/>

          <Typography
            component="span"
            variant="h5"
            color="black"
            noWrap
            sx={{fontWeight: 600}}
          >
            Studio
          </Typography>
        </Link>

        {isMobile ? (
          <IconButton variant="outlined" color="primary" onClick={dispatchCreateContent}>
            <VideoCallOutlinedIcon/>
          </IconButton>
        ) : (
          <Button variant="outlined" startIcon={<VideoCallOutlinedIcon/>} onClick={dispatchCreateContent}>
            {!isMobile && 'CREATE'}
          </Button>
        )}

        <AvatarButtonPopover/>
      </Toolbar>
    </StyledAppBar>
  )
}

AppBar.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
}

export default AppBar
