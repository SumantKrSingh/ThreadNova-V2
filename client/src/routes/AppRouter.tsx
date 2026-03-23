import { lazy, Suspense } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import MainLayout from '../layout/MainLayout'

const Home = lazy(() => import('../pages/Home/Home'))
const Products = lazy(() => import('../pages/Products/Products'))
const Product = lazy(() => import('../pages/Product/Product'))
const Login = lazy(() => import('../pages/Login/Login'))
const Signup = lazy(() => import('../pages/Signup/Signup'))
const About = lazy(() => import('../pages/About/About'))
const Contact = lazy(() => import('../pages/Contact/Contact'))

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
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/about', element: <About /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
])

const AppRouter = () => <RouterProvider router={router} />

export default AppRouter
