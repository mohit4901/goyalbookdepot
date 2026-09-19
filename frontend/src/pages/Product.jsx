import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'

const fallbackBookSvg =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380" fill="%23f8fafc"><rect width="300" height="380" fill="%23f1f5f9"/><rect x="40" y="40" width="220" height="300" rx="8" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="3"/><path d="M70 100h160M70 140h160M70 180h100" stroke="%2394a3b8" stroke-width="4" stroke-linecap="round"/><text x="150" y="260" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="13" font-weight="600">GOYAL BOOK DEPOT</text></svg>'

const Product = () => {

  const { productId } = useParams()
  const { products, currency, addToCart } = useContext(ShopContext)

  const [productData, setProductData] = useState(null)
  const [image, setImage] = useState('')
  const [size, setSize] = useState('')

  const fetchProductData = () => {
    products.forEach((item) => {
      if (item._id === productId) {
        setProductData(item)
        setImage(item.image && item.image[0] ? item.image[0] : fallbackBookSvg)
      }
    })
  }

  useEffect(() => {
    if (products.length) fetchProductData()
  }, [productId, products])

  if (!productData) {
    return <div className="opacity-0"></div>
  }

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">

      {/* -------- Product Data -------- */}
      <div className="flex gap-12 flex-col sm:flex-row">

        {/* -------- Images -------- */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                key={index}
                src={item}
                alt=""
                onClick={() => setImage(item)}
                onError={(e) => {
                  e.target.src = fallbackBookSvg
                }}
                className={`w-[24%] sm:w-full sm:mb-3 cursor-pointer rounded-lg border object-cover h-20 ${
                  image === item ? 'border-indigo-600 ring-2 ring-indigo-200' : 'border-gray-200'
                }`}
              />
            ))}
          </div>

          <div className="w-full sm:w-[80%] bg-gray-50 rounded-xl overflow-hidden border border-gray-100 flex items-center justify-center min-h-[350px]">
            <img
              src={image || fallbackBookSvg}
              alt={productData.name}
              className="w-full h-auto max-h-[500px] object-contain"
              onError={(e) => {
                e.target.src = fallbackBookSvg
              }}
            />
          </div>
        </div>

        {/* -------- Info -------- */}
        <div className="flex-1">
          <h1 className="text-2xl font-medium mt-2">{productData.name}</h1>

          {productData.caption && (
            <div className="mt-2">
              <span className="inline-block bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold px-3 py-1 rounded-full shadow-sm">
                🏷️ {productData.caption}
              </span>
            </div>
          )}

          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_icon} className="w-3" />
            <img src={assets.star_dull_icon} className="w-3" />
            <p className="pl-2">(122)</p>
          </div>

          <p className="mt-5 text-3xl font-semibold">
            {currency}{productData.price}
          </p>

          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p>

          {/* -------- Size -------- */}
          <div className="flex flex-col gap-4 my-6">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  key={index}
                  onClick={() => setSize(item)}
                  className={`border px-4 py-2 bg-gray-100 ${
                    item === size ? 'border-orange-500' : ''
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={() => addToCart(productData._id, size)}
            className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 hover:bg-gray-800 transition-colors font-medium rounded shadow-sm"
          >
            ADD TO CART
          </button>

          <hr className="mt-8 sm:w-4/5" />

          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% Original product.</p>
            <p>Cash on delivery is available.</p>
            <p>Easy exchange within 7 days.</p>
          </div>
        </div>
      </div>

      {/* -------- Description -------- */}
      <div className="mt-20">
        <div className="flex">
          <b className="border px-5 py-3 text-sm">Description</b>
          <p className="border px-5 py-3 text-sm">Reviews (122)</p>
        </div>

        <div className="border px-6 py-6 text-sm text-gray-500 space-y-3">
          <p>Complete stationery destination for students & professionals.</p>
          <p>Up to <b>30% discount</b> on Arihant books.</p>
          <p>Books, gifts, office & daily-use stationery available.</p>
          <p>Trusted local store with years of reliability.</p>
        </div>
      </div>

    </div>
  )
}

export default Product







