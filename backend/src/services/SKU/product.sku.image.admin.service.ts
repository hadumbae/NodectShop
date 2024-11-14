import createError from 'http-errors';
import cloudinary from '../../configs/cloudinary-config.js';
import ProductSKURepository from "../../repositories/ProductSKURepository.js";
import ProductSKU from "../../models/Product/ProductSKU.js";
import ImageService from "../../routing/image.service.js";

const ProductSKUImageAdminService = {
	/**
	 * Upload product SKU images.
	 * @param skuID ID of the associated product SKU.
	 * @param images An array of images to be uploaded.
	 * @returns The uploaded SKU images.
	 */
	async createProductSKUImages(skuID: string, images: any): Promise<any> {
		const sku = await ProductSKURepository.existsOr404(skuID);

		for (let image of images) {
			const result = await ImageService.uploadImage(image);
			const isPrimary = sku.images.length === 0 ? true : false;
			sku.images.push({isPrimary: isPrimary, public_id: result.public_id, secure_url: result.secure_url});
		}

		await sku.save();

		return sku;
	},

	/**
	 * Delete the provided product SKU image.
	 * @param imageID ID of the product SKU image to be destroyed.
	 */
	async deleteProductSKUImage(imageID: string): Promise<void> {
		const sku: any = await ProductSKU.findOne({"images._id": imageID});
		if (!sku) throw createError(404, "Product SKU Image Not Found.");

		const image = sku.images.id(imageID);
		await cloudinary.uploader.destroy(image.public_id);

		sku.images.id(imageID).deleteOne();
		await sku.save();

		return sku;
	},

	async markAsPrimary(imageID: string) {
		const sku: any = await ProductSKU.findOne({"images._id": imageID});
		if (!sku) throw createError(404, "Product SKU Image Not Found.");

		sku.images = sku.images.map((image) => {
			image.isPrimary = image._id.toString() === imageID;
			return image;
		});

		await sku.save();
		return sku;
	},
};

export default ProductSKUImageAdminService;
