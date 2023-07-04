import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import useForm from '../hooks/useForm.jsx';
import AuthService from '../services/AuthService.js'
import { setUser } from '../store/auth.js'
import { openAlert } from '../store/alert.js'
import { KEY_ACCESS_TOKEN } from '../constants.js';

const authService = new AuthService()

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {state} = useLocation()

  const {form, onInput} = useForm({
    username: '',
    password: '',
  })

  async function onSubmit(event) {
    event.preventDefault()

    try {
      const { accessToken } = await authService.login(form)

      localStorage.setItem(KEY_ACCESS_TOKEN, accessToken)

      const user = await authService.getUser()

      dispatch(setUser(user))

      if (state.from) {
        navigate(state.from)

        return
      }

      navigate('/')
    } catch (error) {
      if (import.meta.env.DEV) {
        console.log(error)
      }

      dispatch(openAlert({
        type: 'error',
        message: 'An error occurred while logging in'
      }))
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <Box component="form" id="login-form" sx={{ mt: 1 }} onSubmit={onSubmit}>
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

        <Button
          type="submit"
          htmlFor="login-form"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Login
        </Button>
      </Box>
    </Box>
  )
}
