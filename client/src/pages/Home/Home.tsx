import './Home.scss'
import { Slider, FeatureProducts, Categories, Contact } from '../../components'

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
