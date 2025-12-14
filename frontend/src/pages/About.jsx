
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsletterBox from '../components/NewsletterBox'

const About = () => {
  return (
    <div>

      <div className='text-2xl text-center pt-8 border-t'>
          <Title text1={'ABOUT'} text2={'US'} />
      </div>

      <div className='my-10 flex flex-col md:flex-row gap-16'>
          <img className='w-full md:max-w-[450px]' src={assets.logo} alt="" />
          <div className='flex flex-col justify-center gap-6 md:w-2/4 text-gray-600'>
                <b className='text-gray-800 text-2xl'>GOYAL BOOK STORE</b>
              <p>🏁 About us <br/>

              Welcome to Goyal Book Depot — where knowledge meets inspiration.
We’re not just a bookstore; we’re readers first. For decades, we’ve lived among pages, stories, and ideas — and we’ve dedicated ourselves to creating a space where learning feels personal and meaningful.

Every book we offer is chosen with care, whether it’s for students chasing dreams, professionals building their future, or readers who simply love the smell of fresh pages. From academic excellence to timeless literature, we bring you a curated collection that’s reliable, relevant, and crafted to support every stage of your journey.

At Goyal Book Depot, we believe that a book is more than paper — it’s a guide, a companion, and sometimes even a turning point. And we’re here to make sure you always find the one you’re looking for.

Powered by knowledge. Trusted by generations.
Goyal Book Depot — For those who believe in the magic of books.</p>
          </div>
      </div>

      <div className=' text-xl py-4'>
          <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-gray-800 text-2xl'>Quality Assurance:</b>
            <p className=' text-gray-600'> ✅ Trusted Materials: Books and stationery curated from the most reliable and reputed publishers.<br/>
      ✅ Authentic & Updated: Guaranteed original editions with the latest academic content.
   </p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-gray-800 text-2xl'>Convenience:</b>
            <p className=' text-gray-600'>  ✅ One-Stop Store: From school supplies to competitive exam books — everything under one roof.<br/>
      ✅ Easy Availability: Well-stocked inventory ensuring you never leave without what you came for.
</p>
          </div>
          <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
            <b className='text-gray-800 text-2xl'>Exceptional Customer Service:</b>
            <p className=' text-gray-600'> ✅ Guidance & Support: Staff that helps you find exactly what you need — fast and friendly.<br/>
      ✅ Committed to Students: Serving generations with dedication, trust, and a passion for learning.
   </p>
          </div>
      </div>

      <NewsletterBox/>
      
    </div>
  )
}

export default About
