import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import Primary from '@/layouts/Primary.jsx'
import Home from '@/pages/Home.jsx'
import Contents from '@/pages/Contents.jsx'
import NotFound from '@/pages/NotFound.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Primary/>,
        children: [
          {
            index: true,
            element: <Home/>,
          },
          {
            path: '/contents',
            element: <Contents/>,
          },
          {
            path: '*',
            element: <NotFound/>,
          },
        ],
      },
    ],
  }
])

export default router
