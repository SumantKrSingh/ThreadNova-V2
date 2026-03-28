import './Product.scss'
import { useState } from 'react'
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import CompareSharpIcon from '@mui/icons-material/CompareSharp'
import { useParams } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { getImageUrl } from '../../utils/getImage'
import { useAppDispatch } from '../../hooks/useAppDispatch'
import { addToCart } from '../../redux/cart/cartSlice'
import type { ProductData, ProductImage } from '../../types/product.types'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { useAppSelector } from '../../hooks/useAppSelector'
import { addToWishlist, removeFromWishlist } from '../../redux/wishlist/wishlistSlice'
import { useNavigate } from 'react-router-dom'
import { SkeletonCard } from '../../components'

function Product() {
  const { id } = useParams<{ id: string }>()
  const [selectedImage, setSelectedImage] = useState<'img' | 'img2'>('img')
  const [quantity, setQuantity] = useState<number>(1)
  const dispatch = useAppDispatch()

  const { data, loading, error } = useFetch<ProductData[]>(
    `/products?filters[id][$eq]=${id}&populate=*`
  )
  const product = Array.isArray(data) && data.length > 0 ? data[0] : null

  const user = useAppSelector((state) => state.auth.user)
  const wishlistItems = useAppSelector((state) => state.wishlist.items)
  const isWishlisted = wishlistItems.some((w) => w.id === product?.id)
  const navigate = useNavigate()

  const handleWishlist = () => {
    if (!user) {
      navigate('/login')
      return
    }
    if (isWishlisted) {
      dispatch(removeFromWishlist(product.id as number))
    } else {
      dispatch(
        addToWishlist({
          id: product.id as number,
          title: product.title,
          price: product.price,
          img: getImageUrl(product.img?.url),
        })
      )
    }
  }
  if (loading)
    return (
      <div className="product">
        <div className="left">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  if (error) return <div>Error loading product</div>
  if (!product) return <div>Product not found</div>

  return (
    <div className="product">
      <div className="left">
        <div className="images">
          {product?.img?.url && (
            <img
              src={getImageUrl(product.img.url)}
              alt="Thumbnail 1"
              onClick={() => setSelectedImage('img')}
            />
          )}
          {product?.img2?.url && (
            <img
              src={getImageUrl(product.img2.url)}
              alt="Thumbnail 2"
              onClick={() => setSelectedImage('img2')}
            />
          )}
        </div>
        <div className="mainImage">
          <img
            src={getImageUrl((product[selectedImage] as ProductImage | undefined)?.url)}
            alt="Main product"
          />
        </div>
      </div>

      <div className="right">
        <h1>{product.title || 'Title'}</h1>
        <span className="price">₹{product.price || '1,600'}</span>
        <p>
          {product.desc ||
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae ullam quidem mollitia, voluptate ipsum suscipit sed hic consequuntur vel eveniet!'}
        </p>

        <div className="quantity">
          <button onClick={() => setQuantity((p) => (p === 1 ? 1 : p - 1))}>-</button>
          <span>{quantity}</span>
          <button onClick={() => setQuantity((p) => p + 1)}>+</button>
        </div>

        <button
          className="add"
          onClick={() =>
            dispatch(
              addToCart({
                id: product.id,
                title: product.title,
                price: product.price,
                desc: product.desc,
                img: getImageUrl(product.img?.url),
                quantity: quantity,
              })
            )
          }
        >
          <AddShoppingCartIcon />
          Add To Cart
        </button>

        <div className="links">
          <div className="items" onClick={handleWishlist} style={{ cursor: 'pointer' }}>
            {isWishlisted ? (
              <FavoriteIcon fontSize="large" style={{ color: 'red' }} />
            ) : (
              <FavoriteBorderIcon fontSize="large" />
            )}
            {isWishlisted ? 'Remove from Wishlist' : 'Add To Wishlist'}
          </div>
          <div className="items">
            <CompareSharpIcon fontSize="large" />
            Add To Compare
          </div>
        </div>

        <div className="info">
          <span>Vender: Thread~Nova</span>
          <span>Product Type: {product.type || 'Suit'}</span>
          <span>Fabric: Cotton</span>
        </div>
        <hr />
        <div className="info">
          <span>Description</span>
          <hr />
          <span>Additional Info</span>
          <hr />
          <span>FAQ</span>
        </div>
      </div>
    </div>
  )
}

export default Product
