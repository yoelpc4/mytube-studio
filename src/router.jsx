import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Primary from './layouts/Primary.jsx'
import Home from './pages/Home.jsx'
import ChannelContents from './pages/ChannelContents.jsx'
import Account from './pages/Account.jsx';
import EditProfile from './pages/EditProfile.jsx';
import EditPassword from './pages/EditPassword.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Primary/>,
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
  }
])

export default router
