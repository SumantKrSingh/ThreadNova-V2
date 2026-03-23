import './List.scss'
import Card from '../Card/Card'
import useFetch from '../../hooks/useFetch'
import type { CardItem } from '../../types/product.types'

// ✅ Props type
interface ListProps {
  catId: number
  subCat: number[]
  maxPrice: number
  sort: string
  gender: string
}

function List({ subCat, maxPrice, sort, gender }: ListProps) {
  const buildQuery = (): string => {
    let query = `/products?populate=*`

    if (gender && gender !== 'all') {
      query += `&filters[categories][title][$eq]=${gender}`
    }

    if (subCat && subCat.length > 0) {
      subCat.forEach((item, index) => {
        query += `&filters[sub_categories][id][$in][${index}]=${item}`
      })
    }

    if (maxPrice) {
      query += `&filters[price][$lte]=${maxPrice}`
    }

    if (sort) {
      query += `&sort=price:${sort}`
    }

    return query
  }

  const { data, loading, error } = useFetch<CardItem[]>(buildQuery())

  if (error) {
    console.error('API Error:', error)
    return <div>Error loading products</div>
  }

  return (
    <div className="list">
      {loading ? (
        'Loading...'
      ) : data && data.length > 0 ? (
        data.map((item) => <Card item={item} key={item.id} />)
      ) : (
        <div>No products found</div>
      )}
    </div>
  )
}

export default List
