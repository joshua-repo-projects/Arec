import { HTTPStatus } from "../types/Index";

export class BaseError extends Error {
    public status: number

    constructor(message: string = 'Internal Server Error', status: number = HTTPStatus.InternalServerError) {
        super(message)
        this.status = status
    }
}

export class NotFoundError extends BaseError {
    constructor(message: string = 'Not Found') {
        super(message, HTTPStatus.NotFound)
    }
}