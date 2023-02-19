import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import GuestLayout from './layouts/GuestLayout.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import ChannelContents from './pages/Contents/ChannelContents.jsx'

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        element: <GuestLayout />,
        children: [
          {
            path: '/login',
            element: <Login />,
          },
          {
            path: '/register',
            element: <Register />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/contents',
            element: <ChannelContents />,
          },
        ],
      },
    ],
  }
])

export default router
