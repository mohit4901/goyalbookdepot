import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';

const fallbackBookSvg =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="300" height="380" viewBox="0 0 300 380" fill="%23f8fafc"><rect width="300" height="380" fill="%23f1f5f9"/><rect x="40" y="40" width="220" height="300" rx="8" fill="%23e2e8f0" stroke="%23cbd5e1" stroke-width="3"/><path d="M70 100h160M70 140h160M70 180h100" stroke="%2394a3b8" stroke-width="4" stroke-linecap="round"/><text x="150" y="260" text-anchor="middle" fill="%2364748b" font-family="sans-serif" font-size="13" font-weight="600">GOYAL BOOK DEPOT</text></svg>';

const AddToCartPopup = () => {
  const { cartPopup, setCartPopup, currency, navigate } = useContext(ShopContext);

  if (!cartPopup || !cartPopup.isOpen || !cartPopup.product) {
    return null;
  }

  const { product, size } = cartPopup;
  const imgSrc = product.image && product.image[0] ? product.image[0] : fallbackBookSvg;

  const closePopup = () => {
    setCartPopup({ isOpen: false, product: null, size: '' });
  };

  const goToCart = () => {
    closePopup();
    navigate('/cart');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden p-6 space-y-5 animate-scaleUp">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-gray-100">
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-base">
            <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs">
              ✓
            </span>
            Added to Your Cart!
          </div>
          <button
            onClick={closePopup}
            className="w-7 h-7 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-500 flex items-center justify-center text-xs font-bold transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Product Details Row */}
        <div className="flex items-center gap-4 bg-gray-50/70 p-3 rounded-xl border border-gray-100">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-16 h-20 object-cover rounded-lg border border-gray-200 flex-shrink-0 bg-white"
            onError={(e) => {
              e.target.src = fallbackBookSvg;
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-800 text-sm line-clamp-2 leading-snug">
              {product.name}
            </h3>
            {product.caption && (
              <span className="inline-block text-[10px] text-indigo-600 bg-indigo-50 px-1.5 py-0.2 rounded font-medium mt-1">
                🏷️ {product.caption}
              </span>
            )}
            <div className="flex items-center gap-3 mt-1.5 text-xs text-gray-600">
              <span className="bg-white px-2 py-0.5 rounded border border-gray-200 font-medium">
                Size: {size}
              </span>
              <span className="font-bold text-gray-900 text-sm">
                {currency}{product.price}
              </span>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-2">
          <button
            type="button"
            onClick={closePopup}
            className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors text-center"
          >
            Continue Shopping
          </button>
          <button
            type="button"
            onClick={goToCart}
            className="w-full py-2.5 px-4 text-xs sm:text-sm font-semibold text-white bg-black hover:bg-gray-800 rounded-xl shadow-md transition-all text-center flex items-center justify-center gap-1.5"
          >
            View Cart ➔
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddToCartPopup;
