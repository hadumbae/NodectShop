import createError from 'http-errors';
import cloudinary from '../../configs/cloudinary-config.js';
import { ProductImageType } from '../../types/ProductTypes.js';
import ProductService from '../ProductService.js';
import mongoose, {Types} from 'mongoose';
import ProductSKUService from "./ProductSKUService.js";
import ProductSKUImage, {IProductSKUImage} from "../../models/Product/ProductSKUImage.js";

const ProductSKUImageService = {

	/**
	 * Find the product SKU image by ID or throw a 404 error.
	 * @param id The ID of the product SKU image to be found.
	 * @return The product SKU image.
	 */
	async findByIDOr404(id: string): Promise<any> {
		if (!Types.ObjectId.isValid(id)) throw createError(400, "Invalid Image ID.");
		const image = await ProductSKUImage.findById(id).populate('sku');
		if (!image) throw createError("Sub Image Not FOund.");

		return image;
	},

	/**
	 * Upload image to Cloudinary.
	 * @param image The image data to be uploaded.
	 * @returns The results of uploading the image.
	 */
	async uploadImage(image) {
		const imageBuffer = image.buffer;
		const imageArray = Array.from(new Uint8Array(imageBuffer));
		const imageData = Buffer.from(imageArray);

		const imageBase64 = imageData.toString('base64');
		return await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, { folder: 'propertypulse' });
	},

	/**
	 * Upload product SKU images.
	 * @param skuID ID of the associated product SKU.
	 * @param images An array of images to be uploaded.
	 * @returns The uploaded SKU images.
	 */
	async createProductSKUImage(skuID: string, images: any): Promise<any> {
		await ProductSKUService.existsOr404(skuID);

		const skuImages = [];

		for (let [index, image] of images.entries()) {
			const result = await this.uploadImage(image);
			const skuImage = new ProductSKUImage({
				sku: skuID,
				isPrimary: false,
				public_id: result.public_id,
				secure_url: result.secure_url,
			});

			await skuImage.save();
			skuImages.push(skuImage);
		}

		return skuImages;
	},

	/**
	 * Delete the provided product SKU image.
	 * @param imageID ID of the product SKU image to be destroyed.
	 */
	async deleteProductSKUImage(imageID: string): Promise<void> {
		const skuImage: IProductSKUImage = await this.findByIDOr404(imageID);
		await cloudinary.uploader.destroy(skuImage.public_id);
		await ProductSKUImage.deleteOne({_id: skuImage._id});
	},

	async markAsPrimary(imageID: string) {
		const image = await this.findByIDOr404(imageID);
		await ProductSKUImage.updateMany({sku: image.sku._id}, {isPrimary: false});

		image.isPrimary = !image.isPrimary;
		image.save();
		return image;
	},
};

export default ProductSKUImageService;
