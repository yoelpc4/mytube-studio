import PropTypes from 'prop-types';
import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import DrawerListItemButton from '@/components/DrawerListItemButton.jsx'

const StyledDrawer = styled(MuiDrawer, {shouldForwardProp: prop => prop !== 'open'})(
  ({ theme, open }) => ({
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
          width: theme.spacing(9),
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

function Drawer({isOpen}) {
  return (
    <StyledDrawer component="aside" variant="permanent" open={isOpen}>
      <nav>
        <List sx={{pt: 8}}>
          {routes.map((route, index) => (
            <ListItem key={index} disablePadding sx={{display: 'block'}}>
              <DrawerListItemButton isOpen={isOpen} route={route} />
            </ListItem>
          ))}
        </List>
      </nav>
    </StyledDrawer>
  )
}

Drawer.propTypes = {
  isOpen: PropTypes.bool,
}

export default Drawer
