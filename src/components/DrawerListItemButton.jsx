import PropTypes from 'prop-types';
import { NavLink, useMatch } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

function DrawerListItemButton({route, isOpen, isMobile}) {
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
        alignItems: 'center',
        px: 2.5,
        ...(!isMobile && {
          flexDirection: isOpen ? 'row' : 'column',
          justifyContent: isOpen ? 'initial' : 'center',
        }),
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          justifyContent: 'center',
          alignItems: 'center',
          mr: isOpen ? 2 : 0,
        }}
      >
        <MenuIcon color={color} />
      </ListItemIcon>

      <ListItemText
        primary={route.text}
        primaryTypographyProps={{
          color,
          ...(!isMobile && {
            sx: {
              fontSize: isOpen ? '1rem' : '.5rem',
            },
          }),
        }}
      />
    </ListItemButton>
  )
}

DrawerListItemButton.propTypes = {
  route: PropTypes.object,
  isOpen: PropTypes.bool,
  isMobile: PropTypes.bool,
}

export default DrawerListItemButton
