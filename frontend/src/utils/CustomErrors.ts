export class FetchError extends Error {
    constructor(public res: Response, message?: string, public errors?: any[]) {
        super(message)
    }
}