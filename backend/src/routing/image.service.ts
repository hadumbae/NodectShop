import cloudinary from "../configs/cloudinary-config.js";

const ImageService = {
    /**
     * Upload image to Cloudinary.
     * @param image The image data to be uploaded.
     * @returns The results of uploading the image.
     */
    async uploadImage(image: any) {
        const imageBuffer = image.buffer;
        const imageArray = Array.from(new Uint8Array(imageBuffer));
        const imageData = Buffer.from(imageArray);

        const imageBase64 = imageData.toString('base64');
        return await cloudinary.uploader.upload(`data:image/png;base64,${imageBase64}`, { folder: 'propertypulse' });
    },

    /**
     * Delete the provided image.
     * @param The image to be destroyed.
     */
    async deleteImage(image: {public_id: string, secure_url: string}): Promise<void> {
        await cloudinary.uploader.destroy(image.public_id);
    },
}

export default ImageService;