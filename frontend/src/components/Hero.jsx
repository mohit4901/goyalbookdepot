

import { assets } from '../assets/assets'



const Hero = () => {
  return (
    
    <div className='h-[600px] mb-[200px] mt-[100px] flex flex-col sm:flex-row border border-gray-400'>
            <img className='w-[500px] h-[350px]' src={assets.hero11} alt="" />
      {/* Hero Left Side */}
      <div className='w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0'>
            <div className='text-[#414141]'>
                <div className='flex items-center gap-2'>
                    <p className='w-8 md:w-11 h-[2px] bg-[#414141]'></p>
                    <p className=' font-medium text-sm md:text-base'>OUR BESTSELLERS</p>
                </div>
                <h1 className='prata-regular  text-3xl sm:py-3 lg:text-5xl leading-relaxed'>Latest Arrivals</h1>
                <h1 className=' text-3xl sm:py-3 lg:text-3xl leading-relaxed'>upto 60% Off On Your First Order</h1>
                <div className='flex items-center gap-2'>
                    <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                    <p className='w-8 md:w-11 h-[1px] bg-[#414141]'></p>
                </div>
            </div>
      </div>
      {/* Hero Right Side */}

    </div>
  )
}

export default Hero


