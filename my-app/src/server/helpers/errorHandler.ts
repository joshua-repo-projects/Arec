import { ZodError } from "zod";
import { HTTPStatus } from "../types/Index";
import { BaseError, NotFoundError } from "./customErrors";


interface IErrorResult {
    message: string
    status: number
}

export function ErrorHandler(error: unknown): IErrorResult {
    switch (true) {
        case error instanceof ZodError:
            const issues = error.issues
            const message = issues.map(el => `${el.path} - ${el.message}`).join(', ')
            return {message, status: HTTPStatus.BadRequest}
        case error instanceof BaseError:
        case error instanceof NotFoundError:
            return {message: error.message, status: error.status}
        default:
            return {message: 'Internal Server Error', status: HTTPStatus.InternalServerError}
    }
}