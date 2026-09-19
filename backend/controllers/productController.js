import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

// function for add product
const addProduct = async (req, res) => {
    try {

        const { name, description, price, category, subCategory, sizes, bestseller, caption } = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            category,
            price: Number(price),
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            caption: caption || '',
            sizes: JSON.parse(sizes),
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product = new productModel(productData);
        await product.save()

        res.json({ success: true, message: "Product Added" })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for updating product
const updateProduct = async (req, res) => {
    try {
        const { id, name, description, price, category, subCategory, sizes, bestseller, caption, existingImages } = req.body

        if (!id) {
            return res.json({ success: false, message: "Product ID is required" })
        }

        const product = await productModel.findById(id)
        if (!product) {
            return res.json({ success: false, message: "Product not found" })
        }

        let finalImages = []

        // Retain existing images that were not removed
        if (existingImages) {
            try {
                const parsedExisting = typeof existingImages === 'string' ? JSON.parse(existingImages) : existingImages
                if (Array.isArray(parsedExisting)) {
                    finalImages = [...parsedExisting]
                }
            } catch {
                finalImages = [existingImages]
            }
        } else if (!req.files || Object.keys(req.files).length === 0) {
            finalImages = product.image || []
        }

        // Upload any newly added images
        if (req.files) {
            const image1 = req.files.image1 && req.files.image1[0]
            const image2 = req.files.image2 && req.files.image2[0]
            const image3 = req.files.image3 && req.files.image3[0]
            const image4 = req.files.image4 && req.files.image4[0]

            const newFiles = [image1, image2, image3, image4].filter((item) => item !== undefined)

            if (newFiles.length > 0) {
                const uploadedUrls = await Promise.all(
                    newFiles.map(async (item) => {
                        let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' })
                        return result.secure_url
                    })
                )
                finalImages = [...finalImages, ...uploadedUrls]
            }
        }

        if (finalImages.length === 0 && product.image && product.image.length > 0) {
            finalImages = product.image
        }

        const updateData = {
            ...(name && { name }),
            ...(description && { description }),
            ...(category && { category }),
            ...(subCategory && { subCategory }),
            ...(price !== undefined && { price: Number(price) }),
            ...(bestseller !== undefined && { bestseller: bestseller === "true" || bestseller === true }),
            ...(sizes && { sizes: typeof sizes === 'string' ? JSON.parse(sizes) : sizes }),
            ...(caption !== undefined && { caption }),
            image: finalImages
        }

        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true })

        res.json({ success: true, message: "Product Updated Successfully", product: updatedProduct })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for list product
const listProducts = async (req, res) => {
    try {
        
        const products = await productModel.find({});
        res.json({success:true,products})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for removing product
const removeProduct = async (req, res) => {
    try {
        
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        
        const { productId } = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

export { listProducts, addProduct, updateProduct, removeProduct, singleProduct }