import express from "express";
import isAuth from "../../../middleware/isAuth.js";
import UserCartController from "../../../controllers/Client/User/UserCartController.js";
import CartItemValidator from "../../../validation/validators/User/Cart/CartItemValidator.js";
import CheckoutValidator from "../../../validation/validators/User/Cart/CheckoutValidator.js";
import UserFavouritesController from "../../../controllers/Client/User/UserFavouritesController.js";
import CreateProductRatingValidator from "../../../validation/validators/Product/Ratings/AddProductRatingValidator.js";
import UpdateProductRatingValidator from "../../../validation/validators/Product/Ratings/UpdateProductRatingValidator.js";
import ProductRatingController from "../../../controllers/Client/Product/ProductRatingController.js";
import UserProfileController from "../../../controllers/Client/User/UserProfileController.js";

const UserProfileRoutes = express.Router();

// User Profile
UserProfileRoutes.get("/profile/basic-details", isAuth, UserProfileController.profile);

// User Favourites
UserProfileRoutes.post("/favourites/add", isAuth, UserFavouritesController.addToFavourites);
UserProfileRoutes.post("/favourites/remove", isAuth, UserFavouritesController.removeFromFavourites);

// User Cart
UserProfileRoutes.get('/cart/fetch', isAuth, UserCartController.fetchUserCart);
UserProfileRoutes.delete('/cart/clear', isAuth, UserCartController.clearUserCart);
UserProfileRoutes.post('/cart/add', [isAuth, ...CartItemValidator], UserCartController.addToUserCart);
UserProfileRoutes.post('/cart/remove', [isAuth, ...CartItemValidator], UserCartController.removeFromUserCart);

// User Checkout
UserProfileRoutes.post('/checkout', [isAuth, ...CheckoutValidator], UserCartController.checkout);

// Product Ratings
UserProfileRoutes.post('/ratings/add', [isAuth, ...CreateProductRatingValidator], ProductRatingController.createRating);
UserProfileRoutes.post('/ratings/update/:ratingID', [isAuth, ...UpdateProductRatingValidator], ProductRatingController.updateRating);
UserProfileRoutes.post('/ratings/remove/:ratingID', isAuth, ProductRatingController.removeRating);

export default UserProfileRoutes;