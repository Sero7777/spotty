export default abstract class OwnException extends Error {
    abstract statusCode: number

    constructor(message: string) {
        super(message)

    Object.setPrototypeOf(this, OwnException.prototype);
    }

    abstract setErrors(): {message: string; field?: string}[]
} 