
import Hero from '../components/Hero'
import LatestCollection from '../components/LatestCollection'
import Scroll from '../components/Scroll'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'
import Carousel from '../components/Carousel'
import Founders from '../components/Founders'
import ScrollerPage from '../components/ScrollerPage'
import AuthorizedDistributor from '../components/Distributer'

const Home = () => {
  return (
    <div>
      <Carousel/>
      <Scroll/>
      <LatestCollection/>
      <Hero/>
      <OurPolicy/>
      <NewsletterBox/>
      <Founders/>
      <AuthorizedDistributor/>
      <ScrollerPage/>

    </div>
  )
}

export default Home

