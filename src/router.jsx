import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import Primary from '@/layouts/Primary.jsx'
import Dashboard from '@/pages/Dashboard.jsx'
import Contents from '@/pages/Contents.jsx'
import NotFound from '@/pages/NotFound.jsx';
import Customization from '@/pages/Customization.jsx';

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Primary/>,
        children: [
          {
            index: true,
            element: <Dashboard/>,
          },
          {
            path: '/contents',
            element: <Contents/>,
          },
          {
            path: '/customization',
            element: <Customization/>,
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
