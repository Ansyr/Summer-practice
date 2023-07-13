import { ErrorType, ErrorValidation, ErrorResponse } from './type';

export class CustomError extends Error {
    httpStatusCode: number;
    errorType: ErrorType;
    errors: string[] | null;
    errorRaw: any;
    errorsValidation: ErrorValidation[] | null;

    constructor(
        httpStatusCode: number,
        errorType: ErrorType,
        message: string,
        errors: string[] | null = null,
        errorRaw: any = null,
        errorsValidation: ErrorValidation[] | null = null,
    ) {
        super(message);

        this.name = this.constructor.name;

        this.httpStatusCode = httpStatusCode;
        this.errorType = errorType;
        this.errors = errors;
        this.errorRaw = errorRaw;
        this.errorsValidation = errorsValidation;
    }

    get HttpStatusCode() {
        return this.httpStatusCode;
    }

    get JSON(): ErrorResponse {
        return {
            errorType: this.errorType,
            errorMessage: this.message,
            errors: this.errors,
            errorRaw: this.errorRaw,
            errorsValidation: this.errorsValidation,
            stack: this.stack,
        };
    }
}