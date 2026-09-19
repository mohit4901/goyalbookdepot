import React, { useState } from 'react';
import axios from 'axios';
import { backendUrl } from '../App';
import { toast } from 'react-toastify';
import ImageDropzone from '../components/ImageDropzone';

const Add = ({ token }) => {
  const [images, setImages] = useState([]);
  const [name, setName] = useState('');
  const [caption, setCaption] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Stationary');
  const [subCategory, setSubCategory] = useState('Ncert Books');
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState(['FreeSize']);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableSizes = ['FreeSize', 'S', 'M', 'L', 'XL', 'Standard'];

  const toggleSize = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((item) => item !== size) : [...prev, size]
    );
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (images.length === 0) {
      toast.error('Please upload at least one product image');
      return;
    }

    if (!price || Number(price) <= 0) {
      toast.error('Please enter a valid price');
      return;
    }

    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('name', name);
      formData.append('caption', caption);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestseller', bestseller);
      formData.append('sizes', JSON.stringify(sizes));

      images.forEach((imgObj, index) => {
        formData.append(`image${index + 1}`, imgObj.file);
      });

      const response = await axios.post(`${backendUrl}/api/product/add`, formData, {
        headers: { token }
      });

      if (response.data.success) {
        toast.success(response.data.message || 'Product Added Successfully!');
        // Reset form
        setName('');
        setCaption('');
        setDescription('');
        setPrice('');
        setImages([]);
        setBestseller(false);
        setSizes(['FreeSize']);
      } else {
        toast.error(response.data.message || 'Failed to add product');
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || error.message || 'Error adding product');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl space-y-6">
      <div className="pb-3 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-800">Add New Product</h1>
        <p className="text-xs text-gray-500">
          Upload images with drag & drop, client-side auto-compression, and custom captions.
        </p>
      </div>

      <form
        onSubmit={onSubmitHandler}
        className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6"
      >
        {/* Drag and Drop Image Uploader */}
        <ImageDropzone images={images} setImages={setImages} maxImages={4} />

        {/* Product Name */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Product Name / Book Title *
          </label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Class 10 NCERT Science Textbook"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Product Caption */}
        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-gray-700">
              Product Caption / Promotional Badge (Shows on frontend cards)
            </label>
            <span className="text-[11px] text-indigo-600 font-medium">Optional</span>
          </div>
          <input
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            placeholder="e.g. 2026 Edition, NCERT Original, Best Value Pack"
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Product Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-700 mb-1">
            Product Description *
          </label>
          <textarea
            required
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Write complete product details, edition, author, or publisher info..."
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>

        {/* Category, SubCategory & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-gray-700 mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
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
              className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg bg-white focus:ring-2 focus:ring-indigo-500"
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
              placeholder="e.g. 150"
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
                className={`px-3.5 py-1.5 text-xs rounded-md border font-medium transition-colors ${
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

        {/* Bestseller */}
        <div className="flex items-center gap-2 pt-1">
          <input
            type="checkbox"
            id="add-bestseller"
            checked={bestseller}
            onChange={(e) => setBestseller(e.target.checked)}
            className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500 cursor-pointer"
          />
          <label htmlFor="add-bestseller" className="text-xs font-medium text-gray-700 cursor-pointer">
            Mark as Bestseller ⭐
          </label>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-2.5 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-md hover:shadow-lg transition-all disabled:opacity-50 flex items-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Adding Product...
              </>
            ) : (
              'Add Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Add;