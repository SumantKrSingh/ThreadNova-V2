import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'
import PrivateRoute from './PrivateRoute'

const Home = lazy(() => import('../pages/Home/Home'))
const Products = lazy(() => import('../pages/Products/Products'))
const Product = lazy(() => import('../pages/Product/Product'))
const Login = lazy(() => import('../pages/Login/Login'))
const Signup = lazy(() => import('../pages/Signup/Signup'))
const About = lazy(() => import('../pages/About/About'))
const Contact = lazy(() => import('../pages/Contact/Contact'))
const Profile = lazy(() => import('../pages/Profile/Profile'))
const Wishlist = lazy(() => import('../pages/Wishlist/Wishlist'))
const Store = lazy(() => import('../pages/Store/Store'))

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <MainLayout />
      </Suspense>
    ),
    children: [
      { path: '/', element: <Home /> },
      { path: '/products/:id', element: <Products /> },
      { path: '/product/:id', element: <Product /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/profile', element: <Profile /> },
      { path: '/wishlist', element: <Wishlist /> },
      { path: '/store', element: <Store /> },
    ],
  },
  {
    path: '/profile',
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Profile />
        </Suspense>
      </PrivateRoute>
    ),
  },
  {
    path: '/wishlist',
    element: (
      <PrivateRoute>
        <Suspense fallback={<div>Loading...</div>}>
          <Wishlist />
        </Suspense>
      </PrivateRoute>
    ),
  },
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
