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
            const issues = error.issues[0]
            const message = issues.message
            return {message, status: HTTPStatus.BadRequest}
        case error instanceof BaseError:
        case error instanceof NotFoundError:
            return {message: error.message, status: error.status}
        default:
            return {message: 'Internal Server Error', status: HTTPStatus.InternalServerError}
    }
}