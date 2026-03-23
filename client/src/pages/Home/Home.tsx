import './Home.scss'
import Slider from '../../components/Slider/Slider'
import FeatureProducts from '../../components/FeatureProducts/FeatureProducts'
import Categories from '../../components/Categories/Categories'
import Contact from '../../components/Contact/Contact'

function Home() {
  return (
    <div className="home">
      <Slider />
      <FeatureProducts type="featured" />
      <Categories />
      <FeatureProducts type="trending" />
      <Contact />
    </div>
  )
}

export default Home
