import { Navbar, Footer } from '../components'
import { Outlet } from 'react-router-dom'

const MainLayout = () => {
  return (
    <div className="app">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLayout
