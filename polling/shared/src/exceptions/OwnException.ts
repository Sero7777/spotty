export abstract class OwnException extends Error {
    abstract statusCode: number

    constructor(message: string) {
        super(message)
    }

    abstract setErrors(): {message: string; field?: string}[]
} 
