
import { assets } from '../assets/assets'

const OurPolicy = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-10 text-center  text-xs pb-[100px] sm:text-sm md:text-base text-gray-700'>
      
      <div>
        <img src={assets.exchange_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Easy Exchange Policy</p>
        <p className=' text-gray-400'>Shop with confidence — our easy, hassle-free exchange policy keeps your experience smooth.</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Improved Qualify</p>
        <p className=' text-gray-400'>Premium stationery, crafted for perfection — delivering the finest quality for every workspace.</p>
      </div>
      <div>
        <img src={assets.support_img} className='w-12 m-auto mb-5' alt="" />
        <p className=' font-semibold'>Best customer support</p>
        <p className=' text-gray-400'>We’re here for you, always — dedicated 24/7 customer support you can rely on.</p>
      </div>

    </div>
  )
}

export default OurPolicy

