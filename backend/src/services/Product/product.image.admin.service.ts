import ImageService from "../../routing/image.service.js";

const ProductImageAdminService = {
    /**
     * Upload product image.
     * @param image The image to be uploaded.
     * @returns The uploaded image.
     */
    async createProductImages(image: any): Promise<any> {
        const result = await ImageService.uploadImage(image);
        return {public_id: result.public_id, secure_url: result.secure_url};
    },

    /**
     * Delete product image.
     * @param image The image to be deleted.
     */
    async deleteProductImage(image: any): Promise<void> {
        await ImageService.deleteImage(image);
    },


}

export default ProductImageAdminService;