import { HttpException } from './HttpException.js';

export class UnprocessableEntityException extends HttpException {
    constructor(name, message) {
        super({
            status: 422,
            name,
            message,
        });
    }
}
