import PropTypes from 'prop-types';
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DrawerListItemButton from '@/components/DrawerListItemButton.jsx'

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open',
})(
  ({theme, open}) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      height: '100vh',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(0),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(8),
        },
      }),
    },
  }),
)

const routes = [
  {
    to: '/',
    text: 'Dashboard',
    icon: DashboardIcon,
  },
  {
    to: '/contents',
    text: 'Contents',
    icon: VideoLibraryIcon,
  },
  {
    to: '/customization',
    text: 'Customization',
    icon: AutoFixHighIcon,
  },
]

function DrawerMobile({isOpen, toggleIsOpen, ...props}) {
  return (
    <MuiDrawer
      variant="temporary"
      open={isOpen}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        width: 240,
        '& .MuiDrawer-paper': {
          width: 240,
          border: 'none',
        },
      }}
      onClose={toggleIsOpen}
      {...props}
    />
  )
}

function DrawerNonMobile({isOpen, ...props}) {
  return (
    <StyledDrawer variant="permanent" open={isOpen} {...props} />
  )
}

function Nav({isOpen, isMobile, onClick}) {
  return (
    <nav>
      <List sx={{pt: isMobile ? 7 : 8}} onClick={onClick}>
        {routes.map((route, index) => (
          <ListItem key={index} disablePadding sx={{display: 'block'}}>
            <DrawerListItemButton isOpen={isOpen} isMobile={isMobile} route={route}/>
          </ListItem>
        ))}
      </List>
    </nav>
  )
}

function Drawer({isOpen, isMobile, toggleIsOpen}) {
  const handleClick = () => {
    if (!isMobile) {
      return
    }

    toggleIsOpen()
  }

  return (
    <aside>
      {isMobile ? (
        <DrawerMobile open={isOpen} onClose={toggleIsOpen}>
          <Nav isOpen={isOpen} isMobile={isMobile} onClick={handleClick} />
        </DrawerMobile>
      ) : (
        <DrawerNonMobile open={isOpen}>
          <Nav isOpen={isOpen} isMobile={isMobile} onClick={handleClick} />
        </DrawerNonMobile>
      )}
    </aside>
  )
}

DrawerMobile.propTypes = {
  isOpen: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
}

DrawerNonMobile.propTypes = {
  isOpen: PropTypes.bool,
}

Nav.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  onClick: PropTypes.func,
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
  toggleIsOpen: PropTypes.func,
}

export default Drawer
