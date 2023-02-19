import { useMemo } from 'react'
import { NavLink, useMatch } from 'react-router-dom'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import ListItemButton from '@mui/material/ListItemButton'

export default function DrawerListItemButton({ open, route }) {
  const match = useMatch({
    path: route.to,
  })

  const color = useMemo(() => {
    return !!match ? 'primary' : 'inherit'
  }, [match])

  const MenuIcon = route.icon

  return (
    <ListItemButton
      component={NavLink}
      to={route.to}
      selected={!!match}
      sx={{
        minHeight: 48,
        justifyContent: open ? 'initial' : 'center',
        px: 2.5,
      }}
    >
      <ListItemIcon
        sx={{
          minWidth: 0,
          mr: open ? 3 : 'auto',
          justifyContent: 'center',
        }}
      >
        <MenuIcon color={color} />
      </ListItemIcon>

      <ListItemText
        primary={route.text}
        primaryTypographyProps={{ color }}
        sx={{ opacity: open ? 1 : 0 }}
      />
    </ListItemButton>
  )
}
