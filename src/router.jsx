import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Auth from './middlewares/Auth.jsx';
import Guest from './middlewares/Guest.jsx';
import Primary from './layouts/Primary.jsx'
import Secondary from './layouts/Secondary.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ChannelContents from './pages/ChannelContents.jsx'
import Account from './pages/Account.jsx';
import EditProfile from './pages/EditProfile.jsx';
import EditPassword from './pages/EditPassword.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Secondary/>,
        children: [
          {
            element: <Guest/>,
            children: [
              {
                path: '/login',
                element: <Login/>,
              },
            ],
          },
        ],
      },
      {
        element: <Primary/>,
        children: [
          {
            element: <Auth/>,
            children: [
              {
                path: '/',
                element: <Home/>,
              },
              {
                path: '/account',
                element: <Account/>,
                children: [
                  {
                    path: '',
                    element: <EditProfile />,
                  },
                  {
                    path: 'password',
                    element: <EditPassword />,
                  },
                ],
              },
              {
                path: '/contents',
                element: <ChannelContents/>,
              },
            ],
          },
        ],
      },
    ],
  }
])

export default router
