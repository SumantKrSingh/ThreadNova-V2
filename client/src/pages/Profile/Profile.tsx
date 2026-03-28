import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { clearUser } from '../../redux/auth/authSlice'
import { logoutUser } from '../../services/auth.service'
import { useNavigate, Link } from 'react-router-dom'
import { Button } from '@mui/material'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import LogoutIcon from '@mui/icons-material/Logout'
import './Profile.scss'

const Profile = () => {
  const user = useAppSelector((state) => state.auth.user)
  const cartCount = useAppSelector((state) => state.cart.products.length)
  const wishlistCount = useAppSelector((state) => state.wishlist.items.length)
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logoutUser()
    dispatch(clearUser())
    navigate('/')
  }

  const getInitials = (name: string | null) => {
    if (!name) return 'U'
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
  }

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar">{getInitials(user?.displayName ?? null)}</div>
        <h1>{user?.displayName}</h1>
        <p>{user?.email}</p>
      </div>

      <div className="profile-stats">
        <Link to="/wishlist" className="stat-card">
          <FavoriteBorderIcon style={{ fontSize: '2.4rem', color: '#9b8cff' }} />
          <span className="stat-num">{wishlistCount}</span>
          <span className="stat-label">Wishlist</span>
        </Link>
        <Link to="/cart" className="stat-card">
          <ShoppingCartOutlinedIcon style={{ fontSize: '2.4rem', color: '#9b8cff' }} />
          <span className="stat-num">{cartCount}</span>
          <span className="stat-label">In cart</span>
        </Link>
      </div>

      <div className="profile-details">
        <div className="detail-row">
          <span className="detail-key">Full name</span>
          <span className="detail-val">{user?.displayName}</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">Email</span>
          <span className="detail-val">{user?.email}</span>
        </div>
        <div className="detail-row">
          <span className="detail-key">User ID</span>
          <span className="detail-val uid">{user?.uid}</span>
        </div>
      </div>

      <Button
        variant="contained"
        color="error"
        fullWidth
        startIcon={<LogoutIcon />}
        onClick={handleLogout}
        sx={{ mt: 2, py: 1.5, borderRadius: '10px', fontSize: '1.3rem' }}
      >
        Logout
      </Button>
    </div>
  )
}

export default Profile
