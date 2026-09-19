import axios from 'axios';
import React, { useEffect, useState, useMemo } from 'react';
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';
import EditProductModal from '../components/EditProductModal';

const fallbackSvg =
  'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>';

const List = ({ token }) => {
  const [list, setList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [editingProduct, setEditingProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchList = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const removeProduct = async (id, name) => {
    const confirmDelete = window.confirm(`Are you sure you want to delete "${name}"?`);
    if (!confirmDelete) return;

    try {
      const response = await axios.post(
        `${backendUrl}/api/product/remove`,
        { id },
        { headers: { token } }
      );

      if (response.data.success) {
        toast.success(response.data.message || 'Product removed');
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const filteredList = useMemo(() => {
    return list.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item.caption && item.caption.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.subCategory && item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesCategory =
        categoryFilter === 'All' ||
        item.category === categoryFilter ||
        item.subCategory === categoryFilter;

      return matchesSearch && matchesCategory;
    });
  }, [list, searchQuery, categoryFilter]);

  return (
    <div className="w-full max-w-6xl space-y-4">
      {/* Header & Stats */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-gray-200">
        <div>
          <h1 className="text-xl font-bold text-gray-800">All Products List</h1>
          <p className="text-xs text-gray-500">
            Total {list.length} products in database • Showing {filteredList.length} items
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search books, captions..."
              className="px-3 py-1.5 pl-8 text-xs border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 outline-none w-48 sm:w-60"
            />
            <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1.5 text-gray-400 hover:text-gray-600 text-xs"
              >
                ✕
              </button>
            )}
          </div>

          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-2.5 py-1.5 text-xs border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 outline-none"
          >
            <option value="All">All Categories</option>
            <option value="Stationary">Stationary</option>
            <option value="Gift Items">Gift Items</option>
            <option value="Ncert Books">Ncert Books</option>
            <option value="Other Books">Other Books</option>
            <option value="Notebooks">Notebooks</option>
            <option value="School Bags">School Bags</option>
          </select>

          <button
            onClick={fetchList}
            title="Refresh List"
            className="px-2.5 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
          >
            🔄 Refresh
          </button>
        </div>
      </div>

      {/* Product Table Container */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        {/* Table Header */}
        <div className="hidden md:grid grid-cols-[80px_3fr_1.5fr_1fr_130px] items-center py-3 px-4 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-600 uppercase tracking-wider">
          <span>Image</span>
          <span>Product Details</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Actions</span>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="py-12 text-center text-gray-500 text-sm flex items-center justify-center gap-2">
            <span className="w-5 h-5 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
            Loading products...
          </div>
        )}

        {/* Empty State */}
        {!isLoading && filteredList.length === 0 && (
          <div className="py-12 text-center text-gray-500 text-sm">
            No products found matching your search.
          </div>
        )}

        {/* Product Items */}
        {!isLoading &&
          filteredList.map((item) => (
            <div
              key={item._id}
              className="grid grid-cols-1 md:grid-cols-[80px_3fr_1.5fr_1fr_130px] items-center gap-3 p-3 md:px-4 border-b border-gray-100 hover:bg-indigo-50/30 transition-colors text-sm"
            >
              {/* Product Thumbnail with Fallback */}
              <div className="w-14 h-16 rounded-lg bg-gray-100 border border-gray-200 overflow-hidden flex items-center justify-center flex-shrink-0">
                <img
                  className="w-full h-full object-cover"
                  src={item.image && item.image[0] ? item.image[0] : fallbackSvg}
                  alt={item.name}
                  onError={(e) => {
                    e.target.src = fallbackSvg;
                  }}
                />
              </div>

              {/* Title & Caption */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-900 leading-tight">{item.name}</p>
                  {item.bestseller && (
                    <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-1.5 py-0.5 rounded-full border border-amber-200">
                      ★ Bestseller
                    </span>
                  )}
                </div>

                {/* Caption Badge */}
                {item.caption ? (
                  <p className="inline-block bg-indigo-50 text-indigo-700 text-[11px] font-medium px-2 py-0.5 rounded border border-indigo-100">
                    🏷️ {item.caption}
                  </p>
                ) : (
                  <p className="text-gray-400 text-xs italic">No caption set</p>
                )}

                <p className="text-xs text-gray-500 line-clamp-1">{item.description}</p>
              </div>

              {/* Category / SubCategory */}
              <div className="text-xs space-y-0.5">
                <span className="inline-block bg-gray-100 text-gray-700 px-2 py-0.5 rounded text-[11px] font-medium">
                  {item.category}
                </span>
                {item.subCategory && (
                  <p className="text-gray-500 text-[11px]">{item.subCategory}</p>
                )}
              </div>

              {/* Price */}
              <div className="font-bold text-gray-900 text-sm">
                {currency}{item.price}
              </div>

              {/* Actions: Edit & Delete */}
              <div className="flex items-center justify-start md:justify-center gap-2">
                <button
                  onClick={() => setEditingProduct(item)}
                  className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-indigo-600 hover:text-white bg-indigo-50 hover:bg-indigo-600 rounded-lg transition-colors border border-indigo-200"
                  title="Edit product details, price, images, caption"
                >
                  ✏️ Edit
                </button>
                <button
                  onClick={() => removeProduct(item._id, item.name)}
                  className="flex items-center gap-1 px-2 py-1.5 text-xs font-semibold text-red-600 hover:text-white bg-red-50 hover:bg-red-600 rounded-lg transition-colors border border-red-200"
                  title="Delete product"
                >
                  🗑️
                </button>
              </div>
            </div>
          ))}
      </div>

      {/* Edit Product Modal */}
      {editingProduct && (
        <EditProductModal
          product={editingProduct}
          token={token}
          onClose={() => setEditingProduct(null)}
          onSuccess={fetchList}
        />
      )}
    </div>
  );
};

export default List;