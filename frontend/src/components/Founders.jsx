import { assets } from '../assets/assets'

const Founders = () => {
  return (
    <div className=" mt-[100px]">
      {/* Heading */}
      <div className="text-center mb-14">
        <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Meet Our Founders
        </h2>
        <p className="text-gray-400 text-sm sm:text-base mt-2">
          The vision and passion behind our brand
        </p>
      </div>

      {/* Founder Card */}
      <div className="flex justify-center w-full">
        <div className="text-center">

          {/* Founder Image */}
          <div className="w-full px-4 sm:px-8">
  <img
    src={assets.founders}
    alt="Founders of Goyal Book Shop"
    className="
      w-full 
      h-auto 
      object-contain 
      rounded-xl 
      shadow-md
      max-h-[60vh]
      sm:max-h-[70vh]
      md:max-h-[700px]
    "
  />
</div>
          {/* Name */}
          <h3 className="text-lg mt-[50px] sm:text-xl font-semibold text-gray-800">
            Sh. Roshan Lal Goyal 
          </h3>

          {/* Role */}
          <p className="text-gray-500 text-sm mb-4">
            Founder & CEO
          </p>

          {/* Description */}
          <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
            Driven by innovation and quality, Roshan Lal founded this brand with a<br/>
            vision to redefine the stationery experience. Every product reflects
            a commitment to excellence, trust, and customer satisfaction.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Founders
