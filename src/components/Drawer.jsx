import List from '@mui/material/List'
import { styled } from '@mui/material/styles'
import MuiDrawer from '@mui/material/Drawer'

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

export default function Drawer({ open }) {
  return (
    <StyledDrawer variant="permanent" open={open}>
      <List component="nav">

      </List>
    </StyledDrawer>
  )
}
