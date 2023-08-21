import { useState } from 'react'
import { useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Popover from '@mui/material/Popover'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import PortraitOutlinedIcon from '@mui/icons-material/PortraitOutlined';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import ListItemLogout from '@/components/ListItemLogout.jsx';
import { selectUser } from '@/store/auth.js';

export default function AvatarButtonPopover() {
  const [anchorEl, setAnchorEl] = useState(null)

  const user = useSelector(selectUser)

  const isOpen = !!anchorEl

  const handleClick = event => setAnchorEl(event.currentTarget)

  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Button onClick={handleClick}>
        <Avatar alt="avatar" src="https://i.pravatar.cc/200"/>
      </Button>

      <Popover
        open={isOpen}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        onClose={handleClose}
      >
        <Box sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}}>
          <nav>
            <List>
              <ListItem alignItems="flex-start" onClick={handleClose}>
                <ListItemAvatar>
                  <Avatar alt="avatar" src="https://i.pravatar.cc/200"/>
                </ListItemAvatar>

                <ListItemText
                  primary={user.name}
                  secondary={
                    <Typography variant="body2" sx={{color: '#000'}}>
                      @{user.username}
                    </Typography>
                  }
                />
              </ListItem>

              <Divider/>

              <ListItem
                component={Link}
                href={`${import.meta.env.VITE_APP_URL}/channel/${user.username}`}
                sx={{textDecoration: 'none', color: 'inherit'}}
                disablePadding
              >
                <ListItemButton>
                  <ListItemIcon>
                    <PortraitOutlinedIcon/>
                  </ListItemIcon>

                  <ListItemText primary="Your Channel"/>
                </ListItemButton>
              </ListItem>

              <ListItemLogout/>
            </List>
          </nav>
        </Box>
      </Popover>
    </>
  )
}
