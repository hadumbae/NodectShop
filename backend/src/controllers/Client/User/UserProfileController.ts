import {Request, Response, NextFunction} from "express";
import {isHttpError} from "http-errors";
import UserRepository from "../../../repositories/UserRepository.js";

export default {
    async profile(req: Request, res: Response, next: NextFunction): Promise<Response> {
        try {
            const userID = req.userID;
            const user = await UserRepository.findByIdLean(userID);

            return res.json({message: "User profiled fetched.", user: user});
        } catch (error) {
            if (!isHttpError(error)) res.status(500);
            next(error);
        }
    }
}