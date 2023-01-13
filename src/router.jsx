import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import AuthLayout from './layouts/AuthLayout.jsx'
import GuestLayout from './layouts/GuestLayout.jsx'

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
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
        ],
      },
    ],
  }
])

export default router
