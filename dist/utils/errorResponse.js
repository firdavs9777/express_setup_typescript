"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ErrorResponse extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        //   Object.setPrototypeOf(this, ErrorResponse.prototype);
    }
}
exports.default = ErrorResponse;
