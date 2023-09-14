import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom'
import App from '@/App.jsx'
import Primary from '@/layouts/Primary.jsx'
import LoadingIndicator from '@/components/LoadingIndicator.jsx';

const lazyLoad = factory => {
  const LazyExoticComponent = lazy(factory)

  return (
    <Suspense fallback={<LoadingIndicator />}>
      <LazyExoticComponent/>
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    element: <App/>,
    children: [
      {
        element: <Primary/>,
        children: [
          {
            index: true,
            element: lazyLoad(() => import('@/pages/Dashboard.jsx')),
          },
          {
            path: '/contents',
            element: lazyLoad(() => import('@/pages/Contents.jsx')),
          },
          {
            path: '/customization',
            element: lazyLoad(() => import('@/pages/Customization.jsx')),
          },
          {
            path: '*',
            element: lazyLoad(() => import('@/pages/NotFound.jsx')),
          },
        ],
      },
    ],
  }
])

export default router
