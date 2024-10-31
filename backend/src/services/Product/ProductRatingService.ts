import ProductRatingRepository from "../../repositories/ProductRatingRepository.js";
import createError from "http-errors";

export default {
    async createRating(authUserID: string, data: any) {
        const check = await ProductRatingRepository.findOne({user: authUserID, sku: data.sku});
        if (check) await check.deleteOne();

        return await ProductRatingRepository.save({user: authUserID, ...data});
    },

    async updateRating(authUserID: string, ratingID: string, data) {
        const productRating = await this.fetchAuthorizedRating(authUserID, ratingID);
        await productRating.updateOne({rating: data.rating, review: data.review})

        return productRating;
    },

    async deleteRating(authUserID: string, ratingID: string): Promise<void> {
        const productRating = await this.fetchAuthorizedRating(authUserID, ratingID);
        await productRating.deleteOne();
    },

    async fetchAuthorizedRating(authUserID: string, ratingID: string): Promise<void> {
        const productRating = await ProductRatingRepository.findById(ratingID);

        if (!productRating) throw createError(404, "Product Rating Not Found.");
        if (productRating.user.toString() != authUserID) throw createError(401, "Unauthorized User.");

        return productRating;
    }
}