import {Request, Response, NextFunction} from "express";
import {isHttpError} from "http-errors";
import UserFavouritesService from "../../../services/User/UserFavouritesService.js";

export default {
    async addToFavourites(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.userID;
            const {skuID} = req.body;

            const {favourites} = await UserFavouritesService.addToUserFavourites(userID, skuID);
            return res.json({message: "Added to favourites successfully.", userID: userID, favourites: favourites});
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    async removeFromFavourites(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.userID;
            const {skuID} = req.body;

            const favourites = UserFavouritesService.removeFromUserFavourites(userID, skuID);
            return res.json({message: "Removed from favourites successfully.", userID: userID, favourites: favourites});
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    }
}