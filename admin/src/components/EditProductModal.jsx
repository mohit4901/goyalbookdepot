import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import ImageDropzone from './ImageDropzone';

const EditProductModal = ({ product, token, onClose, onSuccess }) => {
  const [name, setName] = useState(product.name || '');
  const [description, setDescription] = useState(product.description || '');
  const [caption, setCaption] = useState(product.caption || '');
  const [price, setPrice] = useState(product.price || '');
  const [category, setCategory] = useState(product.category || 'Stationary');
  const [subCategory, setSubCategory] = useState(product.subCategory || 'Ncert Books');
  const [bestseller, setBestseller] = useState(Boolean(product.bestseller));
  const [sizes, setSizes] = useState(Array.isArray(product.sizes) ? product.sizes : ['FreeSize']);
  const [existingImages, setExistingImages] = useState(product.image || []);
  const [newImages, setNewImages] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSizes = ['FreeSize', 'S', 'M', 'L', 'XL', 'Standard'];

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!price || Number(price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    if (existingImages.length === 0 && newImages.length === 0) {
      toast.error('At least one product image is required');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('id', product._id);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('caption', caption);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));
      formData.append('existingImages', JSON.stringify(existingImages));

      newImages.forEach((imgObj, index) => {
        formData.append(`image${index + 1}`, imgObj.file);
      });

      const response = await axios.post(`${backendUrl}/api/product/update`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Product updated successfully!');
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast.error(response.data.message || 'Failed to update product');
      }
    } catch (error) {
      console.error('Update error:', error);
      toast.error(error.response?.data?.message || error.message || 'Error updating product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden my-8">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 bg-gray-50/70">
          <div>
            <h2 className="text-lg font-bold text-gray-800">Edit Product</h2>
            <p className="text-xs text-gray-500">ID: {product._id}</p>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-gray-200 hover:bg-gray-300 text-gray-600 flex items-center justify-center transition-colors text-sm font-bold"
          >
            ✕
          </button>
        </div>

        {/* Body Form */}
        <form onSubmit={handleUpdate} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Images with Drag and Drop & Compression */}
          <ImageDropzone
            images={newImages}
            setImages={setNewImages}
            existingImages={existingImages}
            setExistingImages={setExistingImages}
            maxImages={4}
          />

          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Product Title / Name *
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Class 12 NCERT Mathematics Part 1"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Caption / Badge */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-semibold text-gray-700">
                Product Caption / Highlight Badge (Shows on frontend cards)
              </label>
              <span className="text-[11px] text-indigo-600 font-medium">Optional</span>
            </div>
            <input
              type="text"
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="e.g. Bestseller 2026, 20% Off, New Syllabus, CBSE Board"
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">
              Product Description *
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detailed description of the book or item..."
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
            />
          </div>

          {/* Grid: Category, Subcategory, Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Stationary">Stationary</option>
                <option value="Gift Items">Gift Items</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Sub Category</label>
              <select
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
              >
                <option value="Ncert Books">Ncert Books</option>
                <option value="Other Books">Other Books</option>
                <option value="Stationary Items">Stationary Items</option>
                <option value="Notebooks">Notebooks</option>
                <option value="Gift Items">Gift Items</option>
                <option value="School Bags">School Bags</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Price (Rs.) *</label>
              <input
                type="number"
                min="1"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg font-bold text-gray-800 focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Product Sizes</label>
            <div className="flex flex-wrap gap-2">
              {availableSizes.map((sz) => (
                <button
                  type="button"
                  key={sz}
                  onClick={() => toggleSize(sz)}
                  className={`px-3 py-1 text-xs rounded-md border font-medium transition-colors ${
                    sizes.includes(sz)
                      ? 'bg-indigo-600 text-white border-indigo-600 shadow-sm'
                      : 'bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200'
                  }`}
                >
                  {sz}
                </button>
              ))}
            </div>
          </div>

          {/* Bestseller checkbox */}
          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="edit-bestseller"
              checked={bestseller}
              onChange={(e) => setBestseller(e.target.checked)}
              className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
            />
            <label htmlFor="edit-bestseller" className="text-xs font-medium text-gray-700 cursor-pointer">
              Mark as Bestseller ⭐
            </label>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Saving Changes...
                </>
              ) : (
                'Save Changes'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
