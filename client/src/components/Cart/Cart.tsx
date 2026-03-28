import './Cart.scss'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { useAppSelector } from '../../hooks/useAppSelector'
import { removeItem, resetCart } from '../../redux/cart/cartSlice'
import { stripeInstance } from '../../api/stripeInstance'
import { getImageUrl } from '../../utils/getImage'
import { useNavigate } from 'react-router-dom'

function Cart() {
  const dispatch = useAppDispatch()
  const products = useAppSelector((state) => state.cart.products)
  const user = useAppSelector((state) => state.auth.user)
  const navigate = useNavigate()

  const totalPrice = (): string => {
    let total = 0
    products.forEach((item) => (total += item.quantity * item.price))
    return total.toFixed(2)
  }

  async function handlePayment(): Promise<void> {
    if (!user) {
      navigate('/login')
      return
    }
    try {
      const res = await stripeInstance.post('/orders', { products })
      window.location.href = res.data.stripeSession.url
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="cart">
      <h1>Products In Your Cart</h1>
      <div className="cartItems">
        {products?.map((item) => (
          <div className="item" key={item.id}>
            <img src={getImageUrl(item.img)} alt={item.title} />
            <div className="details">
              <h1>{item.title}</h1>
              <p>
                {item.desc && item.desc.length > 50
                  ? item.desc.substring(0, 50) + '...'
                  : item.desc}
              </p>
              <div className="price">
                {item.quantity} x ₹{item.price}
              </div>
            </div>
            <DeleteOutlineIcon className="delete" onClick={() => dispatch(removeItem(item.id))} />
          </div>
        ))}
      </div>
      <div className="cartFooter">
        <div className="total">
          <span>Sub Total</span>
          <span>₹{totalPrice()}</span>
        </div>
        <button onClick={handlePayment}>Proceed To Checkout</button>
        <span className="reset" onClick={() => dispatch(resetCart())}>
          Reset Cart
        </span>
      </div>
    </div>
  )
}

export default Cart
