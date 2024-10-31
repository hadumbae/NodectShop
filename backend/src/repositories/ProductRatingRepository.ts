import BaseRepository from "./BaseRepository.js";
import ProductRating from "../models/User/ProductRating.js";

class ProductRatingRepository extends BaseRepository{
    constructor() {
        super(ProductRating);
    }
}

export default new ProductRatingRepository();
