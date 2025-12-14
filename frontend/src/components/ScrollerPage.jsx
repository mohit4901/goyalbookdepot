import { assets } from '../assets/assets'

export default function ScrollerPage() {

  // 15 images per row
  const row1 = [
    assets.s1, assets.s2, assets.s3, assets.s4, assets.s5,
    assets.s6, assets.s7, assets.s8, assets.s9, assets.s10,
    assets.s11, assets.s12, assets.s13, 
  ]

  const row2 = [
    assets.s16, assets.s17, assets.s18, assets.s19, assets.s20,
    assets.s21, assets.s22, assets.s23, assets.s24, assets.s25,
    assets.s14, assets.s15,
   
  ]

  return (
    <div className='mt-[100px]' >
    <h1 className='flex center justify-center mb-7 text-3xl'>SOME GLIMPSES OF GBD ✨</h1>
    <div className="relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] w-screen bg-black py-10 flex flex-col gap-10 overflow-hidden">
    {/* ROW 1 */}
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max gap-4 animate-[scrollLeft_60s_linear_infinite]">
        {[...row1, ...row1].map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="h-36 sm:h-44 rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  
    {/* ROW 2 */}
    <div className="relative w-full overflow-hidden">
      <div className="flex w-max gap-4 animate-[scrollRight_60s_linear_infinite]">
        {[...row2, ...row2].map((img, i) => (
          <img
            key={i}
            src={img}
            alt=""
            className="h-36 sm:h-44 rounded-xl object-cover"
          />
        ))}
      </div>
    </div>
  
    {/* KEYFRAMES */}
    <style>
      {`
        @keyframes scrollLeft {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes scrollRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
      `}
    </style>
  
  </div>
  </div>
  )
}
