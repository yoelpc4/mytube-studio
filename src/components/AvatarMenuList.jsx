import { useDispatch } from 'react-redux'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { unsetUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js';
import AuthService from '@/services/AuthService.js';

const authService = new AuthService()

export default function AvatarMenuList() {
  const dispatch = useDispatch()

  async function handleClickLogoutListItem() {
    try {
      await authService.logout()

      dispatch(unsetUser())

      window.location.replace('http://mytube.test')
    } catch (error) {
      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while logging out'
      }))
    }
  }

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav>
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <LogoutOutlinedIcon/>
              </ListItemIcon>

              <ListItemText primary="Logout"/>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
    </Box>
  )
}
