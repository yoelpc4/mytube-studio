import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

function DrawerListItemButton({isOpen, route}) {
  const match = useMatch({
    path: route.to,
  })

  const color = match ? 'primary' : 'inherit'

  const MenuIcon = route.icon

  return (
    <ListItemButton
      component={NavLink}
      to={route.to}
      selected={!!match}
      sx={{
        minHeight: 48,
        flexDirection: isOpen ? 'row' : 'column',
        justifyContent: isOpen ? 'initial' : 'center',
        alignItems: 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: isOpen ? 2 : 'auto',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <MenuIcon color={color} />
      </ListItemIcon>

      <ListItemText
        primary={route.text}
        primaryTypographyProps={{
          color,
          sx: {
            fontSize: isOpen ? '1rem' : '.8rem',
          },
        }}
      />
    </ListItemButton>
  )
}

DrawerListItemButton.propTypes = {
  isOpen: PropTypes.bool,
  route: PropTypes.object,
}

export default DrawerListItemButton
