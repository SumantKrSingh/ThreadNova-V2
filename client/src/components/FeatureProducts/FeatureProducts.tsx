import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import './FeatureProducts.scss'

// ✅ Props type
interface FeatureProductProps {
  type: string
}

function FeatureProduct({ type }: FeatureProductProps) {
  const { data, loading, error } = useFetch(`products?populate=*&[filters][type][$eq]=${type}`)

  return (
    <div className="featureProducts">
      <div className="top">
        <h1>{type} products</h1>
        <p>Handpicked pieces that define the season — selected for quality, style, and value.</p>
      </div>
      <div className="bottom">
        {error && <p>Something Went Wrong !</p>}
        {loading ? 'loading' : data?.map((item) => <Card item={item} key={item.id} />)}
      </div>
    </div>
  )
}

export default FeatureProduct
