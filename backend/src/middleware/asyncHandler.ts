import {Request, Response, NextFunction} from "express";
import {isHttpError} from "http-errors";

export default fn => (req: Request, res: Response, next: NextFunction) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(error => {
            if (!isHttpError(error)) res.status(500);
            next(error);
        });
}