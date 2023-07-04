import { useDispatch } from 'react-redux';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import useForm from '../hooks/useForm.jsx';
import AuthService from '../services/AuthService.js'
import { openAlert } from '../store/alert.js';

const authService = new AuthService()

export default function EditPassword() {
  const dispatch = useDispatch()

  const {form, onInput, resetForm} = useForm({
    currentPassword: '',
    password: '',
    passwordConfirmation: '',
  })

  async function onSubmit(event) {
    event.preventDefault()

    try {
      await authService.updatePassword(form)

      resetForm()

      dispatch(openAlert({
        type: 'success',
        message: 'Password has been updated'
      }))
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while updating password'
      }))
    }
  }

  return (
    <Grid container spacing={2} maxWidth="xl">
      <Grid xs={12}>
        <Typography component="h2" variant="h5" sx={{ fontWeight: 500 }}>
          Edit Password
        </Typography>
      </Grid>

      <Grid xs={12} md={6}>
        <Box component="form" id="edit-password-form" sx={{ mt: 1 }} onSubmit={onSubmit}>
          <TextField
            id="currentPassword"
            name="currentPassword"
            type="password"
            label="Current Paassword"
            required
            fullWidth
            autoFocus
            margin="normal"
            value={form.currentPassword}
            onInput={onInput}
          />

          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            margin="normal"
            required
            fullWidth
            value={form.password}
            onInput={onInput}
          />

          <TextField
            id="passwordConfirmation"
            name="passwordConfirmation"
            type="password"
            label="Password Confirmation"
            margin="normal"
            required
            fullWidth
            value={form.passwordConfirmation}
            onInput={onInput}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              type="submit"
              htmlFor="edit-password-form"
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
