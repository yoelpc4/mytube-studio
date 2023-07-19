import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton';
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import useForm from '@/hooks/useForm.jsx';
import AuthService from '@/services/AuthService.js'
import { setUser } from '@/store/auth.js'
import { openAlert } from '@/store/alert.js'
import { KEY_ACCESS_TOKEN } from '@/constants.js';

const authService = new AuthService()

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const {state} = useLocation()

  const {form, errors, isLoading, setErrors, handleInput, handleSubmit} = useForm({
    data: {
      username: '',
      password: '',
    },
    handleSuccess,
    handleError,
  })

  async function handleSuccess() {
    const { accessToken } = await authService.login(form)

    localStorage.setItem(KEY_ACCESS_TOKEN, accessToken)

    const user = await authService.getUser()

    dispatch(setUser(user))

    navigate(state.from ?? '/')
  }

  function handleError(response) {
    if (response.status === 401) {
      setErrors({
        username: 'The given credentials are incorrect',
      })

      return
    }

    dispatch(openAlert({
      type: 'error',
      message: 'An error occurred while logging in'
    }))
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
        <LockOutlinedIcon/>
      </Avatar>

      <Typography component="h1" variant="h5">
        Login
      </Typography>

      <Box component="form" id="login-form" sx={{ mt: 1 }} onSubmit={handleSubmit}>
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
          error={!!errors.username}
          helperText={errors.username}
          onInput={handleInput}
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
          error={!!errors.password}
          helperText={errors.password}
          onInput={handleInput}
        />

        <LoadingButton
          type="submit"
          form="login-form"
          fullWidth
          variant="contained"
          loading={isLoading}
          disabled={isLoading}
          sx={{ mt: 3, mb: 2 }}
        >
          <span>Login</span>
        </LoadingButton>
      </Box>
    </Box>
  )
}
