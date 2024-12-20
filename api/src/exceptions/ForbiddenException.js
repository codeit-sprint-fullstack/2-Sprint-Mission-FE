import { HttpException } from './HttpException.js';

export class ForbiddenException extends HttpException {
    constructor(name, message) {
        super({
            status: 403,
            name,
            message,
        });
    }
}
