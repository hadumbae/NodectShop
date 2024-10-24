import createError from 'http-errors';
import cloudinary from '../internal/configs/cloudinary-config.js';
import { ProductImageType } from '../internal/types/ProductTypes.js';
import ProductService from './ProductService.js';
import mongoose from 'mongoose';

const ProductImageService = {
	/**
	 * Upload the main image of the provided image to Cloudinary.
	 * @param productID The ID of the product to which the image will belong.
	 * @param image The image data to be uploaded.
	 * @returns The updated product.
	 */
	async uploadMainImage(productID: string, image: any) {
		const product = await ProductService.findByIDOr404(productID);

		if (product.images.mainImage && product.images.mainImage.public_id) {
			await cloudinary.uploader.destroy(product.images.mainImage.public_id);
		}

		const result = await uploadImage(image);
		product.images.mainImage = { secure_url: result.secure_url, public_id: result.public_id };
		await product.save();

		return product;
	},

	/**
	 * Upload the main image of the provided image to Cloudinary.
	 * @param productID The ID of the product to which the image will belong.
	 * @param image The image data to be uploaded.
	 * @returns The updated product.
	 */
	async removeMainImage(productID: string) {
		const product = await ProductService.findByIDOr404(productID);

		if (product.images.mainImage && product.images.mainImage.public_id) {
			await cloudinary.uploader.destroy(product.images.mainImage.public_id);
		}

		product.images.mainImage = null;
		await product.save();

		return product;
	},

	/**
	 * Upload the main image of the provided image to Cloudinary.
	 * @param productID The ID of the product to which the image will belong.
	 * @param images The image data to be uploaded.
	 * @returns The updated product.
	 */
	async uploadSubImages(productID: string, images: any) {
		const product = await ProductService.findByIDOr404(productID);
		const subImages: ProductImageType[] = [];

		for (const image of images) {
			const imageBuffer = image.buffer;
			const imageArray = Array.from(new Uint8Array(imageBuffer));
			const imageData = Buffer.from(imageArray);

			const imageBase64 = imageData.toString('base64');
			const result = await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, { folder: 'propertypulse' });

			subImages.push({ secure_url: result.secure_url, public_id: result.public_id });
		}

		product.images.subImages = [...product.images.subImages, ...subImages];
		await product.save();

		return product;
	},

	/**
	 * Remove one subImage from the product.
	 * @param productID The ID of the product.
	 * @param subID The ID of the image to be removed.
	 * @returns The updated product.
	 */
	async removeSubImage(productID: string, subID: string) {
		// Validity Checks
		const product = await ProductService.findByIDOr404(productID);
		if (!mongoose.Types.ObjectId.isValid(subID)) throw createError('Invalid Sub Image ID.');
		const image = product.images.subImages.find((x) => x._id.toString() === subID);
		if (!image) throw createError(404, 'Sub Image Not Found.');

		// Remove Image
		await cloudinary.uploader.destroy(image.public_id);
		product.images.subImages = product.images.subImages.filter((x) => x._id.toString() != subID);
		await product.save();

		return product;
	},
};

/**
 * Upload image to Cloudinary.
 * @param image The image data to be uploaded.
 * @returns The results of uploading the image.
 */
const uploadImage = async (image) => {
	const imageBuffer = image.buffer;
	const imageArray = Array.from(new Uint8Array(imageBuffer));
	const imageData = Buffer.from(imageArray);

	const imageBase64 = imageData.toString('base64');
	return await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, { folder: 'propertypulse' });
};

export default ProductImageService;
