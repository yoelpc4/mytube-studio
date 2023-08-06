import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import { Divider } from '@mui/material';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { unsetUser } from '@/store/auth.js'

export default function AvatarMenuList({onMenuClicked}) {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  function handleClickLogoutListItem() {
    dispatch(unsetUser())

    navigate('/login')

    onMenuClicked()
  }

  return (
    <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
      <nav>
        <List>
          <ListItem disablePadding>
            <Link to="/account" style={{textDecoration: 'none', color: 'inherit'}} onClick={onMenuClicked}>
              <ListItemButton>
                <ListItemIcon>
                  <ManageAccountsOutlinedIcon/>
                </ListItemIcon>

                <ListItemText primary="Account"/>
              </ListItemButton>
            </Link>
          </ListItem>

          <Divider/>

          <ListItem disablePadding onClick={handleClickLogoutListItem}>
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
