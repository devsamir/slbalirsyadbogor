"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class AppError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = "error";
    }
}
exports.default = AppError;
//# sourceMappingURL=appError.js.map