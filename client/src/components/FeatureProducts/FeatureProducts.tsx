import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import './FeatureProducts.scss'
import { type CardItem } from '../../types/product.types'
import SkeletonCard from '../SkeletonLoaders/SkeletonCard'

interface FeatureProductProps {
  type: string
}

function FeatureProduct({ type }: FeatureProductProps) {
  const { data, loading, error } = useFetch<CardItem[]>(
    `products?populate=*&[filters][type][$eq]=${type}`
  )

  return (
    <div className="featureProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>Handpicked pieces that define the season — selected for quality, style, and value.</p>
      </div>
      <div className="bottom">
        {error && <p>Something Went Wrong !</p>}
        {loading ? (
          <div className="featureProducts">
            <div className="bottom">
              {[1, 2, 3].map((i) => (
                <SkeletonCard key={i} />
              ))}
            </div>
          </div>
        ) : (
          data?.map((item) => <Card item={item} key={item.id} />)
        )}
      </div>
    </div>
  )
}

export default FeatureProduct
