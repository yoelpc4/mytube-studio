import { createBrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import Auth from './middlewares/Auth.jsx';
import Guest from './middlewares/Guest.jsx';
import Primary from './layouts/Primary.jsx'
import Secondary from './layouts/Secondary.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import ChannelContents from './pages/ChannelContents.jsx'

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Guest/>,
        children: [
          {
            element: <Secondary/>,
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
        element: <Auth/>,
        children: [
          {
            element: <Primary/>,
            children: [
              {
                path: '/',
                element: <Home/>,
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
