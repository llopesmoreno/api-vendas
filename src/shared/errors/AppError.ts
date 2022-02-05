class AppError {
    public readonly message: string;
    public readonly statusCode: number;
    public readonly errors: string[];

    constructor(message: string, statusCode = 400, errors: string[] = []) {
        this.message = message;
        this.statusCode = statusCode;
        this.errors = errors;
    }
}

export default AppError;
