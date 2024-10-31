import {Request, Response, NextFunction} from "express";
import {isHttpError} from "http-errors";
import ProductRatingRepository from "../../../repositories/ProductRatingRepository.js";
import ProductRatingService from "../../../services/Product/ProductRatingService.js";
import {validationResult} from "express-validator";

export default {
    /**
     * Handles creating a product rating.
     * @returns The created rating and the ID of its user.
     */
    async createRating(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const userID = req.userID;
            const data = req.body;

            const rating = await ProductRatingService.createRating(userID, data);
            return res.json({message: "Rating Created Successfully.", userID: userID, rating: rating});
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    /**
     * Handles updating a product rating.
     * @returns The updated rating and the ID of its user.
     */
    async updateRating(req: Request, res: Response, next: NextFunction) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) return res.status(400).json({message: "Validation failed.", errors: errors.array()});

            const userID = req.userID;
            const ratingID = req.params.ratingID;
            const data = req.body;

            const rating = await ProductRatingService.updateRating(userID, ratingID, data);
            return res.json({message: "Rating Updated.", userID: userID, rating: rating});
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    },

    /**
     * Handles deleting a product rating.
     * @returns The ID of the deleted rating's user.
     */
    async removeRating(req: Request, res: Response, next: NextFunction) {
        try {
            const userID = req.userID;
            const ratingID = req.params.ratingID;

            await ProductRatingService.deleteRating(userID, ratingID)
            return res.json({message: "Rating Created Successfully.", userID: userID});
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    }
}