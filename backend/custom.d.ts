declare namespace Express {
    export interface Request {
        isAdmin: boolean;
        isAuth: boolean;
        userID?: string;
        userName?: string;
        userEmail?: string;
    }
}