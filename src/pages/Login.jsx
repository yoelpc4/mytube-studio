import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import AuthService from '../services/AuthService.js'
import { setUser } from '../store/auth.js'

export default function Login() {
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const [form, setForm] = useState({
    email: '',
    password: '',
  })

  function onInput(e) {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    })
  }

  async function onSubmit(e) {
    e.preventDefault()

    const authService = new AuthService()

    try {
      const { accessToken } = await authService.login(form)

      localStorage.setItem('accessToken', accessToken)

      const user = await authService.getUser()

      dispatch(setUser(user))

      navigate('/')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
      <h1>Login</h1>

      <form id="login-form" onSubmit={onSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" value={form.email} required onInput={onInput} />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" value={form.password} required onInput={onInput} />
        </div>

        <div>
          <button type="submit" form="login-form">
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
