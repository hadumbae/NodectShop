import User from "../../models/User/User.js";
import createError from "http-errors";
import ProductSKU from "../../models/Product/ProductSKU.js";

export default {
    /**
     * Add product SKU to user's favourites.
     * @param userID The ID of the user.
     * @param skuID The ID of the product SKU.
     * @returns The updated user.
     */
    async addToUserFavourites(userID: string, skuID: string) {
        const sku = await ProductSKU.findById(skuID).lean();
        if (!sku) throw createError(404, "Product SKU not found.");

        const user = await User.findById(userID);
        if (!user) throw createError(404, "User not found!");

        if (!user.favourites.includes(sku._id)) {
            user.favourites.push(sku);
            await user.save();
        }

        return user.populate({path: "favourites", populate: {path: "product", model: "Product"}});
    },

    /**
     * Remove product SKU form the user's favourites.
     * @param userID The ID of the user.
     * @param skuID The ID of the product SKU.
     * @returns The updated user's favourites.
     */
    async removeFromUserFavourites(userID: string, skuID: string) {
        const sku = await ProductSKU.findById(skuID);
        if (!sku) throw createError(404, "Product SKU not found.");

        const user = await User.findByIdAndUpdate(userID, {$pull: {favourites: sku._id}}).populate('favourites.product');
        if (!user) throw createError(404, "User not found!");

        return user.populate({path: "favourites", populate: {path: "product", model: "Product"}});
    }
}