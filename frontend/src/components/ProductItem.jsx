import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom'

const fallbackBookSvg =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380" fill="%23f8fafc"><rect width="300" height="380" fill="%23f1f5f9"/><rect x="40" y="40" width="220" height="300" rx="8" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="3"/><path d="M70 100h160M70 140h160M70 180h100" stroke="%2394a3b8" stroke-width="4" stroke-linecap="round"/><text x="150" y="260" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="13" font-weight="600">GOYAL BOOK DEPOT</text></svg>'

const ProductItem = ({ id, image, name, price, caption }) => {
  const { currency } = useContext(ShopContext)
  const imgSrc = image && image[0] ? image[0] : fallbackBookSvg

  return (
    <Link
      onClick={() => scrollTo(0, 0)}
      className="text-gray-700 cursor-pointer group flex flex-col justify-between"
      to={`/product/${id}`}
    >
      <div className="overflow-hidden rounded-xl bg-gray-50 border border-gray-100 aspect-[3/4] flex items-center justify-center relative shadow-sm hover:shadow transition-shadow">
        <img
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
          src={imgSrc}
          alt={name}
          onError={(e) => {
            e.target.src = fallbackBookSvg
          }}
        />
        {caption && (
          <span className="absolute top-2 left-2 bg-indigo-600/90 backdrop-blur-sm text-white text-[10px] font-bold px-2 py-0.5 rounded-full shadow-sm">
            {caption}
          </span>
        )}
      </div>
      <div className="pt-2.5">
        <p className="text-sm font-medium text-gray-800 line-clamp-2 leading-snug group-hover:text-indigo-600 transition-colors">
          {name}
        </p>
        <p className="text-sm font-bold text-gray-900 mt-1">
          {currency}{price}
        </p>
      </div>
    </Link>
  )
}

export default ProductItem
