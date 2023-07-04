import { useDispatch, useSelector } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useForm from '../hooks/useForm.jsx';
import AuthService from '../services/AuthService.js'
import { openAlert } from '../store/alert.js';
import { selectUser, setUser } from '../store/auth.js';

const authService = new AuthService()

export default function EditProfile() {
  const dispatch = useDispatch()

  const user = useSelector(selectUser)

  const {form, onInput} = useForm({
    username: user.username,
    name: user.name,
    email: user.email,
  })

  async function onSubmit(event) {
    event.preventDefault()

    try {
      const updatedUser = await authService.updateProfile(form)

      dispatch(setUser(updatedUser))

      dispatch(openAlert({
        type: 'success',
        message: 'Profile has been updated'
      }))
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while updating profile'
      }))
    }
  }

  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 500 }}>
          Edit Profile
        </Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <Box component="form" id="edit-profile-form" sx={{ mt: 1 }} onSubmit={onSubmit}>
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            required
            fullWidth
            autoFocus
            margin="normal"
            value={form.username}
            onInput={onInput}
          />

          <TextField
            id="name"
            name="name"
            type="text"
            label="Name"
            margin="normal"
            required
            fullWidth
            value={form.name}
            onInput={onInput}
          />

          <TextField
            id="email"
            name="email"
            type="email"
            label="Email"
            margin="normal"
            required
            fullWidth
            value={form.email}
            onInput={onInput}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              htmlFor="edit-profile-form"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Update
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}
