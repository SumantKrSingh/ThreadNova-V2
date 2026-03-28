import './Navbar.scss'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import SearchIcon from '@mui/icons-material/Search'
import PersonIcon from '@mui/icons-material/Person'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import SunnyIcon from '@mui/icons-material/Sunny'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { Link, useNavigate } from 'react-router-dom'
import { useState, useContext, useEffect } from 'react'
import { ThemeContext } from '../../context/ThemeContext'
import Cart from '../Cart/Cart'
import { useAppSelector } from '../../hooks/useAppSelector'

function NavBar() {
  const [open, setOpen] = useState<boolean>(false)
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const products = useAppSelector((state) => state.cart.products)
  const { theme, toggleTheme } = useContext(ThemeContext)

  useEffect(() => {
    function handleEsc(e: KeyboardEvent): void {
      if (e.key === 'Escape') {
        setMenuOpen(false)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [menuOpen])

  function menuToggle(): void {
    setMenuOpen(!menuOpen)
  }

  function menuClose(): void {
    setMenuOpen(false)
  }

  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const handleProfileClick = () => {
    if (user) {
      navigate('/profile')
    } else {
      navigate('/login')
    }
  }

  const handleWishlistClick = () => {
    if (user) {
      navigate('/wishlist')
    } else {
      navigate('/login')
    }
  }
  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="hamburger" onClick={menuToggle}>
          {menuOpen ? <CloseIcon fontSize="large" /> : <MenuIcon fontSize="large" />}
        </div>

        <div className="left">
          <div className="item">
            <img src="/images/indianFlag.png" alt="" />
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <span>Rupees</span>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link to="/products/1?gender=Women Category">Women</Link>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <Link to="/products/2?gender=Men Category">Men</Link>
            <KeyboardArrowDownIcon />
          </div>
          <div className="item">
            <div
              className={`theme-icon ${theme === 'dark' ? 'theme-icon-switch' : ''}`}
              onClick={toggleTheme}
            >
              {theme === 'dark' ? (
                <SunnyIcon fontSize="large" />
              ) : (
                <DarkModeIcon fontSize="large" />
              )}
            </div>
          </div>
        </div>

        <div className="center">
          <img src="/images/logo.png" alt="brand_logo" />
          <Link to="./">Thread~Nova</Link>
        </div>

        <div className="right">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="./about">About</Link>
          </li>
          <li>
            <Link to="./contact">Contact</Link>
          </li>
          <li>
            <Link to="./store">Stores</Link>
          </li>
          <div className="icons">
            <SearchIcon fontSize="large" />
            <PersonIcon fontSize="large" onClick={handleProfileClick} />
            <FavoriteBorderIcon fontSize="large" onClick={handleWishlistClick} />
            <div className="cartIcon" onClick={() => setOpen(!open)}>
              <ShoppingCartOutlinedIcon fontSize="large" />
              <span>{products.length}</span>
            </div>
          </div>
        </div>

        <div className="mobile-cart-icon" onClick={() => setOpen(!open)}>
          <ShoppingCartOutlinedIcon fontSize="large" />
          <span>{products.length}</span>
        </div>
      </div>

      {menuOpen && <div className="overlay" onClick={menuClose}></div>}

      <div className={`mobile-menu ${menuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          <div className="mobile-nav-links">
            <Link to="./" onClick={menuClose}>
              Home
            </Link>
            <Link to="./about" onClick={menuClose}>
              About
            </Link>
            <Link to="./contact" onClick={menuClose}>
              Contact
            </Link>
            <Link to="./store" onClick={menuClose}>
              Stores
            </Link>
          </div>
          <div className="mobile-categories">
            <h3>Categories</h3>
            <Link to="/products/1?gender=Women Category" onClick={menuClose}>
              Women
            </Link>
            <Link to="/products/2?gender=Men Category" onClick={menuClose}>
              Men
            </Link>
          </div>
          <div className="mobile-icons">
            <div className="mobile-icon-item">
              <SearchIcon fontSize="large" />
              <span>Search</span>
            </div>
            <div className="mobile-icon-item">
              <PersonIcon fontSize="large" onClick={handleProfileClick} />
              <span>Account</span>
            </div>
            <div className="mobile-icon-item">
              <FavoriteBorderIcon fontSize="large" onClick={handleWishlistClick} />
              <span>Wishlist</span>
            </div>
          </div>
          <div className="mobile-settings">
            <div className="mobile-setting-item" onClick={toggleTheme}>
              {theme === 'dark' ? (
                <SunnyIcon fontSize="large" />
              ) : (
                <DarkModeIcon fontSize="large" />
              )}
              <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
            </div>
            <div className="mobile-setting-item">
              <img src="/images/indianFlag.png" alt="flag" />
              <span>India</span>
            </div>
          </div>
        </div>
      </div>

      {open && <Cart />}
    </div>
  )
}

export default NavBar
