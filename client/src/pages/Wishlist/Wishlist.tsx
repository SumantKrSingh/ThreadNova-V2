import { useAppSelector } from '../../hooks/useAppSelector'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { removeFromWishlist } from '../../redux/wishlist/wishlistSlice'
import { addToCart } from '../../redux/cart/cartSlice'
import { Link } from 'react-router-dom'
import FavoriteIcon from '@mui/icons-material/Favorite'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import './Wishlist.scss'

const Wishlist = () => {
  const dispatch = useAppDispatch()
  const items = useAppSelector((state) => state.wishlist.items)

  if (items.length === 0) {
    return (
      <div className="wishlist-empty">
        <FavoriteIcon style={{ fontSize: '6rem', color: '#9b8cff', opacity: 0.4 }} />
        <h2>Your wishlist is empty</h2>
        <p>Save items you love by clicking the heart icon on any product</p>
        <Link to="/" className="wishlist-shop-btn">
          Start shopping
        </Link>
      </div>
    )
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <div className="wishlist-title">
          <FavoriteIcon style={{ color: '#9b8cff', fontSize: '2.4rem' }} />
          <h1>My wishlist</h1>
        </div>
        <span>
          {items.length} {items.length === 1 ? 'item' : 'items'}
        </span>
      </div>

      <div className="wishlist-grid">
        {items.map((item) => (
          <div key={item.id} className="wishlist-item">
            <Link to={`/product/${item.id}`} className="wishlist-img-wrap">
              <img src={item.img} alt={item.title} loading="lazy" />
              <div className="wishlist-overlay">
                <span>View product</span>
              </div>
            </Link>

            <div className="wishlist-item-body">
              <div className="wishlist-item-info">
                <h3>{item.title}</h3>
                <p className="wishlist-price">₹{item.price}</p>
              </div>

              <div className="wishlist-actions">
                <button
                  className="wishlist-cart-btn"
                  onClick={() =>
                    dispatch(
                      addToCart({
                        id: item.id,
                        title: item.title,
                        price: item.price,
                        img: item.img,
                        quantity: 1,
                      })
                    )
                  }
                >
                  <ShoppingCartOutlinedIcon style={{ fontSize: '1.6rem' }} />
                  Add to cart
                </button>

                <button
                  className="wishlist-remove-btn"
                  onClick={() => dispatch(removeFromWishlist(item.id))}
                >
                  <DeleteOutlineIcon style={{ fontSize: '1.8rem' }} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Wishlist
