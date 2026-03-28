import './Products.scss'
import { SkeletonCard, List } from '../../components'
import { useParams, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import useFetch from '../../hooks/useFetch'
import TuneIcon from '@mui/icons-material/Tune'
import CloseIcon from '@mui/icons-material/Close'

interface SubCategory {
  id: number
  title: string
}

function Products() {
  const { id } = useParams<{ id: string }>()
  const catId = parseInt(id ?? '0')
  const location = useLocation()
  const queryParams = new URLSearchParams(location.search)
  const genderFromURL = queryParams.get('gender') ?? 'all'

  const [maxPrice, setMaxPrice] = useState<number>(8000)
  const [sort, setSort] = useState<string | null>(null)
  const [selectedSubCats, setSelectedSubCats] = useState<string[]>([])
  const [genderFilter, setGenderFilter] = useState<string>(genderFromURL)
  const [filterOpen, setFilterOpen] = useState<boolean>(false)

  useEffect(() => {
    setGenderFilter(genderFromURL)
  }, [genderFromURL])

  const { data, loading, error } = useFetch<SubCategory[]>(`/sub-categories?populate=categories`)

  if (loading)
    return (
      <div className="products">
        <div className="left">
          {[1, 2, 3].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    )
  if (error) return <div>Error loading product</div>

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const value = e.target.value
    const isChecked = e.target.checked
    setSelectedSubCats(
      isChecked ? [...selectedSubCats, value] : selectedSubCats.filter((item) => item !== value)
    )
  }

  return (
    <div className="products">
      <button className="filter-toggle" onClick={() => setFilterOpen(!filterOpen)}>
        <TuneIcon fontSize="medium" />
        <span>Filter</span>
      </button>

      {filterOpen && <div className="overlay" onClick={() => setFilterOpen(false)}></div>}

      <div className={`left ${filterOpen ? 'open' : ''}`}>
        <button className="closeFilter" onClick={() => setFilterOpen(false)}>
          <CloseIcon fontSize="large" />
        </button>

        <div className="filterItem">
          <h2>Gender</h2>
          <div className="inputItem">
            <input
              type="radio"
              name="gender"
              id="all"
              value="all"
              checked={genderFilter === 'all'}
              onChange={(e) => setGenderFilter(e.target.value)}
            />
            <label htmlFor="all">All</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              name="gender"
              id="men"
              value="Men Category"
              checked={genderFilter === 'Men Category'}
              onChange={(e) => setGenderFilter(e.target.value)}
            />
            <label htmlFor="men">Men</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              name="gender"
              id="women"
              value="Women Category"
              checked={genderFilter === 'Women Category'}
              onChange={(e) => setGenderFilter(e.target.value)}
            />
            <label htmlFor="women">Women</label>
          </div>
        </div>

        <div className="filterItem">
          <h2>Product Categories</h2>
          {data?.map((item) => (
            <div className="inputItem" key={item.id}>
              <input
                type="checkbox"
                id={`item-${item.id}`}
                value={item.id}
                onChange={handleChange}
              />
              <label htmlFor={`item-${item.id}`}>{item.title}</label>
            </div>
          ))}
        </div>

        <div className="filterItem">
          <h2>Filter By Price</h2>
          <div className="inputItem">
            <span>{maxPrice}</span>
            <input
              type="range"
              min={0}
              max={10000}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="filterItem">
          <h2>Sort By</h2>
          <div className="inputItem">
            <input type="radio" name="price" id="asc" value="asc" onChange={() => setSort('asc')} />
            <label htmlFor="asc">Price (Lowest First)</label>
          </div>
          <div className="inputItem">
            <input
              type="radio"
              name="price"
              id="desc"
              value="desc"
              onChange={() => setSort('desc')}
            />
            <label htmlFor="desc">Price (Highest First)</label>
          </div>
        </div>
      </div>

      <div className="right">
        <img className="catImg" src="/images/category.webp" alt="category-img" />
        <List
          catId={catId}
          maxPrice={maxPrice}
          sort={sort ?? ''}
          subCat={selectedSubCats}
          gender={genderFilter}
        />
      </div>
    </div>
  )
}

export default Products
