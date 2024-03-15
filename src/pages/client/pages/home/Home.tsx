
import BestSeller from '../../components/best-seller/BestSeller'
import BrandChoice from '../../components/brand-choice/BrandChoice'
import HeroImage from '../../components/hero-image/HeroImage'
import Disc from '../../components/disc/Disc'
import Offer from '../../components/offer/Offer'
import Blog from '../blog/Blog'
import Contact from '../contact/Contact'

import './home.scss'
export default function Home() {

  return (
    <div className='home_container'>
      <HeroImage></HeroImage>
      <Disc></Disc>

      <BrandChoice/>
      <BestSeller/>
      <Offer></Offer>
      <Blog></Blog>
      <Contact></Contact>



      
   

    </div>
  )
}
