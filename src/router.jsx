import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import Primary from '@/layouts/Primary.jsx'
import Home from '@/pages/Home.jsx'
import Contents from '@/pages/Contents.jsx'

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
            path: '/contents',
            element: <Contents/>,
          },
        ],
      },
    ],
  }
])

export default router
