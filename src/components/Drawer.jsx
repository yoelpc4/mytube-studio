import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'
import ListItem from '@mui/material/ListItem'
import DashboardIcon from '@mui/icons-material/Dashboard'
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary'
import DrawerListItemButton from './DrawerListItemButton.jsx'

const StyledDrawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: 240,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      borderRight: 'none',
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
]

export default function Drawer({ open }) {
  return (
    <StyledDrawer variant="permanent" open={open} sx={{ pt: 8 }}>
      <List component="nav">
        {routes.map((route, index) => (
          <ListItem key={index} disablePadding sx={{ display: 'block' }}>
            <DrawerListItemButton open={open} route={route} />
          </ListItem>
        ))}
      </List>
    </StyledDrawer>
  )
}
