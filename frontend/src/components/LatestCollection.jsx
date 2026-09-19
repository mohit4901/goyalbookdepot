import { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import Title from './Title';
import ProductItem from './ProductItem';

const LatestCollection = () => {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setLatestProducts(products.slice(0, 10));
    }
  }, [products]);

  return (
    <section className="my-10 sm:my-14">
      {/* Header */}
      <div className="text-center pb-8 space-y-2">
        <Title text1={'LATEST'} text2={'ARRIVALS'} />
        <p className="w-full sm:w-3/4 mx-auto text-xs sm:text-sm text-gray-500 max-w-xl">
          Browse our newly added NCERT books, CBSE reference material, and premium student stationery essentials.
        </p>
      </div>

      {/* Rendering Products */}
      {latestProducts.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-8">
          {latestProducts.map((item, index) => (
            <ProductItem
              key={item._id || index}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              caption={item.caption}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-10 text-gray-400 text-sm">
          Loading books and stationery...
        </div>
      )}

      {/* View All Button */}
      <div className="text-center pt-10">
        <Link
          to="/collection"
          className="inline-flex items-center gap-2 px-8 py-3 bg-black hover:bg-gray-800 text-white font-semibold text-xs sm:text-sm rounded-full shadow transition-all"
        >
          View All Books & Collections ➔
        </Link>
      </div>
    </section>
  );
};

export default LatestCollection;
