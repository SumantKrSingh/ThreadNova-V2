import './Card.scss'
import { Link } from 'react-router-dom'
import { getImageUrl } from '../../utils/getImage'

// ✅ Define the shape of a single image object
interface ImageObject {
  url: string
}

// ✅ Define the shape of the item prop
interface CardItem {
  id: number | string
  title: string
  price: number
  oldPrice?: number // optional — might not exist
  isNew?: boolean // optional — might not exist
  img?: ImageObject // optional — might not exist
  img2?: ImageObject // optional — might not exist
}

// ✅ Define the component's props
interface CardProps {
  item: CardItem
}

function Card({ item }: CardProps) {
  return (
    <>
      <Link to={`/product/${item.id}`}>
        <div className="card">
          <div className="images">
            {item?.isNew && <span>New Season</span>}
            <img src={getImageUrl(item.img2?.url)} alt="img" className="mainImg" />
            <img src={getImageUrl(item.img?.url)} alt="" className="secondImg" />
          </div>
          <h2>{item?.title}</h2>
        </div>
        <div className="prices">
          <h3>₹{item.oldPrice || item?.price + 150}</h3>
          <h3>₹{item?.price}</h3>
        </div>
      </Link>
    </>
  )
}

export default Card
