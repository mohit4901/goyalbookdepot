import React, { useState, useRef } from 'react';
import { compressImage, formatBytes } from '../utils/imageCompressor';

const ImageDropzone = ({
  images = [],
  setImages,
  existingImages = [],
  setExistingImages,
  maxImages = 4
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [compressEnabled, setCompressEnabled] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef(null);

  const totalCurrentImages = (existingImages ? existingImages.length : 0) + images.length;
  const remainingSlots = Math.max(0, maxImages - totalCurrentImages);

  const handleFiles = async (fileList) => {
    if (!fileList || fileList.length === 0) return;
    if (remainingSlots <= 0) {
      alert(`Maximum ${maxImages} images allowed in total.`);
      return;
    }

    const filesToProcess = Array.from(fileList).slice(0, remainingSlots);
    setIsProcessing(true);

    try {
      const newProcessed = [];
      for (const file of filesToProcess) {
        if (!file.type.startsWith('image/')) continue;

        if (compressEnabled) {
          const compressed = await compressImage(file, { quality: 0.8, maxWidth: 1200 });
          newProcessed.push(compressed);
        } else {
          newProcessed.push({
            file,
            originalSize: file.size,
            compressedSize: file.size,
            previewUrl: URL.createObjectURL(file),
            savedPercent: 0
          });
        }
      }

      setImages((prev) => [...prev, ...newProcessed].slice(0, maxImages));
    } catch (err) {
      console.error('Error processing images:', err);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const removeNewImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const removeExistingImage = (index) => {
    if (setExistingImages) {
      setExistingImages((prev) => prev.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="w-full space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-semibold text-gray-700">
          Product Images ({totalCurrentImages}/{maxImages})
        </label>
        <label className="flex items-center gap-1.5 text-xs text-emerald-700 cursor-pointer select-none bg-emerald-50 px-2 py-1 rounded-full border border-emerald-200">
          <input
            type="checkbox"
            checked={compressEnabled}
            onChange={(e) => setCompressEnabled(e.target.checked)}
            className="rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
          />
          <span className="font-medium">Auto-Compress (Fast Upload)</span>
        </label>
      </div>

      {/* Dropzone Area */}
      {remainingSlots > 0 && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all duration-200 ${
            isDragging
              ? 'border-indigo-500 bg-indigo-50/50 scale-[1.01]'
              : 'border-gray-300 hover:border-indigo-400 bg-gray-50/60 hover:bg-gray-50'
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
          />

          <div className="flex flex-col items-center justify-center gap-2">
            <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 text-xl font-bold">
              📷
            </div>
            {isProcessing ? (
              <p className="text-sm font-medium text-indigo-600 animate-pulse">
                Optimizing and compressing images...
              </p>
            ) : (
              <>
                <p className="text-sm font-medium text-gray-700">
                  <span className="text-indigo-600 underline">Click to upload</span> or drag and drop images here
                </p>
                <p className="text-xs text-gray-500">
                  PNG, JPG, WEBP up to 10MB each (Compressed automatically) • {remainingSlots} slots remaining
                </p>
              </>
            )}
          </div>
        </div>
      )}

      {/* Previews Grid */}
      {totalCurrentImages > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          {/* Existing Images (When Editing) */}
          {existingImages &&
            existingImages.map((url, index) => (
              <div
                key={`existing-${index}`}
                className="relative group border border-gray-200 rounded-lg overflow-hidden bg-white shadow-sm"
              >
                <img
                  src={url}
                  alt={`Existing ${index + 1}`}
                  className="w-full h-28 object-cover"
                  onError={(e) => {
                    e.target.src =
                      'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 24 24" fill="none" stroke="%239ca3af" stroke-width="2"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/><path d="M6 6h10"/><path d="M6 10h10"/></svg>';
                  }}
                />
                <div className="absolute top-1 left-1 bg-black/60 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">
                  Saved
                </div>
                <button
                  type="button"
                  onClick={() => removeExistingImage(index)}
                  className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow transition-opacity"
                  title="Remove image"
                >
                  ✕
                </button>
              </div>
            ))}

          {/* Newly Added Images */}
          {images.map((item, index) => (
            <div
              key={`new-${index}`}
              className="relative group border border-indigo-200 rounded-lg overflow-hidden bg-white shadow-sm"
            >
              <img src={item.previewUrl} alt={`New ${index + 1}`} className="w-full h-28 object-cover" />
              <div className="absolute top-1 left-1 bg-indigo-600 text-white text-[10px] px-1.5 py-0.5 rounded font-mono font-medium">
                New
              </div>
              <button
                type="button"
                onClick={() => removeNewImage(index)}
                className="absolute top-1 right-1 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-xs opacity-90 hover:opacity-100 shadow transition-opacity"
                title="Remove image"
              >
                ✕
              </button>

              {/* Compression stats chip */}
              <div className="p-1.5 bg-gray-50 text-[10px] text-gray-600 border-t border-gray-100 flex items-center justify-between">
                <span className="font-mono text-emerald-600 font-semibold">
                  {formatBytes(item.compressedSize)}
                </span>
                {item.savedPercent > 0 && (
                  <span className="bg-emerald-100 text-emerald-700 px-1 py-0.2 rounded font-bold">
                    -{item.savedPercent}%
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageDropzone;
